import { Button } from "@/components/ui/button";
import { CalendarIcon, ChartPie, CircleQuestionMark, Ellipsis, EyeOff, Filter, GripVertical, Lightbulb, Palette, SlidersHorizontal, X, Check, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// Hook to safely access window dimensions
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: 1024, // Default desktop width
        height: 768
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
    const { width } = useWindowSize();
    const [selectedDateRange, setSelectedDateRange] = useState<string>("today");

    const handleDateRangeChange = (dateRange: string) => {
        setSelectedDateRange(dateRange);
    }
    interface DateRange {
        today: string;
        thisWeek: string;
        thisMonth: string;
        thisYear: string;
        customDate: string;
    }
    const dateRanges: DateRange = {
        today: "Today",
        thisWeek: "This Week",
        thisMonth: "This Month",
        thisYear: "This Year",
        customDate: "Custom Date",
    }
    const [cards, setCards] = useState(Array.from({ length: 6 }, (_, i) => i));
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null); // Track which card's dropdown is open
    const [activeAboutWidget, setActiveAboutWidget] = useState<number | null>(null); // Track which card's about widget popup is open
    const [activeChartTypeSelector, setActiveChartTypeSelector] = useState<number | null>(null); // Track which card's chart type selector is open
    const [activeAIInsights, setActiveAIInsights] = useState<number | null>(null); // Track which card's AI insights popup is open
    const [hiddenWidgets, setHiddenWidgets] = useState<Set<number>>(new Set()); // Track which widgets are hidden
    const [aiQuestion, setAiQuestion] = useState<string>(''); // AI question input
    const [aiResponse, setAiResponse] = useState<string>(''); // AI response
    const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false); // AI loading state
    const [showColorTheme, setShowColorTheme] = useState<boolean>(false); // Track color theme modal
    const [selectedTheme, setSelectedTheme] = useState<string>('default'); // Track selected color theme
    const [tempSelectedTheme, setTempSelectedTheme] = useState<string>('default'); // Track temporary theme selection

    // Handle clicking outside to close dropdown and popups (excluding AI insights)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown !== null) {
                setActiveDropdown(null);
            }
            // Note: AI insights popup is excluded from outside click closing
        };

        if (activeDropdown !== null) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [activeDropdown, activeAboutWidget, activeChartTypeSelector]);

    // Chart data based on the images
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE'];

    // About widget descriptions for each chart (configurable for future updates)
    const aboutWidgetDescriptions = [
        "This widget shows or tracks profitability margins against company targets.",
        "This widget displays liability trends and financial obligations over time.",
        "This widget tracks performance metrics and key performance indicators.",
        "This widget monitors growth metrics and business expansion indicators.",
        "This widget shows category distribution and market segmentation data.",
        "This widget displays market share analysis and competitive positioning."
    ];

    // Available chart types for selection
    const chartTypeOptions = [
        { value: 'bar', label: 'Bar Chart' },
        { value: 'line', label: 'Line Chart' },
        { value: 'pie', label: 'Pie Chart' }
    ];

    // Color theme configurations
    const colorThemes = {
        default: {
            name: 'Default',
            primary: '#47C2FF',
            secondary: '#C2EBFF',
            tertiary: '#00A3F5'
        },
        blue: {
            name: 'Blue Theme',
            primary: '#3B82F6',
            secondary: '#93C5FD',
            tertiary: '#1D4ED8'
        },
        green: {
            name: 'Green Theme',
            primary: '#10B981',
            secondary: '#6EE7B7',
            tertiary: '#047857'
        },
        orange: {
            name: 'Orange Theme',
            primary: '#F59E0B',
            secondary: '#FCD34D',
            tertiary: '#D97706'
        }
    };

    // AI Integration function
    const askAI = async (question: string, chartData: any) => {
        setIsLoadingAI(true);
        try {
            // Create a context-aware prompt for the AI
            const contextPrompt = `You are a business analytics AI assistant. Based on the following chart data, provide insights and answer the user's question.

Chart Data: ${JSON.stringify(chartData, null, 2)}

User Question: ${question}

Please provide:
1. Direct answer to the question
2. 2-3 specific business insights based on the data
3. Actionable recommendations

Format your response as bullet points with clear, concise insights.`;

            // Use OpenAI API (you'll need to add your API key)
            const response = await fetch('/api/ai-insights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: contextPrompt,
                    question: question,
                    chartData: chartData
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            setAiResponse(data.response || 'Unable to generate insights at this time.');
        } catch (error) {
            console.error('AI Error:', error);
            // Fallback response if AI fails
            setAiResponse(`Based on the chart data, here are some insights:

            • The margin may increase 3% MoM due to reduced logistics costs.
            • Likely to rise 2% next quarter if trends continue.
            • You should try re-negotiate contracts with suppliers to sustain savings.`);
        } finally {
            setIsLoadingAI(false);
        }
    };

    // Get current theme colors
    const currentTheme = colorThemes[selectedTheme as keyof typeof colorThemes];

    // Helper functions for responsive values
    const getColumnWidth = () => {
        if (width < 640) return '16px';
        if (width < 768) return '18px';
        if (width < 1024) return '20px';
        if (width < 1280) return '24px';
        return '32px';
    };

    const getSingleColumnWidth = () => {
        if (width < 640) return '32px';
        if (width < 768) return '36px';
        if (width < 1024) return '40px';
        if (width < 1280) return '48px';
        return '64px';
    };

    const getXAxisFontSize = () => {
        if (width < 640) return '7px';  // Very small for mobile
        if (width <= 768) return '6px'; // Smaller for tablet to fit all labels
        return '10px'; // Normal size for desktop
    };

    const getFontSize = () => {
        if (width < 640) return '8px';
        if (width < 768) return '9px';
        return '10px';
    };

    const getChartHeight = () => {
        if (width < 640) return 160;
        if (width < 768) return 170;
        if (width < 1024) return 180;
        if (width < 1280) return 190;
        return 200;
    };

    // Chart configurations for each type
    // Each chart config includes: title, type, series data, colors, and ApexCharts options
    // seriesColors array is used for the toolbar legend display
    const chartConfigs = [
        {
            // Chart 1: Profitability - Grouped bar chart with Revenue and Net Margin
            title: "Profitability",
            type: "bar",
            series: [
                { name: 'Revenue', data: [270, 60, 60, 170, 230, 160] },
                { name: 'Net Margin', data: [70, 290, 140, 80, 420, 60] }
            ],
            seriesColors: [currentTheme.primary, currentTheme.secondary], // Colors for toolbar legend
            options: {
                chart: { type: 'bar' as const, toolbar: { show: false }, height: 200 },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: getColumnWidth(),
                        borderRadius: 4,
                        borderRadiusApplication: "end" as const
                    }
                },
                dataLabels: { enabled: false },
                stroke: { show: false },
                xaxis: {
                    categories: months,
                    labels: {
                        style: {
                            fontSize: getXAxisFontSize(),
                            colors: '#A5A5A5'
                        },
                        offsetY: 0
                    },
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                yaxis: {
                    labels: {
                        formatter: (value: number) => `${value}k`,
                        style: { fontSize: '10px', colors: '#A5A5A5' }
                    },
                    min: 0, max: 500, tickAmount: 5,
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                fill: { opacity: 1 },
                colors: [currentTheme.primary, currentTheme.secondary],
                legend: { show: false },
                grid: { borderColor: '#f1f5f9' },
                tooltip: { y: { formatter: (value: number) => `${value}k` } }
            }
        },
        {
            // Chart 2: Liability - Single bar chart (no toolbar legend needed)
            title: "Liability",
            type: "bar",
            series: [{ name: 'Liability', data: [260, 60, 60, 170, 230, 160] }],
            seriesColors: [currentTheme.primary],
            options: {
                chart: { type: 'bar' as const, toolbar: { show: false }, height: 200 },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: getSingleColumnWidth(),
                        borderRadius: 2,
                        borderRadiusApplication: "end" as const
                    }
                },
                dataLabels: { enabled: false },
                stroke: { show: true, width: 2, colors: ['transparent'] },
                xaxis: {
                    categories: months,
                    labels: {
                        style: {
                            fontSize: getXAxisFontSize(),
                            colors: '#A5A5A5'
                        },
                        offsetY: 0
                    },
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                yaxis: {
                    labels: {
                        formatter: (value: number) => `${value}k`,
                        style: { fontSize: '10px', colors: '#A5A5A5' }
                    },
                    min: 0, max: 500, tickAmount: 5,
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                fill: { opacity: 1 },
                colors: [currentTheme.primary],
                legend: { show: false },
                grid: { borderColor: '#f1f5f9' },
                tooltip: { y: { formatter: (value: number) => `${value}k` } }
            }
        },
        {
            // Chart 3: Performance Trends - Multi-line chart with smooth curves
            title: "Performance Trends",
            type: "line",
            series: [
                { name: 'Series 1', data: [130, 70, 300, 380, 210, 390] },
                { name: 'Series 2', data: [70, 310, 140, 240, 370, 380] }
            ],
            seriesColors: [currentTheme.primary, currentTheme.secondary], // Colors for toolbar legend
            options: {
                chart: { type: 'line' as const, toolbar: { show: false }, height: 200, zoom: { enabled: false } },
                stroke: { curve: 'straight' as const, width: 1.6 },
                xaxis: {
                    categories: months,
                    labels: {
                        style: {
                            fontSize: getXAxisFontSize(),
                            colors: '#A5A5A5'
                        },
                        offsetY: 0
                    },
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                yaxis: {
                    labels: {
                        formatter: (value: number) => `${value}k`,
                        style: { fontSize: '10px', colors: '#A5A5A5' }
                    },
                    min: 0, max: 500, tickAmount: 5,
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                colors: [currentTheme.primary, currentTheme.secondary],
                legend: { show: false },
                grid: { borderColor: '#f1f5f9' },
                tooltip: { y: { formatter: (value: number) => `${value}k` } }
            }
        },
        {
            // Chart 4: Growth Metrics - Single line chart (no toolbar legend needed)
            title: "Growth Metrics",
            type: "line",
            series: [{ name: 'Series 1', data: [130, 80, 320, 390, 210, 440] }],
            seriesColors: [currentTheme.primary],
            options: {
                chart: { type: 'line' as const, toolbar: { show: false }, height: 200, zoom: { enabled: false } },
                stroke: { curve: 'straight' as const, width: 1.6 },
                xaxis: {
                    categories: months,
                    labels: {
                        style: {
                            fontSize: getXAxisFontSize(),
                            colors: '#A5A5A5'
                        },
                        offsetY: 0
                    },
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                yaxis: {
                    labels: {
                        formatter: (value: number) => `${value}k`,
                        style: { fontSize: '10px', colors: '#A5A5A5' }
                    },
                    min: 0, max: 500, tickAmount: 5,
                    axisBorder: { show: true },
                    axisTicks: { show: true }
                },
                colors: [currentTheme.primary],
                legend: { show: false },
                grid: { borderColor: '#f1f5f9' },
                tooltip: { y: { formatter: (value: number) => `${value}k` } }
            }
        },
        {
            // Chart 5: Category Distribution - Pie chart with 3 segments
            title: "Category Distribution",
            type: "pie",
            series: [65, 25, 10], // Percentage values for pie segments
            seriesColors: [currentTheme.tertiary, currentTheme.primary, currentTheme.secondary], // Colors for toolbar legend
            options: {
                chart: { type: 'pie' as const, height: 200 },
                labels: ['Category 1', 'Category 2', 'Category 3'],
                colors: [currentTheme.tertiary, currentTheme.primary, currentTheme.secondary],
                legend: {
                    show: false
                },
                dataLabels: { enabled: false },
                stroke: { show: false },
                plotOptions: { pie: { donut: { size: '0%' } } }
            }
        },
        {
            // Chart 6: Market Share - Donut chart with center hole
            title: "Market Share",
            type: "donut",
            series: [75, 15, 10], // Percentage values for donut segments
            seriesColors: [currentTheme.tertiary, currentTheme.primary, currentTheme.secondary], // Colors for toolbar legend
            options: {
                chart: { type: 'donut' as const, height: 200 },
                labels: ['Category 1', 'Category 2', 'Category 3'],
                colors: [currentTheme.tertiary, currentTheme.primary, currentTheme.secondary],
                legend: {
                    show: false
                },
                dataLabels: { enabled: false },
                stroke: { show: false },
                plotOptions: { pie: { donut: { size: '70%' } } }
            }
        }
    ];

    // Drag and Drop Event Handlers
    // These functions handle the HTML5 drag and drop API for reordering chart cards
    function handleDragStart(idx: number) {
        // Set the currently dragged card index for visual feedback
        setDraggedIdx(idx);
    }

    function handleDragOver(e: React.DragEvent, idx: number) {
        // Prevent default to allow drop
        e.preventDefault();
        // Visual feedback for drop targets is handled via className conditions
    }

    function handleDrop(idx: number) {
        // Don't drop on the same position or if no card is being dragged
        if (draggedIdx === null || draggedIdx === idx) return;

        // Swap positions: remove dragged card and insert at new position
        const newCards = [...cards];
        const [removed] = newCards.splice(draggedIdx, 1);
        newCards.splice(idx, 0, removed);
        setCards(newCards);
        setDraggedIdx(null);
    }

    function handleDragEnd() {
        // Reset dragged state when drag operation ends (cleanup)
        setDraggedIdx(null);
    }

    return (
        <>
            {/**Dashboard Header Select Date Range and Settings */}
            <div className="flex flex-col xl:flex-row sm:justify-between sm:items-center mb-5 gap-3 sm:gap-4">
                {/** Select Date Range */}
                <div className="flex flex-row items-center border border-[#E9E9E9] overflow-hidden rounded-[8px] w-full sm:w-auto">
                    {Object.entries(dateRanges).map(([key, value]) => (
                        <Button
                            key={key}
                            variant="ghost"
                            className={cn(
                                "h-8 sm:h-9 md:h-11 border-r border-[#E9E9E9] last:border-r-0 rounded-none flex-1 sm:flex-none px-2 sm:px-3 md:px-4",
                                selectedDateRange === key ? "bg-gray-200" : "bg-transparent"
                            )}
                            onClick={() => handleDateRangeChange(key)}
                        >
                            <span className={cn(
                                "text-[10px]/[14px] sm:text-[12px]/[16px] md:text-[16px]/[20px] font-medium text-[#353535] whitespace-nowrap",
                                selectedDateRange === key ? "text-[#1C1C1C]" : "text-[#A5A5A5]"
                            )}>
                                {value}
                            </span>
                            {key === "customDate" && <Filter className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#A5A5A5] ml-1 flex-shrink-0" />}
                        </Button>
                    ))}
                </div>
                {/** Settings */}
                <div className="flex flex-row items-center gap-[8px] sm:gap-[12px] md:gap-[16px]">
                    <Button
                        variant="outline"
                        className="h-8 sm:h-9 md:h-11 bg-gray-100 rounded-[8px] px-2 sm:px-3 md:px-4"
                        onClick={() => {
                            setTempSelectedTheme(selectedTheme); // Initialize with current theme
                            setShowColorTheme(true);
                        }}
                    >
                        <Palette className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#A5A5A5] flex-shrink-0" />
                        <span className="text-[10px]/[14px] sm:text-[12px]/[16px] md:text-[16px]/[20px] font-medium text-[#353535] ml-1 whitespace-nowrap">Change Theme</span>
                    </Button>
                    <Button variant="outline" className="h-8 sm:h-9 md:h-11 rounded-[8px] bg-transparent px-2 sm:px-3 md:px-4">
                        <SlidersHorizontal className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#A5A5A5] flex-shrink-0" />
                        <span className="text-[10px]/[14px] sm:text-[12px]/[16px] md:text-[16px]/[20px] font-medium text-[#353535] ml-1 whitespace-nowrap">Customize</span>
                    </Button>
                </div>
            </div>
            {/**Dashboard Content Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
                {/* Draggable Cards Grid with real drag-and-drop */}
                {/*
                  - We'll use useState to track the order of the cards.
                  - We'll use the HTML5 drag events.
                  - The user can drag a card and drop it anywhere to swap.
                */}
                {cards.map((cardIdx: number, idx: number) => {
                    // Skip rendering if widget is hidden
                    if (hiddenWidgets.has(cardIdx)) {
                        return null;
                    }

                    return (
                        <div
                            key={cardIdx}
                            className={cn(
                                "relative border border-[#E9E9E9] rounded-lg shadow-sm group transition-all !min-h-[256px] duration-200 hover:shadow-md hover:border-[#D1D1D1]"
                            )}
                            style={{ minHeight: 100 }}
                            draggable
                            onDragStart={() => handleDragStart(idx)}
                            onDragOver={e => handleDragOver(e, idx)}
                            onDrop={() => handleDrop(idx)}
                            onDragEnd={handleDragEnd}
                        >
                            {/* Card Toolbar (Header) */}
                            <div className="flex items-center justify-between w-full border-b border-[#F2F2F2] px-2 sm:px-3 md:px-4 py-2 sm:py-[8px] md:py-[10px]">
                                <div className="flex items-center gap-2">
                                    {/* Enhanced Drag Handle */}
                                    <div
                                        className={cn(
                                            "flex items-center justify-center w-6 h-6 rounded cursor-grab active:cursor-grabbing transition-all duration-200",
                                            "hover:bg-gray-100 hover:scale-110",
                                            draggedIdx === idx
                                                ? "opacity-50 bg-gray-200"
                                                : "group-hover:bg-gray-50"
                                        )}
                                        title="Drag to reorder"
                                    >
                                        <GripVertical className="w-4 h-4 text-[#A5A5A5]" />
                                    </div>
                                    <span className="font-semibold text-[14px]/[24px] text-[#1C1C1C]">{chartConfigs[cardIdx]?.title || `<Name-of-charts>`}</span>
                                    <span className="text-[14px]/[24px] text-[#8F8F8F]">(this week)</span>
                                </div>

                                {/* Dynamic Series Legend for Charts with Multiple Series */}
                                <div className="flex items-center flex-row">
                                    {/* Only shows legend in toolbar for bar/line charts with 2+ series (excludes pie/donut charts) */}
                                    {chartConfigs[cardIdx] &&
                                        chartConfigs[cardIdx].series.length > 1 &&
                                        chartConfigs[cardIdx].type === 'bar' &&
                                        (
                                            <div className="flex items-center ml-auto gap-4 border-r border-[#E9E9E9] px-4">
                                                {chartConfigs[cardIdx].series.map((series: any, seriesIdx: number) => (
                                                    <div key={seriesIdx} className="flex items-center gap-1.5 ">
                                                        {/* Color indicator square matching the chart series color */}
                                                        <div
                                                            className="w-2 h-2 rounded-[2px]"
                                                            style={{ backgroundColor: chartConfigs[cardIdx].seriesColors[seriesIdx] }}
                                                        ></div>
                                                        {/* Series name from the chart configuration */}
                                                        <span className="text-[12px]/[18px] text-[#8F8F8F]">{series.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    {/* 3 dots for menu in right */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="px-4 transition-colors ml-auto"
                                            tabIndex={-1}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveDropdown(activeDropdown === cardIdx ? null : cardIdx);
                                            }}
                                        >
                                            <Ellipsis className="w-4 h-4 text-[#C1C1C1]" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === cardIdx && (
                                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-tr-none rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-lg z-50 min-w-[160px]">
                                                <div className="py-1">
                                                    <button
                                                        className="w-full px-4 py-2 text-left text-[12px]/[18px] text-[#626262] hover:bg-gray-50 flex items-center gap-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveAboutWidget(cardIdx);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        <div className="w-4 h-4 flex items-center justify-center">
                                                            <CircleQuestionMark className="w-3 h-3 text-[#A5A5A5]" />
                                                        </div>
                                                        About widget
                                                    </button>
                                                    <button
                                                        className="w-full px-4 py-2 text-left text-[12px]/[18px] text-[#626262] hover:bg-gray-50 flex items-center gap-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveAIInsights(cardIdx);
                                                            setActiveDropdown(null);
                                                            setAiQuestion('');
                                                            setAiResponse('');
                                                        }}
                                                    >
                                                        <div className="w-4 h-4 flex items-center justify-center">
                                                            <Lightbulb className="w-3 h-3 text-[#A5A5A5]" />
                                                        </div>
                                                        Use AI insights
                                                    </button>
                                                    <button
                                                        className="w-full px-4 py-2 text-left text-[12px]/[18px] text-[#626262] hover:bg-gray-50 flex items-center gap-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveChartTypeSelector(cardIdx);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        <div className="w-4 h-4 flex items-center justify-center">
                                                            <ChartPie
                                                                className="w-3 h-3 text-[#A5A5A5]"
                                                            />
                                                        </div>
                                                        Change Chart type
                                                    </button>
                                                    <button
                                                        className="w-full px-4 py-2 text-left text-[12px]/[18px] text-[#626262] hover:bg-gray-50 flex items-center gap-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setHiddenWidgets(prev => new Set([...prev, cardIdx]));
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        <div className="w-4 h-4 flex items-center justify-center">
                                                            <EyeOff className="w-3 h-3 text-[#A5A5A5]" />
                                                        </div>
                                                        Hide this widget
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Chart Content - Dynamically renders ApexCharts based on configuration */}
                            <div className="p-2 sm:p-3 md:p-4 relative">
                                {chartConfigs[cardIdx] && (
                                    <>
                                        {/* Chart and Legend Container */}
                                        {(chartConfigs[cardIdx]?.type === 'pie' || chartConfigs[cardIdx]?.type === 'donut') ? (
                                            <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-3">
                                                {/* ApexCharts component */}
                                                <div className="flex-shrink-0">
                                                    <Chart
                                                        options={chartConfigs[cardIdx].options}
                                                        series={chartConfigs[cardIdx].series}
                                                        type={chartConfigs[cardIdx].type as any}
                                                        height={getChartHeight()}
                                                    />
                                                </div>

                                                {/* Custom Legend positioned next to chart */}
                                                <div className="flex flex-col gap-1 sm:gap-2 max-w-[120px] sm:max-w-[140px] md:max-w-none">
                                                    {(chartConfigs[cardIdx].series as number[]).map((value: number, seriesIdx: number) => (
                                                        <div key={seriesIdx} className="flex justify-start gap-1 items-start">
                                                            <div
                                                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm mt-0.5 flex-shrink-0"
                                                                style={{ backgroundColor: chartConfigs[cardIdx].seriesColors[seriesIdx] }}
                                                            ></div>
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-[8px] sm:text-[10px] md:text-[12px] font-medium text-[#333] leading-tight">{value.toFixed(1)}%</span>
                                                                <span className="text-[7px] sm:text-[9px] md:text-[11px] text-[#8F8F8F] leading-tight truncate">{(chartConfigs[cardIdx].options.labels as string[])[seriesIdx]}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            /* Regular chart for non-pie charts */
                                            <Chart
                                                options={chartConfigs[cardIdx].options}
                                                series={chartConfigs[cardIdx].series}
                                                type={chartConfigs[cardIdx].type as any}
                                                height={getChartHeight()}
                                            />
                                        )}

                                        {/* Footer text for pie and donut charts only */}
                                        {(chartConfigs[cardIdx].type === 'pie' || chartConfigs[cardIdx].type === 'donut') && (
                                            <div className="text-center mt-2">
                                                <span className="text-[13px] text-[#B0B0B0]">Title of Graph down here</span>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* About Widget Popup */}
                                {activeAboutWidget === cardIdx && (
                                    <div className="absolute top-0 right-2 bg-white border border-gray-200 rounded-tr-none rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-lg z-50 p-4 max-w-[280px]">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-[12px]/[18px] text-[#1C1C1C] mb-1">About widget</h3>
                                                <p className="text-[10px]/[14px] text-[#787878] leading-relaxed">
                                                    {aboutWidgetDescriptions[cardIdx]}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveAboutWidget(null);
                                                }}
                                                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <X className="w-4 h-4 text-[#999]" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Chart Type Selector Popup */}
                                {activeChartTypeSelector === cardIdx && (
                                    <div className="absolute top-0 right-2 bg-white border border-gray-200 rounded-tr-none rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-lg z-50 p-4 min-w-[180px]">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <h3 className="font-medium text-[12px]/[18px] text-[#1C1C1C]">Choose chart-type</h3>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveChartTypeSelector(null);
                                                }}
                                                className="flex-shrink-0  hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <X className="w-4 h-4 text-[#999]" />
                                            </button>
                                        </div>
                                        <div className="space-y-1">
                                            {chartTypeOptions.map((option) => {
                                                const isSelected = chartConfigs[cardIdx]?.type === option.value;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveChartTypeSelector(null);
                                                        }}
                                                        className={cn(
                                                            "w-full px-3 py-2 text-left text-[12px]/[18px] text-[#626262] hover:bg-gray-50 flex items-center gap-1 transition-colors",
                                                            isSelected && "bg-gray-200"
                                                        )}
                                                    >
                                                        <div className="w-4 h-4 flex items-center justify-center">
                                                            {isSelected ? (
                                                                <div className="w-4 h-4  rounded-sm flex items-center justify-center">
                                                                    <Check className="w-3 h-3 text-white bg-[#1C1C1C] border-none" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-3 h-3 border border-gray-300"></div>
                                                            )}
                                                        </div>
                                                        {option.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {/* AI Insights Popup */}
                                {activeAIInsights === cardIdx && (
                                    <>
                                        <div
                                            className="absolute top-0 right-2 bg-white border border-gray-200 rounded-tr-none rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-lg z-50 p-4 max-w-[320px]"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <h3 className="font-medium text-[12px]/[18px] text-[#1C1C1C]">Ask our AI for insights</h3>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveAIInsights(null);
                                                        setAiQuestion('');
                                                        setAiResponse('');
                                                    }}
                                                    className="flex-shrink-0 hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    <X className="w-3 h-3 text-[#999]" />
                                                </button>
                                            </div>

                                            {/* Input Field */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-3">
                                                    <input
                                                        type="text"
                                                        value={aiQuestion}
                                                        onChange={(e) => setAiQuestion(e.target.value)}
                                                        placeholder="Ask us any question!"
                                                        className="flex-1 text-[14px] outline-none placeholder:text-gray-400"
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter' && aiQuestion.trim()) {
                                                                askAI(aiQuestion, chartConfigs[cardIdx]);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            if (aiQuestion.trim()) {
                                                                askAI(aiQuestion, chartConfigs[cardIdx]);
                                                            }
                                                        }}
                                                        disabled={!aiQuestion.trim() || isLoadingAI}
                                                        className="p-2   disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        {isLoadingAI ? (
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <ArrowRight className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* AI Response */}
                                            {aiResponse && (
                                                <div className="border-t border-gray-100 pt-4">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Lightbulb className="w-4 h-4 text-[#0D978B]" />
                                                        <span className="text-[14px] font-medium text-[#0D978B]">The following are some insights:</span>
                                                    </div>
                                                    <div className="text-[13px] text-[#666] leading-relaxed whitespace-pre-line">
                                                        {aiResponse}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Drop Zone Visual Feedback - Shows when dragging over a valid drop target */}
                            {draggedIdx !== null && draggedIdx !== idx && (
                                <div className="absolute inset-0 border-2 border-dashed border-[#3B82F6] rounded-lg bg-blue-50/50 flex items-center justify-center">
                                    <span className="text-[#3B82F6] font-medium text-sm">Drop here</span>
                                </div>
                            )}


                        </div>
                    );
                })}
            </div>

            {/* Color Theme Dialog */}
            <Dialog open={showColorTheme} onOpenChange={setShowColorTheme}>
                <DialogContent className="w-[90vw] max-w-[516px] p-0 min-h-[280px] sm:min-h-[310px] mx-auto" close={false}>
                    <DialogHeader className="p-3 sm:p-4 md:p-5">
                        <DialogTitle className="text-[16px]/[24px] sm:text-[18px]/[28px] md:text-[20px]/[30px] font-semibold text-[#1C1C1C]">Colour Theme</DialogTitle>
                        <DialogDescription className="text-[12px]/[18px] sm:text-[13px]/[19px] md:text-[14px]/[20px] text-[#8F8F8F]">
                            Choose your preferred colour theme (for analytics).
                        </DialogDescription>
                    </DialogHeader>

                    {/* Theme Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 px-3 sm:px-4 md:px-5">
                        {Object.entries(colorThemes).map(([key, theme]) => (
                            <div
                                key={key}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => setTempSelectedTheme(key)}
                            >
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 rounded-full p-2 sm:p-2.5 md:p-3 mb-1"
                                    style={{ backgroundColor: theme.secondary }}
                                >
                                    <div
                                        className="w-full h-full rounded-full"
                                        style={{ backgroundColor: theme.primary }}
                                    />
                                    {tempSelectedTheme === key && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                                <span className={`text-[10px]/[14px] sm:text-[12px]/[16px] md:text-[14px]/[20px] ${tempSelectedTheme === key ? 'text-[#1C1C1C]' : 'text-[#8F8F8F]'}`}>{theme.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 border-t border-[#E9E9E9] pt-3 sm:pt-4 pb-3 sm:pb-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setTempSelectedTheme(selectedTheme); // Reset to current theme
                                setShowColorTheme(false);
                            }}
                            className="text-[12px]/[16px] sm:text-[13px]/[18px] md:text-[14px]/[20px] font-semibold px-3 sm:px-4 h-[36px] sm:h-[40px] md:h-[42px] rounded-[8px] text-[#053834] order-2 sm:order-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedTheme(tempSelectedTheme); // Apply the temporary theme
                                setShowColorTheme(false);
                            }}
                            className="bg-[#0D978B] hover:bg-[#0D978B70] text-white text-[12px]/[16px] sm:text-[13px]/[18px] md:text-[14px]/[20px] font-semibold px-3 sm:px-4 h-[36px] sm:h-[40px] md:h-[42px] rounded-[8px] order-1 sm:order-2"
                        >
                            Save change
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

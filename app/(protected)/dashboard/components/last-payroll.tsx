import { DollarSign } from "lucide-react"
import dynamic from 'next/dynamic';
import ApexCharts from "apexcharts";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LastPayroll() {
    const totalPayroll = 912999.99;
    const salary = 678000.32;
    const tax = 678000.32;
    const overtime = 678000.32;
    const bonuses = 678000.32;

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "pie",
        },
        labels: ["Salary", "Tax", "Overtime", "Bonuses"],
        colors: ["#18988B", "#FFA750", "#3B82F6", "#EF4444"],
        legend: {
            show: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "75%",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 0,
        },
    };

    // Visual proportions based on the chart appearance
    const series = [500000, 200000, 150000, 62999.99];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const calculatePercentage = (amount: number) => {
        return Math.round((amount / totalPayroll) * 100);
    };

    return (
        <div className="w-full h-full rounded-[12px] border border-[#e9e9e9] bg-white p-[16px]">
            <div className="flex justify-between items-center">
                <div className="flex gap-[4px]">
                    <p className="text-[#4b4b4b] text-[13px]/[16px]">Last Payroll Breakdown</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between pb-[20px]">
                <div style={{ width: "200px" }} className="-mt-[60px]">
                    <Chart options={options} series={series} type="donut" />
                    <div className="text-center -mt-[120px]">
                        <p className="text-[9px]/[14px] font-medium text-[#737373] mt-[5px]">Mar 25th - Mar 26th</p>
                        <h2 className="text-[16px]/[21px] font-bold text-[#0a0a0a]">{formatCurrency(totalPayroll)}</h2>
                    </div>
                </div>

                <div className="flex flex-col gap-[12px] ml-[20px] w-full pt-[20px]">
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-[4px]">
                            <div className="w-[12px] h-[12px] rounded-[0.75px] bg-[#18988B]"></div>
                            <span className="text-[13px]/[18px] font-medium text-[#353535]">Salary(55%)</span>
                        </div>
                        <div className="px-[16px]">
                            <span className="text-[12px]/[16px] font-medium text-[#787878]">{formatCurrency(salary)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col  justify-between">
                        <div className="flex items-center gap-[4px]">
                            <div className="w-[12px] h-[12px] rounded-[0.75px] bg-[#FFA750]"></div>
                            <span className="text-[13px]/[18px] font-medium text-[#353535]">Tax(55%)</span>
                        </div>
                        <div className="px-[16px]">
                            <span className="text-[12px]/[16px] font-medium text-[#787878]">{formatCurrency(tax)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-[4px]">
                            <div className="w-[12px] h-[12px] rounded-[0.75px] bg-[#3B82F6]"></div>
                            <span className="text-[13px]/[18px] font-medium text-[#353535]">Overtime(55%)</span>
                        </div>
                        <div className="px-[16px]">
                            <span className="text-[12px]/[16px] font-medium text-[#787878]">{formatCurrency(overtime)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col  justify-between">
                        <div className="flex items-center gap-[4px]">
                            <div className="w-[12px] h-[12px] rounded-[0.75px] bg-[#EF4444]"></div>
                            <span className="text-[13px]/[18px] font-medium text-[#353535]">Bonuses(55%)</span>
                        </div>
                        <div className="px-[16px]">
                            <span className="text-[12px]/[16px] font-medium text-[#787878]">{formatCurrency(bonuses)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


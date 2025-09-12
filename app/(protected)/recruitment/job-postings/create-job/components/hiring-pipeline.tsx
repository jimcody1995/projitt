import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditableSelect } from "@/components/ui/editable-select";
import { ArrowLeft, GripVertical, LoaderIcon, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DialogContent, { Dialog } from "@/components/ui/dialog";
import { getTypes } from "@/api/master";
import { addStageApi, getPipeline, removeStageApi } from "@/api/job-posting";
import { customToast } from "@/components/common/toastr";
import LoadingSpinner from "@/components/common/loading-spinner";

/**
 * HiringPipeline manages the creation and editing of a hiring process pipeline.
 * Users can import templates, start from scratch, add/edit/remove stages, and define stage types and tests.
 */
export default function HiringPipeline({ disabled = false, jobId, setOrder }: { disabled?: boolean, jobId: number | null, setOrder: (order: any) => void }) {
    const [pipeline, setPipeLine] = useState<any[]>([])
    const [selectedStep, setSelectedStep] = useState<number | null>(null);
    const [state, setState] = useState('main');
    const [stageName, setStageName] = useState('');
    const [types, setTypes] = useState<any[]>([]);
    const [subTypes, setSubTypes] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedSubType, setSelectedSubType] = useState<number | null>(null);
    const [addState, setAddState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingSubTypes, setLoadingSubTypes] = useState(false);
    /**
     * Adds a new step to the pipeline after the given index.
     */


    /**
     * Removes a step from the pipeline at the given index.
     */
    const removeStep = async (id: number) => {
        setLoading(true);
        try {
            const response = await removeStageApi(id);
            if (response.status) {
                const newPipeline = [...pipeline];
                newPipeline.splice(newPipeline.findIndex(item => item.id === id), 1);
                setPipeLine(newPipeline);
                customToast('Success', 'Stage removed successfully', 'success');
            }
        } catch (error: any) {
            customToast('Error', error.response.data.message, 'error');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Initializes a new pipeline with one default step.
     */
    const startFromScratch = () => {
        setAddState(true);
    }

    /**
     * Handles drag start event
     */
    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
        (e.currentTarget as HTMLElement).style.opacity = '0.5';
    };

    /**
     * Handles drag over event
     */
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    /**
     * Handles drop event to reorder stages
     */
    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

        if (dragIndex === dropIndex) return;

        const newPipeline = [...pipeline];
        const [draggedItem] = newPipeline.splice(dragIndex, 1);
        newPipeline.splice(dropIndex, 0, draggedItem);

        setPipeLine(newPipeline);

        // Reset opacity
        const draggedElement = document.querySelector(`[data-drag-index="${dragIndex}"]`) as HTMLElement;
        if (draggedElement) {
            draggedElement.style.opacity = '1';
        }
    };

    /**
     * Handles drag end event
     */
    const handleDragEnd = (e: React.DragEvent) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
    };

    const getTypesData = async () => {
        try {
            const response = await getTypes({ type_id: 5 });
            if (response.status) {
                setTypes(response.data);
            }
        } catch (error: any) {
            customToast('Error', error.response.data.message, 'error');
        }
    }

    const getSubTypes = async (typeId: number) => {
        setLoadingSubTypes(true);
        try {
            const response = await getTypes({ type_id: 5, parent_id: typeId });
            if (response.status) {
                setSubTypes(response.data);
            }
        } catch (error: any) {
            customToast('Error', error.response.data.message, 'error');
        } finally {
            setLoadingSubTypes(false);
        }
    }

    const handleGetLastPipeline = async () => {
        setLoading(true);
        try {
            const response = await getPipeline(jobId || 0);
            if (response.status) {
                setPipeLine(response.data.map((item: any) => ({ title: item.name, type: item.type.name, test: item.sub_type.name, id: item.id })));
            }
        } catch (error: any) {
            customToast('Error', error.response.data.message, 'error');
        }
        finally {
            setLoading(false);
        }
    }

    const addStage = async () => {
        setLoading(true);
        try {
            const response = await addStageApi(stageName, selectedType || 0, selectedSubType || 0, jobId);
            if (response.status) {
                setPipeLine([...pipeline, { title: response.data.name, type: response.data.type.name, test: response.data.sub_type.name, id: response.data.id }]);
                setAddState(false);
            }
        } catch (error: any) {
            customToast('Error', error.response.data.message, 'error');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTypesData();
        handleGetLastPipeline();
    }, []);

    useEffect(() => {
        setOrder(pipeline.map((item: any, index) => ({ id: item.id, order: index + 1 })));
    }, [pipeline, setOrder]);

    useEffect(() => {
        getSubTypes(selectedType || types[0]?.id);
    }, [selectedType]);


    return (
        <div className="w-full" data-test-id="hiring-pipeline-container">
            <div className="flex items-center justify-between gap-[8px] w-full">
                <p className="text-[20px]/[30px] font-semibold text-[#353535]" data-test-id="pipeline-title">Hiring Pipeline</p>
                <div className="flex items-center gap-[9px] cursor-pointer" data-test-id="template-checkbox">
                    <input type="checkbox" className="accent-[#0d978b] size-[13px]" />
                    <span className="text-[14px]/[16px] text-[#4b4b4b]">Set as Template</span>
                </div>
            </div>
            <div className='mt-[33px] border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] min-h-[700px] h-auto flex xl:flex-row flex-col items-stretch w-full'>
                {loading ? <div className="flex w-full items-center justify-center h-full"><LoadingSpinner content="Loading..." /></div> : (
                    <>
                        {state === 'main' && pipeline.length === 0 && (
                            <div className="flex w-full flex-col items-center justify-center gap-[16px] px-4" data-test-id="empty-state-buttons">
                                <Button variant="outline" className="text-[#053834] min-w-[160px] h-[40px] w-full sm:w-auto" onClick={() => { setState('template') }} data-test-id="import-template-btn" disabled={disabled}>Import Teamplate</Button>
                                <Button variant="outline" className="text-[#053834] min-w-[160px] h-[40px] w-full sm:w-auto" onClick={startFromScratch} data-test-id="start-from-scratch-btn" disabled={disabled}>Start From Scratch</Button>
                            </div>
                        )}
                        {state === 'template' && pipeline.length === 0 && (
                            <div className="flex w-full flex-col items-center justify-center gap-[16px] px-[20px]" data-test-id="import-template-panel">
                                <div className="sm:w-auto w-full">
                                    <div className="flex items-center gap-[12px] mb-[26px]">
                                        <button className="w-[24px] h-[24px] rounded-full flex items-center justify-center cursor-pointer bg-white border border-[#e9e9e9]" onClick={() => setState('main')} data-test-id="back-to-main-btn" disabled={disabled}>
                                            <ArrowLeft className="size-[16px]" />
                                        </button>
                                        <p className="text-[14px]/[20px] text-[#053834] font-medium">Import Template</p>
                                    </div>
                                    <Select disabled={disabled}>
                                        <SelectTrigger className="h-[48px] sm:w-[360px] w-full" data-test-id="template-select-trigger" disabled={disabled}>
                                            <SelectValue placeholder="Select a template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="template1">Template 1</SelectItem>
                                            <SelectItem value="template2">Template 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        <Dialog open={addState} onOpenChange={setAddState}>
                            <DialogContent >
                                <p className="text-[14px]/[22px] text-black">Add Stage</p>
                                <div className="mt-[15px]">
                                    <p className="text-[12px]/[16px] text-[#1c1c1c]">Stage Name</p>
                                    <EditableSelect
                                        className="mt-[5px]"
                                        value={stageName}
                                        onValueChange={(value) => {
                                            setStageName(value);
                                        }}
                                        options={[
                                            { value: "Application Review", label: "Application Review" },
                                            { value: "Phone Screening", label: "Phone Screening" },
                                            { value: "Technical Interview", label: "Technical Interview" },
                                            { value: "Final Interview", label: "Final Interview" },
                                            { value: "Reference Check", label: "Reference Check" },
                                            { value: "Offer", label: "Offer" },
                                            { value: "Hired", label: "Hired" },
                                        ]}
                                        placeholder="Enter stage name"
                                        searchPlaceholder="Search stage names..."
                                        allowCustom={true}
                                        customPlaceholder="Enter custom stage name..."
                                        dataTestId="stage-name-editable-select"
                                    />

                                    <p className="text-[12px]/[16px] text-[#1c1c1c] mt-[18px]">Type</p>
                                    <Select
                                        value={selectedType?.toString() || ''}
                                        onValueChange={(value) => {
                                            setSelectedType(Number(value));
                                        }}
                                    >
                                        <SelectTrigger className="mt-[5px]" data-test-id="stage-type-select-trigger">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {types.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[12px]/[16px] text-[#1c1c1c] mt-[18px]">Sub Type</p>
                                    <Select
                                        value={selectedSubType?.toString() || ''}
                                        onValueChange={(value) => {
                                            setSelectedSubType(Number(value));
                                        }}
                                        disabled={loadingSubTypes}
                                    >
                                        <SelectTrigger className="mt-[5px]" data-test-id="stage-test-select-trigger">
                                            <SelectValue placeholder="Select a sub type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subTypes.map((subType) => (
                                                <SelectItem key={subType.id} value={subType.id.toString()}>{subType.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button className="mt-[18px] w-full" data-test-id="add-stage-btn" onClick={addStage} disabled={loading || loadingSubTypes}>{loading && <LoaderIcon className="size-[16px] animate-spin" />}Add Stage</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        {pipeline.length > 0 && (
                            <>
                                <div className="flex-1 p-[22px] lg:order-2 order-1" data-test-id="pipeline-stages-list">
                                    <button
                                        className="cursor-pointer text-[#787878] text-[14px]/[20px]"
                                        data-test-id="clear-pipeline-btn"
                                        disabled={disabled}
                                        onClick={() => setPipeLine([])}
                                    >
                                        Clear
                                    </button>
                                    <div className="flex justify-center mt-[20px]">
                                        <div>
                                            {pipeline.map((item, index) => (
                                                <div
                                                    key={index}
                                                    data-test-id={`pipeline-stage-${index}`}
                                                    data-drag-index={index}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, index)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleDrop(e, index)}
                                                    onDragEnd={handleDragEnd}
                                                    className="cursor-move"
                                                >
                                                    <div className="flex items-center justify-center gap-[12px]">
                                                        <GripVertical className="size-[20px] text-[#1c1c1c] cursor-grab active:cursor-grabbing" />
                                                        <div
                                                            className={`bg-white border rounded-[8px] p-[16px] flex justify-between items-center sm:w-[343px] w-[170px] cursor-pointer ${selectedStep === index ? 'border-[#0D978B]' : 'border-[#e9e9e9]'}`}
                                                            onClick={() => setSelectedStep(index)}
                                                            data-test-id={`pipeline-stage-card-${index}`}
                                                        >
                                                            <div className="flex flex-col gap-[3px]">
                                                                <p className="text-[14px]/[22px] text-black">{item.title}</p>
                                                                <p className="text-[12px]/[18px] text-[#00d47d]">{item.type}</p>
                                                            </div>
                                                            <div className="w-[28px] h-[28px] rounded-full bg-[#d6eeec] text-[#0d978b] flex justify-center items-center text-[12px]">
                                                                {index < 10 ? "0" + (index + 1) : index + 1}
                                                            </div>
                                                        </div>
                                                        <button onClick={() => removeStep(item.id)} className="cursor-pointer text-[#1c1c1c] hover:text-[#0d978b]" data-test-id={`remove-stage-btn-${index}`}>

                                                            {loading ? <LoaderIcon className="size-[16px] animate-spin" /> : <Trash2 className="size-[14px]" />}
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center mt-[-8px]">
                                                        <div
                                                            className="w-[16px] h-[16px] rounded-full bg-[#4b4b4b] flex justify-center items-center cursor-pointer hover:bg-[#0d978b] hover:text-[#fff]"
                                                            onClick={() => setAddState(true)}
                                                            data-test-id={`add-stage-btn-after-${index}`}
                                                        >
                                                            <Plus className="size-[12px] text-[#fff]" />
                                                        </div>
                                                        {index < pipeline.length - 1 && <div className="w-[1px] h-[56px] bg-[#8f8f8f]" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {selectedStep !== null && (
                                    <div className="xl:w-[273px] w-full lg:order-2 order-1 bg-white border-l border-[#e9e9e9] py-[27px] px-[20px]" data-test-id="stage-details-panel">
                                        <p className="text-[14px]/[22px] text-black">Stage Details</p>
                                        <div className="mt-[26px]">
                                            <div>
                                                <p className="text-[12px]/[16px] text-[#1c1c1c]">Stage Name</p>
                                                <EditableSelect
                                                    value={pipeline[selectedStep].title}
                                                    onValueChange={(value) => {
                                                        const newPipeline = [...pipeline];
                                                        newPipeline[selectedStep].title = value;
                                                        setPipeLine(newPipeline);
                                                    }}
                                                    options={[
                                                        { value: "Application Review", label: "Application Review" },
                                                        { value: "Phone Screening", label: "Phone Screening" },
                                                        { value: "Technical Interview", label: "Technical Interview" },
                                                        { value: "Final Interview", label: "Final Interview" },
                                                        { value: "Reference Check", label: "Reference Check" },
                                                        { value: "Offer", label: "Offer" },
                                                        { value: "Hired", label: "Hired" },
                                                    ]}
                                                    placeholder="Enter stage name"
                                                    searchPlaceholder="Search stage names..."
                                                    allowCustom={true}
                                                    customPlaceholder="Enter custom stage name..."
                                                    dataTestId="stage-name-editable-select"
                                                />

                                                <p className="text-[12px]/[16px] text-[#1c1c1c] mt-[18px]">Type</p>
                                                <Select
                                                    value={selectedType?.toString() || ''}
                                                    onValueChange={(value) => {
                                                        setSelectedType(Number(value));
                                                    }}
                                                >
                                                    <SelectTrigger data-test-id="stage-type-select-trigger">
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {types.map((type) => (
                                                            <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <p className="text-[12px]/[16px] text-[#1c1c1c] mt-[18px]">Sub Type</p>
                                                <Select
                                                    value={selectedSubType?.toString() || ''}
                                                    onValueChange={(value) => {
                                                        setSelectedSubType(Number(value));
                                                    }}
                                                >
                                                    <SelectTrigger data-test-id="stage-test-select-trigger">
                                                        <SelectValue placeholder="Select a sub type" />
                                                    </SelectTrigger>
                                                    <SelectContent>

                                                        {subTypes.map((subType) => (
                                                            <SelectItem key={subType.id} value={subType.id.toString()}>{subType.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

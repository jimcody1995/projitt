'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { customToast } from '@/components/common/toastr';
import { Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Competency {
    id: number;
    name: string;
    selected: boolean;
}

interface CompetenciesProps {
    onFormDataChange?: (data: any) => void;
    onValidation?: (validationFn: () => boolean) => void;
}

export default function Competencies({ onFormDataChange, onValidation }: CompetenciesProps) {
    const [competencies, setCompetencies] = useState<Competency[]>([{
        id: 1,
        name: 'Competency 1',
        selected: false
    }, {
        id: 2,
        name: 'Competency 2',
        selected: false
    }]);
    const [newCompetencyName, setNewCompetencyName] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCompetency, setSelectedCompetency] = useState<number | null>(null);

    // Fetch competencies on component mount
    useEffect(() => {
        // const fetchCompetencies = async () => {
        //     setIsLoading(true);
        //     setError(null);
        //     try {
        //         const response = await getCompetencies();
        //         if (response.status) {
        //             const competenciesWithSelection = response.data.map((comp: any) => ({
        //                 id: comp.id,
        //                 name: comp.name,
        //                 selected: comp.selected || false
        //             }));
        //             setCompetencies(competenciesWithSelection);
        //         } else {
        //             setError(response.message || 'Failed to fetch competencies');
        //         }
        //     } catch (error: any) {
        //         setError(error.response?.data?.message || 'Failed to fetch competencies. Please try again.');
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };

        // fetchCompetencies();
    }, []);

    const handleCompetencyToggle = (id: number) => {
        setSelectedCompetency(id);

    };

    const handleAddNew = async () => {
        // if (!newCompetencyName.trim()) {
        //     customToast("Error", "Please enter a competency name", "error");
        //     return;
        // }

        // try {
        //     const response = await addCompetency({
        //         name: newCompetencyName.trim()
        //     });

        //     if (response.status) {
        //         const newCompetency: Competency = {
        //             id: response.data.id,
        //             name: newCompetencyName.trim(),
        //             selected: false
        //         };

        //         setCompetencies(prev => [...prev, newCompetency]);
        //         setNewCompetencyName('');
        //         setIsAddingNew(false);
        //         customToast("Success", "Competency added successfully", "success");
        //     } else {
        //         customToast("Error", response.message || "Failed to add competency", "error");
        //     }
        // } catch (error: any) {
        //     customToast("Error", error.response?.data?.message || "Failed to add competency. Please try again.", "error");
        // }
    };

    // Update form data when selections change
    useEffect(() => {
        const selectedCompetencies = competencies.filter(comp => comp.selected);
        const formData = {
            competency_ids: selectedCompetencies.map(comp => comp.id)
        };
        onFormDataChange?.(formData);
    }, [competencies, onFormDataChange]);

    // Set up validation function
    useEffect(() => {
        const validateForm = () => {
            return competencies.some(comp => comp.selected);
        };
        onValidation?.(validateForm);
    }, [competencies, onValidation]);

    return (
        <div className="w-full">
            <div className="mb-[15px]">
                <p className="text-[14px]/[16px]  text-[#1C1C1C]">Select Competencies</p>
            </div>
            <div className="flex flex-wrap  gap-[20px]">
                {competencies.map((competency) => (
                    <div
                        key={competency.id}
                        className={`relative p-[18px] w-[170px] h-[92px] border rounded-[12px] cursor-pointer transition-all duration-200 hover:shadow-md ${selectedCompetency === competency.id
                            ? 'border-[#0d978b] '
                            : 'border-[#E9E9E9] bg-white hover:border-[#0d978b]'
                            }`}
                        onClick={() => handleCompetencyToggle(competency.id)}
                    >
                        <div className="flex flex-col items-start text-center gap-[8px]">
                            <RadioGroup value={selectedCompetency?.toString() || ''} onValueChange={() => handleCompetencyToggle(competency.id)}>
                                <RadioGroupItem value={competency.id.toString()} />
                            </RadioGroup>
                            <span className={`text-[14px] font-medium ${selectedCompetency === competency.id
                                ? 'text-[#0d978b]'
                                : 'text-[#353535]'
                                }`}>
                                {competency.name}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Add New Competency Card */}
                {isAddingNew ? (
                    <div className="relative p-[20px] border border-[#E9E9E9] rounded-[12px] bg-white">
                        <div className="flex flex-col items-center text-center">

                            <Input
                                value={newCompetencyName}
                                onChange={(e) => setNewCompetencyName(e.target.value)}
                                placeholder="Add Title"
                                className="text-center text-[14px] font-medium border-none shadow-none p-0 h-auto"
                                autoFocus
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddNew();
                                    }
                                }}
                            />
                            <div className="flex gap-[8px] mt-[12px]">
                                <Button
                                    size="sm"
                                    onClick={handleAddNew}
                                    className="h-[24px] px-[12px] text-[12px]"
                                >
                                    Add
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setIsAddingNew(false);
                                        setNewCompetencyName('');
                                    }}
                                    className="h-[24px] px-[12px] text-[12px]"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <Button
                            onClick={() => setIsAddingNew(true)}
                            className="h-[92px] w-full bg-[#0d978b] min-w-[170px] hover:bg-[#0a7a6f] text-white flex flex-col items-center justify-center gap-[8px] rounded-[12px]"
                        >
                            <Plus className="w-[24px] h-[24px]" />
                            <span className="text-[14px] font-medium">Add New</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
} 1
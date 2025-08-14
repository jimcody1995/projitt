'use client'
import { changeJobStatus, changeJobStatusMultiple, deleteJob } from "@/api/job-posting";
import { customToast } from "@/components/common/toastr";
import { Ban, Loader2, Trash, Upload } from "lucide-react";
import { JSX } from "react";
import { useState } from "react";

/**
 * SelectedDialog component displays actions and selection info when rows are selected.
 * Shows number of selected items, total count, and buttons for Select All, Close, Delete, and Export CSV.
 * 
 * @param {Object} props
 * @param {string[]} props.selectedRows - Array of selected row IDs.
 * @param {number} props.totalCount - Total number of rows available.
 * @returns JSX.Element - The UI for the selection dialog with action buttons.
 */
export const SelectedDialog = ({
    selectedRows,
    totalCount,
    setSelectedRows,
    allData,
    setRowSelection,
    getData
}: {
    selectedRows: string[];
    totalCount: number;
    setSelectedRows: (rows: string[]) => void;
    allData: any[];
    setRowSelection: (selection: any) => void;
    getData: () => void;
}): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const handleCloseJobs = async () => {
        setLoading(true);
        try {
            await changeJobStatusMultiple(selectedRows, "closed");
            customToast("Success", "Jobs closed successfully", "success");
            setSelectedRows([]);
            setRowSelection({});
            getData();
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    const handleDeleteJobs = async () => {
        setLoading(true);
        try {
            await deleteJob(selectedRows);
            customToast("Success", "Jobs deleted successfully", "success");
            setSelectedRows([]);
            setRowSelection({});
            getData();
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    const downloadCSV = () => {
        const csvRows = [];
        console.log(allData);
        console.log(selectedRows);

        const data = allData.filter((item: any) => selectedRows.includes(item.id.toString()));
        if (data.length === 0) {
            customToast("Error", "No data to export", "error");
            return;
        }

        // Define the headers we want to export with readable names
        const headers = [
            { key: 'title', label: 'Job Title' },
            { key: 'description', label: 'Description' },
            { key: 'no_of_job_opening', label: 'Number of Openings' },
            { key: 'status', label: 'Status' },
            { key: 'department', label: 'Department' },
            { key: 'employment_type', label: 'Employment Type' },
            { key: 'location_type', label: 'Location Type' },
            { key: 'country', label: 'Country' },
            { key: 'state', label: 'State' },
            { key: 'salary_from', label: 'Salary From' },
            { key: 'salary_to', label: 'Salary To' },
            { key: 'deadline', label: 'Deadline' },
            { key: 'is_set_default_template', label: 'Default Template' },
            { key: 'skills', label: 'Skills' },
            { key: 'questions', label: 'Questions' }
        ];

        // Add header row
        csvRows.push(headers.map(h => h.label).join(","));

        // Loop over rows
        for (const row of data) {
            const values = headers.map(header => {
                let value = row[header.key];

                // Handle nested objects to extract names
                if (header.key === 'department' && value && typeof value === 'object') {
                    value = value.name || '';
                } else if (header.key === 'employment_type' && value && typeof value === 'object') {
                    value = value.name || '';
                } else if (header.key === 'location_type' && value && typeof value === 'object') {
                    value = value.name || '';
                } else if (header.key === 'country' && value && typeof value === 'object') {
                    value = value.name || '';
                } else if (header.key === 'skills' && Array.isArray(value)) {
                    value = value.map((skill: { name?: string }) => skill.name || skill).join(', ');
                } else if (header.key === 'questions' && Array.isArray(value)) {
                    value = value.map((question: {
                        question_name?: string;
                        answer_type?: string;
                        is_required?: boolean;
                        correct_answer?: string;
                        tags?: string[] | string;
                    }) => {
                        const questionName = question.question_name || '';
                        const answerType = question.answer_type || '';
                        const isRequired = question.is_required ? 'Required' : 'Optional';
                        const correctAnswer = question.correct_answer || 'N/A';
                        const tags = Array.isArray(question.tags) ? question.tags.join(', ') : question.tags || 'N/A';

                        return `${questionName} (${answerType}, ${isRequired}, Answer: ${correctAnswer}, Tags: ${tags})`;
                    }).join('; ');
                } else if (header.key === 'media' && Array.isArray(value)) {
                    value = value.map((media: { name?: string }) => media.name || media).join(', ');
                } else if (header.key === 'deadline' && value) {
                    // Format date to be more readable
                    value = new Date(value).toLocaleDateString();
                } else if (header.key === 'is_set_default_template') {
                    value = value ? 'Yes' : 'No';
                }

                // Handle null/undefined values
                if (value === null || value === undefined) {
                    value = '';
                }

                return `"${String(value).replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(","));
        }

        // Create CSV string
        const csvString = csvRows.join("\n");

        // Create a Blob and trigger download
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "job-postings.csv");
        a.click();
    };
    return (
        <div
            className="w-full flex justify-center items-center absolute sm:bottom-[45px] bottom-[160px] z-[1000] px-[40px]"
            id="selected-dialog-container"
            data-testid="selected-dialog-container"
        >
            <div
                className="bg-[#053834] px-[20px] py-[12px] sm:w-[670px] w-full rounded-[12px] flex sm:flex-row flex-col sm:justify-between items-center"
                id="selected-dialog-content"
                data-testid="selected-dialog-content"
            >
                <div className="flex items-center" id="selection-info" data-testid="selection-info">
                    <div
                        className="pr-[16px] border-r text-[15px]/[20px] border-[#626262] text-[#d2d2d2] py-[4px]"
                        id="selection-count"
                        data-testid="selection-count"
                    >
                        {selectedRows.length} of <span className="text-[#fff]" id="total-count" data-testid="total-count">{totalCount}</span> selected
                    </div>
                    <button
                        className="text-[15px]/[20px] pl-[16px] text-white cursor-pointer"
                        id="select-all-button"
                        data-testid="select-all-button"
                        type="button"
                        onClick={() => {
                            // Create a row selection object where all rows are selected
                            const allSelected = allData.reduce((acc, item) => {
                                acc[item.id] = true;
                                return acc;
                            }, {} as Record<string, boolean>);

                            // Update both the table's row selection and the selected rows
                            setRowSelection(allSelected);
                            setSelectedRows(allData.map((item: any) => item.id));
                        }}
                    >
                        Select all
                    </button>
                </div>
                <div className="flex items-center" id="action-buttons" data-testid="action-buttons">
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px]"
                        id="close-button"
                        data-testid="close-button"
                        type="button"
                        onClick={handleCloseJobs}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="size-[16px] animate-spin" /> : <Ban className="size-[16px]" />}
                        Close
                    </button>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px]"
                        id="delete-button"
                        data-testid="delete-button"
                        type="button"
                        onClick={handleDeleteJobs}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="size-[16px] animate-spin" /> : <Trash className="size-[16px]" />}
                        Delete
                    </button>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] px-[16px] flex items-center gap-[6px]"
                        id="export-csv-button"
                        data-testid="export-csv-button"
                        type="button"
                        onClick={downloadCSV}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="size-[16px] animate-spin" /> : <Upload className="size-[16px]" />}
                        Export CSV
                    </button>
                </div>
            </div>
        </div>
    );
};

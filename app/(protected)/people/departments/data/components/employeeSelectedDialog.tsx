'use client'
import { customToast } from "@/components/common/toastr";
import { Download, Loader2, Trash2, Edit, X, UserPlus, Mail } from "lucide-react";
import { JSX, useState } from "react";

interface EmployeeData {
    id: number;
    name: string;
    department: string;
    position: string;
    location: string;
    employmentType: 'Full Time' | 'Part Time' | 'Freelance' | 'Intern';
    avatar?: string;
    initials?: string;
}

/**
 * EmployeeSelectedDialog component displays actions and selection info when employee rows are selected.
 * Shows number of selected items, total count, and buttons for Select All, Clear, Edit, Delete, and Export CSV.
 * 
 * @param {Object} props
 * @param {string[]} props.selectedRows - Array of selected row IDs.
 * @param {number} props.totalCount - Total number of rows available.
 * @param {EmployeeData[]} props.allData - All employee data.
 * @param {Function} props.setSelectedRows - Function to update selected rows.
 * @param {Function} props.setRowSelection - Function to update row selection.
 * @param {Function} props.getData - Function to refresh data.
 * @returns JSX.Element - The UI for the selection dialog with action buttons.
 */
export const EmployeeSelectedDialog = ({
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
    allData: EmployeeData[];
    setRowSelection: (selection: Record<string, boolean>) => void;
    getData: () => void;
}): JSX.Element => {
    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [messageLoading, setMessageLoading] = useState(false);

    // Check if any operation is in progress
    const isAnyLoading = editLoading || deleteLoading || exportLoading || messageLoading;

    const handleEditEmployees = async () => {
        setEditLoading(true);
        try {
            // TODO: Implement edit employees API call
            console.log('Editing employees:', selectedRows);
            customToast("Success", "Employees opened for editing", "success");
            setSelectedRows([]);
            setRowSelection({});
            getData();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            customToast("Error", errorMessage, "error");
        } finally {
            setEditLoading(false);
        }
    };

    const handleDeleteEmployees = async () => {
        setDeleteLoading(true);
        try {
            console.log('Deleting employees:', selectedRows);
            customToast("Success", "Employees deleted successfully", "success");
            setSelectedRows([]);
            setRowSelection({});
            getData();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            customToast("Error", errorMessage, "error");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleSendMessage = async () => {
        setMessageLoading(true);
        try {
            console.log('Sending message to employees:', selectedRows);
            customToast("Success", "Message sent successfully", "success");
            setSelectedRows([]);
            setRowSelection({});
            getData();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            customToast("Error", errorMessage, "error");
        } finally {
            setMessageLoading(false);
        }
    };

    const downloadCSV = async () => {
        setExportLoading(true);
        try {
            const csvRows = [];
            console.log(allData);
            console.log(selectedRows);

            const data = allData.filter((item: EmployeeData) => selectedRows.includes(item.id.toString()));
            if (data.length === 0) {
                customToast("Error", "No data to export", "error");
                return;
            }

            // Define the headers we want to export with readable names
            const headers = [
                { key: 'id', label: 'Employee ID' },
                { key: 'name', label: 'Employee Name' },
                { key: 'department', label: 'Department' },
                { key: 'position', label: 'Position' },
                { key: 'location', label: 'Location' },
                { key: 'employmentType', label: 'Employment Type' }
            ];

            // Add header row
            csvRows.push(headers.map(h => h.label).join(","));

            // Loop over rows
            for (const row of data) {
                const values = headers.map(header => {
                    let value = (row as unknown as Record<string, unknown>)[header.key];

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

            // Generate current datetime for filename
            const now = new Date();
            const dateTimeString = now.toISOString()
                .replace(/[:.]/g, '-')
                .replace('T', '_')
                .slice(0, 19); // Remove milliseconds and timezone

            const a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", `employees-${dateTimeString}.csv`);
            a.click();

            customToast("Success", "CSV exported successfully", "success");
        } catch {
            customToast("Error", "Failed to export CSV", "error");
        } finally {
            setExportLoading(false);
        }
    };

    return (
        <div
            className="w-full flex justify-center items-center fixed sm:bottom-[45px] bottom-[160px] z-[1000] px-[40px] left-0 right-0"
            id="employee-selected-dialog-container"
            data-testid="employee-selected-dialog-container"
        >
            <div
                className="bg-[#053834] px-[20px] py-[12px] sm:w-[670px] w-full rounded-[12px] flex sm:flex-row flex-col sm:justify-between items-center shadow-lg"
                id="employee-selected-dialog-content"
                data-testid="employee-selected-dialog-content"
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
                        className="text-[15px]/[20px] pl-[16px] text-white cursor-pointer hover:text-[#d2d2d2] transition-colors"
                        id="select-all-button"
                        data-testid="select-all-button"
                        type="button"
                        onClick={() => {
                            // Create a row selection object where all rows are selected
                            const allSelected = allData.reduce((acc, item) => {
                                acc[String(item.id)] = true;
                                return acc;
                            }, {} as Record<string, boolean>);

                            // Update both the table's row selection and the selected rows
                            setRowSelection(allSelected);
                            setSelectedRows(allData.map((item: EmployeeData) => String(item.id)));
                        }}
                    >
                        Select all
                    </button>
                    <button
                        className="text-[15px]/[20px] pl-[16px] text-white cursor-pointer hover:text-[#d2d2d2] transition-colors"
                        id="clear-selection-button"
                        data-testid="clear-selection-button"
                        type="button"
                        onClick={() => {
                            setSelectedRows([]);
                            setRowSelection({});
                        }}
                    >
                        Clear
                    </button>
                </div>
                <div className="flex items-center" id="action-buttons" data-testid="action-buttons">
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded"
                        id="edit-button"
                        data-testid="edit-button"
                        type="button"
                        onClick={handleEditEmployees}
                        disabled={isAnyLoading}
                    >
                        {editLoading ? <Loader2 className="size-[16px] animate-spin" /> : <Edit className="size-[16px]" />}
                        Edit
                    </button>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded"
                        id="message-button"
                        data-testid="message-button"
                        type="button"
                        onClick={handleSendMessage}
                        disabled={isAnyLoading}
                    >
                        {messageLoading ? <Loader2 className="size-[16px] animate-spin" /> : <Mail className="size-[16px]" />}
                        Message
                    </button>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded"
                        id="delete-button"
                        data-testid="delete-button"
                        type="button"
                        onClick={handleDeleteEmployees}
                        disabled={isAnyLoading}
                    >
                        {deleteLoading ? <Loader2 className="size-[16px] animate-spin" /> : <Trash2 className="size-[16px]" />}
                        Delete
                    </button>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded"
                        id="export-csv-button"
                        data-testid="export-csv-button"
                        type="button"
                        onClick={downloadCSV}
                        disabled={isAnyLoading}
                    >
                        {exportLoading ? <Loader2 className="size-[16px] animate-spin" /> : <Download className="size-[16px]" />}
                        Export CSV
                    </button>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded ml-2"
                        id="close-dialog-button"
                        data-testid="close-dialog-button"
                        type="button"
                        onClick={() => {
                            setSelectedRows([]);
                            setRowSelection({});
                        }}
                    >
                        <X className="size-[16px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

'use client'
import { customToast } from "@/components/common/toastr";
import { Download, Loader2, Trash2, GitMerge } from "lucide-react";
import { JSX, useState } from "react";
import { MergeDepartmentDialog } from "./departmentDialogs";

interface DepartmentData {
    id: number;
    name: string;
    employeeCount: number;
}

/**
 * DepartmentsSelectedDialog component displays actions and selection info when department rows are selected.
 * Shows number of selected items, total count, and buttons for Select All, Clear, Merge, Delete, and Export CSV.
 * 
 * @param {Object} props
 * @param {string[]} props.selectedRows - Array of selected row IDs.
 * @param {number} props.totalCount - Total number of rows available.
 * @param {DepartmentData[]} props.allData - All department data.
 * @param {Function} props.setSelectedRows - Function to update selected rows.
 * @param {Function} props.setRowSelection - Function to update row selection.
 * @param {Function} props.getData - Function to refresh data.
 * @returns JSX.Element - The UI for the selection dialog with action buttons.
 */
export const DepartmentsSelectedDialog = ({
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
    allData: DepartmentData[];
    setRowSelection: (selection: Record<string, boolean>) => void;
    getData: () => void;
}): JSX.Element => {
    const [mergeLoading, setMergeLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);

    // Check if any operation is in progress
    const isAnyLoading = mergeLoading || deleteLoading || exportLoading;

    const handleMergeDepartments = async (data: { name: string }) => {
        setMergeLoading(true);
        try {
            // TODO: Implement merge departments API call
            console.log('Merging departments to:', data.name);
            customToast("Success", "Departments merged successfully", "success");
            setSelectedRows([]);
            setRowSelection({});
            getData();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            customToast("Error", errorMessage, "error");
        } finally {
            setMergeLoading(false);
        }
    };

    const handleDeleteDepartments = async () => {
        setDeleteLoading(true);
        try {
            // TODO: Implement delete departments API call
            console.log('Deleting departments:', selectedRows);
            customToast("Success", "Departments deleted successfully", "success");
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

    const downloadCSV = async () => {
        setExportLoading(true);
        try {
            const csvRows = [];
            console.log(allData);
            console.log(selectedRows);

            const data = allData.filter((item: DepartmentData) => selectedRows.includes(item.id.toString()));
            if (data.length === 0) {
                customToast("Error", "No data to export", "error");
                return;
            }

            // Define the headers we want to export with readable names
            const headers = [
                { key: 'id', label: 'Department ID' },
                { key: 'name', label: 'Department Name' },
                { key: 'employeeCount', label: 'Number of Employees' }
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
            a.setAttribute("download", `departments-${dateTimeString}.csv`);
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
            className="w-full flex justify-center items-center absolute sm:bottom-[45px] bottom-[160px] z-[1000] px-[40px] left-0 right-0"
            id="departments-selected-dialog-container"
            data-testid="departments-selected-dialog-container"
        >
            <div
                className="bg-[#053834] px-[20px] py-[12px] sm:w-[670px] w-full rounded-[12px] flex sm:flex-row flex-col sm:justify-between items-center shadow-lg"
                id="departments-selected-dialog-content"
                data-testid="departments-selected-dialog-content"
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
                            setSelectedRows(allData.map((item: DepartmentData) => String(item.id)));
                        }}
                    >
                        Select all
                    </button>

                </div>
                <div className="flex items-center" id="action-buttons" data-testid="action-buttons">
                    <MergeDepartmentDialog
                        mergeDepartments={allData.filter(dept => selectedRows.includes(dept.id.toString())).map(dept => dept.name)}
                        onConfirm={handleMergeDepartments}
                    >
                        <button
                            className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded"
                            id="merge-button"
                            data-testid="merge-button"
                            type="button"
                            disabled={isAnyLoading}
                        >
                            {mergeLoading ? <Loader2 className="size-[16px] animate-spin" /> : <GitMerge className="size-[16px]" />}
                            Merge
                        </button>
                    </MergeDepartmentDialog>
                    <button
                        className="cursor-pointer text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] hover:bg-[#0a2d2a] transition-colors rounded"
                        id="delete-button"
                        data-testid="delete-button"
                        type="button"
                        onClick={handleDeleteDepartments}
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

                </div>
            </div>
        </div>
    );
};

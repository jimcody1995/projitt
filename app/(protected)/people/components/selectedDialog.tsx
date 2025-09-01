'use client'
import { Ban, Loader2, MessageSquare, Star, Upload, UsersIcon, UserRound, UserRoundCogIcon } from "lucide-react";
import { JSX, useState } from "react";
import { customToast } from "@/components/common/toastr";
import { rejectApplication } from "@/api/applications";

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
    setIsMessage,
    setIsAssignManager,
    setIsAddToTeam,
}: {
    selectedRows: string[];
    totalCount: number;
    setSelectedRows: (rows: string[]) => void;
    allData: any[];
    setRowSelection: (selection: any) => void;
    setIsMessage: (value: boolean) => void;
    setIsAssignManager: (value: boolean) => void;
    setIsAddToTeam: (value: boolean) => void;
}): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const handleRejectJobs = async () => {
        setLoading(true);
        try {
            await rejectApplication(selectedRows);
            customToast("Success", "Jobs deleted successfully", "success");
            setSelectedRows([]);
            setRowSelection({});
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    const downloadCSV = () => {
        const csvRows = [];

        const data = allData.filter((item: any) => selectedRows.includes(item.id.toString()));
        if (data.length === 0) {
            customToast("Error", "No data to export", "error");
            return;
        }
        // Get headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(","));

        // Loop over rows
        for (const row of data) {
            const values = headers.map(header => `"${row[header]}"`);
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
    };
    return (
        <div
            className="w-full flex justify-center items-center absolute sm:bottom-[45px] bottom-[160px] z-[40] px-[40px]"
            id="selected-dialog-container"
            data-testid="selected-dialog-container"
        >
            <div
                className="bg-[#053834] px-[20px] py-[12px] sm:w-[878px] w-full rounded-[12px] flex sm:flex-row flex-col sm:justify-between items-center"
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
                        className="text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] cursor-pointer"
                        id="close-button"
                        data-testid="close-button"
                        type="button"
                        onClick={() => setIsAddToTeam(true)}
                    >
                        <UsersIcon className="size-[16px]" />
                        Add to Team
                    </button>
                    <button
                        className="text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] cursor-pointer"
                        id="close-button"
                        data-testid="close-button"
                        type="button"
                        onClick={() => setIsMessage(true)}
                    >
                        <MessageSquare className="size-[16px]" />
                        Send Message
                    </button>
                    <button
                        className="text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px] cursor-pointer"
                        id="delete-button"
                        data-testid="delete-button"
                        type="button"
                        onClick={() => setIsAssignManager(true)}
                    >
                        <UserRoundCogIcon className="size-[16px]" />
                        Assign Manager
                    </button>
                    <button
                        className="text-[15px]/[20px] pl-[16px] text-white py-[4px] px-[16px] flex items-center gap-[6px] cursor-pointer"
                        id="export-csv-button"
                        data-testid="export-csv-button"
                        type="button"
                        onClick={downloadCSV}
                    >
                        <Upload className="size-[16px]" />
                        Export CSV
                    </button>
                </div>
            </div>

        </div>
    );
};

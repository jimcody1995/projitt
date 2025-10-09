import { InfoIcon } from "lucide-react";

export default function Attendence() {
    const attendanceData = [
        {
            date: 'Mar 25',
            clockIn: 'Leave',
            clockOut: 'Leave',
            totalHours: 'Leave',
            status: 'Leave'
        },
        {
            date: 'Mar 24',
            clockIn: '-',
            clockOut: '-',
            totalHours: '0h 0m',
            status: 'Missing Entry',
            statusType: 'warning'
        },
        {
            date: 'Mar 23',
            clockIn: '08:5AM',
            clockOut: '08:5AM',
            totalHours: '23h 59m',
            totalHoursType: 'warning',
            status: 'Missing Entry',
            statusType: 'warning'
        },
        {
            date: 'Mar 22',
            clockIn: '08:5AM',
            clockOut: '08:5AM',
            totalHours: '7h 35m',
            status: 'Pending Approval'
        },
        {
            date: 'Mar 21',
            clockIn: '08:5AM',
            clockOut: '08:5AM',
            totalHours: '7h 35m',
            status: 'Pending Approval'
        }
    ];

    const attendanceMetrics = {
        present: { count: '105/120', label: 'Present' },
        absent: { count: '2', label: 'Absent' },
        onLeave: { count: '3', label: 'On Leave' },
        lateArrivals: { count: '12', label: 'Late Arrivals' },
        overtimes: { count: '5', label: 'Overtimes' }
    };
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
            <div className="flex items-center gap-6  flex-wrap pt-[12px] pb-[17px] pl-[20px] w-full">
                <div className="flex items-center gap-1 ">
                    <span className="text-[#0D978B] text-[14px]/[22px] font-medium">{attendanceMetrics.present.count}</span>
                    <span className="text-[#8F8F8F] text-[14px]/[22px]">{attendanceMetrics.present.label}</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                    <span className="text-[#0D978B] text-[14px]/[22px] font-medium">{attendanceMetrics.absent.count}</span>
                    <span className="text-[#8F8F8F] text-[14px]/[22px]">{attendanceMetrics.absent.label}</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                    <span className="text-[#0D978B] text-[14px]/[22px] font-medium">{attendanceMetrics.onLeave.count}</span>
                    <span className="text-[#8F8F8F] text-[14px]/[22px]">{attendanceMetrics.onLeave.label}</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                    <span className="text-[#0D978B] text-[14px]/[22px] font-medium">{attendanceMetrics.lateArrivals.count}</span>
                    <span className="text-[#8F8F8F] text-[14px]/[22px]">{attendanceMetrics.lateArrivals.label}</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                    <span className="text-[#0D978B] text-[14px]/[22px] font-medium">{attendanceMetrics.overtimes.count}</span>
                    <span className="text-[#8F8F8F] text-[14px]/[22px]">{attendanceMetrics.overtimes.label}</span>
                </div>
            </div>

            <div >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#EEF3F2]">
                            <tr>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8F8F8F] uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8F8F8F] uppercase tracking-wider">
                                    Clock In
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8F8F8F] uppercase tracking-wider">
                                    Clock Out
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8F8F8F] uppercase tracking-wider">
                                    Total Hours
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8F8F8F] uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attendanceData.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-[#4b4b4b]">
                                        {record.clockIn}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-gray-900">
                                        {record.clockOut}
                                    </td>
                                    <td className={`px-[16px] py-[11px] whitespace-nowrap text-sm ${record.totalHoursType === 'warning' ? 'text-orange-600' : 'text-gray-900'
                                        }`}>
                                        {record.totalHours}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">

                                            <span className={`${record.statusType === 'warning'
                                                ? 'text-orange-600'
                                                : record.status === 'Leave'
                                                    ? 'text-[#8F8F8F]'
                                                    : 'text-gray-900'
                                                }`}>
                                                {record.status}
                                            </span>
                                            {record.statusType === 'warning' && (
                                                <InfoIcon className="h-4 w-4 fill-orange-500 text-white" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
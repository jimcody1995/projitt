'use client'
import OpenJobs from './components/open-jobs'
import ApplicantStatus from './components/applicant-status'
import UpcommingInterviews from './components/upcomming-interviews'
import QuickActions from './components/quick-actions'
import EmployeeType from './components/employee-type'
import EmployeeStatus from './components/employee-status'
import ActionList from './components/action-list'
import YourPlan from './components/your-plan'
import LastPayroll from './components/last-payroll'
export default function Dashboard() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <p
                className="text-[20px]/[26px] sm:text-[22px]/[28px] lg:text-[24px]/[30px] text-[#1C1C1C] font-semibold"
                id="dashboard-title"
                data-testid="dashboard-title"
            >
                Dashboard
            </p>

            {/* First Row - 3 columns on desktop, 1 on mobile/tablet */}
            <div className="mt-[16px] sm:mt-[20px] lg:mt-[24px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[16px] lg:gap-[20px]">
                <OpenJobs />
                <ApplicantStatus />
                <UpcommingInterviews />
            </div>

            {/* Second Row - Complex layout: 2fr 1fr 1fr on desktop, 1 column on mobile/tablet */}
            <div className="mt-[16px] sm:mt-[20px] lg:mt-[24px] grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-[12px] sm:gap-[16px] lg:gap-[20px]">
                <QuickActions />
                <EmployeeType />
                <EmployeeStatus />
            </div>

            {/* Third Row - Last Payroll (1 col) + Action List (2 cols) on desktop, stacked on mobile/tablet */}
            <div className="mt-[16px] sm:mt-[20px] lg:mt-[24px] grid grid-cols-1 lg:grid-cols-3 gap-[12px] sm:gap-[16px] lg:gap-[20px] items-stretch">
                <div className="lg:col-span-1 flex">
                    <LastPayroll />
                </div>
                <div className="lg:col-span-2 flex">
                    <ActionList />
                </div>
            </div>
        </div>
    )
}
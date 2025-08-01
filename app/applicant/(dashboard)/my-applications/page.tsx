'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { BriefcaseBusiness, Clock, Dot, MapPin } from 'lucide-react';
import { ActionsCell } from './components/actionCell';
import { Button } from '@/components/ui/button';

/**
 * MyApplications Component
 * Renders a list of job applications with details and actions for each status.
 */
export default function MyApplications() {
  const router = useRouter();

  // Sample job application data
  const data = [
    {
      id: '1',
      title: 'Senior Data Analyst',
      location: 'United States',
      type: 'Fulltime',
      status: 'Not Submitted',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Senior Data Analyst',
      location: 'United States',
      type: 'Fulltime',
      status: 'Under Review',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Senior Data Analyst',
      location: 'United States',
      type: 'Fulltime',
      status: 'Interviewing',
      createdAt: new Date(),
    },
    {
      id: '4',
      title: 'Senior Data Analyst',
      location: 'United States',
      type: 'Fulltime',
      status: 'Rejected',
      createdAt: new Date(),
    },
  ];

  // Color mapping for each status
  const colors: { [key: string]: string } = {
    'Not Submitted': 'bg-[#e9e9e9]',
    'Under Review': 'bg-[#8f8f8f]',
    Interviewing: 'bg-[#ff8914]',
    Rejected: 'bg-[#c30606]',
  };

  return (
    <div
      className="lg:pl-[209px] md:pl-[131px] sm:pl-[20px] lg:pr-[131px] md:pr-[20px] sm:pr-[20px] pt-[71px]"
      id="my-applications-container"
      data-testid="my-applications-container"
    >
      {/* Greeting Header */}
      <p
        className="text-[21px]/[30px] font-semibold text-[#1c1c1c] text-center"
        id="welcome-message"
        data-testid="welcome-message"
      >
        Welcome Alice,
      </p>

      {/* Application Cards */}
      <div
        className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[22px] mt-[22px]"
        id="applications-grid"
        data-testid="applications-grid"
      >
        {data.map((item, index) => (
          <div
            key={item.id}
            className="w-full border border-[#e9e9e9] bg-white pt-[20px] pb-[24px] px-[24px] rounded-[8px]"
            id={`application-card-${item.id}`}
            data-testid={`application-card-${item.id}`}
          >
            {/* Status and Action Cell */}
            <div className="w-full flex justify-between items-center">
              <span
                className={`pl-[3px] pr-[8px] py-[1px] ${
                  item.status !== 'Not Submitted' ? 'text-white' : 'text-[#1c1c1c]'
                } text-[12px]/[22px] ${colors[item.status]} rounded-[30px] flex items-center`}
                id={`application-status-${item.id}`}
                data-testid={`application-status-${item.id}`}
              >
                <Dot className="size-[20px]" />
                {item.status}
              </span>
              <ActionsCell />
            </div>

            {/* Job Title */}
            <p
              className="mt-[10px] text-[18px]/[30px] font-semibold"
              id={`application-title-${item.id}`}
              data-testid={`application-title-${item.id}`}
            >
              {item.title}
            </p>

            {/* Type and Location */}
            <div className="mt-[4px] flex gap-[8px] text-[#787878]">
              <span
                className="text-[12px]/[18px] flex items-center gap-[2px]"
                id={`application-type-${item.id}`}
                data-testid={`application-type-${item.id}`}
              >
                <BriefcaseBusiness className="size-[16px]" />
                {item.type}
              </span>
              <span
                className="text-[12px]/[18px] flex items-center gap-[2px]"
                id={`application-location-${item.id}`}
                data-testid={`application-location-${item.id}`}
              >
                <MapPin className="size-[16px]" />
                {item.location}
              </span>
            </div>

            {/* Application Date */}
            <div className="mt-[8px] flex gap-[4px] items-center">
              <Clock className="size-[16px] text-[#8f8f8f]" />
              <span
                className="text-[12px]/[18px] text-[#8f8f8f]"
                id={`application-date-${item.id}`}
                data-testid={`application-date-${item.id}`}
              >
                Applied : {moment(item.createdAt).format('MMMM DD YYYY')}
              </span>
            </div>

            {/* Action Button */}
            {item.status === 'Not Submitted' ? (
              <Button
                className="mt-[18px] w-full h-[32px]"
                id={`continue-button-${item.id}`}
                data-testid={`continue-button-${item.id}`}
              >
                Continue Application
              </Button>
            ) : (
              <Button
                variant="outline"
                className="mt-[18px] w-full h-[32px]"
                onClick={() => router.push(`/applicant/my-applications/${item.id}`)}
                id={`view-button-${item.id}`}
                data-testid={`view-button-${item.id}`}
              >
                View Application
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

/**
 * ApplicationDetails Component
 *
 * Displays the detailed view of a specific job application including job metadata,
 * applicant contact information, and responses to application questions.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, BriefcaseBusiness, Clock, Dot, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import moment from 'moment';

export default function ApplicationDetails() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div
      className="px-[420px] pt-[32px] pb-[57px]"
      id="application-details-container"
      data-testid="application-details-container"
    >
      <div
        className="flex text-[#353535] items-center gap-[10px] cursor-pointer"
        onClick={() => router.back()}
        id="back-button"
        data-testid="back-button"
      >
        <ArrowLeft className="size-[20px]" />
        <span className="text-[14px]/[20px]">Back to Applications</span>
      </div>

      <div
        className="mt-[20px] bg-whtie border border-[#e9e9e9] w-full rounded-[16px]"
        id="application-card"
        data-testid="application-card"
      >
        <div
          className="pt-[32px] pb-[27px] px-[40px] border-b border-[#e9e9e9] flex items-center justify-between"
          id="job-info"
          data-testid="job-info"
        >
          <div>
            <p
              className="text-[18px]/[30px] text-[#0D978B] underline"
              id="job-title"
              data-testid="job-title"
            >
              Senior Data Analyst
            </p>
            <div
              className="mt-[4px] flex gap-[8px]"
              id="job-meta"
              data-testid="job-meta"
            >
              <span
                className="text-[12px]/[18px] flex items-center gap-[2px] text-[#787878]"
                id="job-type"
                data-testid="job-type"
              >
                <BriefcaseBusiness className="size-[16px]" />
                Fulltime
              </span>
              <span
                className="text-[12px]/[18px] flex items-center gap-[2px] text-[#787878]"
                id="job-location"
                data-testid="job-location"
              >
                <MapPin className="size-[16px]" />
                United States
              </span>
              <span
                className="text-[12px]/[18px] flex items-center gap-[2px] text-[#787878]"
                id="job-date"
                data-testid="job-date"
              >
                <Clock className="size-[16px]" />
                {moment(new Date()).format('MMMM DD YYYY')}
              </span>
            </div>
          </div>
          <span
            className="pl-[3px] pr-[8px] py-[1px] bg-[#8f8f8f] text-[#fff] text-[12px]/[22px] rounded-[30px] flex items-center"
            id="application-status"
            data-testid="application-status"
          >
            <Dot className="size-[20px]" />
            Under Review
          </span>
        </div>

        <div
          className="pl-[40px] pr-[77px] pt-[30px] flex flex-col gap-[36px]"
          id="application-details"
          data-testid="application-details"
        >
          <div id="contact-info" data-testid="contact-info">
            <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Contact Info</p>
            <p className="text-[14px]/[22px] text-[#a5a5a5]">Full Name</p>
            <p className="text-[14px]/[22px] text-[#353535]" id="applicant-name" data-testid="applicant-name">
              Alice Fernadez
            </p>
            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]">Email Address</p>
            <p className="text-[14px]/[22px] text-[#353535]" id="applicant-email" data-testid="applicant-email">
              alice.fernadez@gmail.com
            </p>
            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]">Address Line 1</p>
            <p className="text-[14px]/[22px] text-[#353535]" id="applicant-address" data-testid="applicant-address">
              123 Main St
            </p>
            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]">Phone Number</p>
            <p className="text-[14px]/[22px] text-[#353535]" id="applicant-phone" data-testid="applicant-phone">
              +1 (555) 123-4567
            </p>
          </div>

          <div id="resume-section" data-testid="resume-section">
            <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Resume/Cover Letter</p>
          </div>

          <div id="experience-section" data-testid="experience-section">
            <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Experience</p>
          </div>

          <div id="questions-section" data-testid="questions-section">
            <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Applicant Questions</p>

            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[8px]">
              Are you legally authorized to work in the US?
            </p>
            <p className="text-[14px]/[22px] text-[#353535]" id="q1-answer" data-testid="q1-answer">Yes</p>

            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]">
              Would you consider relocating for this role?
            </p>
            <p className="text-[14px]/[22px] text-[#353535]" id="q2-answer" data-testid="q2-answer">Yes</p>

            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]">
              Are you authorized to work in the US?
            </p>
            <p className="text-[14px]/[22px] text-[#353535]" id="q3-answer" data-testid="q3-answer">Yes</p>

            <p className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]">What degree do you hold?</p>
            <p className="text-[14px]/[22px] text-[#353535]" id="q4-answer" data-testid="q4-answer">Bachelor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

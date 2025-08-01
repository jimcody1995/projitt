'use client';

import React from 'react';

/**
 * Review component displays a summary of the user's contact information,
 * resume/cover letter section, experience, and applicant question responses.
 */
export default function Resume() {
  return (
    <div id="review-container" data-testid="review-container">
      <p
        className="font-medium text-[22px]/[30px]"
        id="review-title"
        data-testid="review-title"
      >
        Review
      </p>
      <p
        className="mt-[8px] text-[14px]/[13px] text-[#787878]"
        id="review-description"
        data-testid="review-description"
      >
        Add your contact information
      </p>
      <div
        className="mt-[25px] flex flex-col gap-[36px]"
        id="review-content"
        data-testid="review-content"
      >
        <section id="contact-info-section" data-testid="contact-info-section" aria-label="Contact Info Section">
          <p
            className="text-[16px]/[24px] font-medium text-[#1c1c1c]"
            id="contact-info-title"
            data-testid="contact-info-title"
          >
            Contact Info
          </p>
          <p
            className="text-[14px]/[22px] text-[#a5a5a5]"
            id="contact-info-fullname-label"
            data-testid="contact-info-fullname-label"
          >
            Full Name
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="contact-info-fullname"
            data-testid="contact-info-fullname"
          >
            Alice Fernadez
          </p>
          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]"
            id="contact-info-email-label"
            data-testid="contact-info-email-label"
          >
            Email Address
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="contact-info-email"
            data-testid="contact-info-email"
          >
            alice.fernadez@gmail.com
          </p>
          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]"
            id="contact-info-address-label"
            data-testid="contact-info-address-label"
          >
            Address Line 1
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="contact-info-address"
            data-testid="contact-info-address"
          >
            123 Main St
          </p>
          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]"
            id="contact-info-phone-label"
            data-testid="contact-info-phone-label"
          >
            Phone Number
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="contact-info-phone"
            data-testid="contact-info-phone"
          >
            +1 (555) 123-4567
          </p>
        </section>

        <section
          id="resume-coverletter-section"
          data-testid="resume-coverletter-section"
          aria-label="Resume and Cover Letter Section"
        >
          <p
            className="text-[16px]/[24px] font-medium text-[#1c1c1c]"
            id="resume-coverletter-title"
            data-testid="resume-coverletter-title"
          >
            Resume/Cover Letter
          </p>
        </section>

        <section id="experience-section" data-testid="experience-section" aria-label="Experience Section">
          <p
            className="text-[16px]/[24px] font-medium text-[#1c1c1c]"
            id="experience-title"
            data-testid="experience-title"
          >
            Experience
          </p>
        </section>

        <section id="applicant-questions-section" data-testid="applicant-questions-section" aria-label="Applicant Questions Section">
          <p
            className="text-[16px]/[24px] font-medium text-[#1c1c1c]"
            id="applicant-questions-title"
            data-testid="applicant-questions-title"
          >
            Applicant Questions
          </p>

          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[8px]"
            id="question-legal-work-label"
            data-testid="question-legal-work-label"
          >
            Are you legally authorized to work in the US?
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="question-legal-work-answer"
            data-testid="question-legal-work-answer"
          >
            Yes
          </p>

          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]"
            id="question-relocating-label"
            data-testid="question-relocating-label"
          >
            Would you consider relocating for this role?
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="question-relocating-answer"
            data-testid="question-relocating-answer"
          >
            Yes
          </p>

          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]"
            id="question-authorized-label"
            data-testid="question-authorized-label"
          >
            Are you authorized to work in the US?
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="question-authorized-answer"
            data-testid="question-authorized-answer"
          >
            Yes
          </p>

          <p
            className="text-[14px]/[22px] text-[#a5a5a5] mt-[14px]"
            id="question-degree-label"
            data-testid="question-degree-label"
          >
            What degree do you hold?
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="question-degree-answer"
            data-testid="question-degree-answer"
          >
            Bachelor
          </p>
        </section>
      </div>
    </div>
  );
}

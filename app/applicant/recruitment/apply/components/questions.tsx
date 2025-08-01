'use client';

import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * Questions component renders a form section for collecting applicant questions.
 * It includes authorization, relocation, work authorization details, and degree selection.
 * UI elements include Select dropdowns, Input field, and Textarea with unique IDs and test-data-ids
 * to aid in UI test automation.
 */
export default function Questions() {
  /**
   * Renders the applicant questions form UI.
   * Each question is associated with a unique id and data-testid for test automation.
   */
  return (
    <div id="questions-container" data-testid="questions-container">
      <p
        className="font-medium text-[22px]/[30px]"
        id="applicant-questions-title"
        data-testid="applicant-questions-title"
      >
        Applicant Questions
      </p>
      <p
        className="mt-[8px] text-[14px]/[13px] text-[#787878]"
        id="contact-info-description"
        data-testid="contact-info-description"
      >
        Add your contact information
      </p>

      <div className="mt-[16px]" id="legal-work-authorization-group" data-testid="legal-work-authorization-group">
        <p
          className="text-[14px]/[22px] text-[#353535] font-medium"
          id="legal-work-authorization-label"
          data-testid="legal-work-authorization-label"
        >
          Are you legally authorized to work in the US?
        </p>
        <Select>
          <SelectTrigger
            className="w-full h-[48px] mt-[8px]"
            id="legal-work-authorization-select"
            data-testid="legal-work-authorization-select"
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent data-testid="legal-work-authorization-options">
            <SelectItem value="1" id="legal-work-authorization-yes" data-testid="legal-work-authorization-yes">
              Yes
            </SelectItem>
            <SelectItem value="2" id="legal-work-authorization-no" data-testid="legal-work-authorization-no">
              No
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-[16px]" id="relocation-group" data-testid="relocation-group">
        <p
          className="text-[14px]/[22px] text-[#353535] font-medium"
          id="relocation-label"
          data-testid="relocation-label"
        >
          Would you consider relocating for this role?
        </p>
        <Input
          className="mt-[8px] h-[48px]"
          id="relocation-input"
          data-testid="relocation-input"
        />
      </div>

      <div className="mt-[16px]" id="work-authorized-group" data-testid="work-authorized-group">
        <p
          className="text-[14px]/[22px] text-[#353535] font-medium"
          id="work-authorized-label"
          data-testid="work-authorized-label"
        >
          Are you authorized to work in the US?
        </p>
        <Textarea
          className="mt-[8px] h-[153px]"
          id="work-authorized-textarea"
          data-testid="work-authorized-textarea"
        />
      </div>

      <div className="mt-[16px]" id="degree-group" data-testid="degree-group">
        <p
          className="text-[14px]/[22px] text-[#353535] font-medium"
          id="degree-label"
          data-testid="degree-label"
        >
          What degree do you hold?
        </p>
        <Select>
          <SelectTrigger
            className="w-full h-[48px] mt-[8px]"
            id="degree-select"
            data-testid="degree-select"
          >
            <SelectValue placeholder="Select Degree" />
          </SelectTrigger>
          <SelectContent data-testid="degree-options">
            <SelectItem value="1" id="degree-bachelor" data-testid="degree-bachelor">
              Bachelor
            </SelectItem>
            <SelectItem value="2" id="degree-master" data-testid="degree-master">
              Master
            </SelectItem>
            <SelectItem value="3" id="degree-phd" data-testid="degree-phd">
              PhD
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Settings Component
 * ------------------
 * This component renders a user interface that allows the user
 * to view and update their email address.
 */
export default function Settings() {
  /**
   * Renders the settings page layout including current and new email fields
   * with a button to submit the email change request.
   * 
   * @returns {JSX.Element} Settings form layout
   */
  return (
    <div
      className="lg:px-[283px] md:px-[131px] sm:px-[20px] pt-[55px]"
      id="settings-container"
      data-testid="settings-container"
    >
      <div
        className="w-full bg-white rounded-[16px] px-[47px] pt-[43px] pb-[57px] flex lg:flex-row flex-col justify-between"
        id="settings-card"
        data-testid="settings-card"
      >
        <p
          className="font-medium text-[22px]/[30px] text-[#1c1c1c]"
          id="change-email-heading"
          data-testid="change-email-heading"
        >
          Change Email
        </p>

        <div
          className="lg:w-[464px] w-full"
          id="email-section"
          data-testid="email-section"
        >
          <p
            className="text-[14px]/[22px] text-[#a5a5a5]"
            id="current-email-label"
            data-testid="current-email-label"
          >
            Current Email
          </p>
          <p
            className="text-[14px]/[22px] text-[#353535]"
            id="current-email-value"
            data-testid="current-email-value"
          >
            alicefernadez@gmail.com
          </p>

          <p
            className="mt-[32px] text-[14px]/[22px] text-[#353535]"
            id="new-email-label"
            data-testid="new-email-label"
          >
            New Email Address
          </p>
          <Input
            className="h-[52px] mt-[8px]"
            value="afernadez@gmail.com"
            id="new-email-input"
            data-testid="new-email-input"
          />

          <Button
            className="mt-[23px] h-[48px] w-full"
            id="change-email-button"
            data-testid="change-email-button"
          >
            Change Emal Address
          </Button>
        </div>
      </div>
    </div>
  );
}

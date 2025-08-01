'use client'

import React, { JSX } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Layout Component for Applicant Portal
 * 
 * This component renders the main navigation bar for applicant-related pages,
 * including links to My Applications, Messages, and Settings.
 * It also includes a profile avatar and name display on the top right.
 * It wraps around its child components.
 */
export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  /**
   * Renders the top navigation and wraps child content passed to this layout.
   */
  return (
    <div data-testid="applicant-layout" id="applicant-layout">
      <div
        className="md:pl-[84px] md:pr-[100px] pb-[32px] flex md:flex-row flex-col md:justify-between justify-center items-center gap-[20px] border-b border-[#d2d2d2]"
        data-testid="top-navbar"
        id="top-navbar"
      >
        <div data-testid="navbar-logo" id="navbar-logo">
          <img
            src="/images/zaidLLC.png"
            alt="logo"
            className="h-[32px]"
            id="logo-img"
            data-testid="logo-img"
          />
        </div>

        <div
          className="flex sm:gap-[64px] gap-[10px] sm:flex-row flex-col"
          data-testid="nav-buttons"
          id="nav-buttons"
        >
          <button
            id="btn-my-applications"
            data-testid="btn-my-applications"
            className={`text-[16px]/[24px] cursor-pointer ${
              pathname.startsWith('/applicant/my-applications') ? 'text-[#0D978B]' : 'text-[#787878]'
            }`}
            onClick={() => router.push('/applicant/my-applications')}
          >
            My Applications
          </button>
          <button
            id="btn-messages"
            data-testid="btn-messages"
            className={`text-[16px]/[24px] cursor-pointer ${
              pathname.startsWith('/applicant/messages') ? 'text-[#0D978B]' : 'text-[#787878]'
            }`}
            onClick={() => router.push('/applicant/messages')}
          >
            Messages
          </button>
          <button
            id="btn-settings"
            data-testid="btn-settings"
            className={`text-[16px]/[24px] cursor-pointer ${
              pathname.startsWith('/applicant/settings') ? 'text-[#0D978B]' : 'text-[#787878]'
            }`}
            onClick={() => router.push('/applicant/settings')}
          >
            Settings
          </button>
        </div>

        <div
          className="flex gap-[10px] items-center"
          id="user-profile-section"
          data-testid="user-profile-section"
        >
          <div
            className="w-[32px] h-[32px] rounded-full bg-[#e9e9e9] flex items-center justify-center"
            id="user-avatar"
            data-testid="user-avatar"
          >
            <span
              className="text-[#353535] text-[10px]/[17px]"
              id="user-initials"
              data-testid="user-initials"
            >
              AF
            </span>
          </div>
          <span
            className="text-[#4b4b4b] text-[16px]/[24px]"
            id="user-fullname"
            data-testid="user-fullname"
          >
            Ahmed Farouk
          </span>
        </div>
      </div>

      <div id="layout-content" data-testid="layout-content">
        {children}
      </div>
    </div>
  );
}

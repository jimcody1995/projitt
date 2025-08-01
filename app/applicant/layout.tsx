'use client';

import React from 'react';
import { JSX } from 'react';
import { useEffect } from 'react';
import { getCountry, getSkills } from '@/api/basic';
import { useBasic } from '@/context/BasicContext';
import { useSession } from '@/context/SessionContext';

/**
 * ApplicantLayout component acts as a wrapper layout for applicant-related pages.
 * It fetches and sets global data such as country and skills upon user authentication.
 * It renders child components within a styled main container.
 * 
 * @param children React nodes to be rendered inside the layout
 * @returns JSX.Element wrapping the children content
 */
export default function ApplicantLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const { setCountry } = useBasic();
  const { session } = useSession();

  // Effect to fetch and set country data when session is authenticated
  useEffect(() => {
    if (session.authenticated) {
      const loadCountry = async () => {
        const response = await getCountry();
        setCountry(response.data.data);
      };
      loadCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]); // Runs when session changes, effectively on mount if authenticated

  const { setSkills } = useBasic();

  // Effect to fetch and set skills data when session is authenticated
  useEffect(() => {
    if (session.authenticated) {
      const loadSkills = async () => {
        const response = await getSkills();
        setSkills(response.data.data);
      };
      loadSkills();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]); // Runs when session changes, effectively on mount if authenticated

  return (
    <main
      className="grow w-full box-border py-[30px] bg-[#fafafa] overflow-y-auto"
      role="content"
      id="applicant-layout-main"
      data-testid="applicant-layout-main"
    >
      {children}
    </main>
  );
}

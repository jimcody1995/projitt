'use client';

import React from 'react';
import { JSX } from 'react';
import { useEffect } from 'react';
import { getCountry, getSkills } from '@/api/basic';
import { useBasic } from '@/context/BasicContext';

export default function ApplicantLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const { setCountry } = useBasic();
  useEffect(() => {
    const loadCountry = async () => {
      const response = await getCountry();
      setCountry(response.data.data);
    };
    loadCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on mount

  const { setSkills } = useBasic();
  useEffect(() => {
    const loadSkills = async () => {
      const response = await getSkills();
      setSkills(response.data.data);
    };
    loadSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on mount
  return (
    <main className="grow w-full box-border py-[30px] bg-[#fafafa] overflow-y-auto" role="content">
      {children}
    </main>
  );
}

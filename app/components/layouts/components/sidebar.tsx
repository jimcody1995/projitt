'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSettings } from '@/providers/settings-provider';
import { SidebarHeader } from './sidebar-header';
import { SidebarMenu } from './sidebar-menu';
import { ChevronsUpDown } from 'lucide-react';
import { logout } from '@/api/user';

export function Sidebar() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const handleLogout = async () => {
    const response = await logout()
    console.log(response);

    if (response.status === 200) {

    }
  }
  return (
    <div
      className={cn(
        'sidebar flex flex-col justify-between bg-background lg:shadow-[1px_0px_4px_0px_rgba(0,0,0,0.06)] lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex  items-stretch shrink-0',
        (settings.layouts.demo1.sidebarTheme === 'dark' ||
          pathname.includes('dark-sidebar')) &&
        'dark',
      )}
    >
      <div>
        <SidebarHeader />
        <div className="overflow-hidden">
          <div className="w-(--sidebar-default-width)">
            <SidebarMenu />
          </div>
        </div>
      </div>
      {settings.layouts.demo1.sidebarCollapse ?
        <div className='w-full flex justify-center mb-[25px]'>
          <img src="/images/photo.png" alt="" className='w-[32px] h-[32px] rounded-full' />
        </div>
        : <div className='pl-[22px] pr-[19px] mb-[25px]'>

          <div className='w-full rounded-[8px] bg-[#f9f9f9] py-[14px] px-[12px] flex items-center justify-between'>
            <div className='flex items-center gap-[12px]'>
              <img src="/images/photo.png" alt="" className='w-[32px] h-[32px] rounded-full' />
              <div>
                <p className='font-medium text-[#4b4b4b] text-[14px]/[20px]'>Abubar Ali</p>
                <p className='text-[#a5a5a5] text-[12px]/[15px]'>HR Management</p>
              </div>
            </div>
            <button className='text-[#4b4b4b] text-[12px]/[16px] cursor-pointer' onClick={handleLogout}>
              <ChevronsUpDown className='size-[20px]' /></button>
          </div>
        </div>}
    </div>
  );
}

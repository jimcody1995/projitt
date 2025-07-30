'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useBasic } from '@/context/BasicContext';
import phoneNumber from '@/constants/phoneNumber.json';

export default function ContactInfo() {
  const { country } = useBasic();
  const [code, setCode] = React.useState('');
  const [jobData, setJobData] = React.useState({
    country_id: '',
  });
  return (
    <div>
      <p className="font-medium text-[22px]/[30px]">Contact Info</p>
      <p className="mt-[8px] text-[14px]/[13px] text-[#787878]">Add your contact information</p>
      <div className="flex gap-[20px] mt-[40px]">
        <div className="w-full">
          <p className="font-medium text-[14px]/[22px] text-[#353535]">First Name *</p>
          <Input className="mt-[12px] h-[48px]" />
        </div>
        <div className="w-full">
          <p className="font-medium text-[14px]/[22px] text-[#353535]">Last Name</p>
          <Input className="mt-[12px] h-[48px]" />
        </div>
      </div>
      <div className="w-full mt-[20px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Email Address</p>
        <Input className="mt-[12px] h-[48px]" disabled />
      </div>
      <div className="w-full mt-[20px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Address Line 1</p>
        <Input className="mt-[12px] h-[48px]" />
      </div>
      <div className="flex gap-[20px] mt-[40px]">
        <div className="w-full">
          <p className="font-medium text-[14px]/[22px] text-[#353535]">City</p>
          <Input className="mt-[12px] h-[48px]" />
        </div>
        <div className="w-full">
          <p className="font-medium text-[14px]/[22px] text-[#353535]">State</p>
          <Input className="mt-[12px] h-[48px]" />
        </div>
      </div>
      <div className="flex gap-[20px] mt-[40px]">
        <div className="w-full">
          <p className="font-medium text-[14px]/[22px] text-[#353535]">Zip Code</p>
          <Input className="mt-[12px] h-[48px]" />
        </div>
        <div className="w-full">
          <p className="font-medium text-[14px]/[22px] text-[#353535]">Country</p>
          <Select
            value={jobData.country_id || ''}
            onValueChange={(val) => setJobData({ ...jobData, country_id: val })}
          >
            <SelectTrigger className="h-[48px] mt-[12px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {(country || [])?.map((country: any) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full mt-[40px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Phone Number</p>
        <div className="flex flex-col sm:flex-row gap-[16px] w-full mt-[12px]">
          <div className="w-[113px]">
            <Select
              defaultValue="US"
              indicatorVisibility={false}
              onValueChange={(value) => {
                setCode(phoneNumber.find((item) => item.key === value)?.code || '');
              }}
              id="signup-phone-country-select"
              data-testid="signup-phone-country-select"
            >
              <SelectTrigger
                className="h-[48px]"
                id="signup-phone-country-trigger"
                data-testid="signup-phone-country-trigger"
              >
                <SelectValue
                  placeholder="Select a country"
                  id="signup-phone-country-value"
                  data-testid="signup-phone-country-value"
                />
              </SelectTrigger>
              <SelectContent
                id="signup-phone-country-content"
                data-testid="signup-phone-country-content"
              >
                {phoneNumber.map((item) => (
                  <SelectItem
                    key={item.key}
                    value={item.key}
                    id={`signup-phone-country-${item.key}`}
                    data-testid={`signup-phone-country-${item.key}`}
                  >
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Input
              placeholder={`+${code}(555)000-0000`}
              type="text"
              className="h-[48px]"
              id="signup-phone-input"
              data-testid="signup-phone-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { getCompanySchema, CompanySchemaType } from '../forms/company-schema';
import { Calendar } from '@/components/ui/calendar';
import moment from 'moment';
import { ArrowLeft, Calendar1, Clock4, Globe2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import TimezoneSelect from '@/components/common/timezone-select';
import { Button } from '@/components/ui/button';

interface DateTimePickProps {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function DateTimePick({ step, setStep }: DateTimePickProps) {
  const [time, setTime] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date[] | undefined>(undefined);
  const [timezone, setTimezone] = useState<string | undefined>(undefined);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(getCompanySchema()),
    defaultValues: {
      logo: '',
      companySize: 'small',
      industry: 'manufacturing',
      phoneNumber: '',
      websiteURL: '',
    },
  });
  const onSubmit = async (values: CompanySchemaType) => {
    console.log(values);
    setStep('step2');
  };
  const availableDates = [
    new Date(2025, 6, 12),
    new Date(2025, 6, 16),
    new Date(2025, 6, 17),
    new Date(2025, 6, 18),
    new Date(2025, 6, 19),
    new Date(2025, 6, 22),
    new Date(2025, 6, 23),
    new Date(2025, 6, 25),
    new Date(2025, 6, 26),
    new Date(2025, 6, 29),
    new Date(2025, 6, 30),
    new Date(2025, 6, 31)
  ];
  return (
    <div className="w-full h-full flex justify-center items-center px-[10px] ">
      <div className="lg:w-[1000px] w-full border border-[#e9e9e9] rounded-[20px] bg-white py-[48px] px-[48px] flex lg:flex-row flex-col justify-between items-center gap-[20px]">
        <div className="lg:w-[400px] w-full flex flex-col gap-[19px]">
          <p className="text-[22px]/[30px] font-medium md:w-[300px] w-full">
            Let’s Set Up Your Account Together
          </p>
          <p className="text-[18px]/[30px] text-[#4b4b4b]">
            We’d love to speak with you to understand your company’s unique needs and help you get
            the most out of Projitt. Simply pick a date and time that works best for you below.
          </p>
        </div>
        {!date && !confirmed && (
          <div className="sm:w-[443px] w-full border-[1.25px] border-[#e9e9e9] rounded-[15px] py-[25px] px-[30px] gap-[24px] flex flex-col">
            <p className="text-[18px]/[24px] text-[#353535] font-medium text-center">Pick a Date</p>
            <Calendar mode="multiple" selected={date} onSelect={(date) => setDate(date)}
              classNames={{
                day: "bg-[#D6EEEC] rounded-[10px] text-[#0D978B] px-0 py-px text-[17px]",
                disabled: "bg-white text-[#787878]",
              }}
              disabled={date => {
                return !availableDates.some(
                  (available) =>
                    date.getDate() === available.getDate() &&
                    date.getMonth() === available.getMonth() &&
                    date.getFullYear() === available.getFullYear()
                )
              }} />
          </div>
        )}
        {date && !confirmed && (!timezone || !time) && (
          <div className="lg:w-[443px] w-full border-[1.25px] border-[#e9e9e9] rounded-[15px] py-[25px] px-[30px] gap-[24px] flex flex-col">
            <div className="flex gap-[16px] items-center">
              <button className="w-[24px] h-[24px] rounded-full border-[0.63px] border-[#e9e9e9] cursor-pointer flex justify-center items-center">
                <ArrowLeft onClick={() => setDate(undefined)} className="w-[15px]" />
              </button>
              <p className="text-[18px]/[24px] text-[#353535] font-semibold">
                {moment(date?.[0]).format('dddd, MMMM D, YYYY')}
              </p>
            </div>
            <div className="flex flex-col gap-[10px] border-b-1 border-[#e9e9e9] pb-[16px]">
              <Label>Select Time zone</Label>
              <TimezoneSelect defaultValue={timezone} onChange={(value) => setTimezone(value)} />
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="font-medium text-[14px]/[22px] text-center">Selct Time</p>
              <div className="w-full flex flex-col gap-[12px] h-[300px] overflow-y-auto">
                <div className="flex flex-col gap-[12px] mt-[24px]">
                  {Array.from({ length: 48 }, (_, i) => {
                    const hour = String(Math.floor(i / 2)).padStart(2, '0');
                    const minute = i % 2 === 0 ? '00' : '30';
                    return (
                      <button
                        key={`${hour}:${minute}`}
                        className={`w-full h-[48px] text-[#353535] rounded-[8px] border-[1px] border-[#e9e9e9] flex justify-center items-center cursor-pointer hover:bg-[#D6EEEC] hover:text-[#0D978B] ${time === `${hour}:${minute}` ? 'bg-[#D6EEEC] text-[#0D978B]' : ''}`}
                        onClick={() => setTime(`${hour}:${minute}`)}
                      >
                        <p className="text-[15px]/[28px] ">{`${hour} : ${minute}`}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        {date && timezone && time && !confirmed && (
          <div className="sm:h-[500px] w-full flex items-center">
            <div className="sm:w-[443px] flex-1 border-[1.25px] border-[#e9e9e9] rounded-[15px] py-[25px] px-[30px] gap-[24px] flex flex-col">
              <div className="flex gap-[16px] items-center">
                <button className="w-[24px] h-[24px] rounded-full border-[0.63px] border-[#e9e9e9] cursor-pointer flex justify-center items-center">
                  <ArrowLeft onClick={() => setTime(undefined)} className="w-[15px]" />
                </button>
                <p className="text-[16px]/[24px] text-[#4b4b4b] font-semibold">
                  Confirm Date & Time
                </p>
              </div>
              <div className="flex flex-col gap-[24px]">
                <div className="flex gap-[10px]">
                  <Clock4 className="w-[20px] h-[20px] text-[#4b4b4b]" />
                  <p className="text-[16px]/[24px] text-[#4b4b4b] font-medium">
                    {moment(time, 'HH:mm').format('hh:mm A')}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <img src="/images/icons/calendar.svg" alt="" className="w-[20px] h-[20px]" />
                  <p className="text-[16px]/[24px] text-[#4b4b4b] font-medium">
                    {moment(date?.[0]).format('dddd, MMMM D, YYYY')}
                  </p>
                </div>
                <div className="flex gap-[10px]">
                  <img src="/images/icons/timezone.svg" alt="" className="w-[20px] h-[20px]" />
                  <p className="text-[16px]/[24px] text-[#4b4b4b] font-medium">{timezone}</p>
                </div>
              </div>
              <Button
                className="w-full h-[48px] bg-[#0D978B] text-white text-[15px]/[27px] rounded-[8px]"
                onClick={() => setConfirmed(true)}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
        {confirmed && (
          <div className="sm:w-[443px] w-full border-[1.25px] border-[#e9e9e9] rounded-[15px] py-[32px] px-[30px] gap-[24px] flex flex-col">
            <div className="relative w-[56px] h-[56px] flex items-center justify-center">
              <div className="absolute z-3 w-[56px] h-[56px] rounded-full bg-[#0D978B33] ripple"></div>
              <div className="absolute z-2 w-[36px] h-[36px] rounded-full bg-[#0D978B] opacity-[20%] ripple delay-300"></div>
              <div className="absolute z-10 flex items-center justify-center w-[20px] h-[20px] rounded-full ">
                <img src="/images/icons/check-double.svg" alt="" className="w-[21px] h-[21px]" />
              </div>
            </div>

            <div>
              <p className="text-[22px]/[30px] text-[#1C1C1C] font-medium">You’re All Set!</p>
              <p className="text-[16px]/[26px] text-[#4b4b4b] mt-[19px]">
                You’ll receive a calendar invite and reminder email shortly.
              </p>
            </div>
            <div className="flex flex-col gap-[24px] mt-[24px]">
              <div className="flex gap-[10px]">
                <Clock4 className="w-[24px] h-[24px]" />
                <p className="text-[16px]/[24px] text-[#4b4b4b] font-medium">
                  {moment(time, 'HH:mm').format('hh:mm A')}
                </p>
              </div>
              <div className="flex gap-[10px]">
                <Calendar1 className="w-[24px] h-[24px]" />
                <p className="text-[16px]/[24px] text-[#4b4b4b] font-medium">
                  {moment(date?.[0]).format('dddd, MMMM D, YYYY')}
                </p>
              </div>
              <div className="flex gap-[10px]">
                <Globe2 className="w-[24px] h-[24px]" />
                <p className="text-[16px]/[24px] text-[#4b4b4b] font-medium">{timezone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

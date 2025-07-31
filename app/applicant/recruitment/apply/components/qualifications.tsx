'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import moment from 'moment';
import { CalendarDays, Plus } from 'lucide-react';
import { useState } from 'react';
import { useBasic } from '@/context/BasicContext';
import TagInput from '@/components/ui/tag-input';
export default function Qualifications() {
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [otherLinks, setOtherLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const { skills } = useBasic();

  return (
    <div>
      <p className="font-medium text-[22px]/[30px]">Qualifications</p>
      <p className="mt-[8px] text-[14px]/[13px] text-[#787878]">Add your contact information</p>
      <div className="mt-[15px] w-full h-[40px] border border-[#e9e9e9] rounded-[8px] flex justify-center items-center text-[#053834] font-semibold">
        File with Resume
      </div>
      <div className="mt-[36px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Work experience</p>
        {workExperience.map((work, index) => (
          <>
            <div className="mt-[10px]">
              <p className="text-[14px]/[20px] text-[#8f8f8f]">Work Experience {index + 1}</p>
              <div className="mt-[12px] flex gap-[16px] sm:flex-row flex-col">
                <Input placeholder="Job Title" className="h-[48px]" />
                <Input placeholder="Company" className="h-[48px]" />
              </div>
              <Input className="w-full h-[48px] mt-[16px]" placeholder="Location (optional)" />
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-[16px] mt-[16px]">
                <div>
                  <Label>From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        id="date"
                        className={cn(
                          'w-full h-[48px] data-[state=open]:border-primary',
                          !work.from && 'text-muted-foreground'
                        )}
                        data-test-id="certificate-issue-date"
                      >
                        <CalendarDays className="-ms-0.5" />
                        {moment(work.from).format('DD/MM/YYYY')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={work.from}
                        selected={work.from}
                        onSelect={(e) =>
                          setWorkExperience({
                            ...workExperience,
                            from: e as Date,
                          })
                        }
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        id="date"
                        className={cn(
                          'w-full h-[48px] data-[state=open]:border-primary',
                          !workExperience[0].to && 'text-muted-foreground'
                        )}
                        data-test-id="certificate-expiration-date"
                      >
                        <CalendarDays className="-ms-0.5" />
                        {moment(workExperience[0].to).format('DD/MM/YYYY')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={workExperience[0].to}
                        selected={workExperience[0].to}
                        onSelect={(e) =>
                          setWorkExperience({
                            ...workExperience,
                            to: e as Date,
                          })
                        }
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center gap-[16px] mt-[12px]">
                <Checkbox />
                <p className="text-[14px]/[20px] text-[#4b4b4b]">I currently work here</p>
              </div>
              <Textarea placeholder="Role Description" className="mt-[12px] h-[148px]" />
            </div>
          </>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setWorkExperience([
              ...workExperience,
              { jobTitle: '', company: '', location: '', from: new Date(), to: new Date() },
            ])
          }
        >
          <Plus className="size-[18px]" />
          <p className="text-[14px]/[20px] ">Add another</p>
        </button>
      </div>
      <div className="mt-[36px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Education</p>
        {education.map((edu, index) => (
          <>
            <div className="mt-[10px]">
              <p className="text-[14px]/[20px] text-[#8f8f8f]">Education {index + 1}</p>

              <Input className="w-full h-[48px] mt-[16px]" placeholder="School or University" />
              <Select className="w-full h-[48px] mt-[16px]" placeholder="Select Degree">
                <SelectTrigger className="w-full h-[48px] mt-[16px] border border-[#e9e9e9] rounded-[8px]">
                  <SelectValue placeholder="Select Degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualification1">Qualification 1</SelectItem>
                  <SelectItem value="qualification2">Qualification 2</SelectItem>
                  <SelectItem value="qualification3">Qualification 3</SelectItem>
                </SelectContent>
              </Select>
              <Input className="w-full h-[48px] mt-[16px]" placeholder="Field of Study" />
            </div>
          </>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() => setEducation([...education, { school: '', degree: '', fieldOfStudy: '' }])}
        >
          <Plus className="size-[18px]" />
          <p className="text-[14px]/[20px] ">Add another</p>
        </button>
      </div>

      <div className="mt-[36px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Certifications</p>
        {certifications.map((cert, index) => (
          <>
            <div className="mt-[10px]">
              <Input className="w-full h-[48px] mt-[16px]" placeholder="Certification" />
              <Input className="w-full h-[48px] mt-[16px]" placeholder="Certification Number" />
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-[16px] mt-[16px]">
                <div>
                  <Label>Issue Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        id="date"
                        className={cn(
                          'w-full h-[48px] data-[state=open]:border-primary',
                          !cert.issueDate && 'text-muted-foreground'
                        )}
                        data-test-id="certificate-issue-date"
                      >
                        <CalendarDays className="-ms-0.5" />
                        {moment(cert.issueDate).format('DD/MM/YYYY')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={cert.issueDate}
                        selected={cert.issueDate}
                        onSelect={(e) =>
                          setCertifications({
                            ...certifications,
                            issueDate: e as Date,
                          })
                        }
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        id="date"
                        className={cn(
                          'w-full h-[48px] data-[state=open]:border-primary',
                          !cert.expiryDate && 'text-muted-foreground'
                        )}
                        data-test-id="certificate-expiration-date"
                      >
                        <CalendarDays className="-ms-0.5" />
                        {moment(cert.expiryDate).format('DD/MM/YYYY')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={cert.expiryDate}
                        selected={cert.expiryDate}
                        onSelect={(e) =>
                          setCertifications({
                            ...certifications,
                            expiryDate: e as Date,
                          })
                        }
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setCertifications([
              ...certifications,
              {
                certification: '',
                certificationNumber: '',
                issueDate: new Date(),
                expiryDate: new Date(),
              },
            ])
          }
        >
          <Plus className="size-[18px]" />
          <p className="text-[14px]/[20px] ">Add another</p>
        </button>
      </div>
      <div className="mt-[32px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Skills</p>
        <div className="mt-[16px]">
          <TagInput
            suggestions={skills || []}
            restrictToSuggestions={true}
            tags={tags}
            setTags={(tags) => setTags(tags)}
          />
        </div>
      </div>
      <div className="mt-[32px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">LinkedIn</p>
        <div className="mt-[16px]">
          <Input placeholder="LinkedIn" className="h-[48px]" />
        </div>
      </div>
      <div className="mt-[32px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Website/Portfolio Link</p>
        <div className="mt-[16px]">
          <Input placeholder="Website/Portfolio Link" className="h-[48px]" />
        </div>
      </div>
      <div className="mt-[32px]">
        <p className="font-medium text-[14px]/[22px] text-[#353535]">Other Links</p>
        {otherLinks.map((link, index) => (
          <div key={index} className="flex gap-[16px] mt-[16px] sm:flex-row flex-col">
            <Input
              placeholder="Title"
              value={link.title}
              onChange={(e) => setOtherLinks({ ...otherLinks, title: e.target.value })}
              className="h-[48px] sm:w-[30%] w-full"
            />
            <Input
              placeholder="Link"
              value={link.link}
              onChange={(e) => setOtherLinks({ ...otherLinks, link: e.target.value })}
              className="h-[48px] sm:w-[70%] w-full"
            />
          </div>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setOtherLinks([
              ...otherLinks,
              {
                title: '',
                link: '',
              },
            ])
          }
        >
          <Plus className="size-[18px]" />
          <p className="text-[14px]/[20px] ">Add Link</p>
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
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
import { useBasic } from '@/context/BasicContext';
import TagInput from '@/components/ui/tag-input';

/**
 * Qualifications component renders a detailed form section to input
 * work experience, education, certifications, skills, and other relevant links.
 * Includes dynamic lists and date pickers, with unique IDs and data-testid attributes
 * for UI test automation.
 */
export default function Qualifications() {
  /**
   * Manages the work experience list state.
   */
  const [workExperience, setWorkExperience] = useState<
    {
      jobTitle: string;
      company: string;
      location: string;
      from: Date | null;
      to: Date | null;
      currentlyWorking?: boolean;
      description?: string;
    }[]
  >([]);
  /**
   * Manages the education list state.
   */
  const [education, setEducation] = useState<
    {
      school: string;
      degree: string;
      fieldOfStudy: string;
    }[]
  >([]);
  /**
   * Manages the certifications list state.
   */
  const [certifications, setCertifications] = useState<
    {
      certification: string;
      certificationNumber: string;
      issueDate: Date | null;
      expiryDate: Date | null;
    }[]
  >([]);
  /**
   * Manages the other links list state.
   */
  const [otherLinks, setOtherLinks] = useState<
    {
      title: string;
      link: string;
    }[]
  >([]);
  /**
   * Manages the skills tags state.
   */
  const [tags, setTags] = useState<string[]>([]);
  const { skills } = useBasic();

  /**
   * Helper to update work experience entry at given index.
   * @param index Index of the work experience entry
   * @param data Partial data to update
   */
  const updateWorkExperience = (index: number, data: Partial<typeof workExperience[0]>) => {
    setWorkExperience((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...data } : item))
    );
  };

  /**
   * Helper to update education entry at given index.
   * @param index Index of the education entry
   * @param data Partial data to update
   */
  const updateEducation = (index: number, data: Partial<typeof education[0]>) => {
    setEducation((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...data } : item))
    );
  };

  /**
   * Helper to update certification entry at given index.
   * @param index Index of the certification entry
   * @param data Partial data to update
   */
  const updateCertification = (index: number, data: Partial<typeof certifications[0]>) => {
    setCertifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...data } : item))
    );
  };

  /**
   * Helper to update other link entry at given index.
   * @param index Index of the other link entry
   * @param data Partial data to update
   */
  const updateOtherLink = (index: number, data: Partial<typeof otherLinks[0]>) => {
    setOtherLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...data } : item))
    );
  };

  return (
    <div id="qualifications-container" data-testid="qualifications-container">
      <p
        className="font-medium text-[22px]/[30px]"
        id="qualifications-title"
        data-testid="qualifications-title"
      >
        Qualifications
      </p>
      <p
        className="mt-[8px] text-[14px]/[13px] text-[#787878]"
        id="contact-info-description"
        data-testid="contact-info-description"
      >
        Add your contact information
      </p>
      <div
        className="mt-[15px] w-full h-[40px] border border-[#e9e9e9] rounded-[8px] flex justify-center items-center text-[#053834] font-semibold"
        id="file-with-resume"
        data-testid="file-with-resume"
      >
        File with Resume
      </div>

      {/* Work Experience Section */}
      <div
        className="mt-[36px]"
        id="work-experience-section"
        data-testid="work-experience-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="work-experience-title"
          data-testid="work-experience-title"
        >
          Work experience
        </p>
        {workExperience.map((work, index) => (
          <div
            key={index}
            className="mt-[10px]"
            id={`work-experience-item-${index}`}
            data-testid={`work-experience-item-${index}`}
          >
            <p
              className="text-[14px]/[20px] text-[#8f8f8f]"
              id={`work-experience-label-${index}`}
              data-testid={`work-experience-label-${index}`}
            >
              Work Experience {index + 1}
            </p>
            <div className="mt-[12px] flex gap-[16px] sm:flex-row flex-col">
              <Input
                placeholder="Job Title"
                className="h-[48px]"
                value={work.jobTitle}
                onChange={(e) => updateWorkExperience(index, { jobTitle: e.target.value })}
                id={`work-job-title-${index}`}
                data-testid={`work-job-title-${index}`}
              />
              <Input
                placeholder="Company"
                className="h-[48px]"
                value={work.company}
                onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
                id={`work-company-${index}`}
                data-testid={`work-company-${index}`}
              />
            </div>
            <Input
              className="w-full h-[48px] mt-[16px]"
              placeholder="Location (optional)"
              value={work.location}
              onChange={(e) => updateWorkExperience(index, { location: e.target.value })}
              id={`work-location-${index}`}
              data-testid={`work-location-${index}`}
            />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[16px] mt-[16px]">
              <div>
                <Label
                  htmlFor={`work-from-${index}`}
                  id={`work-from-label-${index}`}
                  data-testid={`work-from-label-${index}`}
                >
                  From
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      mode="input"
                      variant="outline"
                      className={cn(
                        'w-full h-[48px] data-[state=open]:border-primary',
                        !work.from && 'text-muted-foreground'
                      )}
                      id={`work-from-button-${index}`}
                      data-testid={`work-from-button-${index}`}
                      aria-describedby={`work-from-label-${index}`}
                    >
                      <CalendarDays className="-ms-0.5" />
                      {work.from ? moment(work.from).format('DD/MM/YYYY') : 'Select Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={work.from || undefined}
                      selected={work.from}
                      onSelect={(date) => updateWorkExperience(index, { from: date as Date })}
                      numberOfMonths={1}
                      id={`work-from-calendar-${index}`}
                      data-testid={`work-from-calendar-${index}`}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label
                  htmlFor={`work-to-${index}`}
                  id={`work-to-label-${index}`}
                  data-testid={`work-to-label-${index}`}
                >
                  To
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      mode="input"
                      variant="outline"
                      className={cn(
                        'w-full h-[48px] data-[state=open]:border-primary',
                        !work.to && 'text-muted-foreground'
                      )}
                      id={`work-to-button-${index}`}
                      data-testid={`work-to-button-${index}`}
                      aria-describedby={`work-to-label-${index}`}
                    >
                      <CalendarDays className="-ms-0.5" />
                      {work.to ? moment(work.to).format('DD/MM/YYYY') : 'Select Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={work.to || undefined}
                      selected={work.to}
                      onSelect={(date) => updateWorkExperience(index, { to: date as Date })}
                      numberOfMonths={1}
                      id={`work-to-calendar-${index}`}
                      data-testid={`work-to-calendar-${index}`}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center gap-[16px] mt-[12px]">
              <Checkbox
                checked={!!work.currentlyWorking}
                onCheckedChange={(checked) =>
                  updateWorkExperience(index, { currentlyWorking: checked === true })
                }
                id={`work-currently-working-${index}`}
                data-testid={`work-currently-working-${index}`}
              />
              <label
                htmlFor={`work-currently-working-${index}`}
                className="text-[14px]/[20px] text-[#4b4b4b]"
                id={`work-currently-working-label-${index}`}
                data-testid={`work-currently-working-label-${index}`}
              >
                I currently work here
              </label>
            </div>
            <Textarea
              placeholder="Role Description"
              className="mt-[12px] h-[148px]"
              value={work.description || ''}
              onChange={(e) => updateWorkExperience(index, { description: e.target.value })}
              id={`work-description-${index}`}
              data-testid={`work-description-${index}`}
            />
          </div>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setWorkExperience([
              ...workExperience,
              {
                jobTitle: '',
                company: '',
                location: '',
                from: null,
                to: null,
                currentlyWorking: false,
                description: '',
              },
            ])
          }
          id="work-experience-add-button"
          data-testid="work-experience-add-button"
          type="button"
        >
          <Plus className="w-[18px] h-[18px]" />
          <p className="text-[14px]/[20px]">Add another</p>
        </button>
      </div>

      {/* Education Section */}
      <div
        className="mt-[36px]"
        id="education-section"
        data-testid="education-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="education-title"
          data-testid="education-title"
        >
          Education
        </p>
        {education.map((edu, index) => (
          <div
            key={index}
            className="mt-[10px]"
            id={`education-item-${index}`}
            data-testid={`education-item-${index}`}
          >
            <p
              className="text-[14px]/[20px] text-[#8f8f8f]"
              id={`education-label-${index}`}
              data-testid={`education-label-${index}`}
            >
              Education {index + 1}
            </p>
            <Input
              className="w-full h-[48px] mt-[16px]"
              placeholder="School or University"
              value={edu.school}
              onChange={(e) => updateEducation(index, { school: e.target.value })}
              id={`education-school-${index}`}
              data-testid={`education-school-${index}`}
            />
            <Select
              className="w-full h-[48px] mt-[16px]"
              value={edu.degree}
              onValueChange={(value) => updateEducation(index, { degree: value })}
              id={`education-degree-select-${index}`}
              data-testid={`education-degree-select-${index}`}
            >
              <SelectTrigger
                className="w-full h-[48px] mt-[16px] border border-[#e9e9e9] rounded-[8px]"
                id={`education-degree-trigger-${index}`}
                data-testid={`education-degree-trigger-${index}`}
              >
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
              <SelectContent data-testid={`education-degree-options-${index}`}>
                <SelectItem
                  value="qualification1"
                  id={`education-degree-qualification1-${index}`}
                  data-testid={`education-degree-qualification1-${index}`}
                >
                  Qualification 1
                </SelectItem>
                <SelectItem
                  value="qualification2"
                  id={`education-degree-qualification2-${index}`}
                  data-testid={`education-degree-qualification2-${index}`}
                >
                  Qualification 2
                </SelectItem>
                <SelectItem
                  value="qualification3"
                  id={`education-degree-qualification3-${index}`}
                  data-testid={`education-degree-qualification3-${index}`}
                >
                  Qualification 3
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="w-full h-[48px] mt-[16px]"
              placeholder="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => updateEducation(index, { fieldOfStudy: e.target.value })}
              id={`education-fieldOfStudy-${index}`}
              data-testid={`education-fieldOfStudy-${index}`}
            />
          </div>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setEducation([...education, { school: '', degree: '', fieldOfStudy: '' }])
          }
          id="education-add-button"
          data-testid="education-add-button"
          type="button"
        >
          <Plus className="w-[18px] h-[18px]" />
          <p className="text-[14px]/[20px]">Add another</p>
        </button>
      </div>

      {/* Certifications Section */}
      <div
        className="mt-[36px]"
        id="certifications-section"
        data-testid="certifications-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="certifications-title"
          data-testid="certifications-title"
        >
          Certifications
        </p>
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="mt-[10px]"
            id={`certification-item-${index}`}
            data-testid={`certification-item-${index}`}
          >
            <Input
              className="w-full h-[48px] mt-[16px]"
              placeholder="Certification"
              value={cert.certification}
              onChange={(e) => updateCertification(index, { certification: e.target.value })}
              id={`certification-name-${index}`}
              data-testid={`certification-name-${index}`}
            />
            <Input
              className="w-full h-[48px] mt-[16px]"
              placeholder="Certification Number"
              value={cert.certificationNumber}
              onChange={(e) => updateCertification(index, { certificationNumber: e.target.value })}
              id={`certification-number-${index}`}
              data-testid={`certification-number-${index}`}
            />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[16px] mt-[16px]">
              <div>
                <Label
                  htmlFor={`cert-issue-date-${index}`}
                  id={`cert-issue-date-label-${index}`}
                  data-testid={`cert-issue-date-label-${index}`}
                >
                  Issue Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      mode="input"
                      variant="outline"
                      className={cn(
                        'w-full h-[48px] data-[state=open]:border-primary',
                        !cert.issueDate && 'text-muted-foreground'
                      )}
                      id={`cert-issue-date-button-${index}`}
                      data-testid={`cert-issue-date-button-${index}`}
                      aria-describedby={`cert-issue-date-label-${index}`}
                    >
                      <CalendarDays className="-ms-0.5" />
                      {cert.issueDate ? moment(cert.issueDate).format('DD/MM/YYYY') : 'Select Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={cert.issueDate || undefined}
                      selected={cert.issueDate}
                      onSelect={(date) => updateCertification(index, { issueDate: date as Date })}
                      numberOfMonths={1}
                      id={`cert-issue-date-calendar-${index}`}
                      data-testid={`cert-issue-date-calendar-${index}`}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label
                  htmlFor={`cert-expiry-date-${index}`}
                  id={`cert-expiry-date-label-${index}`}
                  data-testid={`cert-expiry-date-label-${index}`}
                >
                  Expiry Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      mode="input"
                      variant="outline"
                      className={cn(
                        'w-full h-[48px] data-[state=open]:border-primary',
                        !cert.expiryDate && 'text-muted-foreground'
                      )}
                      id={`cert-expiry-date-button-${index}`}
                      data-testid={`cert-expiry-date-button-${index}`}
                      aria-describedby={`cert-expiry-date-label-${index}`}
                    >
                      <CalendarDays className="-ms-0.5" />
                      {cert.expiryDate ? moment(cert.expiryDate).format('DD/MM/YYYY') : 'Select Date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={cert.expiryDate || undefined}
                      selected={cert.expiryDate}
                      onSelect={(date) => updateCertification(index, { expiryDate: date as Date })}
                      numberOfMonths={1}
                      id={`cert-expiry-date-calendar-${index}`}
                      data-testid={`cert-expiry-date-calendar-${index}`}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setCertifications([
              ...certifications,
              {
                certification: '',
                certificationNumber: '',
                issueDate: null,
                expiryDate: null,
              },
            ])
          }
          id="certifications-add-button"
          data-testid="certifications-add-button"
          type="button"
        >
          <Plus className="w-[18px] h-[18px]" />
          <p className="text-[14px]/[20px]">Add another</p>
        </button>
      </div>

      {/* Skills Section */}
      <div
        className="mt-[32px]"
        id="skills-section"
        data-testid="skills-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="skills-title"
          data-testid="skills-title"
        >
          Skills
        </p>
        <div className="mt-[16px]" id="skills-tag-input" data-testid="skills-tag-input">
          <TagInput
            suggestions={skills || []}
            restrictToSuggestions={true}
            tags={tags}
            setTags={setTags}
          />
        </div>
      </div>

      {/* LinkedIn Section */}
      <div
        className="mt-[32px]"
        id="linkedin-section"
        data-testid="linkedin-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="linkedin-title"
          data-testid="linkedin-title"
        >
          LinkedIn
        </p>
        <div className="mt-[16px]">
          <Input
            placeholder="LinkedIn"
            className="h-[48px]"
            id="linkedin-input"
            data-testid="linkedin-input"
          />
        </div>
      </div>

      {/* Website/Portfolio Section */}
      <div
        className="mt-[32px]"
        id="website-portfolio-section"
        data-testid="website-portfolio-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="website-portfolio-title"
          data-testid="website-portfolio-title"
        >
          Website/Portfolio Link
        </p>
        <div className="mt-[16px]">
          <Input
            placeholder="Website/Portfolio Link"
            className="h-[48px]"
            id="website-portfolio-input"
            data-testid="website-portfolio-input"
          />
        </div>
      </div>

      {/* Other Links Section */}
      <div
        className="mt-[32px]"
        id="other-links-section"
        data-testid="other-links-section"
      >
        <p
          className="font-medium text-[14px]/[22px] text-[#353535]"
          id="other-links-title"
          data-testid="other-links-title"
        >
          Other Links
        </p>
        {otherLinks.map((link, index) => (
          <div
            key={index}
            className="flex gap-[16px] mt-[16px] sm:flex-row flex-col"
            id={`other-link-item-${index}`}
            data-testid={`other-link-item-${index}`}
          >
            <Input
              placeholder="Title"
              value={link.title}
              onChange={(e) => updateOtherLink(index, { title: e.target.value })}
              className="h-[48px] sm:w-[30%] w-full"
              id={`other-link-title-${index}`}
              data-testid={`other-link-title-${index}`}
            />
            <Input
              placeholder="Link"
              value={link.link}
              onChange={(e) => updateOtherLink(index, { link: e.target.value })}
              className="h-[48px] sm:w-[70%] w-full"
              id={`other-link-url-${index}`}
              data-testid={`other-link-url-${index}`}
            />
          </div>
        ))}
        <button
          className="flex gap-[6px] mt-[18px] items-center text-[#0D978B] cursor-pointer"
          onClick={() =>
            setOtherLinks([...otherLinks, { title: '', link: '' }])
          }
          id="other-links-add-button"
          data-testid="other-links-add-button"
          type="button"
        >
          <Plus className="w-[18px] h-[18px]" />
          <p className="text-[14px]/[20px]">Add Link</p>
        </button>
      </div>
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import React, { JSX } from 'react';
import CheckDialog from '../../../../(protected)/recruitment/job-postings/components/checkDialog';

/**
 * ActionsCell Component
 *
 * Renders a dropdown menu with job posting actions such as Edit, View Applicants,
 * Duplicate, Close Job, Unpublish, and Delete. Each menu item is enhanced with
 * unique IDs and test IDs for automation testing.
 *
 * @returns {JSX.Element} A dropdown menu of action items
 */
export function ActionsCell(): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-7"
          mode="icon"
          variant="ghost"
          id="actions-menu-trigger"
          data-testid="actions-menu-trigger"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        id="actions-menu-content"
        data-testid="actions-menu-content"
      >
        <div
          className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
          id="action-edit"
          data-testid="action-edit"
        >
          Edit
        </div>
        <div
          className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
          id="action-view-applicants"
          data-testid="action-view-applicants"
        >
          View Applicants
        </div>
        <div
          className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
          id="action-duplicate"
          data-testid="action-duplicate"
        >
          Duplicate
        </div>
        <CheckDialog
          action="close"
          trigger={
            <div
              className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
              id="action-close-job"
              data-testid="action-close-job"
            >
              Close Job
            </div>
          }
        />
        <CheckDialog
          action="unpublish"
          trigger={
            <div
              className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
              id="action-unpublish"
              data-testid="action-unpublish"
            >
              Unpublish
            </div>
          }
        />
        <CheckDialog
          action="delete"
          trigger={
            <div
              className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
              id="action-delete"
              data-testid="action-delete"
            >
              Delete
            </div>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

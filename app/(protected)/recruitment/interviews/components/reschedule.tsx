'use client';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, div, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";

export default function Reschedule({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const [date, setDate] = useState<Date | null>(new Date());
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent close={false} className="max-w-[383px]">
            <div>
                <p className="text-[16px]/[20px] font-semibold text-[#353535]">Reschedule Interview</p>
                <p className="mt-[20px] text-[14px]/[16px] text-[#1c1c1c]">Select New Date & Time</p>
                <Popover>
                    <PopoverTrigger asChild className="mt-[12px]">
                        <Button
                            mode="input"
                            variant="outline"
                            id="date"
                            className={cn(
                                'w-full h-[48px] data-[state=open]:border-primary',
                                !date && 'text-muted-foreground',
                            )}
                        >
                            <CalendarDays className="-ms-0.5" />
                            {date ? moment(date).format('DD/MM/YYYY') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="single"
                            defaultMonth={date}
                            selected={date}
                            onSelect={(e) => setDate(e)}
                            numberOfMonths={1}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </DialogContent>
    </Dialog>;
}
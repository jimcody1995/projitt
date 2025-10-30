"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ReferencesPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);

    const references = [
        { id: 1, name: "Mike Nnadi", company: "Intely Care", email: "mikenandi@yahoo.com", phone: "+18628497980", relationship: "Coworker", status: "Completed", last: "Sep 27, 2025 2:43PM" },
        { id: 2, name: "Chidinma Omeire", company: "United Parcel Service", email: "chidimajoy2601@gmail.com", phone: "+16179226395", relationship: "Manager (Supervisor)", status: "Completed", last: "Sep 27, 2025 8:09PM" },
        { id: 3, name: "Chinonso Okeke", company: "Intely Care", email: "larryokeke@gmail.com", phone: "+18572349615", relationship: "Manager (Supervisor)", status: "Completed", last: "Sep 26, 2025 7:18PM" },
    ].filter(r => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="">
            {/* Header */}
            <div className="w-full flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-[24px] h-[24px] rounded-full border border-[#E9E9E9] flex justify-center items-center cursor-pointer" onClick={() => router.push('/employees/onboarding')}>
                        <ArrowLeft className="size-[12px] text-[#4B4B4B]" />
                    </div>
                    <p className="text-xl font-semibold text-[#1C1C1C] lg:text-[24px]/[30px]">References</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 w-full lg:w-auto">
                    <div className="relative w-full sm:w-[200px] lg:w-[243px]">
                        <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ps-9 h-[42px] w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 rounded-[8px] border border-[#D6E9F9] bg-transparent p-4">
                <p className="text-[14px]/[22px] text-[#1C1C1C]">
                    In order to continue your application, you need to identify at least <span className="font-semibold">3 References</span>. <span className="font-semibold">At least 2 of your References</span> must be, or have been, your direct managers.
                </p>

                <div className="mt-3">
                    <p className="text-[14px]/[22px] font-semibold text-[#1C1C1C]">To choose your References:</p>
                    <ul className="mt-2 ps-5 text-[14px] text-[#4B4B4B] space-y-1">
                        <li className="relative text-[14px] before:absolute before:-start-4 before:top-1.5 before:size-2 before:rounded-full before:bg-[#2F80ED]">
                            Follow your job history/resume. Do not leave gaps. Start with your supervisors/managers from each job. After completing the supervisors/managers, add peers, direct reports, or clients.
                        </li>
                        <li className="relative text-[14px] before:absolute before:-start-4 before:top-1.5 before:size-2 before:rounded-full before:bg-[#2F80ED]">
                            <span className="font-semibold">Remember, business references are preferred.</span> However, if you do not have enough business references, you can use people who have worked <i>closely</i> with you in other situations (e.g., volunteer or non-profit organizations, professional or civic associations, or academic institutions).
                        </li>
                        <li className="relative text-[14px] before:absolute before:-start-4 before:top-1.5 before:size-2 before:rounded-full before:bg-[#2F80ED]">
                            Never choose family members or friends; they are not appropriate as references.
                        </li>
                        <li className="relative text-[14px] before:absolute before:-start-4 before:top-1.5 before:size-2 before:rounded-full before:bg-[#2F80ED]">
                            Please note that some or all of your references may be contacted by phone to verify the details of your working relationship with them.
                        </li>
                    </ul>
                </div>

                <div className="mt-4">
                    <p className="text-[14px] font-semibold text-[#1C1C1C]">To enter the information for each Reference:</p>
                    <ol className="mt-2 space-y-1 ps-5 text-[14px] text-[#4B4B4B] list-decimal">
                        <li>Click the "Add Reference" button below.</li>
                        <li>When you have entered all your References, click the "Send Link to Reference(s)" button.</li>
                        <li>Each of your References will be sent an email or texts, asking them to fill out a brief survey about your job skills. To view a sample of this email, text or survey, click the links below.</li>
                    </ol>
                </div>
            </div>

            {/* Table */}
            <div className="mt-[16px] flex flex-col md:flex-row gap-4">
                {/* top title */}
                {/* Left: Table */}
                <div className="flex-1 overflow-x-auto gap-3 flex flex-col">
                    <p className="text-[14px]/[22px] font-semibold text-[#1C1C1C]">References</p>

                    <div className="flex  flex-col md:flex-row gap-3">
                        <div className="w-full overflow-x-auto scrollbar-auto">
                            <table className="w-full min-w-[900px] bg-white border !border-gray-300 rounded-[8px]">
                                <thead className="bg-[#F7F9F9] text-left text-[12px] text-[#8C8E8E]">
                                    <tr>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Name</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Company</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Email</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Mobile Phone Number</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Relationship</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Status</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Action</th>
                                        <th className="px-3 py-2 border-b border-[#E5E7EB]">Last Communication Sent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {references.map(r => (
                                        <tr key={r.id} className="text-[13px] text-[#4B4B4B]">
                                            <td className="px-3 py-2 border-b border-[#E5E7EB] underline text-[#2F80ED] cursor-pointer">{r.name}</td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{r.company}</td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{r.email}</td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{r.phone}</td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{r.relationship}</td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{r.status}</td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">
                                                <button className="text-primary hover:underline">Edit</button>
                                            </td>
                                            <td className="px-3 py-2 border-b border-[#E5E7EB]">{r.last}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="px-3 py-3" colSpan={8}>
                                            <div className="flex justify-end gap-2">
                                                <Button onClick={() => setIsAddOpen(true)}>Add Reference</Button>
                                                <Button variant="outline">Send Link to Reference(s)</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        {/* Right: Links panel */}
                        <aside className="block w-full md:w-[250px] flex-shrink-0">
                            <div className="bg-white border border-[#E5E7EB] rounded-[8px] overflow-hidden">
                                {[
                                    'Sample Survey',
                                    'Sample Email',
                                    'Sample Texts',
                                    'Privacy Policy',
                                    'Candidate Consent',
                                    'FAQ',
                                ].map((label, idx) => (
                                    <a key={label} className={`block px-4 py-2 text-[13px] text-[#2F80ED] hover:bg-[#F7F9F9] ${idx !== 5 ? 'border-b border-[#E5E7EB]' : ''}`} href="#">
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>


            </div>

            {/* Modal */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="w-[96%] sm:w-[95%] max-w-[95vw] sm:max-w-[640px] md:max-w-[860px] lg:max-w-[980px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Reference</DialogTitle>
                    </DialogHeader>
                    <AddReferenceForm onClose={() => setIsAddOpen(false)} />
                    <DialogFooter />
                </DialogContent>
            </Dialog>
        </div>
    );
}

function AddReferenceForm({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({
        salutation: "",
        firstName: "",
        lastName: "",
        contactMethod: "email",
        email: "",
        phoneCountry: "US",
        phoneCode: "+1",
        phone: "",
        country: "",
        city: "",
        state: "",
        workPhoneArea: "",
        workPhoneMid: "",
        workPhoneLast: "",
        referenceType: "Former",
        relationship: "Coworker",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        jobTitle: "",
        company: "",
    });

    const handleChange = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

    const Req = () => <span className="text-destructive ps-0.5">*</span>;
    const Label = ({ children }: { children: React.ReactNode }) => (
        <label className="text-[12px] text-[#8C8E8E] whitespace-nowrap">{children}</label>
    );
    const row = "grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] items-center gap-2 md:gap-3";
    const rowStart = "grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] items-start gap-2 md:gap-3";

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-3">
                <div className={row}>
                    <Label>Salutation <Req /></Label>
                    <Select value={form.salutation} onValueChange={(v) => handleChange('salutation', v)}>
                        <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Mr.">Mr.</SelectItem>
                            <SelectItem value="Ms.">Ms.</SelectItem>
                            <SelectItem value="Mrs.">Mrs.</SelectItem>
                            <SelectItem value="Dr.">Dr.</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={row}>
                    <Label>First name <Req /></Label>
                    <Input className="h-[38px]" value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                </div>
                <div className={row}>
                    <Label>Last name <Req /></Label>
                    <Input className="h-[38px]" value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                </div>
                <div className={row}>
                    <Label>Contact Method <Req /></Label>
                    <div className="flex gap-4 text-[13px] text-[#4B4B4B] h-[38px] items-center">
                        <label className="flex items-center gap-2"><input type="radio" name="contact" checked={form.contactMethod === 'email'} onChange={() => handleChange('contactMethod', 'email')} /> Email</label>
                        <label className="flex items-center gap-2"><input type="radio" name="contact" checked={form.contactMethod === 'text'} onChange={() => handleChange('contactMethod', 'text')} /> Text Message</label>
                        <label className="flex items-center gap-2"><input type="radio" name="contact" checked={form.contactMethod === 'both'} onChange={() => handleChange('contactMethod', 'both')} /> Both Email and Text</label>
                    </div>
                </div>
                <div className={rowStart}>
                    <Label>Email <Req /></Label>
                    <div>
                        <Input className="h-[38px]" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                        <button type="button" className="mt-1 text-[12px] text-[#2F80ED] hover:underline">Preview Email Request</button>
                    </div>
                </div>
                <div className={rowStart}>
                    <Label>Mobile Phone Number <Req /></Label>
                    <div>
                        <div className="flex gap-2">
                            <Select value={form.phoneCountry} onValueChange={(country) => {
                                const opt = COUNTRY_OPTIONS.find(c => c.value === country) || COUNTRY_OPTIONS[0];
                                setForm(prev => ({ ...prev, phoneCountry: country, phoneCode: opt.code }));
                            }}>
                                <SelectTrigger className="h-[38px] max-w-[60px]">
                                    <SelectValue placeholder="Code" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COUNTRY_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.flag} {opt.code}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input className="h-[38px] flex-1" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="Phone number" />
                        </div>
                        <button type="button" className="mt-1 text-[12px] text-[#2F80ED] hover:underline">Preview Text Request</button>
                    </div>
                </div>
                <div className={row}>
                    <Label>Country <Req /></Label>
                    <Select value={form.country} onValueChange={(v) => {
                        handleChange('country', v);
                        // reset state when country changes
                        handleChange('state', '');
                    }}>
                        <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            {COUNTRY_LIST.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={row}>
                    <Label>City <Req /></Label>
                    <Input className="h-[38px]" value={form.city} onChange={e => handleChange('city', e.target.value)} />
                </div>
                <div className={row}>
                    <Label>State <Req /></Label>
                    <Select value={form.state} onValueChange={(v) => handleChange('state', v)}>
                        <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            {(STATES_BY_COUNTRY[form.country] || DEFAULT_STATES).map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={row}>
                    <Label>Work phone <Req /></Label>
                    <div className="grid grid-cols-3 gap-2">
                        <Input className="h-[38px]" placeholder="###" value={form.workPhoneArea} onChange={e => handleChange('workPhoneArea', e.target.value)} />
                        <Input className="h-[38px]" placeholder="###" value={form.workPhoneMid} onChange={e => handleChange('workPhoneMid', e.target.value)} />
                        <Input className="h-[38px]" placeholder="####" value={form.workPhoneLast} onChange={e => handleChange('workPhoneLast', e.target.value)} />
                    </div>
                </div>
            </div>
            {/* Right column */}
            <div className="space-y-3">
                <div className={row}>
                    <Label>Reference type <Req /></Label>
                    <div className="flex gap-4 text-[13px] text-[#4B4B4B] h-[38px] items-center">
                        <label className="flex items-center gap-2"><input type="radio" name="rtype" checked={form.referenceType === 'Former'} onChange={() => handleChange('referenceType', 'Former')} /> Former</label>
                        <label className="flex items-center gap-2"><input type="radio" name="rtype" checked={form.referenceType === 'Current'} onChange={() => handleChange('referenceType', 'Current')} /> Current</label>
                    </div>
                </div>
                <div className={row}>
                    <Label>Reference is/was my <Req /></Label>
                    <Select value={form.relationship} onValueChange={(v) => handleChange('relationship', v)}>
                        <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Coworker">Coworker</SelectItem>
                            <SelectItem value="Manager (Supervisor)">Manager (Supervisor)</SelectItem>
                            <SelectItem value="Direct Report">Direct Report</SelectItem>
                            <SelectItem value="Client">Client</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={row}>
                    <Label>Worked together from <Req /></Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Select value={form.fromMonth} onValueChange={(v) => handleChange('fromMonth', v)}>
                            <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select Month" /></SelectTrigger>
                            <SelectContent>{MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={form.fromYear} onValueChange={(v) => handleChange('fromYear', v)}>
                            <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select Year" /></SelectTrigger>
                            <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>
                <div className={row}>
                    <Label>Worked together to <Req /></Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Select value={form.toMonth} onValueChange={(v) => handleChange('toMonth', v)}>
                            <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select Month" /></SelectTrigger>
                            <SelectContent>{MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={form.toYear} onValueChange={(v) => handleChange('toYear', v)}>
                            <SelectTrigger className="h-[38px]"><SelectValue placeholder="Select Year" /></SelectTrigger>
                            <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>
                <div className={row}>
                    <Label>Reference's job title when<br /> working with me <Req /></Label>
                    <Input className="h-[38px]" value={form.jobTitle} onChange={e => handleChange('jobTitle', e.target.value)} />
                </div>
                <div className={row}>
                    <Label>Company name <Req /></Label>
                    <Input className="h-[38px]" value={form.company} onChange={e => handleChange('company', e.target.value)} />
                </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="button" onClick={onClose}>Submit</Button>
            </div>
        </form>
    );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEARS = Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() - i));
const COUNTRY_OPTIONS = [
    { value: 'US', code: '+1', flag: '🇺🇸' },
    { value: 'CA', code: '+1', flag: '🇨🇦' },
    { value: 'GB', code: '+44', flag: '🇬🇧' },
    { value: 'NG', code: '+234', flag: '🇳🇬' },
    { value: 'IN', code: '+91', flag: '🇮🇳' },
];
const COUNTRY_LIST = ['United States', 'Canada', 'United Kingdom', 'Nigeria', 'India'];
const DEFAULT_STATES = ['N/A'];
const STATES_BY_COUNTRY: Record<string, string[]> = {
    'United States': ['Alabama', 'Alaska', 'Arizona', 'California', 'Florida', 'New York', 'Texas'],
    Canada: ['Alberta', 'British Columbia', 'Ontario', 'Quebec'],
    'United Kingdom': ['England', 'Northern Ireland', 'Scotland', 'Wales'],
    Nigeria: ['Abia', 'Lagos', 'Rivers', 'Kano'],
    India: ['Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu']
};

'use client'
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, CirclePlus, Loader2, Plus, Star, X } from "lucide-react";
import ApplicationSummary from "./application-summary";
import Resume from "./resume";
import ApplicantQuestions from "./applicant-questions";
import Stages from "./stages";
import ScheduleInterview from "./schedule-interview";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DialogContent, { Dialog, div, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Message from "../../components/message";
import { getApplicationInfo, rejectApplication } from "@/api/applications";
import { customToast } from "@/components/common/toastr";
import { useBasic } from "@/context/BasicContext";

interface DetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedApplication: any | null;
    getData: () => void;
}

export default function Detail({ open, onOpenChange, selectedApplication, getData }: DetailProps) {
    const [activeSection, setActiveSection] = useState<'stages' | 'application-summary' | 'resume' | 'applicant-question' | 'schedule-interview'>('stages');
    const [rejectOpen, setRejectOpen] = useState(false);
    const [preview, setPreview] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { country } = useBasic();
    const [applicantDetails, setApplicantDetails] = useState<any>({
        "id": 1,
        "applicant_id": 18,
        "job_id": 1,
        "address": "1335 Rosie Ln",
        "city": "Cedar Park",
        "state": "TX",
        "zip_code": "78613",
        "country": "USA",
        "contact_code": "+1",
        "contact_number": null,
        "status": "submitted",
        "linkedin_link": "http://asdf",
        "portfolio_link": "http://asdf",
        "cv_media_id": 49,
        "cover_media_id": 44,
        "skill_ids": [
            56,
            57
        ],
        "other_links": [],
        "skills": [
            {
                "id": 56,
                "name": "PHP",
                "slug": "php",
                "description": "PHP Skill",
                "type_id": 4,
                "created_by": null,
                "created_at": "2025-07-31T23:25:03.000000Z"
            },
            {
                "id": 57,
                "name": "Laravel",
                "slug": "laravel",
                "description": "Laravel Skill",
                "type_id": 4,
                "created_by": null,
                "created_at": "2025-07-31T23:25:03.000000Z"
            }
        ],
        "questions": [
            {
                "id": 4,
                "question_name": "How do you handle stress and pressure?",
                "answer_type": "long_detail",
                "options": null,
                "is_required": true,
                "correct_answer": null,
                "tags": [
                    "business"
                ],
                "created_at": "2025-07-31T23:25:03.000000Z",
                "updated_at": "2025-07-31T23:25:03.000000Z"
            },
            {
                "id": 6,
                "question_name": "What motivates you at work?",
                "answer_type": "long_detail",
                "options": null,
                "is_required": false,
                "correct_answer": null,
                "tags": [
                    "work",
                    "experience"
                ],
                "created_at": "2025-07-31T23:25:03.000000Z",
                "updated_at": "2025-07-31T23:25:03.000000Z"
            },
            {
                "id": 9,
                "question_name": "What are your salary expectations?",
                "answer_type": "checkbox",
                "options": [
                    "Neutral",
                    "Yes"
                ],
                "is_required": true,
                "correct_answer": null,
                "tags": [
                    "goals"
                ],
                "created_at": "2025-07-31T23:25:03.000000Z",
                "updated_at": "2025-07-31T23:25:03.000000Z"
            }
        ],
        "work_experience": [
            {
                "id": 3,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "Senior Software Engineer",
                "company": "TecCorp",
                "location": "San Francisco, CA",
                "from_date": "2020-04-25T00:00:00.000000Z",
                "to_date": "2023-04-24T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": "Worked on building scalable backend APIs using Laravel and Node.js."
            },
            {
                "id": 4,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "Senior Software Engineer",
                "company": "TechCorp",
                "location": "San Francisco, CA",
                "from_date": "2020-04-25T00:00:00.000000Z",
                "to_date": "2023-04-24T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": "Worked on building scalable backend APIs using Laravel and Node.js."
            },
            {
                "id": 5,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "Senior Software Engineer",
                "company": "TechCorp",
                "location": "San Francisco, CA",
                "from_date": "2020-04-25T00:00:00.000000Z",
                "to_date": "2023-04-24T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": "Worked on building scalable backend APIs using Laravel and Node.js."
            },
            {
                "id": 6,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "qwer",
                "company": "qwer",
                "location": "qwerqwer",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-08T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 7,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "sadfasd",
                "company": "asdf",
                "location": "asdf",
                "from_date": "2025-08-05T00:00:00.000000Z",
                "to_date": "2025-08-22T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 8,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "xcvbzxc",
                "company": "asdfasd",
                "location": "asdfasdf",
                "from_date": "2025-07-31T00:00:00.000000Z",
                "to_date": "2025-07-31T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 9,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "asdf",
                "company": "asdf",
                "location": "asdf",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 10,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "asdf",
                "company": "asdf",
                "location": "asdf",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 11,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "asdf",
                "company": "asdf",
                "location": "asdf",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 12,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "asdf",
                "company": "asdf",
                "location": "asdf",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 13,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "wert",
                "company": "wert",
                "location": "wert",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 14,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "wert",
                "company": "wert",
                "location": "wert",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 15,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "asdf",
                "company": "asdf",
                "location": "asdf",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 16,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "A",
                "company": "A",
                "location": "A",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": null
            },
            {
                "id": 17,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "B",
                "company": "B",
                "location": "B",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 18,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "C",
                "company": "C",
                "location": "C",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 19,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "A",
                "company": "A",
                "location": "A",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": null
            },
            {
                "id": 20,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "B",
                "company": "B",
                "location": "B",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 21,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "C",
                "company": "C",
                "location": "C",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 22,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "A",
                "company": "A",
                "location": "A",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": null
            },
            {
                "id": 23,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "B",
                "company": "B",
                "location": "B",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 24,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "C",
                "company": "C",
                "location": "C",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 25,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "A",
                "company": "A",
                "location": "A",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": null
            },
            {
                "id": 26,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "B",
                "company": "B",
                "location": "B",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 27,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "C",
                "company": "C",
                "location": "C",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": true,
                "role_description": null
            },
            {
                "id": 28,
                "job_id": 1,
                "applicant_id": 18,
                "job_title": "1",
                "company": "1",
                "location": "1",
                "from_date": "2025-08-01T00:00:00.000000Z",
                "to_date": "2025-08-01T00:00:00.000000Z",
                "is_currently_working": false,
                "role_description": "1"
            }
        ],
        "education": [
            {
                "id": 1,
                "job_id": 1,
                "applicant_id": 18,
                "school": "Harvard University",
                "degree_id": 5,
                "field_of_study": "Computer Science",
                "degree": {
                    "id": 5,
                    "name": "Sales",
                    "slug": "sales",
                    "description": "Sales Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 2,
                "job_id": 1,
                "applicant_id": 18,
                "school": "234",
                "degree_id": 2,
                "field_of_study": "1234234",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 3,
                "job_id": 1,
                "applicant_id": 18,
                "school": "234",
                "degree_id": 2,
                "field_of_study": "1234234",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 4,
                "job_id": 1,
                "applicant_id": 18,
                "school": "23423",
                "degree_id": 2,
                "field_of_study": "234234",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 5,
                "job_id": 1,
                "applicant_id": 18,
                "school": "23423",
                "degree_id": 2,
                "field_of_study": "234234",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 6,
                "job_id": 1,
                "applicant_id": 18,
                "school": "asdf",
                "degree_id": 2,
                "field_of_study": "asdf",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 7,
                "job_id": 1,
                "applicant_id": 18,
                "school": "qweqr",
                "degree_id": 2,
                "field_of_study": "qwer",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 8,
                "job_id": 1,
                "applicant_id": 18,
                "school": "A",
                "degree_id": 2,
                "field_of_study": "AA",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 9,
                "job_id": 1,
                "applicant_id": 18,
                "school": "BB",
                "degree_id": 1,
                "field_of_study": "CC",
                "degree": {
                    "id": 1,
                    "name": "Human Resources",
                    "slug": "human-resources",
                    "description": "Human Resources Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 10,
                "job_id": 1,
                "applicant_id": 18,
                "school": "A",
                "degree_id": 2,
                "field_of_study": "AA",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 11,
                "job_id": 1,
                "applicant_id": 18,
                "school": "BB",
                "degree_id": 1,
                "field_of_study": "CC",
                "degree": {
                    "id": 1,
                    "name": "Human Resources",
                    "slug": "human-resources",
                    "description": "Human Resources Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 12,
                "job_id": 1,
                "applicant_id": 18,
                "school": "A",
                "degree_id": 2,
                "field_of_study": "AA",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 13,
                "job_id": 1,
                "applicant_id": 18,
                "school": "BB",
                "degree_id": 1,
                "field_of_study": "CC",
                "degree": {
                    "id": 1,
                    "name": "Human Resources",
                    "slug": "human-resources",
                    "description": "Human Resources Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 14,
                "job_id": 1,
                "applicant_id": 18,
                "school": "A",
                "degree_id": 2,
                "field_of_study": "AA",
                "degree": {
                    "id": 2,
                    "name": "Finance",
                    "slug": "finance",
                    "description": "Finance Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            },
            {
                "id": 15,
                "job_id": 1,
                "applicant_id": 18,
                "school": "BB",
                "degree_id": 1,
                "field_of_study": "CC",
                "degree": {
                    "id": 1,
                    "name": "Human Resources",
                    "slug": "human-resources",
                    "description": "Human Resources Department",
                    "type_id": 1,
                    "created_by": null,
                    "created_at": "2025-07-31T23:25:03.000000Z"
                }
            }
        ],
        "certificate": [
            {
                "id": 13,
                "job_id": 7,
                "applicant_id": 18,
                "title": "AWS Certified Solutions Architect",
                "number": "AWS-12345678",
                "issued_date": "2022-01-15T00:00:00.000000Z",
                "expiration_date": "2025-01-15T00:00:00.000000Z"
            }
        ],
        "applicant": {
            "id": 18,
            "uuid": "JL18418",
            "first_name": "John",
            "middle_name": "Edward",
            "last_name": "Doe",
            "email": "james.lee@projitt.com",
            "first_login": 1,
            "created_at": "2025-08-01T01:16:36.000000Z",
            "updated_at": "2025-08-13T11:38:39.000000Z",
            "deleted_at": null,
            "role_id": 6,
            "otp": null,
            "otp_expires_at": null
        },
        "job": null,
        "cv_media": {
            "id": 49,
            "unique_name": "17546891099664040_real_size.pdf",
            "thumb_size": "17546891105839816_small_size.pdf",
            "medium_size": "17546891107485696_medium_size.pdf",
            "base_url": "https://projitt-dev-bucket.s3.amazonaws.com/",
            "folder_path": "",
            "original_name": "sample-local-pdf.pdf",
            "title": null,
            "extension": "pdf",
            "size": "48.51 KB",
            "alt_tag": "sample-local-pdf.pdf",
            "batch_no": null,
            "description": null,
            "created_by": null,
            "created_at": "2025-08-08T21:38:30.000000Z"
        },
        "cover_media": {
            "id": 44,
            "unique_name": "17546587793929040_real_size.pdf",
            "thumb_size": "17546587799099791_small_size.pdf",
            "medium_size": "17546587800446258_medium_size.pdf",
            "base_url": "https://projitt-dev-bucket.s3.amazonaws.com/",
            "folder_path": "",
            "original_name": "1.pdf",
            "title": null,
            "extension": "pdf",
            "size": "15.83 KB",
            "alt_tag": "1.pdf",
            "batch_no": null,
            "description": null,
            "created_by": null,
            "created_at": "2025-08-08T13:13:00.000000Z"
        }
    });
    const handleRejectApplication = async () => {
        try {
            setLoading(true);
            await rejectApplication([selectedApplication?.id]);
            customToast("Success", "Application rejected successfully", "success");
            getData();
            onOpenChange(false);
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        } finally {
            setLoading(false);
        }
    }

    // const getApplicantDetails = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getApplicationInfo(selectedApplication?.job_id, selectedApplication?.applicant_id);
    //         setApplicantDetails(response.data);
    //     } catch (error: any) {
    //         customToast("Error", error.response.data.message, "error");
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    // useEffect(() => {
    //     if (selectedApplication) {
    //         getApplicantDetails();
    //     }
    // }, [selectedApplication]);
    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 w-full sm:w-[667px] sm:max-w-none bg-[#f7f7f7] gap-[0px]">
                    <div className="px-[32px] py-[24px]">
                        <div className="w-full justify-between flex">
                            <div className="flex items-center gap-[10px]">
                                <Button
                                    mode="icon"
                                    variant="outline"

                                >
                                    <ChevronLeft className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                                <Button
                                    mode="icon"
                                    variant="outline"

                                >
                                    <ChevronRight className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <span className="text-[14px] text-[#626262]">{applicantDetails?.job?.title} ~ {country?.find((item: any) => item.id === applicantDetails?.job?.country_id)?.name}</span>
                                <Button
                                    mode="icon"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                >
                                    <X className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-[14px]/[22px] text-[#8f8f8f] mt-[16px]">{selectedApplication?.applicant_id}</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[22px]/[30px] font-medium flex items-center gap-[6px]">{selectedApplication?.first_name} {selectedApplication?.last_name} <Star className="size-[20px] text-[#353535]" /></p>
                                <div className="flex items-center gap-[12px] mt-[10px]">
                                    <div className="py-[5px] px-[9px] rounded-[9px] bg-[#d6eeec] text-[#0d978b] text-[14px]/[22px]">New</div>
                                    <div className="flex gap-[8px] py-[5px] px-[9px] text-[14px]/[22px] text-white bg-[#0d978b] rounded-[4px]">
                                        <span className="pr-[3.75px] border-r border-[#ffffff88]">86%</span>
                                        <span className="pr-[3.75px]">Stong Match</span>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-[42px]">
                                        <span className="text-[14px]/[20px] font-semibold">Actions</span>
                                        <ChevronDown className="size-[18px] text-white" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="bottom"
                                    align="end"
                                >
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                        onClick={() => setActiveSection('schedule-interview')}
                                    >
                                        Schedule Interview
                                    </div>
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                    >
                                        Hire & Send for Approval
                                    </div>
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                    >
                                        Send Message
                                    </div>
                                    <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
                                        <DialogTrigger asChild>
                                            <div
                                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                            >
                                                Reject
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent close={false}>
                                            <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                                <div className="flex flex-col">
                                                    <img src="/images/applicant/cancel.png" alt="" className="w-[95px] h-[95px] mx-auto" />
                                                    <span className="text-[28px]/[36px] font-semibold mt-[28px] text-[#353535] text-center">Reject Applicant</span>
                                                    <span className="text-[14px]/[24px] text-[#626262] mt-[8px] text-center">You're about to reject this applicant. They’ll be notified and and be removed from the hiring pipeline for this role.</span>
                                                    <span className="mt-[28px] text-[14px]/[24px] text-[#8f8f8f]">Select an email template</span>
                                                    <Select >
                                                        <SelectTrigger className="w-full h-[42px]">
                                                            <SelectValue placeholder="Offer Rejection Template" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <button className="flex w-full items-center  gap-[5px] cursor-pointer h-[42px] text-[#0d978b] hover:text-[#3c8b85] ml-[20px]">
                                                                <CirclePlus className="size-[20px] " />
                                                                <span className="text-[14px]/[24px]">Add Template</span>
                                                            </button>
                                                            <SelectItem value="1">Reject Letter</SelectItem>
                                                            <SelectItem value="2">Accept Letter</SelectItem>
                                                            <SelectItem value="3">Appointment Letter</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <button className="text-[14px]/[24px] text-[#0d978b] underline mt-[6px] text-start cursor-pointer" onClick={() => setPreview(true)}>Preview/Edit Email</button>
                                                    <div className="flex items-center gap-[12px] mt-[28px] w-full">
                                                        <Button variant="outline" className="w-full h-[42px]" onClick={() => setRejectOpen(false)}>Cancel</Button>
                                                        <Button className="bg-[#C30606] hover:bg-[#C30606] w-full h-[42px]" onClick={handleRejectApplication}>{loading ? <Loader2 className="size-[20px] animate-spin" /> : ''}Reject Applicant</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto sm:h-[56px] h-[80px]'>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${(activeSection === 'stages' || activeSection === 'schedule-interview') ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('stages')}>
                            <p className='whitespace-nowrap'>Stages</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${activeSection === 'application-summary' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('application-summary')}>
                            <p className='whitespace-nowrap'>Application Summary</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${activeSection === 'resume' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('resume')}>
                            <p className='whitespace-nowrap'>Resume</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${activeSection === 'applicant-question' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('applicant-question')}>
                            <p className='whitespace-nowrap'>Applicant Question</p>
                        </div>
                    </div>
                    {selectedApplication && activeSection === 'schedule-interview' ?
                        <ScheduleInterview setActive={setActiveSection} onOpenChange={onOpenChange} selectedApplication={selectedApplication} />
                        :
                        <div className="px-[32px] py-[24px] overflow-y-auto flex-1">
                            {activeSection === 'stages' && <Stages />}
                            {activeSection === 'application-summary' && <ApplicationSummary applicantDetails={applicantDetails} />}
                            {activeSection === 'resume' && <Resume applicantDetails={applicantDetails} />}
                            {activeSection === 'applicant-question' && <ApplicantQuestions questions={applicantDetails?.questions} />}
                        </div>
                    }

                </SheetContent >
            </Sheet >
            <Dialog open={preview} onOpenChange={setPreview}>
                <DialogContent close={false} className="md:max-w-[830px] w-full">
                    <DialogTitle></DialogTitle>
                    <div >
                        <div className="flex justify-between">
                            <p className="text-[22px]/[30px] font-medium text-[#1c1c1c]"> Offer Letter Template</p>
                            <div className="flex flex-col gap-[4px] items-end">
                                <span className="text-[12px]/[20px] text-[#0d978b] bg-[#d6eeec] px-[12px] py-[2px] rounded-[4px]">Offer Letter</span>
                                <span className="text-[12px]/[20px] text-[#626262]">Default</span>
                            </div>
                        </div>
                        <div className="w-full border border-[#e9e9e9] mt-[28px] rounded-[12px] h-[600px]">
                            <div className="p-[24px] bg-[#f9f9f9] w-full">
                                <p className="text-[18px]/[24px] font-medium text-[#1c1c1c]">Message Title</p>
                            </div>
                            <div className="p-[33px]">
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                            </div>
                        </div>
                        <div className="flex justify-end gap-[16px] pt-[28px] ">
                            <Button variant="outline" className="h-[42px]" onClick={() => setPreview(false)}>Go Back</Button>
                            <Button className="h-[42px]" onClick={() => setIsEdit(true)}>Edit Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Message
                open={isEdit}
                onOpenChange={setIsEdit}
            />
        </div >
    );
}
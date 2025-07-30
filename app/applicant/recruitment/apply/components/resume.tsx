'use client';

import React from 'react';
import FileDropUpload from './file-drop-upload';

export default function Resume() {
    const [resume, setResume] = React.useState<File | null>(null);
    const [otherDocuments, setOtherDocuments] = React.useState<File | null>(null);
  return (
    <div>
      <p className="font-medium text-[22px]/[30px]">Resume & Cover Letter</p>
      <p className="mt-[8px] text-[14px]/[13px] text-[#787878]">Upload resume and other attachments such as a cover letter below.</p>
      <div className="mt-[40px]">
        <FileDropUpload
          label="Resume"
          setFile={setResume}
          file={resume}
        />
        <FileDropUpload
          label="Other document"
          setFile={setOtherDocuments}
          file={otherDocuments}
        />
      </div>
    </div>
  );
}

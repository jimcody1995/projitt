'use client';

import React from 'react';
import FileDropUpload from './file-drop-upload';

/**
 * Resume component allows uploading of resume and other document files
 * with separate upload areas for each.
 */
export default function Resume() {
  // State to hold the uploaded resume file
  const [resume, setResume] = React.useState<File | null>(null);
  // State to hold other uploaded document (e.g., cover letter)
  const [otherDocuments, setOtherDocuments] = React.useState<File | null>(null);

  return (
    <div id="resume-container" data-testid="resume-container">
      <p
        className="font-medium text-[22px]/[30px]"
        id="resume-title"
        data-testid="resume-title"
      >
        Resume & Cover Letter
      </p>
      <p
        className="mt-[8px] text-[14px]/[13px] text-[#787878]"
        id="resume-description"
        data-testid="resume-description"
      >
        Upload resume and other attachments such as a cover letter below.
      </p>
      <div className="mt-[40px]" id="file-upload-section" data-testid="file-upload-section">
        <FileDropUpload
          label="Resume"
          setFile={setResume}
          file={resume}
          id="resume-upload"
          data-testid="resume-upload"
        />
        <FileDropUpload
          label="Other document"
          setFile={setOtherDocuments}
          file={otherDocuments}
          id="other-doc-upload"
          data-testid="other-doc-upload"
        />
      </div>
    </div>
  );
}

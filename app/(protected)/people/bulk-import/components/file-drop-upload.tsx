'use client';

import { Label } from '@/components/ui/label';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, FilePlus2, X } from 'lucide-react';
import React from 'react';
import { uploadMedia } from '@/api/media';
import { customToast } from '@/components/common/toastr';
import { Button } from '@/components/ui/button';

interface FileWithUrl {
  name: string;
  url: string;
}

export default function FileDropUpload({
  label,
  setFile,
  file,
  hasError = false,
}: {
  label: string;
  setFile: React.Dispatch<React.SetStateAction<File | FileWithUrl | null>>;
  file: File | FileWithUrl | null;
  hasError?: boolean;
}) {
  // Generate unique ID for this component instance
  /**
   * Callback triggered when a file is dropped or selected.
   * It updates the parent component's file state.
   */
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'uploading' | 'completed' | 'error'>('idle');
  const [uploadError, setUploadError] = React.useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setUploadStatus('uploading');
      setUploadProgress(5); // Start with 5% to show immediate feedback
      setUploadError('');

      // Simulate progress updates (you can replace this with actual progress tracking)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 15 + 5; // More realistic progress increments
        });
      }, 150);

      // const response = await uploadMedia({ media: acceptedFiles[0] });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('completed');

      setFile(acceptedFiles[0]);
      console.log(acceptedFiles[0]);

      // Reset progress after a delay
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadProgress(0);
      }, 3000); // Give users more time to see the success state

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadStatus('error');
      setUploadError(errorMessage);
      customToast('Error uploading file', errorMessage, 'error');
    }
  }, [setFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/csv': ['.csv'],
    },
    disabled: uploadStatus === 'uploading',
  });

  return (
    <div>
      <div className="mt-[19px]">
        <Label
          className="text-[14px]/[22px] font-medium text-[#353535]"
          data-test-id="file-upload-label"
        >
          {label}
        </Label>

        <div
          {...getRootProps()}
          className={`mt-[6px] h-[150px] w-full border-1 border-dashed rounded-xl p-10 text-center transition relative ${uploadStatus === 'uploading'
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : hasError
              ? 'border-[#C30606] hover:border-[#C30606] cursor-pointer'
              : 'border-gray-300 hover:border-teal-400 cursor-pointer'
            }`}
          data-test-id="file-drop-zone"
        >
          <input {...getInputProps()} data-test-id="file-input" />

          {/* Progress Bar - Inside the drop zone */}

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 rounded-xl">
            <div className="flex items-center justify-center gap-3 w-full max-w-xs">
              <FilePlus2 className="size-[56px] text-[#BCBCBC]" />
              <div>
                <p className="text-[14px]/[20px] text-[#787878]">Drop file or <span className="text-[#0D978B]">click to upload</span></p>
                <p className='text-[12px]/[18px] text-[#bcbcbc]'>Accepts .csv file types</p>
                <p className='text-[12px]/[18px] text-[#bcbcbc]'>Max size: 50mb</p>
              </div>
            </div>
          </div>

        </div>
        {file && <div className='w-full border border-[#e9e9e9] bg-[#fafafa] rounded-[8px] p-[20px] cursor-pointer mt-[12px] flex justify-between items-center'>
          <div className='flex items-center gap-[10px]'>
            <FileText className="size-[32px] text-[#0d978b]" />
            <p className="text-[14px]/[20px] text-[#353535]">{file?.name}</p>
          </div>
          <button className='cursor-pointer' onClick={() => setFile(null)}><X className="size-[20px]" /></button>
        </div>}
      </div>
    </div>
  );
}

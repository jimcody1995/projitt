import { Label } from '@/components/ui/label';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ChevronDown, ChevronUp, FileText, FileUp } from 'lucide-react';
import React from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

/**
 * FileDropUpload Component
 * ------------------------
 * A drag-and-drop or clickable file upload UI component specifically
 * for PDFs. It shows the selected file with an icon and filename,
 * allows toggling a PDF preview using a canvas, and updates the parent
 * component's file state on selection.
 * 
 * @param label - The label text shown above the upload area.
 * @param setFile - React state setter to update the selected File object.
 * @param file - The current selected File object or null.
 */
export default function FileDropUpload({
  label,
  setFile,
  file,
}: {
  label: string;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
}) {
  /**
   * onDrop callback: update the file state when a file is dropped or selected.
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  const [preview, setPreview] = React.useState<boolean>(false);

  /**
   * Effect to render PDF preview on canvas when file or preview toggles.
   */
  React.useEffect(() => {
    const renderPdf = async () => {
      if (!file || file.type !== 'application/pdf' || !preview) return;

      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context!, viewport, canvas }).promise;
      };
      fileReader.readAsArrayBuffer(file);
    };

    renderPdf();
  }, [file, preview]);

  return (
    <div>
      <div className="mt-[19px]">
        <Label
          htmlFor="file-upload-input"
          className="text-[14px]/[22px] font-medium text-[#353535]"
          data-test-id="file-upload-label"
          id="file-upload-label"
        >
          {label}
        </Label>
        {file ? (
          <div
            className="w-full border border-[#bcbcbc] rounded-[8px] p-[20px] cursor-pointer"
            onClick={() => setPreview(!preview)}
            data-test-id="file-selected-container"
            id="file-selected-container"
          >
            <div className="flex justify-between" id="file-selected-header">
              <div className="flex items-center gap-[10px]" id="file-selected-info">
                <FileText className="w-[20px] h-[20px]" aria-hidden="true" />
                <p className="text-[14px]/[20px] text-[#353535]" data-test-id="file-name" id="file-name">
                  {file.name}
                </p>
              </div>
              {preview ? (
                <ChevronUp className="w-[20px] h-[20px]" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-[20px] h-[20px]" aria-hidden="true" />
              )}
            </div>
            {preview && (
              <div className="mt-[10px]" id="pdf-preview-container" data-test-id="pdf-preview">
                <canvas
                  id="pdf-canvas"
                  className="w-full border border-[#e9e9e9] rounded-[10px]"
                  aria-label="PDF Preview Canvas"
                />
              </div>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="mt-[6px] sm:w-[464px] h-[150px] w-full border-1 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-teal-400 transition"
            data-test-id="file-drop-zone"
            id="file-drop-zone"
          >
            <input
              {...getInputProps()}
              data-test-id="file-input"
              id="file-upload-input"
              aria-describedby="file-upload-label"
              type="file"
            />
            <div
              className="flex flex-col items-center justify-center text-gray-400"
              data-test-id="file-drop-content"
              id="file-drop-content"
            >
              <FileUp className="w-[56px] h-[56px] text-[#0D978B]" aria-hidden="true" />
              <p className="text-[14px]/[20px] mt-[10px]" data-test-id="file-drop-instruction" id="file-drop-instruction">
                {isDragActive ? (
                  <span className="text-[#0D978B] font-medium">Drop file here...</span>
                ) : (
                  <>
                    Drop file or{' '}
                    <span className="text-[#0D978B] font-medium">click to upload</span>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

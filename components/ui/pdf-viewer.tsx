// components/PdfViewer.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../common/loading-spinner";

interface PdfViewerProps {
    url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const renderPDF = async () => {
            try {
                // Dynamically import pdfjs-dist only when needed
                const pdfjsLib = await import('pdfjs-dist');

                // Set up worker
                if (typeof window !== 'undefined') {
                    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
                }

                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;

                // Load first page
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1 });

                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext("2d");
                if (!context) return;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport, canvas }).promise;
                setLoading(false);
            } catch (error) {
                console.error('Error loading PDF:', error);
                setLoading(false);
            }
        };

        if (url && typeof window !== 'undefined') {
            renderPDF();
        }
    }, [url]);

    return (
        <div className="w-full">
            {loading && <LoadingSpinner />}
            <canvas className="w-full" ref={canvasRef}></canvas>
        </div>
    );
}

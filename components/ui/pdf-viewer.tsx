// components/PdfViewer.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export default function PdfViewer({ url }) {
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const renderPDF = async () => {
            const loadingTask = pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;

            // Load first page
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1 });

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            setLoading(false);
        };

        renderPDF();
    }, [url]);

    return (
        <div className="w-full">
            {loading && <p>Loading PDF...</p>}
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

"use client";

import { useEffect, useCallback } from "react";

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrImageBase64: string;
    rollNumber: string;
}

export default function QRModal({
    isOpen,
    onClose,
    qrImageBase64,
    rollNumber,
}: QRModalProps) {
    // Close modal on ESC key press
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const imageSrc = `data:image/png;base64,${qrImageBase64}`;

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = `${rollNumber.trim()}_qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            id="qr-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={handleOverlayClick}
        >
            <div
                id="qr-modal-card"
                className="relative mx-4 w-full max-w-sm animate-fade-in rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-8 shadow-2xl"
            >
                {/* Close button */}
                <button
                    id="qr-modal-close"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* QR Image (logo is already composited in the image by the backend) */}
                <div className="flex flex-col items-center">
                    <img
                        id="qr-image"
                        src={imageSrc}
                        alt={`QR code for ${rollNumber}`}
                        className="rounded-lg border border-white/5 shadow-lg"
                    />

                    <p className="mt-4 text-sm font-medium tracking-wide text-white/60">
                        {rollNumber.trim().toUpperCase()}
                    </p>

                    {/* Download button */}
                    <button
                        id="qr-download-btn"
                        onClick={handleDownload}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e94560] to-[#c23152] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download QR Code
                    </button>
                </div>
            </div>
        </div>
    );
}

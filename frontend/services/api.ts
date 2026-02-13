const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface QRResponse {
    success: boolean;
    image?: string;
    message?: string;
}

/**
 * Calls the backend API to generate a QR code for the given roll number.
 * Returns the base64-encoded PNG image on success.
 */
export async function generateQR(rollNumber: string): Promise<QRResponse> {
    const response = await fetch(`${BACKEND_URL}/api/generate-qr`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNumber }),
    });

    const data: QRResponse = await response.json();
    return data;
}


# 📄 Product Requirements Document (PRD)

## Project Name: Amrita Roll Number QR Generator

---

# 1. Overview

## 1.1 Purpose

Build a web application that:

* Accepts a student **roll number** via a text input field.
* Generates a **QR code encoding the roll number**.
* Displays the QR code in a **modal popup**.
* Embeds the **Amrita logo above the QR code**.
* Allows the user to **download the QR code image**.

The system should be implemented using a **full-stack architecture (Option B)**.

---

# 2. Goals

### Primary Goals

1. Generate QR code based on entered roll number.
2. Embed Amrita logo above the QR.
3. Show generated QR in modal.
4. Allow download as PNG.

### Secondary Goals

* Clean UI
* Simple backend API
* Production-ready structure

---

# 3. Functional Requirements

## 3.1 User Flow

1. User visits homepage.
2. User enters roll number.
3. User clicks "Generate QR".
4. Backend generates QR image.
5. Frontend displays modal containing:

   * Amrita logo (top)
   * QR code (below)
   * Download button
   * Close button

---

## 3.2 Input Specifications

| Field       | Type | Required | Validation                         |
| ----------- | ---- | -------- | ---------------------------------- |
| Roll Number | Text | Yes      | Alphanumeric only, 5–20 characters |

Validation rules:

* Trim whitespace
* No special characters except hyphen (if required)
* Show error if invalid

---

## 3.3 QR Code Specifications

### QR Content

The QR code should encode:

```
ROLL_NUMBER
```

(Plain text only, no URL unless specified later)

---

### QR Configuration

| Property         | Value      |
| ---------------- | ---------- |
| Size             | 300x300 px |
| Error Correction | Medium (M) |
| Format           | PNG        |
| Foreground       | Black      |
| Background       | White      |

---

## 3.4 Logo Requirements

* Logo file: `amrita-logo.png`
* Placement: Above QR code (NOT inside QR)
* Layout structure:

```
-----------------
|   AMRITA LOGO |
|               |
|     QR CODE   |
-----------------
```

The final downloadable image should include:

* Logo at top
* Proper spacing (20–30px)
* QR below
* Center aligned

---

## 3.5 Modal Requirements

Modal should:

* Overlay background with blur/dim effect
* Centered card layout
* Contain:

  * Logo
  * QR
  * Download button
  * Close button

Modal closes when:

* Clicking close button
* Clicking outside modal
* Pressing ESC

---

## 3.6 Download Feature

Download button should:

* Download combined image (logo + QR)
* Format: PNG
* File name format:

```
ROLLNUMBER_qr.png
```

Example:

```
CB12345_qr.png
```

---

# 4. Non-Functional Requirements

## 4.1 Performance

* QR generation < 500ms
* Modal opens instantly after generation

## 4.2 Security

* Input sanitization on backend
* Rate limiting (optional)
* No storage of roll numbers in database

## 4.3 Scalability

* Stateless backend
* Easily deployable to cloud

---

# 5. Technical Requirements

## 5.1 Architecture

Frontend:

* Next.js (App Router preferred)
* TailwindCSS for styling
* Axios or Fetch API

Backend:

* Node.js
* Express.js
* QR generation library (server-side)

---

## 5.2 Recommended QR Library (Backend)

Use one of:

* `qrcode`
* `qr-image`

Preferred: `qrcode` (Node package)

Example usage:

```js
const QRCode = require('qrcode');

QRCode.toBuffer(rollNumber, {
  width: 300,
  errorCorrectionLevel: 'M'
});
```

---

## 5.3 Image Composition (Logo + QR)

Backend should:

1. Generate QR buffer
2. Load Amrita logo
3. Combine both into single PNG

Recommended library:

* `sharp`

Composition logic:

* Canvas width: 350px
* Canvas height: 450px
* Logo resized to width 200px
* 30px margin between logo and QR

---

# 6. API Specification

## 6.1 Endpoint

```
POST /api/generate-qr
```

---

## 6.2 Request Body

```json
{
  "rollNumber": "CB12345"
}
```

---

## 6.3 Response

Success:

```json
{
  "success": true,
  "image": "base64_encoded_png"
}
```

Error:

```json
{
  "success": false,
  "message": "Invalid roll number"
}
```

---

# 7. Frontend Requirements

## 7.1 Page Layout

Single page containing:

* Title: "Amrita QR Generator"
* Roll number input
* Generate button

---

## 7.2 State Management

Maintain:

* rollNumber
* isLoading
* qrImageBase64
* isModalOpen
* error

---

## 7.3 UX Behavior

While generating:

* Disable button
* Show spinner

If error:

* Show inline error below input

---

# 8. Folder Structure

### Backend

```
backend/
  ├── server.js
  ├── routes/
  │     └── qr.js
  ├── assets/
  │     └── amrita-logo.png
  ├── package.json
```

---

### Frontend

```
frontend/
  ├── app/
  │     └── page.tsx
  ├── components/
  │     └── QRModal.tsx
  ├── services/
  │     └── api.ts
  ├── package.json
```

---

# 9. Deployment Requirements

Backend:

* Deploy on Render / Railway / AWS

Frontend:

* Deploy on Vercel

Environment variables:

```
BACKEND_URL
PORT
```

---

# 10. Acceptance Criteria

* Entering valid roll number generates QR
* Modal appears with logo above QR
* Download button downloads combined image
* Invalid input shows error
* No console errors
* Works on Chrome, Edge, Firefox

---

# 11. Out of Scope

* Authentication
* Database
* Analytics
* Dynamic QR updates
* Bulk upload
* Admin panel

---

# 12. Future Enhancements (Optional)

* Batch QR generation
* CSV upload
* Print-ready PDF export
* Dark mode
* Admin dashboard

---

# Final Instruction for Claude

Implement:

* Full-stack project
* Production-ready structure
* Clean, readable code
* No unnecessary features
* Follow best practices


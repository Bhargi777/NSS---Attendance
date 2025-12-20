# NSS Attendance System

A comprehensive, fool-proof attendance system for NSS coordinators with barcode/QR code scanning and manual entry support.

## 🎯 Features

### Core Features
- ✅ **Barcode/QR Code Scanning** - Scan student ID cards using device camera
- ✅ **Keyboard Scanner Support** - Works with USB/wireless barcode scanners
- ✅ **Manual Entry** - For students without ID cards
- ✅ **Firebase Cloud Storage** - All data stored securely in Firebase Firestore
- ✅ **Offline Support** - Saves locally when offline, syncs when online
- ✅ **Duplicate Detection** - Prevents accidental double entries
- ✅ **Real-time Validation** - Instant feedback on form errors
- ✅ **Attendance List** - View all recorded attendance with statistics

### Fool-Proof Features
- ✅ **Input Validation** - Prevents invalid data entry
- ✅ **Error Handling** - Graceful error messages and recovery
- ✅ **Confirmation Dialogs** - Prevents accidental data loss
- ✅ **Auto-fill** - Smart parsing of scanned barcodes
- ✅ **Visual Feedback** - Clear success/error indicators
- ✅ **Time Validation** - Ensures end time is after start time
- ✅ **Roll Number Generation** - Automatic roll number assembly
- ✅ **Backup Storage** - LocalStorage backup for offline scenarios

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Camera access (for barcode scanning)
- Internet connection (for Firebase sync)
- Firebase project configured

## 🚀 Setup Instructions

### 1. Firebase Setup

The Firebase configuration is already included in `index.html`. Your Firebase config is:
- Project ID: `attendance-nss-44e73`
- Already configured and ready to use!

### 2. Firebase Firestore Rules

Make sure your Firestore database has these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /attendance/{document=**} {
      allow read, write: if true; // Adjust based on your security needs
    }
  }
}
```

**Important:** For production, implement proper authentication and restrict access.

### 3. Running the Application

#### Option A: Simple HTTP Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

#### Option B: Direct File Open
Simply double-click `index.html` to open in your browser (some features may be limited).

#### Option C: Deploy to Web Server
Upload all files to any web hosting service (GitHub Pages, Netlify, Firebase Hosting, etc.)

## 📖 How to Use

### For Coordinators

1. **Open the Application**
   - Open `index.html` in a web browser
   - Grant camera permissions when prompted

2. **Set Session Details**
   - Select the **Date** of the session
   - Enter **Time Slot** (from and to times)
   - Select **Unit** (1-5)
   - Select **Department** (CSE, ECE, AIDS, CIV, MECH)
   - Select **Year** (1st or 2nd)

3. **Mark Attendance**

   **Option A: Scan ID Card**
   - Click "📷 Start Camera Scan"
   - Point camera at student's ID card barcode/QR code
   - The roll number will auto-fill
   - Verify the generated roll number is correct
   - Click "💾 Save Attendance"

   **Option B: Keyboard Scanner**
   - Click anywhere on the page
   - Scan barcode with USB/wireless scanner
   - Roll number will auto-fill
   - Click "💾 Save Attendance"

   **Option C: Manual Entry**
   - Click "✏️ Don't have ID card? Click here for manual entry"
   - Enter the full roll number manually
   - Click "💾 Save Attendance"

4. **View Attendance**
   - Scroll down to see "Today's Attendance" list
   - View statistics (Total Entries, Today's Count)
   - All entries are automatically saved to Firebase

### Roll Number Format

The system generates roll numbers in this format:
- **CSE**: `CB.SC.U{unit}CSE{yearCode}{last3}`
- **ECE**: `CB.EC.U{unit}ECE{yearCode}{last3}`
- **AIDS**: `CB.AI.U{unit}AIDS{yearCode}{last3}`
- **CIV**: `CB.CV.U{unit}CIV{yearCode}{last3}`
- **MECH**: `CB.ME.U{unit}MECH{yearCode}{last3}`

Where:
- `{unit}` = Unit number (1-5)
- `{yearCode}` = 24 for 2nd year, 25 for 1st year
- `{last3}` = Last 3 digits of roll number

Example: `CB.SC.U4CSE24268` (Unit 4, CSE, 2nd Year, last 3 digits: 268)

## 🔒 Data Storage

### Firebase Firestore
- **Collection**: `attendance`
- **Document Fields**:
  - `date`: Date string (YYYY-MM-DD)
  - `from`: Start time (HH:MM)
  - `to`: End time (HH:MM)
  - `unit`: Unit number (1-5)
  - `dept`: Department code
  - `year`: Year (1 or 2)
  - `last3`: Last 3 digits
  - `roll`: Complete roll number
  - `submitted_at`: Server timestamp

### LocalStorage Backup
- Key: `nss_attendance_backup`
- Automatically syncs to Firebase when online
- Prevents data loss during offline periods

## 🛡️ Fool-Proof Features Explained

1. **Duplicate Detection**
   - Checks if same roll number already marked present today
   - Shows warning before allowing duplicate entry
   - Requires confirmation to proceed

2. **Input Validation**
   - All required fields must be filled
   - Time validation (end > start)
   - Roll number format validation
   - Visual error indicators (red borders)

3. **Error Handling**
   - Graceful fallback to localStorage if Firebase fails
   - Clear error messages for users
   - Automatic retry mechanisms

4. **Offline Support**
   - Saves to localStorage when offline
   - Automatically syncs when connection restored
   - No data loss during network issues

5. **User Feedback**
   - Success/error alerts with auto-dismiss
   - Loading indicators during operations
   - Visual confirmation of saved entries

## 🐛 Troubleshooting

### Camera Not Working
- Check browser permissions (Settings > Privacy > Camera)
- Try a different browser
- Ensure camera is not being used by another app

### Firebase Errors
- Check internet connection
- Verify Firebase configuration in code
- Check Firebase console for quota limits
- Data will be saved locally as backup

### Barcode Not Scanning
- Ensure good lighting
- Hold camera steady
- Try manual entry as fallback
- Check if barcode format is supported

### Data Not Appearing
- Check Firebase console
- Verify Firestore rules allow read/write
- Check browser console for errors
- Try refreshing the page

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (iOS 11+)
- ✅ Opera

## 🔐 Security Notes

- **Current Setup**: Open read/write access (for testing)
- **Production**: Implement Firebase Authentication
- **Recommendation**: Add coordinator login system
- **Data Privacy**: Ensure compliance with data protection regulations

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify Firebase configuration
3. Check network connectivity
4. Review Firestore security rules

## 📝 License

This project is for internal NSS use at Amrita University.

---

**Made with ❤️ for NSS Coordinators**


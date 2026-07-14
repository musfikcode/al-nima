/**
 * Al-Nima Appointment Form → Google Sheets
 * 
 * Instructions: Paste this entire file into your Google Apps Script editor.
 * See GOOGLE_SHEETS_SETUP.md for full setup steps.
 */

// ── CONFIG ──────────────────────────────────────────────────────────────────
// Name of the sheet tab where responses will be saved.
const SHEET_NAME = 'Appointments';

// Column headers (order matters — must match the row written in doPost).
const HEADERS = [
  'Timestamp',
  'Patient Name',
  'Email',
  'Phone',
  'Age',
  'Gender',
  'City',
  'Hospital',
  'Department',
  'Doctor',
  'Preferred Date',
  'Preferred Time',
  'Urgency',
  'Symptoms',
  'Medical History',
  'Status'
];
// ────────────────────────────────────────────────────────────────────────────

/**
 * Handles POST requests from the appointment form.
 * Google Apps Script calls this automatically when the Web App receives a POST.
 */
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();

    // Parse the incoming JSON body
    const data = JSON.parse(e.postData.contents);

    // Build the row in the same order as HEADERS
    const row = [
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), // Timestamp (IST)
      data.patientName     || '',
      data.patientEmail    || '',
      data.patientPhone    || '',
      data.patientAge      || '',
      data.patientGender   || '',
      data.cityName        || data.cityId        || '',
      data.hospitalName    || data.hospitalId    || '',
      data.departmentName  || data.departmentId  || '',
      data.doctorName      || data.doctorId      || '',
      data.preferredDate   || '',
      data.preferredTime   || '',
      data.urgency         || '',
      data.symptoms        || '',
      data.medicalHistory  || '',
      'New'                                         // Default status
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests — useful for testing the Web App is live.
 * Visit the Web App URL in a browser to confirm it's working.
 */
function doGet() {
  return ContentService
    .createTextOutput('✅ Al-Nima Appointments Web App is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Returns the sheet, creating it with headers if it doesn't exist yet.
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    // First run: create the sheet and add headers
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);

    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#1a73e8');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

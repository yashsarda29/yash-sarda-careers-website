/**
 * NextMove Careers: save website sign-ups to this Google Sheet.
 *
 * How to use (once):
 *  1. Create a Google Sheet, e.g. "NextMove leads".
 *  2. In the sheet: Extensions > Apps Script. Delete what's there and paste this whole file. Save.
 *  3. Deploy > New deployment > Select type: Web app.
 *       Execute as: Me      Who has access: Anyone
 *     Click Deploy, allow the permissions, and copy the "Web app URL" (ends in /exec).
 *  4. Paste that URL into SHEET_ENDPOINT at the top of lead-gate.js on the website.
 *
 * Each sign-up, test start and download adds one row to the "Leads" tab.
 */
var SHEET_NAME = "Leads";
var HEADERS = ["Time", "Name", "Email", "Mobile", "Signed in with", "Wanted", "Page"];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), clean(p.name), clean(p.email), clean(p.phone), clean(p.method), clean(p.source), clean(p.page)]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

/* Short, plain text only; stops anything that looks like a spreadsheet formula */
function clean(v) {
  var s = String(v == null ? "" : v).slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

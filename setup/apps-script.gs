/**
 * ═══════════════════════════════════════════════════════════════════
 *  LEARN THAI WITH MIND — Google Apps Script
 *  Handles waiting list submissions + post-class reviews
 *  Sends email alerts when a class reaches the minimum students
 * ═══════════════════════════════════════════════════════════════════
 *
 *  HOW TO SET THIS UP (one-time, takes ~10 minutes):
 *
 *  1. Go to Google Sheets: https://sheets.google.com
 *     → Create a new blank spreadsheet
 *     → Name it "Learn Thai with Mind — Student Data"
 *     → Copy the spreadsheet ID from the URL:
 *        https://docs.google.com/spreadsheets/d/  <<<THIS PART>>>  /edit
 *     → Paste it below where it says YOUR_SPREADSHEET_ID_HERE
 *
 *  2. In the spreadsheet, open Extensions → Apps Script
 *     → Delete any existing code in the editor
 *     → Paste this entire file into the editor
 *     → Click Save (Ctrl+S or Cmd+S)
 *
 *  3. Deploy as a Web App:
 *     → Click "Deploy" (top right) → "New deployment"
 *     → Type: Web app
 *     → Description: Learn Thai with Mind Form Handler
 *     → Execute as: Me (your Google account)
 *     → Who has access: Anyone
 *     → Click "Deploy"
 *     → Authorise when prompted (click "Allow")
 *     → COPY the Web App URL — it looks like:
 *        https://script.google.com/macros/s/AKfycb.../exec
 *
 *  4. Paste that URL into your website:
 *     → Open private-class.html
 *     → Find the line:  const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
 *     → Replace YOUR_APPS_SCRIPT_URL_HERE with the URL you copied
 *     → Do the same in feedback.html
 *     → Save both files and push to GitHub
 *
 *  DONE! Test by submitting the waiting list form on your website.
 *  You should see the data appear in your Google Sheet within seconds.
 *
 *  NOTE: Whenever you edit this script, you must create a NEW deployment
 *  (Deploy → New deployment) and update the URL in your HTML files again.
 *  "Manage deployments" → Edit → update the version to deploy changes.
 * ═══════════════════════════════════════════════════════════════════
 */

// ── CONFIGURATION ── Change these values to your own ──────────────

const SPREADSHEET_ID   = 'YOUR_SPREADSHEET_ID_HERE';   // ← paste your Sheet ID here
const NOTIFY_EMAIL     = 'learnthaiwithmind@gmail.com'; // ← your email
const MIN_STUDENTS     = 3;                             // ← minimum to open a class

// Sheet tab names (created automatically on first submission)
const WAITLIST_TAB     = 'Waiting List';
const REVIEWS_TAB      = 'Reviews';

// ──────────────────────────────────────────────────────────────────


/**
 * Entry point — receives POST requests from the website forms
 */
function doPost(e) {
  try {
    var raw  = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    if (data.type === 'waitlist') {
      handleWaitlist(data);
    } else if (data.type === 'review') {
      handleReview(data);
    } else {
      throw new Error('Unknown submission type: ' + data.type);
    }

    return jsonResponse({ success: true });

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return jsonResponse({ success: false, error: err.message });
  }
}

/**
 * Required for CORS preflight requests from the browser
 */
function doGet(e) {
  return jsonResponse({ status: 'Learn Thai with Mind form handler is running.' });
}


// ── WAITING LIST ───────────────────────────────────────────────────

function handleWaitlist(data) {
  var sheet = getOrCreateSheet(WAITLIST_TAB, [
    'Timestamp', 'Name', 'Email', 'Phone / WhatsApp',
    'Class', 'Current Level', 'Why Learn Thai', 'Goals',
    'How They Found Mind', 'Notes', 'Notified?'
  ]);

  var row = [
    new Date(),
    data.name       || '',
    data.email      || '',
    data.phone      || '',
    data.cls        || '',
    data.level      || '',
    data.why        || '',
    data.goals      || '',
    data.howFound   || '',
    data.notes      || '',
    'No'
  ];

  sheet.appendRow(row);
  Logger.log('Waitlist entry added: ' + data.name + ' — ' + data.cls);

  // Check if this class has reached the minimum
  checkClassThreshold(sheet, data.cls, data.name);

  // Send Mind a quick notification for every new signup
  sendNewSignupEmail(data);
}

function checkClassThreshold(sheet, className, latestName) {
  var values = sheet.getDataRange().getValues();
  var count  = 0;

  // Count rows where the class matches (skip header row)
  for (var i = 1; i < values.length; i++) {
    var rowClass = values[i][4]; // column E = Class
    if (rowClass === className || rowClass === 'Any / Flexible') {
      count++;
    }
  }

  Logger.log('Class "' + className + '" now has ' + count + ' student(s) on list.');

  // Send the alert exactly when we hit the threshold
  if (count === MIN_STUDENTS) {
    var subject = '🎉 Class alert: "' + className + '" has reached ' + MIN_STUDENTS + ' students!';
    var body =
      'Hi Kru Mind!\n\n' +
      'Great news — the waiting list for:\n\n' +
      '  "' + className + '"\n\n' +
      'has just reached ' + MIN_STUDENTS + ' students (the minimum to open a class)!\n\n' +
      'The latest sign-up was: ' + latestName + '\n\n' +
      'Open your Google Sheet to see the full list of names, emails, levels and goals:\n' +
      'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit\n\n' +
      'Time to confirm the group, send them the Zoom link, and start teaching! 🇹🇭\n\n' +
      '— Your Learn Thai with Mind website (automatic notification)';

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    Logger.log('Threshold alert sent for: ' + className);
  }
}

function sendNewSignupEmail(data) {
  var subject = '📋 New waiting list sign-up: ' + data.name + ' — ' + data.cls;
  var body =
    'Hi Kru Mind,\n\n' +
    'Someone just joined the waiting list!\n\n' +
    '─────────────────────────────────\n' +
    'Name:        ' + data.name  + '\n' +
    'Email:       ' + data.email + '\n' +
    'Phone:       ' + (data.phone || '—') + '\n' +
    'Class:       ' + data.cls   + '\n' +
    'Level:       ' + data.level + '\n' +
    'How found:   ' + data.howFound + '\n' +
    '─────────────────────────────────\n' +
    'Why they want to learn Thai:\n' +
    data.why + '\n\n' +
    'Their goals:\n' +
    data.goals + '\n\n' +
    (data.notes ? 'Additional notes:\n' + data.notes + '\n\n' : '') +
    '─────────────────────────────────\n' +
    'See all sign-ups in your Google Sheet:\n' +
    'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit\n\n' +
    '— Your Learn Thai with Mind website';

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}


// ── POST-CLASS REVIEWS ─────────────────────────────────────────────

function handleReview(data) {
  var sheet = getOrCreateSheet(REVIEWS_TAB, [
    'Timestamp', 'Name', 'Email', 'Country', 'Class Attended',
    'Rating (1–5)', 'What They Enjoyed', 'Suggestions',
    'Testimonial Text', 'Share Permission', 'Published?'
  ]);

  var row = [
    new Date(),
    data.name           || '',
    data.email          || '',
    data.country        || '',
    data.cls            || '',
    data.rating         || '',
    data.enjoyed        || '',
    data.suggestions    || '',
    data.testimonial    || '',
    data.sharePermission || 'No',
    'No' // Published? — you update this manually when you add it to the site
  ];

  sheet.appendRow(row);
  Logger.log('Review added: ' + data.name + ' — ' + data.rating + '/5');

  sendNewReviewEmail(data);
}

function sendNewReviewEmail(data) {
  var stars = '';
  var r = parseInt(data.rating, 10) || 0;
  for (var i = 0; i < r; i++) stars += '⭐';

  var subject = stars + ' New review from ' + data.name + ' — ' + data.rating + '/5 stars';
  var body =
    'Hi Kru Mind!\n\n' +
    'You have a new class review! 🎉\n\n' +
    '─────────────────────────────────\n' +
    'From:    ' + data.name    + (data.country ? ' (' + data.country + ')' : '') + '\n' +
    'Email:   ' + data.email   + '\n' +
    'Class:   ' + data.cls     + '\n' +
    'Rating:  ' + stars + ' (' + data.rating + '/5)\n' +
    '─────────────────────────────────\n\n' +
    'What they enjoyed:\n' + data.enjoyed + '\n\n' +
    (data.suggestions ? 'Suggestions for improvement:\n' + data.suggestions + '\n\n' : '') +
    (data.testimonial  ?
      '─────────────────────────────────\n' +
      'TESTIMONIAL (for your website):\n\n' +
      '"' + data.testimonial + '"\n\n' +
      'Permission to share: ' + data.sharePermission + '\n' +
      '─────────────────────────────────\n\n'
      : '') +
    'See all reviews in your Google Sheet:\n' +
    'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit\n\n' +
    'To post a testimonial on your site, copy the text and add it to the\n' +
    'testimonials section in index.html or private-class.html.\n' +
    'Then set "Published?" = Yes in the spreadsheet so you know it\'s live.\n\n' +
    '— Your Learn Thai with Mind website';

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}


// ── HELPERS ────────────────────────────────────────────────────────

/**
 * Returns an existing sheet tab or creates it with the given headers
 */
function getOrCreateSheet(name, headers) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);

    // Style the header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1A3680');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);

    // Auto-resize columns
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 180);
    }

    Logger.log('Created new sheet tab: ' + name);
  }

  return sheet;
}

/**
 * Returns a JSON ContentService response
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

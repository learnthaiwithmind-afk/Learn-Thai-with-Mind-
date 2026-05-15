// =================================================================
//  LEARN THAI WITH MIND - Google Apps Script
//  Handles waiting list submissions + post-class reviews
//  Sends email alerts when a class reaches the minimum students
// =================================================================
//
//  HOW TO SET THIS UP (one-time, about 10 minutes):
//
//  STEP 1 - Create your Google Spreadsheet
//    Go to https://sheets.google.com
//    Create a new blank spreadsheet
//    Name it: Learn Thai with Mind - Student Data
//    Copy the spreadsheet ID from the URL:
//    https://docs.google.com/spreadsheets/d/ <<<THIS PART>>> /edit
//    Paste it below where it says YOUR_SPREADSHEET_ID_HERE
//
//  STEP 2 - Open Apps Script
//    In the spreadsheet: Extensions -> Apps Script
//    Delete any existing code, paste this entire file, then Save
//
//  STEP 3 - Deploy as a Web App
//    Click Deploy -> New deployment -> Type: Web app
//    Execute as: Me
//    Who has access: Anyone
//    Click Deploy, then Authorise when prompted
//    COPY the Web App URL (looks like: https://script.google.com/.../exec)
//
//  STEP 4 - Paste the URL into your website
//    Open private-class.html and feedback.html
//    Find: var APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
//    Replace YOUR_APPS_SCRIPT_URL_HERE with the URL you just copied
//    Save both files and push to GitHub
//
//  DONE! Submit a test form on your website to confirm it works.
//  Data should appear in your Google Sheet within a few seconds.
// =================================================================


// -- CONFIGURATION - Change these to your own ---------------------

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';    // paste your Sheet ID here
var NOTIFY_EMAIL   = 'learnthaiwithmind@gmail.com'; // your email address
var MIN_STUDENTS   = 3;                             // alert when a class hits this number

// Sheet tab names (created automatically on first submission)
var WAITLIST_TAB = 'Waiting List';
var REVIEWS_TAB  = 'Reviews';

// -----------------------------------------------------------------


// Entry point - receives POST requests from the website forms
function doPost(e) {
  try {
    var raw  = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    if (data.type === 'waitlist') {
      handleWaitlist(data);
    } else if (data.type === 'review') {
      handleReview(data);
    } else {
      throw new Error('Unknown type: ' + data.type);
    }

    return jsonResponse({ success: true });

  } catch (err) {
    Logger.log('Error: ' + err.message);
    return jsonResponse({ success: false, error: err.message });
  }
}

// Required so the Web App URL works (CORS preflight check)
function doGet(e) {
  return jsonResponse({ status: 'Learn Thai with Mind form handler is running.' });
}


// -- WAITING LIST -------------------------------------------------

function handleWaitlist(data) {
  var sheet = getOrCreateSheet(WAITLIST_TAB, [
    'Timestamp',
    'Name',
    'Email',
    'Phone / WhatsApp',
    'Class',
    'Current Level',
    'Why Learn Thai',
    'Goals',
    'How They Found Mind',
    'Notes',
    'Notified?'
  ]);

  sheet.appendRow([
    new Date(),
    data.name     || '',
    data.email    || '',
    data.phone    || '',
    data.cls      || '',
    data.level    || '',
    data.why      || '',
    data.goals    || '',
    data.howFound || '',
    data.notes    || '',
    'No'
  ]);

  Logger.log('Waitlist entry added: ' + data.name + ' - ' + data.cls);

  checkClassThreshold(sheet, data.cls, data.name);
  sendNewSignupEmail(data);
}

function checkClassThreshold(sheet, className, latestName) {
  var values = sheet.getDataRange().getValues();
  var count  = 0;

  // Count matching rows (skip header row at index 0)
  for (var i = 1; i < values.length; i++) {
    var rowClass = values[i][4]; // column E = Class
    if (rowClass === className || rowClass === 'Any / Flexible - open to any slot') {
      count++;
    }
  }

  Logger.log('Class "' + className + '" now has ' + count + ' student(s) on list.');

  // Send alert the moment the count hits the threshold
  if (count === MIN_STUDENTS) {
    var subject = 'Class alert: "' + className + '" has reached ' + MIN_STUDENTS + ' students!';
    var body = 'Hi Kru Mind!\n\n'
      + 'Great news - the waiting list for:\n\n'
      + '  "' + className + '"\n\n'
      + 'has just reached ' + MIN_STUDENTS + ' students (the minimum to open a class)!\n\n'
      + 'The latest sign-up was: ' + latestName + '\n\n'
      + 'Open your Google Sheet to see the full list:\n'
      + 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit\n\n'
      + 'Time to confirm the group, send the Zoom link, and start teaching!\n\n'
      + '- Your Learn Thai with Mind website (automatic notification)';

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    Logger.log('Threshold alert sent for: ' + className);
  }
}

function sendNewSignupEmail(data) {
  var subject = 'New waiting list sign-up: ' + data.name + ' - ' + data.cls;
  var body = 'Hi Kru Mind,\n\n'
    + 'Someone just joined the waiting list!\n\n'
    + '---------------------------------\n'
    + 'Name:       ' + data.name + '\n'
    + 'Email:      ' + data.email + '\n'
    + 'Phone:      ' + (data.phone || '-') + '\n'
    + 'Class:      ' + data.cls + '\n'
    + 'Level:      ' + data.level + '\n'
    + 'How found:  ' + data.howFound + '\n'
    + '---------------------------------\n'
    + 'Why they want to learn Thai:\n'
    + data.why + '\n\n'
    + 'Their goals:\n'
    + data.goals + '\n\n'
    + (data.notes ? 'Additional notes:\n' + data.notes + '\n\n' : '')
    + '---------------------------------\n'
    + 'See all sign-ups in your Google Sheet:\n'
    + 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit\n\n'
    + '- Your Learn Thai with Mind website';

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}


// -- POST-CLASS REVIEWS -------------------------------------------

function handleReview(data) {
  var sheet = getOrCreateSheet(REVIEWS_TAB, [
    'Timestamp',
    'Name',
    'Email',
    'Country',
    'Class Attended',
    'Rating (1-5)',
    'What They Enjoyed',
    'Suggestions',
    'Testimonial Text',
    'Share Permission',
    'Published?'
  ]);

  sheet.appendRow([
    new Date(),
    data.name            || '',
    data.email           || '',
    data.country         || '',
    data.cls             || '',
    data.rating          || '',
    data.enjoyed         || '',
    data.suggestions     || '',
    data.testimonial     || '',
    data.sharePermission || 'No',
    'No'
  ]);

  Logger.log('Review added: ' + data.name + ' - ' + data.rating + '/5');
  sendNewReviewEmail(data);
}

function sendNewReviewEmail(data) {
  var stars = '';
  var r = parseInt(data.rating, 10) || 0;
  for (var i = 0; i < r; i++) { stars += '*'; }

  var subject = 'New review from ' + data.name + ' - ' + data.rating + '/5 stars ' + stars;
  var body = 'Hi Kru Mind!\n\n'
    + 'You have a new class review!\n\n'
    + '---------------------------------\n'
    + 'From:    ' + data.name + (data.country ? ' (' + data.country + ')' : '') + '\n'
    + 'Email:   ' + data.email + '\n'
    + 'Class:   ' + data.cls + '\n'
    + 'Rating:  ' + data.rating + '/5 (' + stars + ')\n'
    + '---------------------------------\n\n'
    + 'What they enjoyed:\n' + data.enjoyed + '\n\n'
    + (data.suggestions ? 'Suggestions for improvement:\n' + data.suggestions + '\n\n' : '')
    + (data.testimonial
        ? '---------------------------------\n'
          + 'TESTIMONIAL (for your website):\n\n'
          + '"' + data.testimonial + '"\n\n'
          + 'Permission to share: ' + data.sharePermission + '\n'
          + '---------------------------------\n\n'
        : '')
    + 'See all reviews in your Google Sheet:\n'
    + 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit\n\n'
    + 'To post this testimonial on your site:\n'
    + '1. Copy the text above\n'
    + '2. Add it to the testimonials section in index.html\n'
    + '3. Set "Published?" = Yes in the spreadsheet so you know it is live\n\n'
    + '- Your Learn Thai with Mind website';

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}


// -- HELPERS ------------------------------------------------------

// Returns an existing sheet tab, or creates one with styled headers
function getOrCreateSheet(name, headers) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);

    // Style the header row (dark blue background, white bold text)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1A3680');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);

    // Set column widths
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 200);
    }

    Logger.log('Created new sheet tab: ' + name);
  }

  return sheet;
}

// Returns a JSON response
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

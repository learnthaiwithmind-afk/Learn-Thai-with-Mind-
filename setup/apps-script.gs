function config() {
  return {
    sheetId:     'YOUR_SPREADSHEET_ID_HERE',
    email:       'learnthaiwithmind@gmail.com',
    minStudents: 3,
    waitlistTab: 'Waiting List',
    reviewsTab:  'Reviews'
  };
}

// Receives form POST submissions from the website
function doPost(e) {
  try {
    var data = e.parameter; // form fields arrive as e.parameter
    if (data.type === 'waitlist') {
      handleWaitlist(data);
    } else if (data.type === 'review') {
      handleReview(data);
    }
    // Return a plain page so the hidden iframe loads without error
    return HtmlService.createHtmlOutput('<p>OK</p>');
  } catch (err) {
    Logger.log(err.message);
    return HtmlService.createHtmlOutput('<p>Error: ' + err.message + '</p>');
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput('<p>Learn Thai with Mind form handler is running.</p>');
}

function handleWaitlist(data) {
  var cfg   = config();
  var sheet = getSheet(cfg.sheetId, cfg.waitlistTab, [
    'Timestamp', 'Name', 'Email', 'Phone',
    'Class', 'Level', 'Why Learn Thai', 'Goals',
    'How Found', 'Notes', 'Notified'
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

  checkThreshold(cfg, sheet, data.cls, data.name);
  signupEmail(cfg, data);
}

function checkThreshold(cfg, sheet, className, latestName) {
  var rows  = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][4] === className || rows[i][4] === 'Any / Flexible - open to any slot') {
      count++;
    }
  }
  if (count === cfg.minStudents) {
    var subject = 'Class alert: ' + className + ' has reached ' + cfg.minStudents + ' students';
    var body    = 'Hi Kru Mind!\n\n'
      + 'The waiting list for "' + className + '" just reached '
      + cfg.minStudents + ' students.\n\n'
      + 'Latest sign-up: ' + latestName + '\n\n'
      + 'View your spreadsheet:\n'
      + 'https://docs.google.com/spreadsheets/d/' + cfg.sheetId + '/edit\n\n'
      + '- Learn Thai with Mind website';
    GmailApp.sendEmail(cfg.email, subject, body);
  }
}

function signupEmail(cfg, data) {
  var subject = 'New waiting list sign-up: ' + data.name;
  var body    = 'Hi Kru Mind,\n\n'
    + 'New waiting list entry:\n\n'
    + 'Name:      ' + data.name + '\n'
    + 'Email:     ' + data.email + '\n'
    + 'Phone:     ' + (data.phone || 'not provided') + '\n'
    + 'Class:     ' + data.cls + '\n'
    + 'Level:     ' + data.level + '\n'
    + 'How found: ' + data.howFound + '\n\n'
    + 'Why they want to learn Thai:\n' + data.why + '\n\n'
    + 'Their goals:\n' + data.goals + '\n\n'
    + (data.notes ? 'Notes:\n' + data.notes + '\n\n' : '')
    + 'View spreadsheet:\n'
    + 'https://docs.google.com/spreadsheets/d/' + cfg.sheetId + '/edit\n\n'
    + '- Learn Thai with Mind website';
  GmailApp.sendEmail(cfg.email, subject, body);
}

function handleReview(data) {
  var cfg   = config();
  var sheet = getSheet(cfg.sheetId, cfg.reviewsTab, [
    'Timestamp', 'Name', 'Email', 'Country',
    'Class', 'Rating', 'Enjoyed', 'Suggestions',
    'Testimonial', 'Share Permission', 'Published'
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

  reviewEmail(cfg, data);
}

function reviewEmail(cfg, data) {
  var r     = parseInt(data.rating, 10) || 0;
  var stars = '';
  for (var i = 0; i < r; i++) { stars += '*'; }
  var subject = 'New review: ' + data.name + ' - ' + data.rating + '/5 ' + stars;
  var body    = 'Hi Kru Mind!\n\n'
    + 'New class review:\n\n'
    + 'Name:    ' + data.name + (data.country ? ' (' + data.country + ')' : '') + '\n'
    + 'Email:   ' + data.email + '\n'
    + 'Class:   ' + data.cls + '\n'
    + 'Rating:  ' + data.rating + '/5\n\n'
    + 'What they enjoyed:\n' + data.enjoyed + '\n\n'
    + (data.suggestions ? 'Suggestions:\n' + data.suggestions + '\n\n' : '')
    + (data.testimonial
        ? 'Testimonial for website:\n"' + data.testimonial + '"\nPermission to share: '
          + data.sharePermission + '\n\n'
        : '')
    + 'View spreadsheet:\n'
    + 'https://docs.google.com/spreadsheets/d/' + cfg.sheetId + '/edit\n\n'
    + '- Learn Thai with Mind website';
  GmailApp.sendEmail(cfg.email, subject, body);
}

function getSheet(sheetId, tabName, headers) {
  var ss    = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setBackground('#1A3680');
    range.setFontColor('#FFFFFF');
    range.setFontWeight('bold');
    sheet.setFrozenRows(1);
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 200);
    }
  }
  return sheet;
}

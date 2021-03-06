// This constant is written in column for rows for which an email
// has been sent successfully.
var EMAIL_SENT = "EMAIL_SENT";

// column constants
//     this should be replaced by using named ranges
var TOKEN_IDX = 0
var TOKEN_COL_RANGE = "A:A"
var NAME_IDX = 1
var EMAIL_IDX = 3
var MESSAGE_IDX = 5
var CONFIRM_IDX = 6


function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 2;   // Number of rows to process
  // Fetch the range of cells
  var dataRange = sheet.getRange(startRow, 1, numRows, 7)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var token = row[TOKEN_IDX];
    var addressee = row[NAME_IDX];
    var emailAddress = row[EMAIL_IDX];
    var messagenote = row[MESSAGE_IDX];
    var emailSent = row[CONFIRM_IDX];
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates

      //MailApp.sendEmail(emailAddress, subject, message);
    // compose and send e-mail
    MailApp.sendEmail({
     to: emailAddress,
     subject: "You're Invited",
     htmlBody: addressee + ",<br> <br>" +
        "You're invited, info ingfo <br>" +
               "Your personal rsvp link<a href=\"sarahandkirk.github.io/rsvp/" + token + "/\"> here</a> <br>" +
        "closing <br><br>" +
        "PS: " + messagenote
      });

      sheet.getRange(startRow + i, CONFIRM_IDX).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}

/******************************************************************************
 * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
 * But has been simplified and cleaned up to make it more beginner friendly   *
 * All credit still goes to Martin and any issues/complaints/questions to me. *
 ******************************************************************************/

var TO_ADDRESS = "sarahandkirk.wedding@gmail.com"; // change this ...

function formatMailBodyRSVP(obj) { // function to spit out all the keys/values from the form in HTML
  var result = "";
  for (var key in obj) { // loop over the object passed to the function
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
    // for every key, concatenate an `<h4 />`/`<div />` pairing of the key name and its value,
    // and append it to the `result` string created at the start.
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    record_data(e);

    var mailData = e.parameters; // just create a slightly nicer variable name for the data

    // lookup token

    var guest_email = findTokenEmail(e.parameter["token"])

    MailApp.sendEmail({
      to: guest_email,
      bcc: TO_ADDRESS,
      subject: "Sarah & Kirk's Wedding RSVP Confirmation",
      // replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
      htmlBody: formatMailBodyRSVP(mailData)
    });

    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "emailfound":guest_email,
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }



}


function findTokenEmail(data) {

  var sheet  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('guestlist');
  var column = sheet.getRange(TOKEN_COL_RANGE);  // like A:A

  var values = column.getValues();
  var row = 0;

  while ( values[row][0] !== data ) {
    row++;
  }

  var email = sheet.getRange(row+1, EMAIL_IDX+1).getValue();
  return email;

}


/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */
function record_data(e) {
  Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName('replies'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }

}


/** Send condirmation e-mails
 *
*/
function sendEmailConfirmation(token) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 2;   // Number of rows to process
  // Fetch the range of cells
  var dataRange = sheet.getRange(startRow, 1, numRows, 7)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var token = row[TOKEN_IDX];
    var addressee = row[NAME_IDX];
    var emailAddress = row[EMAIL_IDX];
    var messagenote = row[MESSAGE_IDX];
    var emailSent = row[CONFIRM_IDX];
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates

      //MailApp.sendEmail(emailAddress, subject, message);
    // compose and send e-mail
    MailApp.sendEmail({
     to: emailAddress,
     subject: "You're Invited",
     htmlBody: addressee + ",<br> <br>" +
        "You're invited, info ingfo <br>" +
               "Your personal rsvp link<a href=\"sarahandkirk.github.io/rsvp/" + token + "/\"> here</a> <br>" +
        "closing <br><br>" +
        "PS: " + messagenote
      });

      sheet.getRange(startRow + i, CONFIRM_IDX).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}

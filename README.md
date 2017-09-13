# sarahandkirk.github.io
Wedding website

based on [Katie Ball](katieball.me/wedding-style)

## RSVP System 
To use RSVP system
### Decide text:
 - _includes/rsvplanding.md : text at the top of the invite page
 - rsvpthanks.md : confirmation text after submit
 - 


### Generate invite markdown
 1) Maintain a spreadsheet with columns for addressee, emailaddress, n_guests, token,  (a unique identifier), comment(used on rsvp page), message (used in e-mail).  Hard coded notes: 
    - Token needs to be the first column  for the csv to markdown conversion hard coded into .py
    - email address, addressee, token, message and 1st blank column are hard coded into .gs
 1) download that sheet and save in the the project folder as data.csv (.gitignored)
 2) run csv_md.py to generate markdown files for each invite

### Send e-mails from spreadsheet
1) confirm spreadsheet matches code by columns
2) edit invite text in .gs
3) from script, run sendemails function

### RSVP support developed by Sarah, starting from:
[sending form data to google sheet](https://github.com/dwyl/html-form-send-email-via-google-script-without-server)

[generating unique pages via collection](https://learn.cloudcannon.com/jekyll/introduction-to-jekyll-collections/)

Keep spreadsheet of guests with columns:
 - email
 - guest_name1
 - guest_name2
 - nguests
 - token
 -

Send e-mails from [sheet](https://developers.google.com/apps-script/articles/sending_emails)
 - with sample text
 - customized intro
 - customized url

Generate rsvp pages unique per person
 - /rsvp/token

 generate invite text from a separate markdown file and include that on a separate page panel, between the landing and rsvp form

 Set reply text in rsvp.html

https://github.com/EvanLovely/csv_to_jekyll/blob/master/csv_to_jekyll.py
    collections:
    my_collection:
    output: true

 - prefilled? --> to layouts rsvp.html
    <form method="POST" action="http://">
    <label for="guest_1">Guest One:</label>
    <input placeholder="{{site.rsvp.guest_name}}" id="guest_1" name="guest_1" size="15">
    <label for="guest_2">Guest One:</label>
    <input placeholder="{{site.rsvp.guest_name2}}" id="guest_2" name="guest_1" size="15">
    <label for="password">Response:</label>
    <input placeholder="Password" type="radio" id="password" name="password" size="15">
    <input type="submit" value="Login">
    </form>

 - with or without +1 space for name

Collect rsvp to sheet and send confirmation via e-mail with cc to wedding inox

### TO DO:

-
- figure out how to use generated html for e-mail invite
- rsvp catch page, menu item

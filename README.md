# GNEWS_ANNOYANCE_REMOVER

![google news annoynace remover](https://github.com/kellycode/GNEWS_ANNOYANCE_REMOVER/raw/main/preview.jpg)

Code is safe, clean, short and easy to read.  Nothing nefarious going on here.

Google seems to have an agreement with news providers that lets them show news as long as they show news from everywhere regardless of user prefs.  And, lately, they seem to be ignoring the "Hide all stories from" list.

This is brute force remove google news garbage.  Cookie and local storage stored keyword article remover by subject and source.  Hovering over a news source displays a "X" box that, when clicked, adds this provider to the junk list ("Temp" atm) and then scans and deletes news from that provider.
When a "c-wiz" box is empty of news from providersm that box is also removed.

The buttons:
Down arrows: Scroll to the bottom of the page and allows Google to load more news.  It's best to use these after every initial load completes to insure all news is loaded.
Up arrows:  Just returns to the top of the page
Submit: A junk topic can be added and removed from news items by simply inserting the name, adding a comma and clicking "Submit".  List is sorted later. This is a "Comma Seperated List" so maintain the same new line format.

On page load, the extension scrolls to the bottom every two seconds to encourage Google to load more news and sometimes that's not enough.  When page height seems to indicate that the loading seems to be complete, it scolls to the top.  When loading is complete, use the scroll button to check if loading is really finished.

Chrome extension and a work in progress

March '24: Updated and simplified everything
1. Junk news is listed as either the provider name or just entering text and a comma (maintain the new line format)
2. Cookie use removed and data is now kept in local storage for more space.
3. Code cleaned up and commented (Could be better)

Made this for my own use, I don't publish extension so feel free to do what you like with it

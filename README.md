# BoTG-Helper
Chrome Extension for http://baronsofthegalaxy.com

# Releases

(Front End) http://api.zvarpensg.xyz/
(Extension) https://chrome.google.com/webstore/detail/beta-botg-helper-extended/cnfemhcjojldnijpebkhccnjhbbhainm

# Purpose
Provide augmented information and display for BoTG, bringing quality of life improvements to the UI and general flow of the game.
The core principle of the extension is to provide a shared quick reference to the games cities info and stats, instead of juggling table displays, multiple windows, and manual math you'll be able to view, side by side compare, and calculate values from a single page in the game. 

# Features

City data scraping to public database
--------------
- Population
- Demand
- Industry
- Resources
- Corporations

Public Front-End for exploration of data
---------------
- Display all city info tabs on one page
- Upload "found" routes to share with the community
- Compare multiple cities with varying information on one page
- Plan city development
- Calculators for most decision making (geared towards new players)

Route Overview and Optimization
-------------
- Per order profit/turn, turns/order
- Overall profit + turns for full route
- Top 5 display of potential cities based on item/resource being bought/sold
- Turn calculation for movement between points
- Cargo hold optimization

QoL Improvements
----------------
- Auto-refresh after timer and game turn screen
- Queue table tabulation to show totals and finish times

# Development

Chrome Extensions allow scripts to be loaded 2 different ways, extension scope and document scope. 

Extension scope can send and listen for messages from the document scope, using Chrome specific javascript calls. 

Document scope is injected directly into the page and is ran as if originally included with the page.

Document Scope
--------------
I am using an autoload bootstrap method, utilizing web_accessible_resources in manifest.json. Any script added to the array will be loaded and injected into the game page.

Boot.js is the initial load point of the extension and is responsible for bootstrapping injected code

Thankfully jQuery is in use in the page, so no external loading of that is required. Feel free to use jQuery in document scope scripts

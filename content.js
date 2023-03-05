// content.js

// USEFUL THINGS
let setCookie = function (key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
};

let getCookie = function (key) {
    var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return keyValue ? keyValue[2] : null;
};

let eraseCookie = function (key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, "-1");
};

let removeExtraChars = function (str) {
    str = str.replace(/^[,\s]+|[,\s]+$/g, "");
    str = str.replace(/\s*,\s*/g, ",");
    return str;
};

// Draggable https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
//Make the DIV element draggagle:

function dragElement() {
    let elmnt = document.getElementById("managerBox");

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    let elementDrag = function (e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    };

    let dragMouseDown = function (e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    };

    let closeDragElement = function () {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    };

    if (document.getElementById("draggerBox")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById("draggerBox").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }
}

let getItems = function () {
    let block_string =
        ".ad-unit, .ezoic-ad, .stickyAd, #topAd, [id^='sltrib-promo'], " +
        ".video-ad-container, .art-sld-ad, " +
        ".js_sticky-top-ad, .ad_xrail, div[data-freestar-ad], [id^='google_ads'], .ads-336x280" +
        "";

    let blocks = $(block_string);

    let current = window.location.hostname;

    blocks.each(function (index, el) {
        if (!$(this).hasClass("blockMark")) {
            $(this).addClass("blockMark");
        }

        console.log("removing " + this);
        console.log("Removed from " + current);
    });
};

let commitNewsItems = function () {
    let textAreaVal = $("#mbTextBox").val();
    let cleanString = removeExtraChars(textAreaVal);
    setCookie("newsjunk", cleanString, 14);
    removeItems();
};

let removeJunkSites = function () {
    let safeSiteList = [
        "KTVN",
        "AirForceTimes.com",
        "Ars Technica",
        "BBC",
        "BleepingComputer",
        "Colorado Newsline",
        "Colorado Public Radio",
        "Connaught Telegraph",
        "Department of Defense",
        "Ghacks",
        "Irish Examiner",
        "Jefferson Public Radio",
        "Department of Justice",
        "KELOLAND.com",
        "Kotaku",
        "Military Times",
        "MPR News",
        "KRNV",
        "NPR",
        "Phys.org",
        "The Record-Courier",
        "RTE.ie",
        "Sierra Sun",
        "Singularity Hub",
        "Ski Area Management",
        "Smithsonian Magazine",
        "South Tahoe Now",
        "Tahoe Daily Tribune",
        "TechRepublic",
        "Windows Central",
    ];

    //console.log("removing garbage");

    // $("main c-wiz.D9SJMe c-wiz:contains(" + item + ")");

    let wizzers = $("main c-wiz.D9SJMe c-wiz");

    wizzers.each(function (index) {
        // the first one is the "For you" box
        if (index === 0) {
            return;
        }

        // collect the spans with the site name
        let spns = $(this).find("span.vr1PYe");

        // loop, get the main article parent,
        // remove the content and keep the name
        spns.each(function () {
            let name = $(this).text();

            if (!safeSiteList.includes(name)) {
                console.log("Found junk site " + name);
                let parent = $(this).closest("article");
                parent.find("div.XlKvRb").remove();
                parent.find("div.oovtQ").remove();
                parent.find("h4.JtKRv").remove();
                parent.find("figure.JtKRv").remove();
                parent.find("figure.K0q4G").remove();
                parent.find("div.UOVeFe").remove();

                parent.append($(this).html());

                parent.css({
                    backgroundColor: "black",
                    color: "#666",
                    padding: "10px",
                    borderRadius: "6px",
                });
            }
        });
    });
};

// direct remove
let removeItems = function () {
    // START GOOGLE NEWS
    // Default textbox words
    let gNewsWords = ["Twitch Star", "Ask Amy", "Prince Harry"];

    let appendManageBox = function () {
        let home = $("main");
        let height = $("body").height() - $("header").height();

        // EDITOR DIV
        let mBoxData = {
            id: "managerBox",
        };
        let newdiv = $("<div>", mBoxData);

        let blkBxData = {
            id: "draggerBox",
        };
        let blkBx = $("<div>", blkBxData);
        blkBx.on("mousedown", function (e) {
            e.stopPropagation;
            return false;
        });
        newdiv.append(blkBx);

        // EDITOR TEXT AREA
        let txtAreaData = {
            id: "mbTextBox",
        };
        let txtArea = $("<textarea>", txtAreaData);
        txtArea.on("mousedown", function (e) {
            e.stopPropagation;
            return false;
        });
        txtArea.append(gNewsWords.toString());
        newdiv.append(txtArea);

        let btnData = {
            id: "mbSubmitBtn",
        };
        let mbSubmit = $("<button>", btnData);
        mbSubmit.text("Submit");
        mbSubmit.click(commitNewsItems);
        newdiv.append(mbSubmit);

        let dnBtnData = {
            id: "dnBtn",
        };
        let dnBtnDiv = $("<div>", dnBtnData);
        dnBtnDiv.html("&#8650;");
        dnBtnDiv.click(function () {
            window.scrollTo(0, document.body.scrollHeight);
        });
        newdiv.append(dnBtnDiv);

        let upBtnData = {
            id: "upBtn",
        };
        let upBtnDiv = $("<div>", upBtnData);
        upBtnDiv.html("&#8648;");
        upBtnDiv.click(function () {
            window.scrollTo(0, 0);
        });
        newdiv.append(upBtnDiv);

        let checkBtnData = {
            id: "checkBtn",
        };
        let checkBtnDiv = $("<div>", checkBtnData);
        checkBtnDiv.html("&#9986;");
        checkBtnDiv.click(removeJunkSites);
        newdiv.append(checkBtnDiv);

        $("body").append(newdiv);

        dragElement();
    };

    if (window.location.hostname === "news.google.com") {
        // COOKIE HANDLERS
        // get the junk phrase list
        let newsJunk = getCookie("newsjunk");
        // if no cookie
        if (!newsJunk) {
            console.log("no newsjunk cookie");
            // if no cookie, use the local array
            newsJunk = gNewsWords;
            // and set it for next time
            let njString = newsJunk.toString();
            setCookie("newsjunk", njString, 14);

            // if we have a cookie
        } else {
            // string to array for convenience
            gNewsWords = newsJunk.split(",");
            //console.log(gNewsWords);
        }

        if (window.location.href.indexOf("foryou") !== -1) {
            // check for our manager box
            let managerBox = $("#managerBox");
            // if not there, make it
            if (managerBox.length === 0) {
                appendManageBox();
            }
        }

        // check each of the article boxes
        // c-wiz custom tag is used in place of divgarbage
        // need to keep and eye on the afJ4ge class as it's webpack crap
        let remover = function (item) {
            let junk = $("main c-wiz.D9SJMe c-wiz:contains(" + item + ")");
            if (junk.length > 0) {
                console.log(junk.length + " : " + item + "'s removed");
                junk.remove();
            }
        };

        // Default never want to see
        let defaultJunk = [
            "2023 USA",
            "Allianz",
            "Amy",
            "Athletics",
            "Avalanche",
            "Basketball",
            "Beyoncé",
            "Beyonce",
            "Black farmers",
            "Boredom B",
            "Brighton",
            "Hobe Albion",
            "Banksy",
            "Baseball",
            "Blockchain",
            "Broncos",
            "ChatGPT",
            "City-Builder",
            "Clippers",
            "Crypto Bro",
            "Crypto",
            "Curiosity rover",
            "Cyberstalking",
            "David Carrick",
            "Europa League",
            "Eurovis",
            "exoplanet",
            "Football",
            "football",
            "Fortnite",
            "genomes",
            "Gothataone",
            "Grammy",
            "Harry and Meghan",
            "Hockey",
            //"Hogwarts",
            "hockey",
            "Juneteenth",
            "Last Of Us",
            "Last of Us",
            "Leeds",
            "LGBTQ",
            "Lizzo",
            "Loppet",
            "long CO",
            "Magic Mike",
            "Man City",
            "Man Utd",
            "Minecraft",
            "NBA",
            "Newcastle United",
            "Netflix",
            "Nicaragua",
            "Nigeria",
            "Nigerian",
            "Nikki Haley",
            "Nintendo",
            "NFL",
            "NHL",
            "Not My",
            "Nuggets",
            "Odenkirk",
            "Opinion",
            "Overwatch",
            "Packers",
            "Phillies",
            "Pokémon",
            "Podcast",
            "Prince Harry",
            "Premier League",
            "PS5",
            "Rams",
            "Rugby",
            "rugby",
            "reddit",
            "Reddit",
            "Rihanna",
            "Rockies",
            "Scoreboard",
            "SDSU",
            "Shania",
            "Six Nations",
            "Squid G",
            "Streamer",
            "Summit League",
            "Super Bowl",
            "TikTok",
            "trans athletes",
            "Trump",
            "Twitch",
            "Twitter",
            "Vaginas",
            "WCSO",
            "West Ham",
            "Chelsea",
            "wrestlers",
            "wrestling",
            "Xbox",
            "YouTuber",
            "Zelda",
        ];

        //console.log(defaultJunk.sort());

        // Leave the main page with default blah
        if (window.location.href.indexOf("foryou") !== -1) {
            defaultJunk.forEach(remover);
        }

        gNewsWords.forEach(remover);
    }

    // END GOOGLE NEWS
};

// START IT UP

getItems();
removeItems();

let intTime = 5000;

// whatever
setInterval(function () {
    getItems();
    removeItems();
}, intTime);

let timer = null;

// and then call getItems when page is scrolled
window.addEventListener(
    "scroll",
    function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            getItems();
            removeItems();
        }, 500);
    },
    false
);

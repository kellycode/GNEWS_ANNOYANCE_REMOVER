// content.jssetCookie

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
    console.log(cleanString);
    // get which cookie we're saving to
    let cookieName = $(".mbTab.active").attr("data-cookie");
    // set it
    setCookie(cookieName, cleanString, 365);
    // updated so do a sweep
    removeItems();
};

let removeJunkSites = function () {
    // just used as a default, the
    // values are stored in a cookie
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
        "Stars and Stripes",
        "Tahoe Daily Tribune",
        "TechRepublic",
        "UltraRunning Magazine",
        "Windows Central",
        "WindowsReport.com",
    ];

    //console.log("removing garbage");

    // $("main c-wiz.D9SJMe c-wiz:contains(" + item + ")");

    let getApprovedSiteCookie = function () {
        // COOKIE HANDLERS
        let approvedNewsCookie = getCookie("newsApproved");

        // if no cookie
        if (!approvedNewsCookie) {
            console.log("no approvedNewsCookie");
            // if no cookie, use the local array
            approvedNewsCookie = safeSiteList.toString();
            // and set it for next time
            setCookie("newsApproved", approvedNewsCookie, 365);
            // now that we have a cookie
        }

        return approvedNewsCookie;
    };

    let getApprovedSiteCookieAsArray = function () {
        // COOKIE HANDLERS
        let approvedNewsCookie = getCookie("newsApproved");

        // if no cookie
        if (!approvedNewsCookie) {
            console.log("no approvedNewsCookie");
            // if no cookie, use the local array
            approvedNewsCookie = safeSiteList.toString();
            // and set it for next time
            setCookie("newsApproved", approvedNewsCookie, 365);
            // now that we have a cookie
        }

        return approvedNewsCookie.split(",");
    };

    let addToSafelist = function (name) {
        console.log("Adding " + name + " to safe list");

        // get the approved site list as a cookie string
        let approvedNewsCookie = getApprovedSiteCookie();

        // now we're sure we have a cookie
        // add the new site to it
        approvedNewsCookie += "," + name;

        // tidy up
        let cleanString = removeExtraChars(approvedNewsCookie);

        // set it
        setCookie("newsApproved", cleanString, 365);

        console.log("Site added to safe: " + cleanString);
    };

    let removeFromSafelist = function (name) {
        let removeValue = function (list, value) {
            return list.replace(new RegExp(",?" + value + ",?"), function (match) {
                var first_comma = match.charAt(0) === ",",
                    second_comma;

                if (first_comma && (second_comma = match.charAt(match.length - 1) === ",")) {
                    return ",";
                }
                return "";
            });
        };

        // get the cookie
        let approvedNewsCookie = getCookie("newsApproved");
        // do the remove
        approvedNewsCookie = removeValue(approvedNewsCookie, name);
        // set the cookie
        setCookie("newsApproved", approvedNewsCookie, 365);
        // notify
        console.log("Removal: " + name + " removed from safe list");
    };

    let wizzers = $("main c-wiz.D9SJMe c-wiz");

    console.log("WIZZERS: " + wizzers.length);

    wizzers.each(function (index) {
        // the first one is the "For you" box
        if (index === 0) {
            return;
        }

        // collect the spans with the site name
        let spns = $(this).find("span.vr1PYe");

        // TODO add remove approved site button down here

        // loop, get the main article parent,
        // remove most of the content and keep the name
        spns.each(function () {
            let name = $(this).text();

            let target = $(this).closest("article").find("time").parent();
            target.css({ position: "relative" });

            //let target = $(this).closest(".MCAGUe");

            let nameSpan = $('<span class="nameSpanOut" title="Remove from approved sites">(<span class="nameSpan">' + name + "</span>)</span>");

            nameSpan.on("mousedown", function (e) {
                let newsName = $(this).find(".nameSpan").text().trim();
                removeFromSafelist(newsName);
                e.stopPropagation;
            });

            if (!target.hasClass("marked")) {
                target.append(nameSpan);
                target.addClass("marked");
            }

            //.append('<span class="nameSpan">' + name + "</nspan>");

            let safeSiteArray = getApprovedSiteCookieAsArray();

            if (!safeSiteArray.includes(name)) {
                console.log("Found junk site " + name);
                let parent = $(this).closest("article");
                parent.find("div.XlKvRb").remove();
                parent.find("div.oovtQ").remove();
                parent.find("h4.JtKRv").remove();
                parent.find("figure.JtKRv").remove();
                parent.find("figure.K0q4G").remove();
                parent.find("div.UOVeFe").remove();

                // add back the dropdown menu
                parent.append($(this).html());

                // add a keep button to put it in the safe site list
                let keepBtn = $("<button id='keeperButton'>Add To SafeList</button>");
                keepBtn.on("click", function (e) {
                    addToSafelist(name);
                });
                parent.append(keepBtn);

                // make it minimal
                parent.css({
                    backgroundColor: "black",
                    color: "#666",
                    padding: "10px",
                    borderRadius: "6px",
                    position: "relative",
                });
            }
        });
    });
};

let switchFocused = function (textarea, cookieName) {
    console.log(textarea);
    setActiveTextVal(textarea, cookieName);
};

let setActiveTextVal = function (textarea, cookieName) {
    let cookieText = "";

    let tempTab = $("#mbTempTab");
    let permTab = $("#mbPermTab");

    if (cookieName === "tempNewsJunk") {
        cookieText = getCookie("tempNewsJunk");
        tempTab.addClass("active");
        permTab.removeClass("active");
    } else {
        cookieText = getCookie("permNewsJunk");
        tempTab.removeClass("active");
        permTab.addClass("active");
    }

    if (cookieText) {
        textarea.val(cookieText.split(",").join(",\n"));
    } else {
        console.log("No response for " + cookieName);
    }
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

        // Background div for drag
        let dragBoxData = {
            id: "draggerBox",
        };
        let dragBox = $("<div>", dragBoxData);
        dragBox.on("mousedown", function (e) {
            e.stopPropagation;
            return false;
        });
        newdiv.append(dragBox);

        // Text area
        let txtAreaData = {
            id: "mbTextBox",
        };
        let txtArea = $("<textarea>", txtAreaData);
        txtArea.on("mousedown", function (e) {
            e.stopPropagation;
        });
        setActiveTextVal(txtArea, "tempNewsJunk");
        newdiv.append(txtArea);

        // Temp/Perm list tabs
        let textBoxTabs = $('<div id="mbTextBoxTabs"></div>');
        let tempTab = $('<div id="mbTempTab" class="mbTab active" data-cookie="tempNewsJunk">Temp</div>');
        tempTab.click(function () {
            switchFocused(txtArea, "tempNewsJunk");
        });
        textBoxTabs.append(tempTab);
        let permTab = $('<div id="mbPermTab" class="mbTab" data-cookie="permNewsJunk">Perm</div>');
        permTab.click(function () {
            switchFocused(txtArea, "permNewsJunk");
        });
        textBoxTabs.append(permTab);
        newdiv.append(textBoxTabs);

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
        let newsJunk = getCookie("tempNewsJunk");
        // if no cookie
        if (!newsJunk) {
            console.log("no tempNewsJunk cookie");
            // if no cookie, use the local array
            newsJunk = gNewsWords;
            // and set it for next time
            let njString = newsJunk.toString();
            setCookie("tempNewsJunk", njString, 14);

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

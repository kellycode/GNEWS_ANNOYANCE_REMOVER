// content.jssetCookie

let tempNewsJunk = "";
let permNewsJunk = "";

let emptyCWizCount = 0;

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

let appendWatchItem = function(itemText) {
    let textArea = $("#mbTextBox");
    let textAreaVal = textArea.val();

    console.log("Adding watched item " + itemText);

    let newTextAreaVal = textAreaVal + (",\n" + itemText);
    textArea.val(newTextAreaVal)
}

// Using the added X block, adds item to list of junk news
let clickAddToJunk = function (event) {

    // data is just the item number in the ul (zero based)
    let lookedForText = event.data.lookForText;

    // get the element clicked
    let target = $(event.target);

    // append the news source to block to the list
    appendWatchItem(lookedForText);

    // it's now added to the list so we can do
    // same as clicking the "Submit" button
    commitNewsItems();

};


// Make the textarea div element draggagle
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

// adds a X box to add news sources to junk list
let markSourceItems = function () {
    let blocks = $(".hLNLFf button").parent().parent();

    blocks.each(function (index, el) {
        let mbc = $('<div class="myBtnsContainer"></div>');

        let hasf = $('<div class="killAllStoriesFrom" title="Mark this provider as junk news">X</div>');

        mbc.append(hasf);

        // add a custome class
        if ($(this).find(".killAllStoriesFrom").length === 0) {
            $(this).append(mbc);
            $(this).addClass("quickMarked");
        }

        let sText = $(this).parent().parent().parent().parent().find(".vr1PYe").text();
        //console.log(sText);

        // add the event listeners
        hasf.on("click", { lookForText: sText }, clickAddToJunk);
    });
}

// commit list to a cookie and localStorage and then remove them
let commitNewsItems = function () {
    let textAreaVal = $("#mbTextBox").val();
    let cleanString = removeExtraChars(textAreaVal);
    console.log("JUNK NEWS ITEMS: " + cleanString);
    // get which cookie we're saving to
    let cookieName = $(".mbTab.active").attr("data-cookie");
    // set it
    setCookie(cookieName, cleanString, 365);
    // set the item in localStorage
    localStorage.setItem(cookieName, cleanString);
    // do a sweep
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

        /*
        newsApproved defaults
        KTVN,AirForceTimes.com,Ars Technica,BBC,BleepingComputer,Colorado Newsline,Colorado Public Radio,Connaught Telegraph,Department of Defense,Ghacks,Irish Examiner,Jefferson Public Radio,Department of Justice,KELOLAND.com,Kotaku,Military Times,MPR News,KRNV,NPR,Phys.org,The Record-Courier,RTE.ie,Sierra Sun,Singularity Hub,Ski Area Management,Smithsonian Magazine,South Tahoe Now,Stars and Stripes,Tahoe Daily Tribune,TechRepublic,UltraRunning Magazine,Windows Central,WindowsReport.com,Defense News,TechTalks,Cornell University The Cornell Daily Sun,Nevada Appeal,TechCentral,GOV.UK,CDC,Pipestone County Star,Santa Cruz Sentinel,BBC News,KELOLAND News,Associated Press,Associated Press,KELO,GAA.ie,GAA.ie,Nation.Cymru,Federal Communications Commission,Cork GAA,Sioux County Radio,USGS Earthquake Hazards Program,NVIDIA GeForce,PC Guide - For The Latest PC Hardware & Tech News,Daily Record-News,Sierra Sun Times,UPS,Tech Times,Tech Times
        */

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

    let addToApprovedNewsSourceList = function (name) {
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

    let removeFromApprovedNewsSourceList = function (name) {
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
        let spns = $(this).find("div.vr1PYe");

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
                removeFromApprovedNewsSourceList(newsName);
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
                    addToApprovedNewsSourceList(name);
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
        let sortedCookieText = cookieText.split(",").sort().join(",\n");
        textarea.val(sortedCookieText);
    } else {
        console.log("No response for " + cookieName);
    }
};

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
    let tempTab = $('<div id="mbTempTab" class="mbTab active" data-cookie="tempNewsJunk">Junk News</div>');
    tempTab.click(function () {
        switchFocused(txtArea, "tempNewsJunk");
    });
    textBoxTabs.append(tempTab);
    let permTab = $('<div id="mbPermTab" class="mbTab" data-cookie="permNewsJunk">Planned</div>');
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
        title: "Edit specific news sources to safe list"
    };
    let checkBtnDiv = $("<div>", checkBtnData);
    checkBtnDiv.html("&#9986;");
    checkBtnDiv.click(removeJunkSites);
    newdiv.append(checkBtnDiv);

    $("body").append(newdiv);

    dragElement();
};

// direct remove
let removeItems = function () {
    // START GOOGLE NEWS
    // Default textbox words
    /*
    $2500,(Opinion),49ers,Adjutant,Aegor,Ammon,Amouranth,Arsenal,Ask Amy,Ask Joe,BTC,Barbenheimer,Beast,Barbie,Beyonc,Billy Strings,Boredom B,Capaldi,Champions League,Chase Int,Chauvin,Chelsea,Coldplay,Cormac,Crypto,Cyberpunk,Dai Y,Diagnosing d,Doctor Who,Europa League,FaZe,Flag Officer,Foo Fighters,French Open,Funko,Gay Men,High-risk,Hockey,Hubble,India court,Jalen,James Webb,Klimt,Lakers,Leong,LiFi,Lofi,Man City,Manchester City,Manchester United,Mario Bro,Marvel TV,Midjourney,Mosque call,MrBeast,NBA,NFL,Napoleon,Netball,Nigeria,Pokémon,Premier League,Prince Harry,QAnon,Queen Charlotte,Real Madrid,Roberts-Smith,SBF,Sameera,Shiv,Simpsons,Small Dog W,Spider-Verse,Stanley Cup,Succession,Super Mario,Taylor Swift,The Witcher,Trigun,Twitch,Twitch Star,Twitter,Vtuber,Webb,Webb S,West Ham,What I Eat,Wilhelm,Wimbledon,Wrestling,Wrexham,XFL,YouTube star,YouTuber,donut hole,double-decker,end of history,iPhone,juice jack,luxury picnic,mosque,older father,screen-based,student loan
    */
    let defaultTempNewsJunk = ["Twitch Star", "Ask Amy", "Prince Harry"];

    let newsRemAside = $("body").children("aside");
    newsRemAside.remove();

    let sourcesJunk = $("h2:contains('Sources')");
    sourcesJunk.css({ color: "red" });
    sourcesJunk.parent().parent().parent().css({ display: "none" });

    let tempNewsCookie = getCookie("newsJunk");
    if (tempNewsCookie) {
        defaultTempNewsJunk = tempNewsCookie.split(",").sort();
    }

    if (window.location.hostname === "news.google.com") {
        // COOKIE HANDLERS
        // get the junk phrase list
        let newsJunk = getCookie("tempNewsJunk");
        // if no cookie
        if (!newsJunk) {
            console.log("no tempNewsJunk cookie, looking for local storage");
             // if no cookie, use the localStorage
            newsJunk = localStorage.getItem('tempNewsJunk');
            // if no cookie, use the local array
            console.log("no localSorage data, setting string default");
            if (!newsJunk) {
                newsJunk = defaultTempNewsJunk;
            }
            // and set it for next time
            let njString = newsJunk.toString();
            setCookie("tempNewsJunk", njString, 14);

            // if we have a cookie
        } else {
            // string to array for convenience
            defaultTempNewsJunk = newsJunk.split(",").sort();
            //console.log(defaultTempNewsJunk);
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
            let junk = $("main c-wiz.D9SJMe c-wiz article:contains(" + item + ")");

            if (junk.length > 0) {
                console.log("Remover method working: " + junk.length + " : " + item + "'s removed");
                junk.remove();
            }

            // check for empty c-wiz blocks
            $( "main c-wiz.D9SJMe c-wiz" ).each(function( index ) {
                let articles = $(this).find('article');
                if(articles.length === 0) {
                    console.log("removing empty c-wiz block " + emptyCWizCount++);
                    $(this).remove();
                }
              });

        };

        // Default never want to see
        let defaultPermNewsJunk = ["2023 USA", "Allianz", "Zelda"];
        defaultTempNewsJunk.sort();

        let permNewsCookie = getCookie("permNewsJunk");
        if (permNewsCookie) {
            defaultPermNewsJunk = permNewsCookie.split(",").sort();
        }

        // Leave the main page with default blah
        if (window.location.href.indexOf("foryou") !== -1) {
            defaultPermNewsJunk.forEach(remover);
        }

        defaultTempNewsJunk.forEach(remover);
    }

    // END GOOGLE NEWS
};

// START IT UP

markSourceItems();
removeItems();

let intTime = 5000;

// whatever
setInterval(function () {
    markSourceItems();
    removeItems();
}, intTime);

let timer = null;

// and then call markSourceItems when page is scrolled
window.addEventListener(
    "scroll",
    function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            markSourceItems();
            removeItems();
        }, 500);
    },
    false
);

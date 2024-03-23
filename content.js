// content.js

let emptyCWizCount = 0;

// USEFUL THINGS
let setLocalStorage = function (name, csvData) {
    localStorage.setItem(name, csvData);
};

let getLocalStorage = function (name) {
    return localStorage.getItem(name);
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
    // set the item in localStorage
    localStorage.setItem(cookieName, cleanString);
    // do a sweep
    removeItems();
};

let setActiveTextValues = function (textarea, dataName) {
    let newsDataText = "";

    let tempTab = $("#mbTempTab");

    newsDataText = getLocalStorage("tempNewsJunk");
    tempTab.addClass("active");

    if (newsDataText) {
        let sortedNewsDataText = newsDataText.split(",").sort().join(",\n");
        console.log("Junk news count: " + sortedNewsDataText.length)
        textarea.val(sortedNewsDataText);
    } else {
        console.log("No response for " + dataName);
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
    setActiveTextValues(txtArea, "tempNewsJunk");
    newdiv.append(txtArea);

    // Temp/Perm list tabs
    let textBoxTabs = $('<div id="mbTextBoxTabs"></div>');
    let tempTab = $('<div id="mbTempTab" class="mbTab active" data-cookie="tempNewsJunk">Junk News Items</div>');

    textBoxTabs.append(tempTab);
    newdiv.append(textBoxTabs);

    let btnData = {
        id: "mbSubmitBtn",
    };

    let mbSubmit = $("<button>", btnData);
    mbSubmit.text("Submit");
    mbSubmit.attr("title", "Submit")
    mbSubmit.click(commitNewsItems);
    newdiv.append(mbSubmit);

    let dnBtnData = {
        id: "dnBtn",
    };

    let dnBtnDiv = $("<div>", dnBtnData);
    dnBtnDiv.html("&#8650;");
    dnBtnDiv.attr("title", "Scroll To Bottom");
    dnBtnDiv.click(function () {
        window.scrollTo(0, document.body.scrollHeight);
    });

    newdiv.append(dnBtnDiv);

    let upBtnData = {
        id: "upBtn",
    };

    let upBtnDiv = $("<div>", upBtnData);
    upBtnDiv.html("&#8648;");
    upBtnDiv.attr("title", "Scroll To Top");
    upBtnDiv.click(function () {
        window.scrollTo(0, 0);
    });

    newdiv.append(upBtnDiv);

    $("body").append(newdiv);

    dragElement();
};

// direct remove
let removeItems = function () {
    // START GOOGLE NEWS

    // Default textbox words only used if no loacl storage data
    let defaultTempNewsJunk = ["Twitch Star", "Ask Amy", "Prince Harry"];

    if (window.location.hostname === "news.google.com") {
        // COOKIE HANDLERS

        // get the junk items list
        let newsJunk = getLocalStorage("tempNewsJunk");

        // if no cookie
        if (!newsJunk) {

            // if no localSorage data, use the local array
            console.log("no localSorage data, setting string default");

            if (!newsJunk) {
                // just a short default list
                newsJunk = defaultTempNewsJunk;
            }

            // and set it for next time
            let njString = newsJunk.toString();
            setLocalStorage("tempNewsJunk", njString);

            // if we have local storage data
        } else {

            // string to array for convenience
            defaultTempNewsJunk = newsJunk.split(",").sort();
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
                // ADD TO WATCH REMOVAL INFO
                console.log("Remover method working: " + junk.length + " : " + item + "'s removed");
                junk.remove();
            }

            // check for empty c-wiz blocks
            $( "main c-wiz.D9SJMe c-wiz" ).each(function( index ) {
                let articles = $(this).find('article');
                if(articles.length === 0) {
                    //console.log("removing empty c-wiz block " + emptyCWizCount++);
                    $(this).remove();
                }
              });

        };

        // Default never want to see
        defaultTempNewsJunk.sort();
        defaultTempNewsJunk.forEach(remover);
    }
};

// START IT UP
markSourceItems();
removeItems();

// PAGE CHECK TIMER
// auto check every five seconds
let intTime = 5000;
// interval timer
setInterval(function () {
    markSourceItems();
    removeItems();
}, intTime);


// SCROLL LOAD TIMER
// as we reach the bottom, gnews loads more and that makes annoying page jumps
// it reaches some kind of max articles and stops loading more so here we want
// to do that all at once on page load

let currentScrollHeight = 0;
// Timing depends on page load and two seconds isn't always enough
let scrollIntTime = 2000;
// interval timer
let scrollerInterval = setInterval(function () {
    if(document.body.scrollHeight > currentScrollHeight) {
        console.log("Interval Scrolling")
        currentScrollHeight = document.body.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
    } else if (document.body.scrollHeight <= currentScrollHeight) {
        console.log("Done refreshing and scrolling to top");
        window.scrollTo(0, 0);
        clearInterval(scrollerInterval);
    }
}, scrollIntTime);


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

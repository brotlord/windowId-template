var LOCALSTORAGE_KEY = "PAGE_IDs";
var DUPLICATE_ACTIVE = "DUPLICATE_ACTIVE";
var pageIdValue = Math.floor(Math.random() * 3);
var existingPageIds = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

bindUnload();

if(existingPageIds == null || existingPageIds === "NaN") {
    existingPageIds = [];
}

console.log("Neue WindowId-Mock: " + pageIdValue + " \n Existing Window-Ids, die aus Local Storage gezogen wurden: " + existingPageIds);
    
if (existingPageIds.some(item => item ==  pageIdValue)) {
    console.log("Window mit WindowId " + pageIdValue + " ist bereits offen.");
    //Logik zum Fenster closen oder neue ID verteilaen etc.
    //Flag setzen, dass wenn Fenster auf active ist und noch nicht verfügbar, dann schließen
} else {
    insertWindowIdToLocalStorage();
}


function insertWindowIdToLocalStorage() {
    localStorage.setItem("entry", pageIdValue);

    //push to current page memory
    existingPageIds.push(localStorage.getItem("entry"));

    //push to browser memory
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(existingPageIds)); 

    console.log("Insert WIndow Id in LocalStorage erfolgreich. \nLocalStorage: " + localStorage.getItem(LOCALSTORAGE_KEY));
}

//kann womöglich raus
function checkForActiveTabs() {
    if (existingPageIds.some(item => item == pageIdValue)) {
        alert("Die Seite ist immernoch offen");
        //Logik zum Fenster closen oder neue ID verteilen etc.
        //clear Flag der offenen Fenster
    } else {
        insertWindowIdToLocalStorage();
    }
}

function removeWindow() {

    var index = existingPageIds.indexOf(JSON.stringify(pageIdValue));
    
    if (index !== -1) {
        existingPageIds.splice(index, 1);
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(existingPageIds));
} 


//ToDo: Refac mit VisibilityChange oder PageHide > ist aber nur für HIDE
function bindUnload()
{
    window.addEventListener('beforeunload', function ()
    {
            removeWindow();
    });

    window.addEventListener('unload', function ()
    {
            removeWindow();
    });
}
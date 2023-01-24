var LOCALSTORAGE_KEY = "PAGE_IDs";
var BLOCKED_PAGES = "BLOCKED_PAGES";
var pageIdValue = Math.floor(Math.random() * 3);
var existingPageIds = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
var blockedPagesIds = JSON.parse(localStorage.getItem(BLOCKED_PAGES));

bindUnloadAndStorageListeners();

if(existingPageIds == null || existingPageIds === "NaN") {
    existingPageIds = [];
}

if(blockedPagesIds == null || blockedPagesIds === "NaN") {
    blockedPagesIds = [];
}


console.log("Neue WindowId-Mock: " + pageIdValue + " \n Existing Window-Ids, die aus Local Storage gezogen wurden: " + existingPageIds);
    
if (existingPageIds.some(item => item ==  pageIdValue)) {

    console.log("Window mit WindowId " + pageIdValue + " ist bereits offen.");

    if (!(blockedPagesIds.some(item => item == pageIdValue))) {
        localStorage.setItem(BLOCKED_PAGES, JSON.stringify(pageIdValue));
    }
    
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

function removeWindow() {

    var index = existingPageIds.indexOf(JSON.stringify(pageIdValue));
    
    if (index !== -1) {
        existingPageIds.splice(index, 1);
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(existingPageIds));
} 


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

    window.addEventListener("storage", unblockPageIfClosedElsewhere(e));
}

function unblockPageIfClosedElsewhere(e) {
    existingPageIds = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (!(existingPageIds.some(item => item == pageIdValue))) {
        this.alert("Seite wird entblockt");
        //ToDo: Logik dafür
    }
}

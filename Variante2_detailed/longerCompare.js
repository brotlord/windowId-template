
window.addEventListener('focus', checkForActiveTabs());

    var LOCALSTORAGE_KEY = "PAGE_IDs";
    var pageIdValue = Math.floor(Math.random() * 3);
    var existingPageIds = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    
    bindUnload();
    
    
    console.log("neue random: " + pageIdValue + " \n ExistingPages, die aus Local Storage gezogen wurden: " + existingPageIds)
    
    if(existingPageIds == null) {
      existingPageIds = [];
    } 
        
    if (existingPageIds.some(item => item == pageIdValue)) {
        alert("Die Seite ist schonmal offen");
        //Logik zum Fenster closen oder neue ID verteilen etc.
    } else {
        insertWindowIdToLocalStorage();
    }


function insertWindowIdToLocalStorage() {
    localStorage.setItem("entry", pageIdValue);

    //push to current page memory
    existingPageIds.push(localStorage.getItem("entry"));

    //push to browser memory
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(existingPageIds)); 
}

//kann womöglich raus
function checkForActiveTabs() {
    if (existingPageIds.some(item => item == pageIdValue)) {
        alert("Die Seite ist immernoch offen");
        //Logik zum Fenster closen oder neue ID verteilen etc.
    } else {
        insertWindowIdToLocalStorage();
    }
}

function removeWindow() {

    var index = existingPageIds.indexOf(JSON.stringify(pageIdValue));
    
    console.log("Index in Array: " + index + "\n für zahl: " + pageIdValue)

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
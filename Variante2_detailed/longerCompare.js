var pageIdValue = Math.floor(Math.random() * 3);
var existingPageIds = JSON.parse(localStorage.getItem("pageIds"));
bindUnload();

console.log("neue random: " + pageIdValue + " \n ExistingPages, die aus Local Storage gezogen wurden: " + existingPageIds)

if(existingPageIds == null) {
  existingPageIds = [];
} 
    
if (existingPageIds.some(item => item == pageIdValue)) {
    console.log("Die Seite ist schonmal offen");
    //Logik zum Fenster closen oder neue ID verteilen etc.
} else {
    insertWindowIdToLocalStorage();
}


function insertWindowIdToLocalStorage() {
    localStorage.setItem("entry", pageIdValue);

    //push to current page memory
    existingPageIds.push(localStorage.getItem("entry"));

    //push to browser memory
    localStorage.setItem("pageIds", JSON.stringify(existingPageIds)); 
}

function removeWindow() {

    var index = existingPageIds.indexOf(pageIdValue);
    alert(index);

    if (index !== -1) {
        existingPageIds.splice(index, 1);
    }

    localStorage.setItem("pageIds", JSON.stringify(existingPageIds));
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
}
localStorage.openpages = Date.now();
window.addEventListener('storage', function(e) {
    if (e.key == "openpagtes") {
        localStorage.page_available = Date.now();
    }
    if (e.key == "page_available") {
        //Beliebige Logik für Duplikate einfügen
        this.alert("Gleiche Seite schon geöffnet.")
    }
})
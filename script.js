var enterBtn = document.getElementById('enterBtn');
var parkBtn = document.getElementById('parkBtn');
var parkInput = document.getElementById('parkInput');
var leaveBtn = document.getElementById('leaveBtn');
var leaveInput = document.getElementById('leaveInput');

var logArray = [];

enterBtn.addEventListener('click', function() {
    logAction('Wjazd', 0);
});
parkBtn.addEventListener('click', function() {
    logAction('Parkowanie', parkInput);
});
leaveBtn.addEventListener('click', function() {
    logAction('Opuszczanie', leaveInput);
});

function logAction(_action, _place) {
    var date = new Date();

    var logEvent = {
        action: _action,
        place: _place.value,
        date: date
    };
    /*
        logArray.push(logEvent);
        _place.value = "";

        console.log('logEvent', logEvent)
        localStorage.setItem(_action, logArray);
        const newVal = localStorage.getItem(_action);
        console.log(newVal + "to to ");
    */
    //<---------- TAK TO TAM DZIAŁA ALE JEST COŚ LEPSZEGO DO PRZETESTOWANIA 
    localStorage.setItem(_action, JSON.stringify(logEvent));
    let storageObject = JSON.parse(localStorage.getItem(_action));
    console.log(storageObject.action);
    console.log(storageObject.place);
    console.log(storageObject.date);


}

class ParkingDb {
    constructor() {
        this.button = document.querySelector('enterBtn');
    }

    init() {
        this.initializeIndexedDb();
        this.registerServiceWorker();
    }

    initializeIndexedDb() {
        let Parking = window.indexedDB.open('messageDb');

        Parking.onupgradeneeded = (event) => {
            let db = event.target.result;
            let messageObjStore = db.createObjectStore('messageObjStore', { autoIncrement: true });

            messageObjStore.createIndex('action', 'action', { unique: false });
            messageObjStore.createIndex('place', 'place', { unique: false });
            messageObjStore.createIndex('date', 'date', { unique: true });

        }
    }

}
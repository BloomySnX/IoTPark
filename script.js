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
    getFormData() {
        return {
            name: _action,
            place: _place.value,
            dateAdded: new Date()
        };
    }

}

class Parking {
    constructor() {
        this.button = document.querySelector('enterBtn');
    }

    init() {
        this.initializeIndexedDb();
        this.registerServiceWorker();
    }

    initializeIndexedDb() {
            let Wjazd = window.indexedDB.open('messageDb');

            Wjazd.onupgradeneeded = (event) => {
                let db = event.target.result;
                let messageObjStore = db.createObjectStore('messageObjStore', { autoIncrement: true });

                messageObjStore.createIndex('action', 'action', { unique: false });
                messageObjStore.createIndex('place', 'place', { unique: false });
                messageObjStore.createIndex('dateAdded', 'dateAdded', { unique: true });
            }
        }
        //tutaj zabawa
    getFormData() {
        return {
            name: _action,
            place: _place.value,
            dateAdded: new Date()
        };
    }

    formDataToDb() {
        return new Promise((resolve, reject) => {
            let Wjazd = window.indexedDB.open('messageDb');

            Wjazd.onsuccess = event => {
                let objStore = Wjazd.result.transaction('messageObjStore', 'readwrite')
                    .objectStore('messageObjStore');
                objStore.add(this.getFormData());
                resolve();
            }

            Wjazd.onerror = err => {
                reject(err);
            }
        });
    }

    formDataToServer() {
        return fetch('your server url', {
            method: 'POST',
            body: JSON.stringify(this.getFormData()),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            console.log('Wiadomośc wysłana');
        }).catch((err) => {
            console.log(`Wystąpił błąd: ${err}`);
        })
    }

    registerServiceWorker() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    if (registrations.length === 0) {
                        navigator.serviceWorker.register('serviceWorker.js');
                    }
                })
                .then(() => {
                    return navigator.serviceWorker.ready;
                })
                .then(registration => {
                    this.button.addEventListener('click', (event) => {
                        event.preventDefault();
                        this.formDataToDb().then(function() {
                            if (registration.sync) {
                                registration.sync.register('message-to-king')
                                    .catch(function(err) {
                                        return err;
                                    })
                            }
                        });
                    })
                })
        } else {
            this.button.addEventListener('click', () => {
                this.formDataToServer();
            });
        }
    }
}

const coreJs = new kingsPage();

window.addEventListener('load', () => {
    coreJs.init();
});
class Parking {
    constructor() {
        this.enterBtn = document.getElementById('enterBtn');
        this.parkBtn = document.getElementById('parkBtn');
        this.parkInput = document.getElementById('parkInput');
        this.leaveBtn = document.getElementById('leaveBtn');
        this.leaveInput = document.getElementById('leaveInput');

    }

    init() {
        this.initializeIndexedDb();
        this.registerServiceWorker();
    }

    initializeIndexedDb() {
        let messageLog = window.indexedDB.open('Parking');

        messageLog.onupgradeneeded = (event) => {
            let db = event.target.result;
            let logObjStore = db.createObjectStore('logObjStore', { autoIncrement: true });

            logObjStore.createIndex('action', 'action', { unique: false });
            logObjStore.createIndex('place', 'place', { unique: false });
            logObjStore.createIndex('date', 'date', { unique: false });
        }
    }
    logAction(_action, _place) {
        return {
            action: _action,
            place: _place.value,
            date: new Date()


        };
    }
    formDataToDb(_action, _place) {
        return new Promise((resolve, reject) => {
            let messageLog = window.indexedDB.open('Parking');

            messageLog.onsuccess = event => {
                let objStore = messageLog.result.transaction('logObjStore', 'readwrite')
                    .objectStore('logObjStore');
                objStore.add(this.logAction(_action, _place));
                resolve();
            }

            messageLog.onerror = err => {
                reject(err);
            }
        });


    }
    formDataToServer() {
        console.log(JSON.stringify(this.getFormData()));


    }
    registerServiceWorker() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    if (registrations.length === 0) {
                        navigator.serviceWorker.register('service-worker.js');
                    }
                })
                .then(() => {
                    return navigator.serviceWorker.ready;
                })
                .then(registration => {
                    this.enterBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        this.formDataToDb("Wjazd", 0).then(function() {
                            if (registration.sync) {
                                registration.sync.register('message-to-log')
                                    .catch(function(err) {
                                        return err;
                                    })
                            }
                        });
                    })
                    this.parkBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        this.formDataToDb("Parkowanie", parkInput).then(function() {
                            if (registration.sync) {
                                registration.sync.register('message-to-log')
                                    .catch(function(err) {
                                        return err;
                                    })
                            }
                        });
                    })
                    this.leaveBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        this.formDataToDb("Opuszczanie", leaveInput).then(function() {
                            if (registration.sync) {
                                registration.sync.register('message-to-log')
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
const coreJs = new Parking();
window.addEventListener('load', () => {
    coreJs.init();
});


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

    localStorage.setItem(_action, JSON.stringify(logEvent));
    let storageObject = JSON.parse(localStorage.getItem(_action));
    console.log(storageObject.action);
    console.log(storageObject.place);
    console.log(storageObject.date);

    constructor() {
        this.button = document.querySelector('#form-button');
    }

}
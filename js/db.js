export const request = window.indexedDB.open('chelseaDB', 5);
export let db;

request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('news')) {
        let objectStore = db.createObjectStore('news', { autoIncrement: true });
        objectStore.createIndex('key', 'key', { unique: false });
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('text', 'text', { unique: false });
        objectStore.createIndex('image', 'image', { unique: false });
    }
    if (!db.objectStoreNames.contains('comments')) {
        let objectStore = db.createObjectStore('comments', { autoIncrement: true });
        objectStore.createIndex('date', 'date', { unique: false });
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('text', 'text', { unique: false });
    }
}
request.onerror = function (event) {
    console.log('ERROR');
};
request.onsuccess = function (event) {
    console.log('success');
    db = event.target.result;

    return db;
};

export class News {
    constructor(key, title, text, image) {
        this.key = key;
        this.title = title;
        this.text = text;
        this.image = image;
    }
    sendNewsToIDB() {
        const transaction = db.transaction(['news'], 'readwrite');
        transaction.objectStore('news').add({
            key: this.key,
            title: this.title,
            text: this.text,
            image: this.image,
        });
    }
}

export class Comments {
    constructor(date, title, text) {
        this.date = date;
        this.title = title;
        this.text = text;
    }
    sendCommentsToIDB() {
        const transaction = db.transaction(['comments'], 'readwrite');
        transaction.objectStore('comments').add({
            date: this.date,
            title: this.title,
            text: this.text,
        });
    }
}
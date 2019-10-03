import { Comments } from './db.js';
const buttonSend = document.querySelector('.sendComment');
const listFans = document.querySelector('.list-fans');
const userName = document.querySelector('.name-comment');
const userComment = document.querySelector('.text-comment');
const alertSuccess = document.querySelector('.alert-success');
const alertError = document.querySelector('.alert-danger');
const clearComments = document.querySelector('#clearComments');

let useLocalStorage = false;

const isOnline = () => {
    return window.navigator.onLine;
}

const addComments = commentsHtml => {
    listFans.insertAdjacentHTML('beforeend', commentsHtml);
}

function clearLS() {
    localStorage.removeItem('comments');
}

const formCommentsHTML = (userNameValue, userCommentValue, date) => {
    return `<hr>
            <article>
                <p>${userCommentValue}</p>
                <div class="footer-fans">
                    <span>${date}</span>
                    <span class="name-fan">${userNameValue}</span>
                </div>
            </article>`
}

const saveToLocalStorage = (key, userName, userComment) => {
    const localComments = JSON.parse(localStorage.getItem('comments')) || [];
    localComments.push({
        key,
        userName,
        userComment,
    })
    localStorage.setItem('comments', JSON.stringify(localComments));
}

let newComments = JSON.parse(localStorage.getItem('comments')) || [];
newComments.forEach((comments) => {
    addComments(formCommentsHTML(comments.userName, comments.userComment, comments.key));
});

const request = window.indexedDB.open('chelseaDB', 5);
let db;

request.onsuccess = function (event) {
    console.log('success');
    db = event.target.result;

    let transaction = db.transaction(["comments"], "readwrite");
    let objectStore = transaction.objectStore("comments");
    let getData = objectStore.getAll();
    if (!useLocalStorage) {
        getData.onsuccess = function (event) {
            let data = getData.result;
            let news;
            for (news of data) {
                addComments(formCommentsHTML(news.title, news.text, news.date));
            }
        }
    }
};

function onAddComment(event) {
    event.preventDefault();

    const date = new Date().toLocaleString();
    const userNameValue = userName.value;
    const userCommentValue = userComment.value;
    if (userNameValue.trim().length < 2 || userCommentValue.trim().length < 6) {
        alertError.style.display = 'block';
        setTimeout(function () {
            alertError.style.display = 'none';
        }, 3000);
        return false;
    }

    if (isOnline()) {
        console.log('Online');
        return false;
    } else {
        if (useLocalStorage) {
            saveToLocalStorage(date, userNameValue, userCommentValue);
        } else {
            let comments = new Comments(date, userNameValue, userCommentValue);
            comments.sendCommentsToIDB();
        }
    }

    alertSuccess.style.display = 'block';
    setTimeout(function () {
        alertSuccess.style.display = 'none';
    }, 3000);

    userName.value = '';
    userComment.value = '';
    listFans.insertAdjacentHTML('beforeend',
        `<hr>
            <article>
                <p>${userCommentValue}</p>
                <div class="footer-fans">
                    <span>${date}</span>
                    <span class="name-fan">${userNameValue}</span>
                </div>
            </article>`
    );
}

clearComments.addEventListener('click', clearLS);
buttonSend.addEventListener('click', onAddComment);
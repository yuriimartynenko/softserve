import { News } from './db.js';
const buttonSend = document.querySelector('#addNews');
const newsTitle = document.querySelector('#newsTitle');
const newsText = document.querySelector('#newsText');
const alertSuccess = document.querySelector('.alert-success');
const alertError = document.querySelector('.alert-danger');
const fileUpload = document.querySelector('#fileUpload');
const imgUpload = document.querySelector('#imgUpload');
const imgAdding = document.querySelector('#img-adding');
const img = document.querySelector('#fileUpload');
const clearNews = document.querySelector('#clearNews');

let useLocalStorage = false;

const isOnline = () => {
    return window.navigator.onLine;
}

function imageUpload() {
    const reader = new FileReader();
    const imgFile = img.files[0];

    reader.onloadend = () => {
        imgUpload.src = reader.result;
        imgAdding.style.display = 'none';
        imgUpload.style.display = 'block';
    }
    if (imgFile) {
        reader.readAsDataURL(imgFile);
    } else {
        imgUpload.src = '';
    }
}

const saveToLocalStorage = (key, newsTitle, newsText, img) => {
    const localNews = JSON.parse(localStorage.getItem('news')) || [];
    localNews.push({
        key,
        newsTitle,
        newsText,
        img
    })
    localStorage.setItem('news', JSON.stringify(localNews));
}

function addNews(event) {
    event.preventDefault();
    const imgFile = img.files[0];
    const newsTitleValue = newsTitle.value;
    const newsTextValue = newsText.value;

    if (newsTitleValue.trim().length < 2 || newsTextValue.trim().length < 6 || !imgFile) {
        alertError.style.display = 'block';
        setTimeout(function () {
            alertError.style.display = 'none';
        }, 3000);
        return false;
    }
    const imgPath = imgUpload.src;
    const key = new Date().getTime();
    if (isOnline()) {
        fetch('http://localhost:3000/news', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newsTitleValue, newsTextValue, imgPath }),
        });
    } else {
        if(useLocalStorage) {
            saveToLocalStorage(key, newsTitleValue, newsTextValue, imgPath);
        } else {
            let news = new News(key, newsTitleValue, newsTextValue, imgPath);
            news.sendNewsToIDB();
        }
    }

    img.value = '';
    imgUpload.src = 'img/no-image.png';
    newsTitle.value = '';
    newsText.value = '';

    alertSuccess.style.display = 'block';
    setTimeout(function () {
        alertSuccess.style.display = 'none';
    }, 3000);
}

function clearLS() {
    localStorage.removeItem('news');
}

fileUpload.addEventListener('change', imageUpload);
buttonSend.addEventListener('click', addNews);
clearNews.addEventListener('click', clearLS);
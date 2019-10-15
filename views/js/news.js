import { request } from './db.js';

const addNews = newsHtml => {
    document.querySelector('#news-container').insertAdjacentHTML('afterbegin', newsHtml);
}

let useLocalStorage = false;

const formNewsHTML = (newsText, newsTitle, img) => {
    return `
    <div class="col-sm-6 col-lg-3  mt-3 mb-3">
        <article class="card">
            <img class="card-img-top" src="${img}" alt="New image">
            <h5 class="text-center card-title mt-3">${newsTitle}</h5>
            <p class="card-text p-2">${newsText}</p>
        </article>
    </div>
    `;
}

let db;

request.onsuccess = function (event) {
    console.log('success');
    db = event.target.result;

    let transaction = db.transaction(["news"], "readwrite");
    let objectStore = transaction.objectStore("news");
    let getData = objectStore.getAll();
    if (!useLocalStorage) {
        getData.onsuccess = function (event) {
            let data = getData.result;
            let news;
            for (news of data) {
                addNews(formNewsHTML(news.text, news.title, news.key, news.image));
            }
        }
    }
};

let newNews = JSON.parse(localStorage.getItem('news')) || [];
newNews.forEach((news) => {
    addNews(formNewsHTML(news.newsText, news.newsTitle, news.key, news.img));
});

const isOnline = () => window.navigator.onLine;

window.onload = async () => {
    if (!isOnline()) {
        return false;
    } else {
        const res = await fetch('http://localhost:3000/news', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();
        console.log(data);
        data.forEach(news => {
            addNews(formNewsHTML(news.newsTextValue, news.newsTitleValue, news.imgPath));
        })
    }
};

/*fetch('newsData.json')
    .then(response => response.json())
    .then(data =>
        data.forEach((news) => {
            addNews(formNewsHTML(news.newsText, news.newsTitle, news.key, news.img));
        })
    )
*/
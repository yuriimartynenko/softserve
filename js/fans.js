const buttonSend = document.querySelector('.sendComment');
const listFans = document.querySelector('.list-fans');
const userName = document.querySelector('.name-comment');
const userComment = document.querySelector('.text-comment');
const inputError = document.querySelectorAll('.input_error');
const alertSuccess = document.querySelector('.alert-success');
const alertError = document.querySelector('.alert-danger');
const clearComments = document.querySelector('#clearComments');

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
        saveToLocalStorage(date, userNameValue, userCommentValue);
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
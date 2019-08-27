const buttonSend = document.querySelector('.btn-send');
const listFans = document.querySelector('.list-fans');
const userName = document.querySelector('.name-comment');
const userComment = document.querySelector('.text-comment');
const inputError = document.querySelectorAll('.input_error');
const alertSuccess = document.querySelector('.alert-success');
const alertError = document.querySelector('.alert-danger');

function functionName(event) {
    event.preventDefault();

    const date = new Date();
    const userNameValue = userName.value;
    const userCommentValue = userComment.value;
    if (userNameValue.trim().length < 2 || userCommentValue.trim().length < 6) {
        alertError.style.display = 'block';
        setTimeout(function () {
            alertError.style.display = 'none';
        }, 3000);
        return false;
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
            <p>
                ${userCommentValue}
            </p>
            <div class="footer-fans">
                <span>${date.toLocaleString()}</span>
                <span class="name-fan">${userNameValue}</span>
            </div>
        </article>`
    );
}

buttonSend.addEventListener('click', functionName);
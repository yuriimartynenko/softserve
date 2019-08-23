const buttonSend = document.querySelector('#addNews');
const newsTitle = document.querySelector('#newsTitle');
const newsText = document.querySelector('#newsText');
const alertSuccess = document.querySelector('.alert-success');
const alertError = document.querySelector('.alert-danger');
const fileUpload = document.querySelector('#fileUpload');
const imgUpload = document.querySelector('#imgUpload');
const imgAdding = document.querySelector('#img-adding');

function imageUpload() {
    const reader = new FileReader();
    const img = document.querySelector('input[type=file]').files[0];

    reader.onloadend = () => {
        imgUpload.src = reader.result;
        imgAdding.style.display = 'none';
        imgUpload.style.display = 'block';
    }
    if (img) {
        reader.readAsDataURL(img);
    } else {
        imgUpload.src = '';
    }
}

function addNews(event) {
    event.preventDefault();

    const img = document.querySelector('input[type=file]').files[0];
    const newsTitleValue = newsTitle.value;
    const newsTextValue = newsText.value;

    if (newsTitleValue.length < 2 || newsTextValue.length < 6 || !img) {
        alertError.style.display = 'block';
        setTimeout(function () {
            alertError.style.display = 'none';
        }, 3000);
        return false;
    }
    
    imgUpload.src = 'img/no-image.png';
    newsTitle.value = '';
    newsText.value = '';

    alertSuccess.style.display = 'block';
    setTimeout(function () {
        alertSuccess.style.display = 'none';
    }, 3000);
}

fileUpload.addEventListener('change', imageUpload);
buttonSend.addEventListener('click', addNews);
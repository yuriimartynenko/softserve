const buttonSend = document.querySelector('#addNews');
const newsTitle = document.querySelector('#newsTitle');
const newsText = document.querySelector('#newsText');
const alertSuccess = document.querySelector('.alert-success');
const alertError = document.querySelector('.alert-danger');
const fileUpload = document.querySelector('#fileUpload');
const imgUpload = document.querySelector('#imgUpload');
const imgAdding = document.querySelector('#img-adding');
const img = document.querySelector('#fileUpload');

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

    img.value = '';
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
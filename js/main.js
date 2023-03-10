import {createArrayOfObjects} from './data.js';
import {createPhotoThumb} from './generate-thumbs.js';
import {showBigPicture, getActiveFullPicture, hideElement, bigPictureSection} from './full-photo.js';

const ADS_NUMBER = 25;
const userPhotosFragment = document.createDocumentFragment();
const otherUsersPhotoSection = document.querySelector('.pictures');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');

const allPhotoUsers = createArrayOfObjects(ADS_NUMBER);

//Наполнение фрагмента с миниатюрами данными из массива
allPhotoUsers.forEach((object) => {
  userPhotosFragment.append(createPhotoThumb(object));
});

//Записываю в блок для миниатюр фрагмент с этими миниатюрами
otherUsersPhotoSection.append(userPhotosFragment);

//Обработчик нажатия клавиши ESC
const onBigPictureEscDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

//Обработчик клика по кнопке закрытия большого изображения
const onCloseButtonClick = () => {
  closeBigPicture();
};

//Функция, которая открывает большое изображение
function openBigPicture () {
  getActiveFullPicture(bigPictureSection, 'hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscDown);
  closeBigPictureButton.addEventListener('click', onCloseButtonClick);
}

//Функция, которая закрывает большое изображение
function closeBigPicture () {
  hideElement(bigPictureSection, 'hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscDown);
  closeBigPictureButton.removeEventListener('click', onCloseButtonClick);
}

//Обработчик клика по миниатюрам
const onThumbClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    openBigPicture();
    const numberObjData = evt.target.src.match(/[0-9]{1,3}/g)[2];
    showBigPicture(allPhotoUsers[numberObjData - 1]);
  }
};

otherUsersPhotoSection.addEventListener('click', onThumbClick);

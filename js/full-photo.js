import {toggleElementHidden, isEscapeKey} from './util.js';
import {allPhotoUsers, addPhotoThumbsToSection} from './thumbs.js';

const userPhotosFragment = document.createDocumentFragment();
const otherUsersPhotoSection = document.querySelector('.pictures');
const socialCommentsList = document.querySelector('.social__comments');
const socialComment = socialCommentsList.children[0].cloneNode(true);
const bigPictureParentElement = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');

// Добавление в блок с миниатюрами, фрагмента, в котором находятся сгенерированные миниатюры
addPhotoThumbsToSection(userPhotosFragment, otherUsersPhotoSection);

// Функция, которая создает массив с комментариями пользователей и записывает их в блок с комментариями
const createCommentsUser = (arrayCommentsUser) => {
  // Очищаю область с комментариями. Она абсолютно пустая
  socialCommentsList.replaceChildren();
  // Записываю в область для комментариев все комментарии пользователей под открытой фотографией
  arrayCommentsUser.forEach((itemObj) => {
    const commentTemplate = socialComment.cloneNode(true);
    const commentTemplateImg = commentTemplate.querySelector('.social__picture');
    const commentTemplateText = commentTemplate.querySelector('.social__text');

    commentTemplateImg.src = itemObj.avatar;
    commentTemplateImg.alt = itemObj.name;
    commentTemplateText.textContent = itemObj.message;

    socialCommentsList.append(commentTemplate);
  });
};

// Функция, которая открывает окно с большим изображением и показывает все данные и комментарии
const showBigPicture = (userObject) => {
  const bigPictureImg = bigPictureParentElement.querySelector('.big-picture__img').children[0];
  const bigPictureLikesCount = bigPictureParentElement.querySelector('.likes-count');
  const bigPictureCommentsCount = bigPictureParentElement.querySelector('.comments-count');
  const bigPictureCaption = bigPictureParentElement.querySelector('.social__caption');
  const bigPictureCount = bigPictureParentElement.querySelector('.social__comment-count');
  const bigPictureLoader = bigPictureParentElement.querySelector('.comments-loader');

  toggleElementHidden(bigPictureCount, true);
  toggleElementHidden(bigPictureLoader,  true);
  createCommentsUser(userObject.comments);
  bigPictureImg.src = userObject.url;
  bigPictureLikesCount.textContent = userObject.likes;
  bigPictureCommentsCount.textContent = userObject.comments.length;
  bigPictureCaption.textContent = userObject.description;
};

// Обработчик нажатия клавиши ESC
const onBigPictureEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Обработчик клика по кнопке закрытия большого изображения
const onCloseButtonClick = () => {
  closeBigPicture();
};

// Функция, которая открывает большое изображение
function openBigPicture () {
  toggleElementHidden(bigPictureParentElement,  false);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscDown);
  closeBigPictureButton.addEventListener('click', onCloseButtonClick);
}

// Функция, которая закрывает большое изображение
function closeBigPicture () {
  toggleElementHidden(bigPictureParentElement,  true);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscDown);
  closeBigPictureButton.removeEventListener('click', onCloseButtonClick);
}

// Обработчик клика по миниатюрам
const onThumbClick = (evt) => {
  if (evt.target.closest('.picture') && evt.target.matches('.picture__img')) {
    evt.preventDefault();
    openBigPicture();
    const numberObjData = evt.target.src.match(/[0-9]{1,3}/g)[2];
    showBigPicture(allPhotoUsers[numberObjData - 1]);
  }
};

otherUsersPhotoSection.addEventListener('click', onThumbClick);


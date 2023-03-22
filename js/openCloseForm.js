import {isEscapeKey} from './util.js';
import {onInputHashtagsValidityInput, onInputCommentValidityInput, inputComment, inputHashtags} from './validityForm.js';

const body = document.querySelector('body');
const formUploadImg = document.querySelector('.img-upload__form');
const formRedactPicture = document.querySelector('.img-upload__overlay');
const openFormButton = document.querySelector('#upload-file');
const closeFormButton = document.querySelector('#upload-cancel');

// Функция закрытия формы при нажатии клавиши ESC
const onFormUploadEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormUpload();
  }
};

// Функция закрытия формы по клику на кнопку закрытия
const onButtonFormCloseCLick = () => {
  closeFormUpload();
};

// Функция открытия формы (с добавлением обработчиков закрытия)
function openFormUpload() {
  formRedactPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormUploadEscDown);
  closeFormButton.addEventListener('click', onButtonFormCloseCLick);
  inputHashtags.addEventListener('input', onInputHashtagsValidityInput);
  inputComment.addEventListener('input', onInputCommentValidityInput);
}

// Функция закрытия формы (с удалением обработчиков закрытия)
function closeFormUpload() {
  formRedactPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  formUploadImg.reset();
  document.removeEventListener('keydown', onFormUploadEscDown);
  closeFormButton.removeEventListener('click', onButtonFormCloseCLick);
  inputHashtags.removeEventListener('input', onInputHashtagsValidityInput);
  inputComment.removeEventListener('input', onInputCommentValidityInput);
}

openFormButton.addEventListener('change', openFormUpload);

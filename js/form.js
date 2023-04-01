import { isEscapeKey, showAlert, toggleElementHidden } from './util.js';
import { sendData } from './api.js';
import {openSuccessSendMessage} from './errors.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('#upload-cancel');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});


// Функция, которая проверяет и возвращает true если в фокусе поле hashtags или comment
const isTextFieldFocused = () =>
  document.activeElement === hashtags ||
  document.activeElement === comment;

// Функция, которая закрывает если нажата клавиша 'Esc'
// и нет фокуса в полях Хештег и Комментарий
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

// Функция, которая открывает окно редактирования изображения
function openUploadOverlay () {
  toggleElementHidden(uploadOverlay, false);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  uploadCloseButton.addEventListener('click', closeUploadOverlay);
}

// Функция закрытия окна с редактированием изображения.
// Также сбрасывает все настройки и валидацию
function closeUploadOverlay () {
  form.reset();
  pristine.reset();
  toggleElementHidden(uploadOverlay, true);
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadCloseButton.removeEventListener('click', closeUploadOverlay);
}

// Функция, которая вернет true если строчка начинается со знака #
const startsWithHash = (string) => string[0] === '#';

// Функция, которая вернет true если строчка больше минимальной длины и меньше максимальной
const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

// Функция, которая вернет true если в строчке содержаться только разрешенные символы.
// (сначала ищем запрещенные, но знак ! "переворачивает поиск". Иными словами - строчка
// не должна содержать запрещенные символы)
const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

// Собирательная функция для проверки слова на соблюдение трех условий:
// Должен начинаться на #
// Должен иметь разрешенную длину
// Не должен иметь запрещенных символов
const isValidTag = (tag) => startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

// Функция, которая вернет true если кол-во всех тегов соответствует допустимому
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

// Функция, которая проверяет уникальность тегов
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Собирательная окончательная функция проверки поля hashtags на его валидность
const validateHastags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

// Добавляется новый pristine валидатор, для поля Хэштеги
pristine.addValidator(
  hashtags,
  validateHastags,
  'Неправильно заполнены хэштеги',
);

// Функция, которая блокирует кнопку, и добавляет ей текст "Отправляю..."
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// Функция, которая разблокирует кнопку, и добавляет ей исходный текст "Опубликовать"
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Функция, которая будет выполняться при успешной отправке данных
const onSendDataSuccess = () => {
  closeUploadOverlay();
  openSuccessSendMessage();
};

// Функция, которая будет выполняться при ошибке отправке данных
const onSendDataError = () => {
  showAlert('Не удалось загрузить фотографии');
};

// Функция проверки валидации формы, сбор данных с формы и отправка на сервер
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(onSendDataSuccess, onSendDataError, new FormData(form));
    unblockSubmitButton();
  }
};

uploadFile.addEventListener('change', openUploadOverlay);
form.addEventListener('submit', onFormSubmit);

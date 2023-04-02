import {isEscapeKey} from './util.js';

const body = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const successMessageButton = successMessageElement.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorMessageButton = errorMessageElement.querySelector('.error__button');

// Функция закрытия модального окна об успешной отправке через клавишу 'Esc'
const onSuccessMessageEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessSendMessage();
  }
};

// Функция закрытия модального окна об успешной отправке через клик по кнопке
const onSuccessMessageClick = () => {
  closeSuccessSendMessage();
};

// Функция, которая открывает модальное окно об успешной отправке
function openSuccessSendMessage () {
  body.appendChild(successMessageElement);

  body.addEventListener('keydown', onSuccessMessageEscDown);
  window.addEventListener('click', onSuccessMessageClick);
  successMessageButton.addEventListener('click', onSuccessMessageClick);
}

// Функция, которая закрывает модальное окно об успешной отправке
function closeSuccessSendMessage () {
  body.removeChild(successMessageElement);

  body.removeEventListener('keydown', onSuccessMessageEscDown);
  window.removeEventListener('click', onSuccessMessageClick);
  successMessageButton.removeEventListener('click', onSuccessMessageClick);
}

// Функция закрытия модального окна с информацией об ошибке через клавишу 'Esc'
const onErrorMessageEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorSendMessage();
  }
};

// Функция закрытия модального окна с информацией об ошибке через клик по кнопке
const onErrorMessageClick = () => {
  closeErrorSendMessage();
};

// Функция, которая открывает модальное окно с информацией об ошибке
function openErrorSendMessage () {
  body.appendChild(errorMessageElement);

  body.addEventListener('keydown', onErrorMessageEscDown);
  window.addEventListener('click', onErrorMessageClick);
  errorMessageButton.addEventListener('click', onErrorMessageClick);
}

// Функция, которая закрывает модальное окно с информацией об ошибке
function closeErrorSendMessage () {
  body.removeChild(errorMessageElement);

  body.removeEventListener('keydown', onErrorMessageEscDown);
  window.removeEventListener('click', onErrorMessageClick);
  errorMessageButton.removeEventListener('click', onErrorMessageClick);
}

export {openSuccessSendMessage, openErrorSendMessage};

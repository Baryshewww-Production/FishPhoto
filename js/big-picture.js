import { toggleElementHidden, isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comment-count');

const COMMENTS_GROUP = 5;

let commentsShown = 0;
let comments = [];

// Обработчик нажатия клавиши ESC
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Обработчик клика по кнопке закрытия большого изображения
const onCloseButtonClick = () => {
  closeBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const createComment = ({ avatar, message, name }) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// Функция, которая отрисовывает комментарии при клике на кнопку "Загрузить еще"
const renderComments = () => {
  commentsShown += COMMENTS_GROUP;

  // Проверка - сколько осталось показать комментариев, и их количество
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  // Создается фрагмент, и в него добавляется количество комментариев, которые уже показаны
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    fragment.append(createComment(comments[i]));
  }

  // Очищает список с комментариями, и по новой туда добавляет комментарии + новые которые покажутся
  commentsList.innerHTML = '';
  commentsList.append(fragment);
  socialComments.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length} комментариев</span>`;
};

// Функция, которая открывает большое изображение
function openBigPicture (data) {
  toggleElementHidden(bigPicture, false);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  closeBigPictureButton.addEventListener('click', onCloseButtonClick);
  renderPictureDetails(data);

  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }

  commentsLoader.addEventListener('click', renderComments);
}

// Функция, которая закрывает большое изображение
function closeBigPicture () {
  toggleElementHidden(bigPicture,  true);
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  closeBigPictureButton.removeEventListener('click', onCloseButtonClick);
  commentsLoader.removeEventListener('click', renderComments);
  commentsShown = 0;
}

export { openBigPicture, closeBigPicture };

import {getActiveFullPicture, hideElement} from './util.js';

const socialCommentsList = document.querySelector('.social__comments');
const bigPictureSection = document.querySelector('.big-picture');

const createCommentsUser = (arrayCommentsUser) => {
  arrayCommentsUser.forEach((itemObj) => {
    const commentTemplate = socialCommentsList.children[0].cloneNode(true);

    const commentTemplateImg = commentTemplate.querySelector('.social__picture');
    const commentTemplateText = commentTemplate.querySelector('.social__text');

    commentTemplateImg.src = itemObj.avatar;
    commentTemplateImg.alt = itemObj.name;
    commentTemplateText.textContent = itemObj.message;

    socialCommentsList.append(commentTemplate);
  });
  socialCommentsList.children[0].remove();
  socialCommentsList.children[0].remove();
};

//Функция, которая открывает окно с большим изображением и показывает все данные и комментарии
const showBigPicture = (userObject) => {
  const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').children[0];
  const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
  const bigPictureCommentsCount = bigPictureSection.querySelector('.comments-count');
  const bigPictureCaption = bigPictureSection.querySelector('.social__caption');
  const bigPictureCount = bigPictureSection.querySelector('.social__comment-count');
  const bigPictureLoader = bigPictureSection.querySelector('.comments-loader');

  hideElement(bigPictureLoader, 'hidden');
  hideElement(bigPictureCount, 'hidden');
  createCommentsUser(userObject.comments);
  bigPictureImg.src = userObject.url;
  bigPictureLikesCount.textContent = userObject.likes;
  bigPictureCommentsCount.textContent = userObject.comments.length;
  bigPictureCaption.textContent = userObject.description;
};

export {showBigPicture, bigPictureSection};

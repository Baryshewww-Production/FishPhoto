import {createArrayOfObjects} from './data.js';

const ADS_NUMBER = 25;

// Шаблон в котором хранится информация как должна выглядеть миниатюра фотографии другого пользователя
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Массив объектов с данными пользователей
const allPhotoUsers = createArrayOfObjects(ADS_NUMBER);

// Функция, которая создает миниатюру фотографии другого пользователя в ленте
const createPhotoThumb = (obj) => {
  const userPhotoThumb = userPhotoTemplate.cloneNode(true);

  const thumbPicture = userPhotoThumb.querySelector('.picture__img');
  const thumbComments = userPhotoThumb.querySelector('.picture__comments');
  const thumbLikes = userPhotoThumb.querySelector('.picture__likes');

  thumbPicture.src = obj.url;
  thumbComments.textContent = obj.comments.length;
  thumbLikes.textContent = obj.likes;

  return userPhotoThumb;
};

// Функция, которая наполняет фрагмент миниатюрами и добавляет их в блок где должны быть миниатюры
const addPhotoThumbsToSection = (fragment, parentElement) => {

  // Наполнение фрагмента с миниатюрами данными из массива
  allPhotoUsers.forEach((object) => {
    fragment.append(createPhotoThumb(object));
  });

  // Записываю в блок для миниатюр фрагмент с этими миниатюрами
  parentElement.append(fragment);
};

export {allPhotoUsers, addPhotoThumbsToSection};

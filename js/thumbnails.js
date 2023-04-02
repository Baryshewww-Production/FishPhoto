import { openBigPicture } from './big-picture.js';

// Шаблон в котором хранится информация как должна выглядеть миниатюра фотографии другого пользователя
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Функция, которая создает миниатюру фотографии другого пользователя в ленте
const createPicture = (data) => {
  const { comments, description, likes, url } = data;
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  picture.addEventListener('click', () => {
    openBigPicture(data);
  });

  return picture;
};

// Создает фрагмент и добавляет в него все фото из массива
const renderPictures = (pictures) => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement);
  });

  // Добавляет фрагмент на страницу
  picturesContainer.append(fragment);
};

export { renderPictures };

//Шаблон в котором хранится информация как должна выглядеть миниатюра фотографии другого пользователя
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

//Функция, которая записывает для фотографии адрес(src)
const editSrcPhoto = (element, url) => {
  element.src = url;
};

//Функция, которая создает миниатюру фотографии другого пользователя в ленте
const createPhotoThumb = (obj) => {
  const userPhotoThumb = userPhotoTemplate.cloneNode(true);

  const thumbPicture = userPhotoThumb.querySelector('.picture__img');
  const thumbComments = userPhotoThumb.querySelector('.picture__comments');
  const thumbLikes = userPhotoThumb.querySelector('.picture__likes');

  editSrcPhoto(thumbPicture, obj.url);
  thumbComments.textContent = obj.comments.length;
  thumbLikes.textContent = obj.likes;

  return userPhotoThumb;
};

export {createPhotoThumb};

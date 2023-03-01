//Создаю массивы со всеми данными, на основе которых будет создаваться массив объектов с пользователями и комментариями
const ADS_NUMBER = 25;
const ADS_DESCRIPTIONS = [
  'Невероятно-красивая авка',
  'Потрясающе!',
  'Это мы с друзьями около ёлки)',
  'Осень 2022',
  'На рыбалке. Поймали много рыбы',
];
const ADS_COMMENTS = [
  'Всё отлично!',
  'В целом всё не плохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это ведь непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилось фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилось фотография лучшею',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const ADS_NAMES = ['Артём', 'Толик', 'анька', 'Диана Петровна', 'Афанасий', 'анонимно'];

//Функция, которая возвращает целое положительное число из заданного диапазона
const getRandomPositiveInteger = (first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, которая возвращает случайный элемент из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция, которая возвращает объект, хранящий рандомные данные комментария
const createComment = () => ({
  id: getRandomPositiveInteger(1, 123),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(ADS_COMMENTS),
  name: getRandomArrayElement(ADS_NAMES),
});

//Функция, которая возвращает массив с рандомным  количеством объектов, хранящих комментарии
const createArrayOfComments = () => {
  const arrayComments = [];
  const amount = getRandomPositiveInteger(1, 7);
  for (let counter = 1; counter <= amount; counter++) {
    arrayComments.push(createComment());
  }
  return arrayComments;
};

const createObjectDescription = (number) => ({
  id: number,
  url: `photos/${number}.jpg`,
  description: getRandomArrayElement(ADS_DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: createArrayOfComments(),
});

const createArrayOfObjects = () => {
  const massiveObjects = [];
  for (let counter = 1; counter <= ADS_NUMBER; counter++) {
    massiveObjects.push(createObjectDescription(counter));
  }
  return massiveObjects;
};

//ЗАДАНИЕ ИЗ БЛОКА 7/1

const otherUsersPhoto = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userPhotosFragment = document.createDocumentFragment();

const allPhotoUsers = createArrayOfObjects();

const editSrcPhoto = (element, url) => {
  element.src = url;
};

const createUserPhotoThumb = (obj) => {
  const userPhotoThumb = userPhotoTemplate.cloneNode(true);

  const thumbPicture = userPhotoThumb.querySelector('.picture__img');
  const thumbComments = userPhotoThumb.querySelector('.picture__comments');
  const thumbLikes = userPhotoThumb.querySelector('.picture__likes');

  editSrcPhoto(thumbPicture, obj.url);
  thumbComments.textContent = obj.comments.length;
  thumbLikes.textContent = obj.likes;

  return userPhotoThumb;
};

allPhotoUsers.forEach((object) => {
  userPhotosFragment.append(createUserPhotoThumb(object));
});

otherUsersPhoto.append(userPhotosFragment);


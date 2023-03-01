import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';

//Создаю массивы со всеми данными, на основе которых будет создаваться массив объектов с пользователями и комментариями
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

//Функция, которая возвращает объект, хранящий рандомные данные комментария
const createComment = () => ({
  id: getRandomPositiveInteger(1, 123),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(ADS_COMMENTS),
  name: getRandomArrayElement(ADS_NAMES),
});

//Функция, которая возвращает массив с рандомным количеством объектов, хранящих комментарии
const createArrayOfComments = () => {
  const arrayComments = [];
  const amount = getRandomPositiveInteger(1, 7);
  for (let counter = 1; counter <= amount; counter++) {
    arrayComments.push(createComment());
  }
  return arrayComments;
};

//Функция, которая создает итоговый объект со всеми данными для одного пользователя
const createObjectDescription = (number) => ({
  id: number,
  url: `photos/${number}.jpg`,
  description: getRandomArrayElement(ADS_DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: createArrayOfComments(),
});

//Функция, которая создает массив с данными пользователей
const createArrayOfObjects = (count) => {
  const massiveObjects = [];
  for (let counter = 1; counter <= count; counter++) {
    massiveObjects.push(createObjectDescription(counter));
  }
  return massiveObjects;
};

export {createArrayOfObjects};

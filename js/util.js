//Функция, которая возвращает целое положительное число из заданного диапазона
const getRandomPositiveInteger = (first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, которая возвращает случайный элемент из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция, которая делает видимым элемент(например, удаляет с него класс hidden)
const getActiveFullPicture = (element, nameClass) => {
  element.classList.remove(nameClass);
};

//Функция, которая делает невидимым элемент(например, добавляет ему класс hidden)
const hideElement = (element, nameClass) => {
  element.classList.add(nameClass);
};

export {getRandomArrayElement, getRandomPositiveInteger, isEscapeKey, getActiveFullPicture, hideElement};

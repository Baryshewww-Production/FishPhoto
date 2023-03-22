// Функция, которая возвращает целое положительное число из заданного диапазона
const getRandomPositiveInteger = (first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция, которая возвращает случайный элемент из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// Функция проверки нажатой клавиши, является ли она Escape или нет
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция, которая добавляет элементу класс hidden и убирает его, в зависимости от переданного булева значения
const toggleElementHidden = (element, isHidden) => {
  element.classList.toggle('hidden', isHidden);
};

export {
  getRandomArrayElement,
  getRandomPositiveInteger,
  isEscapeKey,
  toggleElementHidden
};

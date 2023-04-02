const ALERT_SHOW_TIME = 5000;

// Функция, которая возвращает целое положительное число из заданного диапазона
const getRandomPositiveInteger = (first, second) => {
  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция, которая возвращает случайный элемент из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGenerateId = 0;
  return function() {
    lastGenerateId += 1;
    return lastGenerateId;
  };
}

// Функция проверки нажатой клавиши, является ли она Escape или нет
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция, которая добавляет элементу класс hidden и убирает его, в зависимости от переданного булева значения
const toggleElementHidden = (element, isHidden) => {
  element.classList.toggle('hidden', isHidden);
};

// Функция, которая показывает модальное уведомление об ошибки сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '12px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomArrayElement,
  getRandomPositiveInteger,
  createIdGenerator,
  isEscapeKey,
  toggleElementHidden,
  showAlert
};

import { toggleElementHidden } from './util.js';

const scaleInput = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview img');
const sliderEffects = document.querySelector('.effect-level__slider');
const form = document.querySelector('.img-upload__form');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 0,
    step: 1,
    unit: ' ',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ' ',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

// Функция, которая вернет true, если выбранный эффект равен дефолтному
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

// Создаю в диве для слайдера - слайдер из библиотеки noUiSlider.
// Задаю значения по умолчанию
noUiSlider.create(sliderEffects, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

// Функция для изменения настроек слайдера в зависимости от выбранного эффекта
const updateSlider = (chosenEffect) => {
  toggleElementHidden(sliderEffects, false);
  sliderEffects.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  // Если выбранный эффект равен дефолтному, слайдер нужно скрыть
  if (isDefault()) {
    toggleElementHidden(sliderEffects, true);
  }
};

// Функция, которая срабатывает при изменении формы
const onFormChange = (evt) => {
  // Если изменен элемент, у которого нет класса effects__radio,
  // то ничего делать не нужно
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider(chosenEffect);
};

// Функция, которая обновляет вид изображения в зависимости от настройки слайдера
const onSliderUpdate = () => {
  image.style.filter = 'none';
  image.className = '';
  const effectValue = sliderEffects.noUiSlider.get();
  image.classList.add(`effects__preview--${chosenEffect.name}`);
  image.style.filter = `${chosenEffect.style}(${effectValue}${chosenEffect.unit})`;
};

// Функция, которая меняет размер изображения и отображает его в цифрах
const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue >= MIN_SCALE) {
    scaleImage(newValue);
  } else {
    smallerButton.disabled = true;
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue <= MIN_SCALE) {
    scaleImage(newValue);
  } else {
    biggerButton.disabled = true;
  }
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

sliderEffects.noUiSlider.on('update', onSliderUpdate);
smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);
form.addEventListener('change', onFormChange);

export { resetScale };

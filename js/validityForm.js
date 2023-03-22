const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const inputHashtags = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

// Функция, которая проверяет введённые хештеги на правильность
const onInputHashtagsValidityInput = () => {
  const patternHastags = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const arrayOfHastagsUser = inputHashtags.value.trim().split(' ');
  const arrayOfUnicHastags = [];

  arrayOfHastagsUser.forEach((hashtag) => {
    // Проверка текущего хештега на соответствие паттерну
    const hashtagIsCorrect = patternHastags.test(hashtag);

    // Если поле соответствует паттерну, или пустое => ошибки нет, иначе выходит сообщение об ошибке
    if (hashtagIsCorrect || hashtag === '') {
      inputHashtags.setCustomValidity('');
    } else {
      inputHashtags.setCustomValidity('Должен начинаться с #, только буквы и цифры, до 20 символов');
    }

    // Проверка на уникальность хештегов
    if (!arrayOfUnicHastags.includes(hashtag)) {
      arrayOfUnicHastags.push(hashtag);
    } else {
      inputHashtags.setCustomValidity('Такой хештег уже есть, напишите другой!');
    }

    // Непрерывная проверка вводимых символов
    inputHashtags.reportValidity();
  });
};

const onInputCommentValidityInput = () => {
  // Количество введённых символов в поле
  const valueLength = inputComment.value.length;

  // Проверка на количество введённых символов
  if (valueLength < MIN_COMMENT_LENGTH) {
    inputComment.setCustomValidity(`Ещё ${MIN_COMMENT_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_COMMENT_LENGTH) {
    inputComment.setCustomValidity(`Удалите лишние ${valueLength - MAX_COMMENT_LENGTH} симв.`);
  } else {
    inputComment.setCustomValidity('');
  }

  // Непрерывная проверка вводимых символов
  inputComment.reportValidity();
};

export {onInputHashtagsValidityInput, onInputCommentValidityInput, inputHashtags, inputComment};

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  // Проверка выбранного файла: совпадает ли хотя бы одно валидное разрешение,
  // с тем, что стоит на конце выбранного файла. Если да - то переменная matches
  // будет равна true. Иначе false
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
    effectPreview.forEach((element) => {
      element.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
});

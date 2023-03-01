import {createArrayOfObjects} from './data.js';
import {createPhotoThumb} from './generate-thumbs.js';

const ADS_NUMBER = 25;
const userPhotosFragment = document.createDocumentFragment();
const otherUsersPhoto = document.querySelector('.pictures');

const allPhotoUsers = createArrayOfObjects(ADS_NUMBER);

//Наполнение фрагмента с миниатюрами данными из массива
allPhotoUsers.forEach((object) => {
  userPhotosFragment.append(createPhotoThumb(object));
});

//Записываю в блок для миниатюр фрагмент с этими миниатюрами
otherUsersPhoto.append(userPhotosFragment);

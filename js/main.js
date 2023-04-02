import { renderPictures } from './thumbnails.js';
import './form.js';
import './picture-preview.js';
import './picture-editing.js';
import { getData } from './api.js';

getData(renderPictures);

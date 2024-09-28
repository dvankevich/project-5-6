import { getPhotos } from './unsplash-api';
import { refs } from './refs';
import { createMarkup } from './create-markup';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showLoader, hideLoader } from './loader';
refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  showLoader();
  refs.galleryList.innerHTML = '';
  const query = event.currentTarget.elements.search.value.trim();

  try {
    const response = await getPhotos(query);
    if (response.results.length === 0) {
      return iziToast.error({
        message: `По вашому заипту ${query}, нічого не знайдено`,
        position: 'bottomRight',
        backgroundColor: 'red',
        theme: 'dark',
      });
    }

    refs.galleryList.innerHTML = createMarkup(response.results);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

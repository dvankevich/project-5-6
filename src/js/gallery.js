import { getPhotos } from './unsplash-api';
import { refs } from './refs';
import { createMarkup } from './create-markup';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showLoader, hideLoader } from './loader';
import { showBtn, hideBtn } from './loadmore-btn';
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onClick);
let page = 1;
let query = null;

async function onSubmit(event) {
  event.preventDefault();
  showLoader();
  hideBtn();
  refs.galleryList.innerHTML = '';
  query = event.currentTarget.elements.search.value.trim();

  try {
    const response = await getPhotos(query, page);
    if (response.results.length === 0) {
      return iziToast.error({
        message: `По вашому заипту ${query}, нічого не знайдено`,
        position: 'bottomRight',
        backgroundColor: 'red',
        theme: 'dark',
      });
    }

    // console.log(response.total);

    refs.galleryList.innerHTML = createMarkup(response.results);
    if (response.total > 12) {
      console.log('show more');

      showBtn();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

async function onClick(event) {
  page++;
  showLoader();
  console.log('on click function');

  try {
    const response = await getPhotos(query, page);
    const lastPage = Math.ceil(response.total / 12);

    refs.galleryList.insertAdjacentHTML(
      'beforeend',
      createMarkup(response.results)
    );

    if (lastPage === page) {
      hideBtn();
      iziToast.info({
        message: `Це остання сторінка`,
        position: 'bottomRight',
        backgroundColor: 'blue',
        theme: 'dark',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

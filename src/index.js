import Notiflix from 'notiflix';

import ApiServices from './script/api-services.js';
import RenderList from './script/render-list';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};

const newApiServices = new ApiServices();
const newRenderList = new RenderList(refs.gallery);

refs.form.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  cliarGalleryContainer();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim('');

  if (searchQuery != '') {
    newApiServices.query = searchQuery;
    newApiServices.resetPage();
    markapGallery();
  } else {
    Notiflix.Notify.info('Please enter a request.');
  }
}
function onLoadMore() {
  markapGallery();
}
function markapGallery() {
  newApiServices.searchImg().then(hits => {
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    newRenderList.params = hits;
    newRenderList.renderGallery();
  });
}
function cliarGalleryContainer() {
  refs.gallery.innerHTML = '';
}

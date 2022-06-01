import Notiflix from 'notiflix';

import ApiServices from './script/api-services.js';
import RenderList from './script/render-list.js';
import LoadMoreBtn from './script/load-more-btn.js';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};

const newApiServices = new ApiServices();
const newRenderList = new RenderList(refs.gallery);
const newLoadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.form.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  cliarGalleryContainer();
  newLoadMoreBtn.hide();

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
  newLoadMoreBtn.show();
  newLoadMoreBtn.disable();
  newApiServices.searchImg().then(({ hits, totalHits }) => {
    if (hits.length === 0) {
      newLoadMoreBtn.hide();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (newApiServices.totalPage() < totalHits) {
      newRenderList.params = hits;

      newRenderList.renderGallery();
      newLoadMoreBtn.enable();
    } else {
      newLoadMoreBtn.hide();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}
function cliarGalleryContainer() {
  refs.gallery.innerHTML = '';
}

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ApiServices from './script/api-services.js';
import RenderList from './script/render-list.js';
import LoadMoreBtn from './script/load-more-btn.js';

//========================================================
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  buttonSearchForm: document.querySelector('#search-form button'),
  buttonLoadMore: document.querySelector('.load-more'),
};

//========================================================
const newApiServices = new ApiServices();
const newRenderList = new RenderList(refs.gallery);
const newLoadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

//========================================================
refs.form.addEventListener('input', () => {
  refs.buttonSearchForm.disabled = false;
});
refs.form.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMore);

//========================================================
async function onSearch(event) {
  try {
    event.preventDefault();

    cliarGalleryContainer();
    newLoadMoreBtn.hide();

    const searchQuery = event.currentTarget.elements.searchQuery.value.trim('');

    if (searchQuery != '') {
      refs.buttonSearchForm.disabled = true;
      newApiServices.query = searchQuery;
      newApiServices.resetPage();
      const { hits, totalHits } = await getDateFromApiServices();
      markapGallery({ hits, totalHits });
    } else {
      Notiflix.Notify.info('Please enter a request.');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getDateFromApiServices() {
  try {
    const date = await newApiServices.searchImg();
    return date;
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMore() {
  try {
    const { hits, totalHits } = await getDateFromApiServices();
    markapGallery({ hits, totalHits });
  } catch (error) {
    console.log(error.message);
  }
}

function markapGallery({ hits, totalHits }) {
  newLoadMoreBtn.show();
  newLoadMoreBtn.disable();

  if (hits.length === 0) {
    newLoadMoreBtn.hide();

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else if (newApiServices.totalPage() < totalHits) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    newRenderList.params = hits;

    newRenderList.renderGallery();

    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', () => {});

    newLoadMoreBtn.enable();

    return totalHits;
  } else {
    newLoadMoreBtn.hide();

    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function cliarGalleryContainer() {
  refs.gallery.innerHTML = '';
}

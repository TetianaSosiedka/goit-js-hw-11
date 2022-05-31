import Notiflix from 'notiflix';

import ApiServices from './script/api-services.js';

const refs = {
  form: document.querySelector('#search-form'),
};

const newApiServices = new ApiServices();

refs.form.addEventListener('submit', onSearch);
function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim('');
  if (searchQuery != '') {
    newApiServices.query = searchQuery;
    newApiServices.searchImg().then(hits => {
      if (hits) {
        hits.map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
            console.log({
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads,
            });
          }
        );
      }
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
  }
}

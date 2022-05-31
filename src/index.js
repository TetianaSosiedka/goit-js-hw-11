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
    newApiServices.searchImg().then(data => {
      console.log(data);
    });
  }
}

import axios from 'axios';
export default class ApiServices {
  #API_KEY;
  #URL;
  constructor() {
    this.searchQuery = '';
    this.#API_KEY = '27694476-af667d0eda220e59ccfe1729b';
    this.#URL = `https://pixabay.com/api/`;
    this.imageexport_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.page = 1;
    this.per_page = 200;
    this.totalPages = 0;
  }
  searchImg() {
    return axios(
      `${this.#URL}?key=${this.#API_KEY}&q=${
        this.searchQuery
      }&imageexport_type=${this.imageexport_type}&orientation=${
        this.orientation
      }&safesearch=${this.safesearch}&page=${this.page}&per_page=${
        this.per_page
      }`
    ).then(({ data }) => {
      this.incrementPage();

      return { hits: data.hits, totalHits: data.totalHits };
    });
  }
  totalPage() {
    this.totalPages = (this.page - 1) * this.per_page;
    return this.totalPages;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

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
  }
  searchImg() {
    return axios(
      `${this.#URL}?key=${this.#API_KEY}&q=${
        this.searchQuery
      }&imageexport_type=${this.imageexport_type}&orientation=${
        this.orientation
      }&safesearch=${this.safesearch}`
    ).then(({ data }) => data);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

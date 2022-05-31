export default class RenderList {
  constructor(refsGallery) {
    this.paramsArticle = [];
    this.refsGallery = refsGallery;
  }
  renderGallery() {
    const list = this.renderList();
    this.refsGallery.insertAdjacentHTML('beforeend', list);
  }
  renderList() {
    return this.paramsArticle
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
        }
      )
      .join('');
  }
  get params() {
    return this.paramsArticle;
  }
  set params(newParams) {
    this.paramsArticle = newParams;
  }
}

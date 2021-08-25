import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { renderPost } from '../templates/post.template';

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id);

    this.loader = options.loader;
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this));
  }

  async onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const html = await renderList(favorites);
    this.$el.insertAdjacentHTML('afterbegin', html);
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}

async function linkClickHandler(event) {
  event.preventDefault();

  if (!event.target.closest('.js-link')) return;

  const postId = event.target.dataset.id;
  this.$el.innerHTML = '';

  this.loader.show();
  const post = await apiService.fetchPostById(postId);
  console.log(post);
  this.loader.hide();
  this.$el.insertAdjacentHTML('afterbegin', renderPost(post, { withButton: false }));
}

async function renderList(list = []) {

  if (list && list.length) {
    let result = '<ul>';
    for (let id of list) {
      let post = await apiService.fetchPostById(id);
      let title = post.title;
      result +=
        `
        <li><a href="#" class="js-link" data-id="${id}">${title}</a></li>
        `;
    }
    return result + '</ul>';
  }

  return `<p class="center">Вы пока ничего не добавили</p>`;
}
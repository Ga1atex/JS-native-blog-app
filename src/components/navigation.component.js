import { Component } from '../core/component';

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);

    this.tabs = [];
  }

  init() {
    this.$el.addEventListener('click', tabClickHandler.bind(this));
  }

  registerTabs(tabs) {
    this.tabs = tabs;
  }
}

function tabClickHandler(event) {
  event.preventDefault();
  if (!event.target.closest('.tab')) return;
  // document.querySelector(`#${this.$el.querySelector('.active').dataset.name}`).classList.add('hide');

  const activeTab = this.tabs.find(tab => tab.name === event.target.dataset.name);
  this.tabs.forEach(tab => tab.component.hide());
  activeTab.component.show();
  this.$el.querySelector('.active').classList.remove('active');
  event.target.classList.add('active');
  // document.querySelector(`#${event.target.dataset.name}`).classList.remove('hide');
}
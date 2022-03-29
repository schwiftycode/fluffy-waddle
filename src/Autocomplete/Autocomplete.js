import uid from 'lodash/uniqueId';
import './styles.css';

export default class Autocomplete {
  wrapperEl;
  resultsEl;
  resultsListEl;
  inputEl;
  data = null;
  isOpen = false;
  searchFields = [];
  displayFields = [];
  constructor(wrapperEl, config) {
    this.wrapperEl = wrapperEl;
    this.data = config.data;
    this.searchFields = config.searchFields;
    this.displayFields = config.displayFields;
    this.resultsEl = config.resultsEl;
    this.renderResult = config.renderResult;
    this.onSelect = config.onSelect;

    this.initResults();
    this.initInput();
    this.resetResults();
  }

  initResults() {
    const list = document.createElement('ol');
    list.id = `autocomplete-${uid()}`;
    list.tabIndex = -1;
    list.setAttribute('role', 'listbox');
    list.addEventListener('click', (evt) => {
      const option = evt.target.closest('[role="option"]');
      if (!option) return;

      const { dataItem } = option;

      if (dataItem) {
        this.onSelect(dataItem);
        let inputValue = '';
        for (const field of this.displayFields) {
          inputValue +=
            inputValue.length > 0
              ? ` ${dataItem[field]}`
              : dataItem[field];
        }
        this.inputEl.value = inputValue;
        this.close();
      }
    });
    this.resultsListEl = list;
  }

  initInput() {
    this.inputEl = this.wrapperEl.querySelector('input[type="text"]');
    this.inputEl.setAttribute('role', 'combobox');
    this.inputEl.addEventListener('input', this.onInputChange);
    this.inputEl.addEventListener('keydown', this.onInputKeydown);
    this.inputEl.addEventListener('focus', this.onInputFocus);
    this.inputEl.addEventListener('blur', this.onInputBlur);
    this.inputEl.setAttribute('aria-owns', this.resultsListEl.id);
  }

  resetResults() {
    this.resultsEl.innerHTML = '';
  }

  onInputKeydown = (evt) => {
    if (evt.key === 'Escape') this.close();
  };

  onInputChange = (evt) => {
    if (!this.isOpen) this.open();
    const { value } = evt.target;
    if (!value) {
      this.renderList([null]);
    } else if (this.data) {
      const filteredData = this.data.filter((dataItem) => {
        for (const field of this.searchFields) {
          if (dataItem[field].includes(value)) {
            return true;
          }
        }
        return false;
      });
      this.renderList(filteredData);
    }
  };

  onInputFocus = (evt) => {
    this.open();
    if (!evt.target.value) this.renderList([null]);
  };

  onInputBlur = (evt) => {
    if (this.resultsEl.contains(evt.relatedTarget)) return;
    this.close();
  };

  renderList(data) {
    this.resultsListEl.innerHTML = '';
    data.forEach((option) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('role', 'option');
      listItem.appendChild(this.renderResult(option));
      listItem.dataItem = option;
      this.resultsListEl.appendChild(listItem);
    });
    this.resultsEl.innerText = '';
    this.resultsEl.appendChild(this.resultsListEl);
  }

  open() {
    this.isOpen = true;
    this.resultsEl.classList.add('autocomplete__results--open');
  }

  close() {
    this.isOpen = false;
    this.resultsEl.classList.remove('autocomplete__results--open');
  }
}

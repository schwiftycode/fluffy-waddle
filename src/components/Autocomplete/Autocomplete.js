import uid from 'lodash/uniqueId';
import './styles.css';

export default window.customElements.define(
  'auto-complete',
  class Autocomplete extends HTMLElement {
    wrapperEl;
    resultsEl;
    resultsListEl;
    inputEl;
    data = null;
    isOpen = false;
    searchFields = [];
    displayFields = [];
    _config = null;
    get config() {
      return this._config;
    }
    set config(val) {
      this._config = val;

      this.data = this._config.data;
      this.searchFields = this._config.searchFields;
      this.displayFields = this._config.displayFields;
      this.renderResult = this._config.renderResult;
      this.onSelect = this._config.onSelect;

      this.initResults();
      this.initInput();
      this.resetResults();
    }

    constructor() {
      super();

      this.innerHTML = this.getContents();
      this.wrapperEl = document.getElementById(`${this.id}-ac-root`);
      this.resultsEl = document.getElementById(
        `${this.id}-ac-results`,
      );
      this.selectedResultEl = document.getElementById(
        `${this.id}-ac-selected-result`,
      );
    }

    initialize(config) {
      this.config = config;
    }

    getContents() {
      return `
        <fieldset id="${this.id}-ac-root" class="field">
            <div>
                <label for="countries-autocomplete">Countries</label>
                <div class="autocomplete">
                    <input id="countries-autocomplete" type="text" autocomplete="off" placeholder="Choose a country" />
                    <div id="${this.id}-ac-results" class="autocomplete__results">
                    </div>
                </div>
            </div>
        </fieldset>
      `;
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
          let valueString = '';
          for (const field of this.displayFields) {
            const fieldValueString =
              valueString.length > 0
                ? ` ${dataItem[field]}`
                : `${dataItem[field]}`;
            valueString = valueString + fieldValueString;
          }
          this.inputEl.value = valueString;
          this.close();
        }
      });
      this.resultsListEl = list;
    }

    initInput() {
      this.inputEl = this.wrapperEl.querySelector(
        'input[type="text"]',
      );
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
        const filteredList = this.data.filter((dataItem) => {
          for (const field of this.searchFields) {
            if (dataItem[field].includes(value)) {
              return true;
            }
          }
          return false;
        });
        this.renderList(filteredList);
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
  },
);

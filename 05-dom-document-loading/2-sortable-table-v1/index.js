export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  generateTableHeader() {
    const generateHeaderRow = ({id, title, sortable}) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
          <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>
        </div>
      `;
    };

    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(item => generateHeaderRow(item)).join('')}
    </div>`;
  }

  generateTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.generateTableRows(this.data)}
      </div>`;
  }

  generateTableRows(data) {
    const generateCellsOfRow = (cellData) => {
      return this.headerConfig.map(({ template, id }) => {
        if (template) {
          return template(cellData.images);
        }

        return `<div class="sortable-table__cell">${cellData[id]}</div>`;
      }).join('');
    };

    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${generateCellsOfRow(item)}
        </a>`;
    }).join('');
  }

  generateTable() {
    return `
      <div class="sortable-table">
        ${this.generateTableHeader()}
        ${this.generateTableBody()}
      </div>`;
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.generateTable();

    const element = wrapper.firstElementChild;

    this.element = element;

    this.subElements = this.getSubElements(element);
  }

  sort(field, order) {
    document.querySelectorAll('[data-id]').forEach(col => col.dataset.id === field ? col.dataset.order = order : col.dataset.order = '');

    const dataSorter = () => {
      const sortDirection = {
        asc: 1,
        desc: -1
      };

      const sortTypeChecker = () => {
        for (const elements of this.headerConfig) {
          if (elements.id === field) {
            return {sortable: elements.sortable, sortType: elements.sortType};
          } 
        }
      };

      return this.data.sort((a, b) => {
        const {sortable, sortType} = sortTypeChecker();
        if (sortable && sortType === 'number') {
          return sortDirection[order] * (a[field] - b[field]);
        }

        if (sortable && sortType === 'string') {
          return sortDirection[order] * a[field].localeCompare(b[field], ['ru', 'en']);
        }

        return 0;
      });
    };

    this.subElements.body.innerHTML = this.generateTableRows(dataSorter());
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
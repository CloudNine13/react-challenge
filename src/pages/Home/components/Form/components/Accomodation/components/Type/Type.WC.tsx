import { getTwind } from '../../../../../../../../utils';

const { sheet, tw } = getTwind();

class TypeComponent extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    const container = document.createElement('div');
    container.innerHTML = `
        <label for="type" class="${tw`block  font-medium text-gray-700`}">
            Type
        </label>
        <select
          id="type"
          name="type"
          class="${tw`block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}"
        >
            <option value="Apartment">Apartment</option>
            <option selected value="Villa">Villa</option>
            <option value="House">House</option>
        </select>`;

    this.shadow.appendChild(container);
  }

  connectedCallback() {
    const input = this.shadow.querySelector('select') as HTMLSelectElement;

    input.addEventListener('input', () => {
      const detail: { value?: string } = {};

      detail.value = input.value;

      this.dispatchEvent(
        new CustomEvent('type-info', {
          detail,
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define('wc-accommodation-type', TypeComponent);

export { TypeComponent };

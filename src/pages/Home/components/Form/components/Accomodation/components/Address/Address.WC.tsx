import { getTwind } from '../../../../../../../../utils';
import { validateInput } from '../utils';
import { ADDRESS_ERROR_MESSAGES } from './constants';

const { sheet, tw } = getTwind();

class AddressComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private isValid: boolean = true;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    const container = document.createElement('div');
    container.innerHTML = `
        <label html="address" className="${tw`block font-medium text-gray-700`}">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          class="${tw`block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}"
          minlength="4"
          maxlength="128"
          required
          novalidate
        />
        <span id="address-error" class="${tw`hidden text-xs text-pink-600`}">
        </span>`;

    this.shadow.appendChild(container);
  }

  connectedCallback() {
    const input = this.shadow.querySelector('input') as HTMLInputElement;
    const error = this.shadow.querySelector('span');

    const callValidator = () =>
      (this.isValid = validateInput(input, error!, ADDRESS_ERROR_MESSAGES));

    input.addEventListener('focus', callValidator);
    input.addEventListener('blur', callValidator);

    input.addEventListener('input', () => {
      callValidator();

      const detail: { value?: string; isValid: boolean } = { isValid: this.isValid };
      if (this.isValid) {
        detail.value = input.value;
      }

      this.dispatchEvent(
        new CustomEvent('address-info', {
          detail,
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define('wc-accommodation-address', AddressComponent);

export { AddressComponent };

import { FORM_STEPS } from '../../enums';
import { getTwind } from '../../utils';
import { FORM_CONSTANTS } from './constants';

const { sheet, tw } = getTwind();

class FormComponent extends HTMLElement {
  shadow: ShadowRoot;
  container: HTMLDivElement;

  private _step: number = 1;
  // private _accommodationInfo: Record<string, string> = {};
  // private _userInfo: Record<string, string> = {};

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.container = document.createElement('div');
    this.shadow.appendChild(this.container);
  }

  set step(value: number) {
    this._step = value;
    this.render();
  }

  // set accomodationInfo(value: Record<string, string>) {
  //   this._accommodationInfo = value;
  //   this.render();
  // }

  // set userInfo(value: Record<string, string>) {
  //   this._userInfo = value;
  //   this.render();
  // }

  render() {
    const enumValue = FORM_STEPS[this._step] as keyof typeof FORM_CONSTANTS.FORM_TITLES;
    const title = FORM_CONSTANTS.FORM_TITLES[enumValue];

    this.container.innerHTML = `
      <div class="${tw`h-[450px] max-w-2xl w-[300px] mx-auto p-6 bg-white shadow-lg rounded-lg border border-black`}">
        <h2 class="${tw`text-xl font-bold mb-6 text-gray-800`}">${title}</h2>
        ${this._step === 1 ? `<accommodation-info-form-wc></accommodation-info-form-wc>` : ''}
      </div>
    `;

    if (this._step === 1) {
      const userForm = this.shadow.querySelector('user-info-form-wc');
      userForm?.addEventListener('submit', (e: any) => {
        this.dispatchEvent(new CustomEvent('user-info-submit', { detail: e.detail }));
      });
    }
  }
}

customElements.define('wc-form', FormComponent);

export { FormComponent };

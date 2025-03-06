import { createRoot, Root } from 'react-dom/client';
import { FormStepsEnum } from '../../../../enums';
import { AccommodationInfoSubmitEvent, AccommodationType } from '../../../../types';
import { getTwind } from '../../../../utils';
import { FORM_CONSTANTS } from './constants';
import { Accommodation } from './components';
import './components';

const { sheet, tw } = getTwind();

class FormComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private container: HTMLDivElement;
  private root: Root;

  private _step: number = 1;
  private _accommodationInfo: AccommodationType = {
    name: '',
    address: '',
    description: '',
    type: '',
    images: [],
  };
  // private _userInfo: Record<string, string> = {};

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.container = document.createElement('div');
    this.root = createRoot(this.shadow.appendChild(this.container));
  }

  set step(value: number) {
    this._step = value;
    this.render();
  }

  get step(): number {
    return this._step;
  }

  set accomodationInfo(value: AccommodationType) {
    this._accommodationInfo = value;
    this.render();
  }

  get accomodationInfo(): AccommodationType {
    return this._accommodationInfo;
  }

  // set userInfo(value: Record<string, string>) {
  //   this._userInfo = value;
  //   this.render();
  // }

  render() {
    const enumValue = FormStepsEnum[this._step] as keyof typeof FORM_CONSTANTS.FORM_TITLES;
    const title = FORM_CONSTANTS.FORM_TITLES[enumValue];

    // <div
    //   className={tw`h-[450px] max-w-2xl w-[300px] mx-auto p-6 bg-white shadow-lg rounded-lg border border-black`}
    // >
    //   <h2 className={tw`text-xl font-bold mb-6 text-gray-800`}>${title}</h2>$
    //   {this._step === 1 ? <Accommodation /> : ''}$
    //   {this._step === 2 ? '<wc-user-info></wc-user-info>' : ''}
    // </div>;

    const reactComponents = (
      <div
        className={tw`h-[600px] max-w-2xl w-[380px] mx-auto pt-3 pr-6 pl-6 bg-white rounded-lg border border-black border-[1.5px]`}
      >
        <h3 className={tw`font-bold text-xl mb-2 text-gray-800`}>{title}</h3>
        {this._step === 1 ? <Accommodation /> : ''}
        {this._step === 2 ? '<wc-user-info></wc-user-info>' : ''}
      </div>
    );

    this.root.render(reactComponents);

    // if (this._step === 2) {
    //   const accommodationForm = this.shadow.querySelector('residence-info-form-wc');
    //   accommodationForm?.addEventListener('submit', (e: any) => {
    //     this.dispatchEvent(new CustomEvent('residence-info-submit', { detail: e.detail }));
    //   });

    //   accommodationForm?.addEventListener('back', () => {
    //     this.dispatchEvent(new CustomEvent('back'));
    //   });
    // }
  }
}

customElements.define('wc-form', FormComponent);

export { FormComponent };

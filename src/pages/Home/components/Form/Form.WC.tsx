import { createRoot, Root } from 'react-dom/client';
import { FormStepsEnum } from '../../../../enums';
import { getTwind } from '../../../../utils';
import { FORM_CONSTANTS } from './constants';
import { Accommodation, Owner } from './components';
import './components';

const { sheet, tw } = getTwind();

class FormComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private container: HTMLDivElement;
  private root: Root;

  private _step: number = 1;

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

  render() {
    const enumValue = FormStepsEnum[this._step] as keyof typeof FORM_CONSTANTS.FORM_TITLES;
    const title = FORM_CONSTANTS.FORM_TITLES[enumValue];

    const reactComponents = (
      <div
        className={tw`h-[600px] max-w-2xl w-[380px] mx-auto pt-3 pr-6 pl-6 bg-white rounded-lg border border-black border-[1.5px]`}
      >
        <h3 className={tw`font-bold text-xl mb-2 text-gray-800`}>{title}</h3>
        {this._step === 1 ? <Accommodation /> : ''}
        {this._step === 2 ? <Owner /> : ''}
      </div>
    );

    this.root.render(reactComponents);
  }
}

customElements.define('wc-form', FormComponent);

export { FormComponent };

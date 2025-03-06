import { createRoot, Root } from 'react-dom/client';
import { getTwind } from '../../../../../../utils';
import { Email, Name, Phone } from './components/';
import { OwnerType } from '../../../../../../types';

const { sheet, tw } = getTwind();

class OwnerComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private root: Root;

  private _isValid: Record<string, boolean> = {
    name: false,
    email: false,
    phone: true,
  };

  private _ownerInfo: OwnerType = {
    name: '',
    email: '',
    phone: '',
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.root = createRoot(this.shadow);
  }

  connectedCallback() {
    this.render();
    this._setupEventListeners();
  }

  private _setupEventListeners() {
    const requiredFields = ['name', 'email', 'phone'];
    const setupListener = (key: keyof OwnerType) => {
      this.shadow.addEventListener(`${key}-info`, (e: Event) => {
        const eventDetail = (e as CustomEvent).detail;

        if (requiredFields.includes(key)) {
          this._isValid[key] = Boolean(eventDetail.isValid);
          this._updateSubmitButtonState();
        }

        this._ownerInfo[key] = eventDetail.value || '';
      });
    };

    const keys = Object.keys(this._ownerInfo) as Array<keyof OwnerType>;
    keys.forEach(setupListener);

    this.shadow.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('owner-info-submit', {
          detail: this._ownerInfo,
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  private _updateSubmitButtonState() {
    const button = this.shadow.querySelector('button');
    button!.disabled = !Object.values(this._isValid).every(Boolean);
  }

  private _getName() {
    return <Name />;
  }

  private _getEmail() {
    return <Email />;
  }

  private _getPhone() {
    return <Phone />;
  }

  private _getSubmit() {
    return (
      <button
        type="submit"
        className={tw`w-full px-4 py-2 mt-auto mb-[50px] text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-30`}
        disabled
      >
        Next
      </button>
    );
  }

  render() {
    const reactNode = (
      <form id="owner-form" className={tw`w-full h-full`}>
        <div className={tw`flex flex-col gap-2 w-full h-full p-4`}>
          {this._getName()}
          {this._getEmail()}
          {this._getPhone()}
          {this._getSubmit()}
        </div>
      </form>
    );

    this.root.render(reactNode);
  }
}

customElements.define('wc-owner', OwnerComponent);

export { OwnerComponent };

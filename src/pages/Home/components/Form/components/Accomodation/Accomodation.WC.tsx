import { createRoot, Root } from 'react-dom/client';
import { getTwind } from '../../../../../../utils';
import { PhotoUpload, Name, Address, Description } from './components/';
import { AccommodationType } from '../../../../../../types';
import './components';
import { Type } from './components/Type';

const { sheet, tw } = getTwind();

class AccommodationComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private container: HTMLDivElement;
  private root: Root;

  private _isValid: Record<string, boolean> = {
    name: false,
    address: false,
    type: true,
  };

  private _accommodationInfo: AccommodationType = {
    name: '',
    address: '',
    description: '',
    type: '',
    images: [],
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.container = document.createElement('div');
    this.root = createRoot(this.shadow.appendChild(this.container));
  }

  connectedCallback() {
    this.render();
    this._setupEventListeners();
  }

  private _setupEventListeners() {
    const requiredFields = ['name', 'address', 'description'];
    const setupListener = (key: keyof AccommodationType) => {
      this.shadow.addEventListener(`${key}-info`, (e: Event) => {
        const eventDetail = (e as CustomEvent).detail;

        if (key === 'images') {
          const images = this._accommodationInfo.images;
          if (!images.includes(eventDetail.value)) {
            images.push(eventDetail.value);
            return;
          }
        }

        if (requiredFields.includes(key)) {
          this._isValid[key] = Boolean(eventDetail.isValid);
          this._updateSubmitButtonState();
        }

        this._accommodationInfo[key] = eventDetail.value || '';
      });
    };

    const keys = Object.keys(this._accommodationInfo) as (keyof AccommodationType)[];
    keys.forEach(setupListener);

    this.shadow.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('accommodation-info-submit', {
          detail: this._accommodationInfo,
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

  private _getAddress() {
    return <Address />;
  }

  private _getDescription() {
    return <Description />;
  }

  private _getType() {
    return <Type />;
  }

  private _getUploadPhoto() {
    return <PhotoUpload />;
  }

  private _getSubmit() {
    return (
      <button
        type="submit"
        className={tw`w-full px-4 py-2 mt-8 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-30`}
        disabled
      >
        Submit
      </button>
    );
  }

  render() {
    const reactNode = (
      <form id="accommodation-form" className="w-full h-full">
        <div className={tw`flex flex-col gap-2`}>
          {this._getName()}
          {this._getAddress()}
          {this._getDescription()}
          {this._getType()}
          {this._getUploadPhoto()}
          {this._getSubmit()}
        </div>
      </form>
    );

    this.root.render(reactNode);
  }
}

customElements.define('wc-accommodation', AccommodationComponent);

export { AccommodationComponent };

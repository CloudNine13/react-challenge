import { createRoot, Root } from 'react-dom/client';
import { getTwind } from '../../../../../../utils';
import { ImageUploader, Name, Address, Description, Type } from './components/';
import './components';

const { sheet, tw } = getTwind();

class AccommodationComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private root: Root;
  private _callback: (() => void) | undefined;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.root = createRoot(this.shadow);
  }

  connectedCallback() {
    this.render();
  }

  set valid(value: boolean) {
    const button = this.shadow.querySelector('button');
    if (button) button.disabled = value;
  }

  set callback(value: () => void) {
    this._callback = value;
  }

  get callback(): (() => void) | undefined {
    return this._callback;
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
    return <ImageUploader />;
  }

  private _getSubmitButton() {
    return (
      <button
        type="submit"
        className={tw`w-full px-4 py-2 mt-auto mb-[50px] text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-30`}
      >
        Next
      </button>
    );
  }

  render() {
    const reactNode = (
      <form
        className={tw`w-full h-full`}
        onSubmit={e => {
          e.preventDefault();
          this._callback?.();
        }}
      >
        <div className={tw`flex flex-col gap-2 w-full h-full p-4`}>
          {this._getName()}
          {this._getAddress()}
          {this._getDescription()}
          {this._getType()}
          {this._getUploadPhoto()}
          {this._getSubmitButton()}
        </div>
      </form>
    );

    this.root.render(reactNode);
  }
}

customElements.define('wc-accommodation', AccommodationComponent);

export { AccommodationComponent };

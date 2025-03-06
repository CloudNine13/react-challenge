import { createRoot, Root } from 'react-dom/client';
import { InfoType } from '../../../../../../types';
import { displayToast, getTwind } from '../../../../../../utils';
import { ImageDownloader } from './components';
import { ToastTypesEnum } from '../../../../../../enums';

const { sheet, tw } = getTwind();

class SummaryComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private root: Root;
  private summaryData: InfoType = {
    name: '',
    address: '',
    description: '',
    type: '',
    images: [],
    ownerName: '',
    email: '',
    phone: '',
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.root = createRoot(this.shadow);
  }

  set data(value: InfoType) {
    this.summaryData = value;
    this.render();
  }

  render() {
    const reactNode = (
      <div className={tw`w-full h-full`}>
        <div className={tw`p-4`}>
          <span className={tw`font-semibold`}>Name: </span>
          <span>{this.summaryData.name}</span>
          <br />
          <span className={tw`font-semibold`}>Address: </span>
          <span>{this.summaryData.address}</span>
          <br />
          <span className={tw`font-semibold`}>Description: </span>
          <span>{this.summaryData.description}</span>
          <br />
          <span className={tw`font-semibold`}>Type: </span>
          <span>{this.summaryData.type}</span>
          <br />
          <span className={tw`font-semibold`}> Photos: </span>
          <br />
          <ImageDownloader images={this.summaryData.images} />
        </div>
        <h3 className={tw`font-bold text-xl mb-2 text-gray-800`}>Owner</h3>
        <div className={tw`p-4`}>
          <span className={tw`font-semibold`}>Name: </span>
          <span>{this.summaryData.ownerName}</span>
          <br />
          <span className={tw`font-semibold`}>Email: </span>
          <span>{this.summaryData.email}</span>
          <br />
          <span className={tw`font-semibold`}>Phone: </span>
          <span>{this.summaryData.phone}</span>
          <br />
        </div>
        <button
          type="submit"
          className={tw`w-full px-4 py-2 mt-auto mb-[50px] text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          onClick={() =>
            displayToast({
              type: ToastTypesEnum.SUCCESS,
              message: 'Accommodation created successfully',
            })
          }
        >
          Submit
        </button>
      </div>
    );

    this.root.render(reactNode);
  }
}

customElements.define('wc-summary', SummaryComponent);

export { SummaryComponent };

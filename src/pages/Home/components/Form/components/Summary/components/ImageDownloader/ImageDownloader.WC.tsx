import { getTwind } from '../../../../../../../../utils';
import { imageClassName } from '../../../utils';

const { sheet, tw } = getTwind();

class ImageDownloaderComponent extends HTMLElement {
  private _images: Array<string> = [];
  private shadow: ShadowRoot;
  private container: HTMLDivElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.container = document.createElement('div');
  }

  set images(value: Array<string>) {
    if (value.length > 0) {
      this._images = value;
    }
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div id="images" class="${tw`grid grid-cols-3 gap-10`}">
        <div id="image-1" class="${imageClassName(tw, 'green')}">
          <span class="${tw`text-xs text-gray-500`}">No photo</span>
        </div>
        <div id="image-2" class="${imageClassName(tw, 'red')}">
          <span class="${tw`text-xs text-gray-500`}">No photo</span>
        </div>
      </div>
    `;
    this.shadow.appendChild(this.container);

    const image1 = this.shadow.getElementById('image-1') as HTMLDivElement;
    const image2 = this.shadow.getElementById('image-2') as HTMLDivElement;

    if (this._images[0])
      image1.innerHTML = `<img src="${this._images[0]}" alt="Image 1" class="${tw`w-full h-full object-cover`}" />`;
    if (this._images[1])
      image2.innerHTML = `<img src="${this._images[1]}" alt="Image 2" class="${tw`w-full h-full object-cover`}" />`;
  }
}

customElements.define('wc-image-downloader', ImageDownloaderComponent);

export { ImageDownloaderComponent };

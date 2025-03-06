import { ToastTypesEnum } from '../../../../../../../../enums';
import { getTwind, displayToast } from '../../../../../../../../utils';
import { openImageEventListener } from './utils';

const { sheet, tw } = getTwind();

class ImageUploadComponent extends HTMLElement {
  private image1: HTMLDivElement;
  private image2: HTMLDivElement;
  private addPhoto: HTMLDivElement;
  private fileInput: HTMLInputElement;
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    const container = document.createElement('div');
    const photoClassName = (color?: string) => {
      let bgColor = '';

      if (color === 'green') {
        bgColor = 'bg-green-100';
      } else if (color === 'red') {
        bgColor = 'bg-red-100';
      }

      return `${tw`w-20 h-20 rounded-xl border-1 border-solid border-black ${bgColor} flex items-center justify-center cursor-pointer`}`;
    };

    container.innerHTML = `
      <label htmlFor="photos" class="${tw`block font-medium text-gray-700 py-1`}">Photos</label>
      <div id="photos" class="${tw`grid grid-cols-3 gap-10`}">
        <div id="photo-1" class="${photoClassName('green')}">
            <span class="${tw`text-xs text-gray-500`}">Photo 1</span>
        </div>
        <div id="photo-2" class="${photoClassName('red')}">
          <span class="${tw`text-xs text-gray-500`}">Photo 2</span>
        </div>
        <div id="add-photo" class="${photoClassName()}">
          <span class="${tw`text-xs text-indigo-500`}">Add Photo</span>
        </div>
      </div>
    `;

    this.shadow.appendChild(container);

    this.image1 = this.shadow.getElementById('photo-1') as HTMLDivElement;
    this.image2 = this.shadow.getElementById('photo-2') as HTMLDivElement;
    this.addPhoto = this.shadow.getElementById('add-photo') as HTMLDivElement;

    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = 'image/*';
    this.fileInput.style.display = 'none';

    this.shadow.appendChild(this.fileInput);

    this.addPhoto.addEventListener('click', () => this.fileInput.click());
    this.fileInput.addEventListener('change', e => this._handleFileUpload(e));
  }

  private _handleFileUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file?.type.startsWith('image/')) {
      displayToast({ type: ToastTypesEnum.ERROR, message: 'Please select a valid image file.' });
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        const image = new Image();
        image.src = imageUrl;

        image.onload = () => {
          if (image.width > 500 || image.height > 500) {
            displayToast({
              type: ToastTypesEnum.ERROR,
              message: 'Image has dimension restrictions of 500x500',
            });
            return;
          }

          const image1 = this.image1.querySelector('img');
          const image2 = this.image2.querySelector('img');

          if (!image1 || !image2) {
            const image = !image1 ? this.image1 : this.image2;
            image.innerHTML = `<img src="${imageUrl}" class="${tw`w-full h-full object-cover`}" />`;
            openImageEventListener(image, imageUrl);

            this.dispatchEvent(
              new CustomEvent('images-info', {
                detail: { value: imageUrl },
                bubbles: true,
                composed: true,
              })
            );
          } else {
            displayToast({ type: ToastTypesEnum.ERROR, message: 'You can only upload 2 photos' });
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
}

customElements.define('wc-image-upload', ImageUploadComponent);

export { ImageUploadComponent };

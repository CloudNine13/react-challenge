import { getTwind } from '../../utils';

const { sheet, tw } = getTwind();

class HomeComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.adoptedStyleSheets = [sheet.target];

    const paragraph = document.createElement('div');
    paragraph.innerHTML = `
      <main class="${tw`h-screen bg-red-400 flex items-center justify-center`}">
        <h1 class="${tw`font-bold text(center 5xl white sm:gray-800 md:pink-700)`}">
          Hello World!
        </h1>
      </main>
    `;
    shadow.appendChild(paragraph);
  }
}

customElements.define('wc-home', HomeComponent);

export { HomeComponent };

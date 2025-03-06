import { createRoot, Root } from 'react-dom/client';
import { getTwind } from '../../utils';
import { Form } from './components';

const { sheet, tw } = getTwind();

class HomeComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private container: HTMLDivElement;
  private root: Root;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
    this.container = document.createElement('div');
    this.root = createRoot(this.shadow.appendChild(this.container));
  }

  connectedCallback() {
    const container = 'w-screen h-screen flex justify-center items-center';
    this.root.render(
      <div className={tw`${container}`}>
        <Form />
      </div>
    );
  }
}

customElements.define('wc-home', HomeComponent);

export { HomeComponent };

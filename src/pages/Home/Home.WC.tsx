import { createRoot } from 'react-dom/client';
import { getTwind } from '../../utils';
import { Form } from '../../components/Form';

const { sheet, tw } = getTwind();

class HomeComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = [sheet.target];
  }

  connectedCallback() {
    const root = createRoot(this.shadow);
    const container = 'w-screen h-screen flex justify-center items-center';
    root.render(
      <div className={tw`${container}`}>
        <Form />
      </div>
    );
  }
}

customElements.define('wc-home', HomeComponent);

export { HomeComponent };

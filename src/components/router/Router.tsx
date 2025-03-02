import { ERROR_MESSAGES, EVENT_LISTENERS, PATHS, SHADOW_OPEN, STRING } from './constants';

class Router extends HTMLElement {
  private routes: { path: string; component: string }[] = [];
  private shadow: ShadowRoot;
  private currentPath: string = window.location.pathname;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: SHADOW_OPEN });
    this.addRoute(PATHS.EVERYTHING_ELSE, 'div'); // TODO: add 404 component
  }

  connectedCallback() {
    this.render();
    window.addEventListener(EVENT_LISTENERS.TYPE.POPSTATE, this.handlePopState.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener(EVENT_LISTENERS.TYPE.POPSTATE, this.handlePopState.bind(this));
  }

  addRoute(path: string, component: string) {
    if (!component || typeof component !== STRING) {
      console.error(ERROR_MESSAGES.INVALID_COMPONENT, component);
      return;
    }

    this.routes.push({ path, component });
  }

  navigate(path: string) {
    if (!path || typeof path !== STRING) {
      console.error(ERROR_MESSAGES.INVALID_PATH, path);
      return;
    }

    history.pushState({}, '', path);

    this.currentPath = path;
    this.render();
  }

  private handlePopState() {
    this.currentPath = window.location.pathname;
    this.render();
  }

  private render() {
    const route =
      this.routes.find(r => r.path === this.currentPath) || this.routes.find(r => r.path === '*');

    if (route) {
      this.shadow.innerHTML = `<${route.component}></${route.component}>`;
    } else {
      this.shadow.innerHTML = `<div>404 - Page Not Found</div>`;
    }
  }
}

customElements.define('wc-router', Router);

export default Router;

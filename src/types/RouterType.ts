type RouterType = HTMLElement & {
  navigate: (path: string) => void;
  addRoute: (path: string, component: string) => void;
};

export type { RouterType };

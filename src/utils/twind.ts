import { create, cssomSheet } from 'twind';

const getTwind = () => {
  const sheet = cssomSheet({ target: new CSSStyleSheet() });
  const { tw } = create({ sheet });

  return { tw, sheet };
};

export { getTwind };

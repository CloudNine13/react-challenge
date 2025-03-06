import { Router } from './components/';

const App = () => {
  const toastElement = document.createElement('div');
  toastElement.id = 'toast';
  toastElement.style = 'position: absolute; top: 20px; right: 20px; z-index: 9999;';
  document.body.appendChild(toastElement);

  return <Router />;
};

export default App;

import { useEffect } from 'react';
import { RouterType } from './types';
import './components/router/Router';

const App = () => {
  useEffect(() => {
    const router = document.querySelector('wc-router') as RouterType;
    console.log({ router });
    if (router) {
      router.addRoute('/', 'home-component');
      router.addRoute('/about', 'about-component');
    }
  }, []);

  const navigate = (path: string) => {
    const router = document.querySelector('wc-router') as RouterType;
    if (router) {
      router.navigate(path);
    }
  };

  return (
    <div className="absolute top-4 right-5 min-h-screen bg-gray-100 p-6">
      <nav className="mb-8">
        <button
          className="bg-blue-200 text-black px-6 py-2 rounded-lg mr-4 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          onClick={() => navigate('/404')}
        >
          Test 404
        </button>
      </nav>
      <wc-router />
    </div>
  );
};

export default App;

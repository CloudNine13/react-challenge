import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from '../Home';
import '../Home';

//import { PATHS } from './constants';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

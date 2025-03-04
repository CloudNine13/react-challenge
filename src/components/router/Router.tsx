import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from '../../pages';
import '../../pages';

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

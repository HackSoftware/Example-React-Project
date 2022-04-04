import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HOME_URL, LOGIN_URL, FILES_UPLOAD_URL } from 'config/urls';

import Home from 'pages/Home';

import Login from 'pages/Login';

import FilesUpload from 'pages/FilesUpload';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={HOME_URL} element={<Home />} />
        <Route path={FILES_UPLOAD_URL} element={<FilesUpload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

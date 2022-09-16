import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import '../src/assests/css/style.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from './components/PageNotFound';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="frontend/activities/:slug">
          <Route path=":activity" element={<App />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

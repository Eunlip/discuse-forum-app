import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './states';
import App from './App';
import './index.css';

const routerConfig = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<App />} />),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={routerConfig} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
);

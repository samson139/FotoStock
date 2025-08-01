import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  Signin, User, UserLayout, Contact, CartItems, Search,
  Checkout, Payment, Success, Imagedetail
} from "../components";
import Upload from '../components/Upload.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import Authentication from '../components/Authentication.jsx';
import ThemeContext from '../components/ThemeContext.jsx';
import store from '../Redux/Store/Store.js';
import { Provider } from "react-redux";
import MainLayout from '../components/MainLayout.jsx';

import { HashRouter, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <ThemeContext>
          <HashRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<App />} />
                <Route path="signin" element={<Signin />} />
              </Route>

              <Route path="/user" element={<UserLayout />}>
                <Route index element={<User />} />
                <Route path="upload" element={<Upload />} />
                <Route path="contact" element={<Contact />} />
                <Route path="image/:id" element={<Imagedetail />} />
                <Route path="cartitems" element={<CartItems />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="payment" element={<Payment />} />
                <Route path="success" element={<Success />} />
                <Route path="search" element={<Search />} />
                <Route path="search/image/:id" element={<Imagedetail />} />
              </Route>
            </Routes>
          </HashRouter>
          <ToastContainer position="top-center" autoClose={5000} />
        </ThemeContext>
      </Authentication>
    </QueryClientProvider>
  </Provider>
);

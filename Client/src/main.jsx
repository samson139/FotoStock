
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx'
import { Signin, User, UserLayout, Contact, CartItems, Search, Checkout, Payment, Success, Imagedetail } from "../components";
import Upload from '../components/Upload.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import Authentication from '../components/Authentication.jsx';
import ThemeContext from '../components/ThemeContext.jsx';
import store from '../Redux/Store/Store.js';
import { Provider } from "react-redux";
import MainLayout from '../components/MainLayout.jsx';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "signin",
        element: <Signin />
      }
    ]
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <User />
      },
      {
        path: 'upload',
        element: <Upload />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'image/:id',
        element: <Imagedetail />
      },

      {
        path: 'cartitems',
        element: <CartItems />,
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'success',
        element: <Success />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'search/image/:id',
        element: <Imagedetail />
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <ThemeContext>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" autoClose={5000} />
        </ThemeContext>
      </Authentication>
    </QueryClientProvider>
  </Provider>
);

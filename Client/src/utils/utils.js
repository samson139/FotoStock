import axios from 'axios';

const customFetch = axios.create({

  baseURL: import.meta.env.VITE_API_URL

})
customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default customFetch;



export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem(`cart`, JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem(`cart`);
  return cart ? JSON.parse(cart) : [];
};

import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://fotostock.onrender.com',
  withCredentials: true,
})


export default customFetch;



export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem(`cart`, JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem(`cart`);
  return cart ? JSON.parse(cart) : [];
};

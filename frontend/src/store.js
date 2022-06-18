import React, { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  cart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.find((item) => item === newItem);
      const cartItems = existItem
        ? state.cart.map((item) => (item === existItem ? newItem : item))
        : [...state.cart, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: cartItems };
    case 'CART_REMOVE_ITEM':
      const cartitems = state.cart.filter((item) => item !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(cartitems));
      return { ...state, cart: cartitems };
    case 'CART_UPDATE':
      localStorage.setItem('cartItems', JSON.stringify(action.payload));
      return { ...state, cart: action.payload };
    case 'CART_EMPTY':
      localStorage.setItem('cartItems', []);
      return { ...state, cart: [] };
    case 'USER_SIGNIN':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: [],
      };
    case 'UPDATE_USER':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const { userInfo, cart } = state;
  return <Store.Provider value={value}> {props.children}</Store.Provider>;
}

import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const cartProducts = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload
    }

  }
})



export const thunkCartGet = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get('https://e-commerce-api.academlo.tech/api/v1/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((resp) => dispatch(setCart(resp.data.data.cart.products))) //ver con cuidado la respuesta
    .catch((resp) => console.log(resp))
    .finally(() => dispatch(setIsLoading(false)));
}


export const thunkCartPost = (body) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post('https://e-commerce-api.academlo.tech/api/v1/cart', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => dispatch(thunkCartPost()))
    // .then((resp)=>console.log(resp))
    .catch((resp) => console.log(resp))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartProducts.actions;

export default cartProducts.reducer;

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstant";

import axios from "axios";

// create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "applicatio/json",
      },
    };
    const data = await axios.post("api/v1/order/new", order, config);
    dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};




// my orders

export const myOrders = ()=> async(dispatch)=>{
try {
  dispatch({type:MY_ORDERS_REQUEST});
  const {data} = axios.get("/api/v1/orders/me");
  dispatch({type:MY_ORDERS_SUCCESS,payload:data.orders});
} catch (error) {
  dispatch({type:MY_ORDERS_FAIL,payload:error.response.data.message});
}
}


// clearing errors

export const clearError = ()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
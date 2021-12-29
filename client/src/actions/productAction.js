import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_DETAILS_REQUEST,
  ALL_DETAILS_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  ALL_DETAILS_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProduct =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.resonse.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: ALL_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: ALL_DETAILS_FAIL,
      payload: error.resonse.data.message,
    });
  } 
};


// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};




//  clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

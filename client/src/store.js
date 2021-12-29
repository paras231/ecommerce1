import { createStore, combineReducers, applyMiddleware } from "redux";
import { productReducer,productDetailsReducer,newProductReducer,productsReducer } from "./reducers/productReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { profileReducer, userReducer,forgotPasswordReducer,allUsersReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {newOrderReducer,myOrdersReducer,} from './reducers/orderReducer';
const reducer = combineReducers({
  products:productReducer,
  productDetails:productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  newProduct:newProductReducer,
  product:productsReducer,
  allUsers: allUsersReducer,
});

let intitialState = {
cart:{
  cartItems:localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")) :[],
  
  shippingInfo:localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")) : {}
},

};
const middleware = [thunk];
const store = createStore(
  reducer,
  intitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
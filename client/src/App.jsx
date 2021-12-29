import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/header/Header.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/home/Home.jsx";
import Payment from "./component/cart/Payment.jsx";
import ProductDetails from "./component/product/ProductDetails.jsx";
import Products from "./component/product/Products.jsx";
import Search from "./component/product/Search.jsx";
import LoginSignup from "./component/user/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile.jsx";
import ProtectedRoute from "./component/route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile.jsx";
import UpdatePassword from "./component/user/UpdatePassword.jsx";
import ForgotPassword from "./component/user/ForgotPassword.jsx";
import ResetPassword from "./component/user/ResetPassword.jsx";
import Cart from "./component/cart/Cart.jsx";
import Shipping from "./component/cart/Shipping.jsx";
import ConfirmOrder from "./component/cart/ConfirmOrder.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/order/MyOrders.jsx";
import Dashboard from "./component/admin/Dashboard.jsx";
import ProductList from "./component/admin/ProductList.jsx";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct.jsx";
import UsersList from "./component/admin/UsersList";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(
    process.env.REACT_APP_STRIPE_KEY
  );

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignup} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

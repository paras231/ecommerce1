import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { clearError, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader.jsx";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, productsCount, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
       alert.error(error);

       dispatch(clearError());
    }

    dispatch(getProduct());
  }, [dispatch, error,alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>Find Amazing Products</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product,i) => <ProductCard key={i} product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

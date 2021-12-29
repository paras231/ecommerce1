import React,{useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import LaunchIcon from "@material-ui/icons/Launch";
import { clearError, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";

const MyOrders = () => {


  


  return (
    <>
    <div className="main">  <Typography className="myOrdersHeading"> User Orders </Typography></div>
   
  </>
  );
};

export default MyOrders;

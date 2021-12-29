const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorhandler");

// create new error
exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ success: true, order });
};

// get single order -- admin

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }
  res.status(200).json({ success: true, order });
};

// get logged in user orders

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, orders });
};

// get all  orders -- admin

exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({ success: true, orders, totalAmount });
};

//update order status - amdin

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);


  if (!order) {
    return next(new ErrorHandler("order not found"));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("you have alrdeay delivered this product", 404)
    );
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order -  admin

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.prams.id);
  if (!order) {
    return next(new ErrorHandler("order not found"));
  }
  await order.remove();
  res.status(200).json({ success: true });
};

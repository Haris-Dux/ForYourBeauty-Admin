import { OrdersModel } from "../models/OrdersModel.js";
import { setMongoose } from "../utils/Mongoose.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      name,
      userID,
      address,
      phone,
      totalAmount,
      OrderID,
      couponUsed,
      orderProgress,
    } = req.body;
    if (items.length === 0) {
      throw new Error("No Items In Cart");
    }
    if (!userID || !address || !phone || !totalAmount || !name) {
      throw new Error("Please provide All Fields");
    }
    const order = await OrdersModel.create({
      items,
      userID,
      name,
      address,
      phone,
      totalAmount,
      OrderID,
      couponUsed,
      orderProgress,
    });
    return res
      .status(201)
      .json({ message: "Order PLaced Succcessfully", OrderID: order.OrderID });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id, orderProgress, address, phone } = req.body;
    let orderQuery = {};
    if (!id) {
      throw new Error("No ID Provided");
    }
    const order = await OrdersModel.findOne({ _id: id });

    if (!order) {
      throw new Error("No Order Data Found");
    }
    if (address) {
      orderQuery = { ...orderQuery, address };
    }
    if (phone) {
      orderQuery = { ...orderQuery, phone };
    }
    console.log(id, orderProgress);
    if (orderProgress) {
      orderQuery = { ...orderQuery, orderProgress };
    }
    if (Object.keys(orderQuery).length === 0)
      throw new Error("No fileds Updated");
    await OrdersModel.findByIdAndUpdate(id, orderQuery);
    return res.status(200).json({ message: "Order Data Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllOrdersForUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("You must provide an Id");
    const orders = await OrdersModel.find({ id }).sort({ createdAt: -1 });
    setMongoose();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    var page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const limit = 5;
    const orders = await OrdersModel.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await OrdersModel.find().countDocuments();
    setMongoose();
    return res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

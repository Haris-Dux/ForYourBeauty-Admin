import { OrdersModel } from "../models/OrdersModel.js";
import { setMongoose } from "../utils/Mongoose.js";

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
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    let search = req.query.search || "";
    let orderProgress = req.query.status || "All";

    let query = {
      OrderID: { $regex: search, $options: "i" },
    };

    if (orderProgress !== "All") {
      query.orderProgress = orderProgress;
    }

    const orders = await OrdersModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await OrdersModel.countDocuments(query);

    const response = {
      totalPages: Math.ceil(total / limit),
      page,
      orders,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: error.message });
  }
};

export const getPercentageOfOrderProgress = async (req, res, next) => {
  try {
    const ordersData = await OrdersModel.find({});
    if (!ordersData || ordersData.length === 0)
      throw new Error("No Orders Data");
    const statusCount = {
      Pending: 0,
      Delivered: 0,
      Dispatched: 0,
      Cancelled: 0,
    };
    ordersData.forEach((orders)=>{
      const progress = orders.orderProgress;
      if(statusCount[progress] !== undefined){
        statusCount[progress] += 1;
      }
    });
    const totalOrders = ordersData.length;
    const statusPercentage  = {
      Pending:(statusCount.Pending / totalOrders) * 100,
      Delivered:(statusCount.Delivered / totalOrders) * 100,
      Dispatched:(statusCount.Dispatched / totalOrders) * 100,
      Cancelled:(statusCount.Cancelled / totalOrders) * 100,
    };
    return res.status(200).json(statusPercentage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSalesStatistics = async (req, res, next) => {
  try {
    // Step 1: Retrieve all orders from the database
    const ordersData = await OrdersModel.find({});
    if (!ordersData || ordersData.length === 0) {
      throw new Error('No Orders Data');
    }

    // Step 2: Calculate total sales
    const totalSales = ordersData.reduce((acc, order) => acc + order.totalAmount, 0);

    // Step 3: Calculate sales for different time periods (e.g., last month vs. current month)
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const lastMonthSales = ordersData
      .filter(order => new Date(order.createdAt) >= lastMonthDate && new Date(order.createdAt) < currentMonthDate)
      .reduce((acc, order) => acc + order.totalAmount, 0);

    const currentMonthSales = ordersData
      .filter(order => new Date(order.createdAt) >= currentMonthDate)
      .reduce((acc, order) => acc + order.totalAmount, 0);

    // Step 4: Calculate percentage increase or decrease in sales
    const salesDifference = currentMonthSales - lastMonthSales;
    const salesChangePercentage = lastMonthSales === 0
      ? (currentMonthSales === 0 ? 0 : 100)
      : (salesDifference / lastMonthSales) * 100;

    // Step 5: Return the calculated statistics as a response
    const salesStatistics = {
      totalSales,
      lastMonthSales,
      currentMonthSales,
      salesChangePercentage
    };

    res.status(200).json(salesStatistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



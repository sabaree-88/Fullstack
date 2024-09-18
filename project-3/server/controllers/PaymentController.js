import { Order } from "../models/OrderSchema.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const calculateTotalAmount = (items) => {
  return items.reduce(
    (total, item) => total + item.bookId.price * item.quantity,
    0
  );
};

export const addPayment = async (req, res) => {
  const userId = req.user._id;

  try {
    const totalAmount = calculateTotalAmount(req.body.items);

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      items: req.body.items,
      addressId: req.body.addressId,
      totalAmount,
      paymentStatus: "Pending",
      paymentDetails: {
        razorpay_order_id: razorpayOrder.id,
      },
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      newOrder,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { paymentId, order_id, signature } = req.body;

  if (!paymentId || !order_id || !signature) {
    return res
      .status(400)
      .json({ success: false, message: "Missing payment details" });
  }

  try {
    const body = order_id + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === signature) {
      await Order.updateOne(
        { "paymentDetails.razorpay_order_id": order_id },
        {
          $set: {
            paymentStatus: "Completed",
            paymentDetails: {
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
            },
          },
        }
      );

      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOrder = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate("addressId")
      .populate("items.bookId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders", error });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("addressId")
      .populate("items.bookId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch order", error });
  }
};

export const trackOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("addressId")
      .populate("items.bookId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to track order", error });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (
      order.orderStatus === "Completed" ||
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot cancel this order" });
    }

    order.orderStatus = "Canceled";
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order canceled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel order", error });
  }
};

//manage orders admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("addressId")
      .populate("items.bookId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error });
  }
};

export const getOrderDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("userId", "name email")
      .populate("addressId")
      .populate("items.bookId");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch order", error });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const allowedStatuses = ["Pending", "Shipped", "Delivered", "Canceled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status update" });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update order status", error });
  }
};
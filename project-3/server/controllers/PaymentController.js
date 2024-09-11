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
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const addPayment = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const totalAmount = calculateTotalAmount(items);

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus: "Pending",
      paymentDetails: {
        razorpay_order_id: razorpayOrder.id,
      },
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Order creation failed", error });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { "paymentDetails.razorpay_order_id": razorpay_order_id },
        {
          paymentStatus: "Paid",
          paymentDetails: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          orderStatus: "Processing",
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error,
    });
  }
};

export const getOrder = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate("items.bookId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders", error });
  }
};

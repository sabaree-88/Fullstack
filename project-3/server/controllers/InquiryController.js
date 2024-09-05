import { Inquiry } from "../models/InquiryModel.js";

export const storeInquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    const newInquiry = new Inquiry({
      firstName,
      lastName,
      email,
      message,
    });

    await newInquiry.save();

    return res.status(201).json({
      success: true,
      newInquiry,
      message: "Your inquiry has been submitted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting your inquiry.",
    });
  }
};

export const getInquiry = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ date: -1 });
    return res.status(200).json({ inquiries });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching inquiries.",
    });
  }
};

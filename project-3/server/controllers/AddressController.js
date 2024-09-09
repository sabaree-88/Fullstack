import Address from "../models/AddressSchema.js";

export const addAddress = async (req, res) => {
  try {
    // const user_id = req.user._id;
    const {
      fullname,
      address,
      city,
      state,
      zipcode,
      country,
      paymentMethod,
      user_id,
    } = req.body;

    const newAddress = new Address({
      user_id,
      fullname,
      address,
      city,
      state,
      zipcode,
      country,
      paymentMethod,
    });
    await newAddress.save();

    return res.status(200).json({ newAddress });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getAddress = async (req, res) => {
  try {
    const result = await Address.find({}).populate("user_id");
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

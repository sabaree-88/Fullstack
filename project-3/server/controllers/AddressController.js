import Address from "../models/AddressSchema.js";

export const addAddress = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { fullname, address, city, state, zipcode, country, paymentMethod } =
      req.body;

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

    return res
      .status(200)
      .json({ message: "Address saved successfully", newAddress });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to save address", error: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const result = await Address.find({ user_id: req.user._id }).populate(
      "user_id"
    );
    if (!result) {
      return res.status(404).json({ message: "No address found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching address", error: error.message });
  }
};

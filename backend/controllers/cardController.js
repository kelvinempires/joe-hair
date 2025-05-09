import UserModel from "../models/user.model.js";

//add product to user cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;
//     const userData = await UserModel.findById(userId);
//     let cartData = await userData.cartData;
//     if (!cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }
//     await UserModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: "Product added to cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

const addToCart = async (req, res) => {
  try {
   const { itemId, size } = req.body;
   const userId = req.user._id;
   const userData = await UserModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Ensure cartData exists
    userData.cartData = userData.cartData || {};

    // Ensure item exists before updating
    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = {};
    }

    // Increment the quantity of the selected size
    if (userData.cartData[itemId][size]) {
      userData.cartData[itemId][size] += 1;
    } else {
      userData.cartData[itemId][size] = 1;
    }

    // **Fix:** Explicitly tell Mongoose this field changed
    userData.markModified("cartData");

    // **Fix:** Save the updated user document
    await userData.save();

    return res.json({ success: true, message: "Product added to your cart" });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Database update failed." });
  }
};
// update cart
const updateCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user._id;
    const userData = await UserModel.findById(userId);

    userData.cartData[itemId][size] = quantity;
    userData.markModified("cartData");
    await userData.save();
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get user cart data
// get user cart data
const getUserCart = async (req, res) => {
  try {
    // ✅ Use ID from req.user instead of req.body
    const userId = req.user._id;
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData;
    if (!cartData) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };

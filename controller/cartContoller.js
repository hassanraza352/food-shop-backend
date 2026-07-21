const Cart = require("../models/cartSchema");
const addToCart = async (req, res) => {
   try{
    const { foodId, quantity } = req.body;
    const userId = req.user.id;
        const existingCartItem = await Cart.findOne({
    user: userId,
    food: foodId
});

if (existingCartItem) {
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
} else {
    const cartItem = new Cart({
        user: userId,
        food: foodId,
        quantity
    });
    await cartItem.save();
}

res.status(201).json({
    message: "Item added to cart successfully"
});
   }
   catch(error){
    console.log("error in add to cart");
    console.log(error);
     res.status(500).json({
        message: "Failed to add item to cart",
        error: error.message
    });
   }
};


const getCart = async (req, res) => {
   try{
    const userId = req.user.id;
   const cart=await Cart.find({user:userId}).populate("food");
   res.status(200).json({
    cart
   })
   }
   catch(error){
    console.log("error in get cart");
    console.log(error);

   }
};

const removeCartItem = async (req, res) => {
   try{
    const { id } = req.params;
await Cart.findByIdAndDelete(id);
res.status(200).json({
    message: "Item removed from cart successfully"
});
   }
   catch(error){
    console.log("error in remove cart item");
    console.log(error);

   }
};

const updateQuantity = async (req, res) => {

    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
        id,
        { quantity },
        { new: true }
    );

    res.json(cartItem);

};
module.exports = {
  addToCart,
  getCart,
  removeCartItem,
  updateQuantity
};
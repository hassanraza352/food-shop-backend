const  Order=require("../models/orderScehma");
const Cart = require("../models/cartSchema");

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("items.food", "foodName price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders
    });

  } catch (error) {

    console.log("Error in get all orders");
    console.log(error);

    res.status(500).json({
      message: "Failed to get orders",
      error: error.message
    });

  }
};
const getOrderById=async(req, res)=>{
  try{
    const order=await Order.findById(req.params.id);
    res.status(200).json({
      order
    })
  }
  catch{
    console.log("error in get order by id");
    console.log(error);
  }
}

const updateOrderStatus = async (req, res) => {
  console.log(req.body);
    try {

        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: status
            },
            {
                new: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to update order status",
            error: error.message
        });

    }
};

const deleteOrder=async(req, res)=>{
    try{
      const order=await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message:"Order deleted successfully",
        order
      })
    }
    catch{
      console.log("error in delete order");
      console.log(error);
      res.status(500).json({
        message: "Failed to delete order",
        error: error.message
    });
    }
}

const placeOrder = async (req, res) => {
  try {

    const userId = req.user.id;

    const { phone, address } = req.body;

    const cartItems = await Cart.find({
      user: userId
    }).populate("food");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    const orderItems = cartItems.map(item => ({
      food: item.food._id,
      quantity: item.quantity
    }));
    const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.food.price * item.quantity);
}, 0);
const order = new Order({
    customer: userId,
    items: orderItems,
    totalAmount,
    phone,
    address,
    status: "Pending"
});

await order.save();
await Cart.deleteMany({
    user: userId
});

res.status(201).json({
    message: "Order placed successfully",
    order
});


  } catch (error) {

    console.log("error in place order");
    console.log(error);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });

  }
};




const getMyOrders = async (req, res) => {
    try {

        const userId = req.user.id;
        const orders = await Order.find({
            customer: userId
        })
        .populate("items.food")
        .sort({ createdAt: -1 });
        res.status(200).json({
            orders
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });

    }
};

module.exports={
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  placeOrder,
  getMyOrders
}

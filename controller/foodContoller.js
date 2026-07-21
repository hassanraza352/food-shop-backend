
const Food = require("../models/foodScehma");

const addFood = async (req, res) => {
  try {

    const { foodName, description, price, category } = req.body;

    const image = req.file ? req.file.path : "";

    const food = new Food({
      foodName,
      description,
      price,
      image,
      category
    });

    await food.save();

    res.status(201).json({
      message: "Food Added",
      food
    });

  } catch (error) {

    console.log("Save data ke time error aya hai");
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

  
const getAllFoods = async (req, res) => {
  try{
    const foods = await Food.find();
    res.status(200).json({
      foods
    })
  }
  catch(error){
    console.log("getall data k time error aya ha ")
    console.log(error);
      res.status(500).json({
        message: "Failed to get foods",
        error: error.message
    });
  }

}

const getFoodById = async (req, res) => {
  try{
    const food = await Food.findById(req.params.id);
    res.status(200).json({
      food
    })
  }
  catch(error){
    console.log("getbyid data k time error aya ha ")
    console.log(error);
      res.status(500).json({
        message: "Failed to get food by id",
        error: error.message});
  }

}

const updateFood = async (req, res) => {
  try{
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "Food updated successfully",
      food
    });
  }
  catch(error){
    console.log("update data k time error aya ha ")
    console.log(error);
      res.status(500).json({
        message: "Failed to update food",
        error: error.message
    });
  }


}

const deleteFood = async (req, res) => {
  try{
    const food = await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Food deleted successfully",
      food
    });
  }
  catch(error){
    console.log("delete data k time error aya ha ")
    console.log(error);
      res.status(500).json({
        message: "Failed to delete food",
        error: error.message
    });

  }
}


module.exports = {
    addFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood
};
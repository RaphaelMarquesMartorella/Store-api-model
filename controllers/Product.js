const Product = require("../model/product");
const Company = require("../model/company")

const createProduct = async (req, res) => {
  const { productName, description, price, category } = req.body;

  try {
    const existingProduct = await Product.findOne({ productName });

    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'There is no company registered as user.' });
    }

    const newProduct = new Product({
      productName,
      description,
      price,
      category,
      companyId: req.user.id
    });

    if (existingProduct) {
      return res.json({ error: "This product was already added." });
    }

    await newProduct.save();

    const companyProduct = await Company.findOne({_id: newProduct.companyId})

    companyProduct.productId.push(newProduct)

    companyProduct.save()

    res.status(201).json({ message: "Product created successfully!", allProducts: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred." });
  }
};




const getProducts = async (req, res) => {
  try {
    if(!req.user || !req.user.id) {
      return res.status(400).json({error: 'There is no company registered as user.'})
    }
    const response = await Product.find({companyId:req.user.id});
    res.json({ allProducts: response }).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get the products." }).status(500);
    console.log(error);
  }
};

const getOneProduct = async (req, res) => {
  try {
    if(!req.user || !req.user.id) {
      return res.status(400).json({error: 'There is no company registered as user.'})
    }
    const Products = await Product.find({companyId:req.user.id});
    const response = await Products.findById({ _id: req.params.id });
    res.json(response).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get this product." }).status(500);
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  
  try {
    if(!req.user || !req.user.id) {
      return res.status(400).json({error: 'There is no company registered as user.'})
    }
    const response = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(response).status(200);
  } catch (error) {
    res
      .json({ error: "It was not possible to update this product." })
      .status(500);
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await Product.findByIdAndRemove(req.params.id);
    if (response) {
      res.json("The removal was succesfull.").status(200);
    } else {
      res.json("There is no item that match this id.").status(500);
    }
  } catch (error) {
    res
      .json({ error: "It was not possible to delete this product." })
      .status(500);
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};

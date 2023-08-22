const Product = require("../model/product");
const Company = require("../model/company")

const createProduct = async (req, res) => {
  const { productName, description, price, category } = req.body;

  try {
    const existingProduct = await Product.findOne({ productName });

    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'There is no company registered as user.' });
    }

    const companyProduct = await Company.findOne({ _id: req.user.id });

    if (!companyProduct) {
      return res.status(404).json({ error: "There is no company for this user." });
    }

    if (existingProduct) {
      return res.json({ error: "This product was already added." });
    }

    const newProduct = new Product({
      productName,
      description,
      price,
      category,
      companyId: req.user.id
    });

    await newProduct.save();

    const productId = newProduct.productId;

    const productEntry = {
      productId,
    };
  
    companyProduct.products.push(productEntry);
  
    await companyProduct.save();

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
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'There is no company registered as user.' });
    }

    const user = await Product.find({ user: req.user.id });
    if (!user) {
      return res
        .status(404)
        .json({ error: "There is no product for this user." });
    }


    const paramId = await Product.findOne({
      _id: req.params.id,
    });
    if (!paramId) {
      return res
        .status(404)
        .json({ error: "There is no client with this id param." });
    }
    
    const response = await Product.findOne({
      _id: req.params.id,
      companyId: req.user.id
    });

    if (!response) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(response).status(200);
  } catch (error) {
    res.status(500).json({ error: 'It was not possible to get this product.' });
    console.log(error);
  }
};



const updateProduct = async (req, res) => {
  
  try {
    if(!req.user || !req.user.id) {
      return res.status(400).json({error: 'There is no company registered as user.'})
    }
    const response = await Product.findOneAndUpdate(
      { _id: req.params.id,
        companyId: req.user.id },
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
    const response = await Product.findOneAndDelete({ _id: req.params.id,
      companyId: req.user.id });
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

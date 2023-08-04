const Product = require('../model/product')

const createProduct = async (req,res) => {
    
    try {
        const response = await Product.create({...req.body})
        if(response){
            res.json(response).status(201)
        }else {
            res.json('There was a problem.').status(500)
        }
    } catch (error) {
        
        console.log(error);
    }
    
}

const getProducts = async (req,res) => {
    try {
        const response = await Product.find({})
        res.json({allProducts: response}).status(200)
    } catch (error) {
        
        console.log(error);
    }
}

const getOneProduct = async (req,res) => {
    try {
        const response = await Product.findById({_id: req.params.id})
        res.json(response).status(200)
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req,res) => {
    try {
        const response = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(response).status(200)
    } catch (error) {
     console.log(error);   
    }
}

const deleteProduct = async (req,res) => {
    try {
        const response = await Product.findByIdAndDelete({_id: req.params.id})
        if(response) {
            res.json({response: 'The removal was succesfull!'}).status(200)
        }

    } catch (error) {
     console.log(error);   
    }
}


module.exports = {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}
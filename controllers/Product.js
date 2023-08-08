const Product = require('../model/product')

const createProduct = async (req,res) => {
    const {productName} = req.body
    try {
        const existingProduct = await Product.findOne({productName})
        const response = await Product.create({...req.body})
        if(!existingProduct) {
            if(response){
                res.json({message: "Product created successfully!", Product: response}).status(201)
            }else {
                res.json('There was a problem.').status(500)
            }
        } else {
            res.json({error: 'This product was already added.'})
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
        res.json({error: 'It was not possible to get this product.'}).status(500)
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
        const response = await Product.findByIdAndRemove(req.params.id)
        if(response){
            res.json('The removal was succesfull.').status(200)
        }else {
            res.json('There is no item that match this id.').status(500)
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
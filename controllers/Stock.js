const Stock = require('../model/stock')

const createStock = async (req, res) => {
    const { productId, stockNumber } = req.body;
    try {
      const existingStock = await Stock.findOne({ productId }).exec();
      if (existingStock) {
        existingStock.stockNumber += stockNumber;
        await existingStock.save();
        res.status(201).json(existingStock);
      } else {
        const newStock = new Stock({
          productId,
          stockNumber,
        });
        await newStock.save();
        res.status(201).json(newStock);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "It was not possible to create the stock." });
    }
  };

  getStock = async (req,res) => {
    const { productId } = req.body;
    try {
      const stock = await Stock.findOne({productId})
    if(stock) {
      res.json(stock).status(200)
    }else {
      res.json({error: 'Could not find this stock'}).status(200)
    }
    } catch (error) {
      console.log(error);
    }
    
  }

  const getAllStock = async (req, res) => {
    try {
      let allStock = await Stock.find();
      let totalStock = 0;
  
      for (let index = 0; index < allStock.length; index++) {
        const stockItem = allStock[index];
        totalStock += stockItem.stockNumber;
      }
  
      res.json({ totalStock, allStock }).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to get stock data." });
    }
  };

  const updateStock = async (req,res) => {
    const {productId, stockNumber} = req.body
    try {
      let existingStock= await Stock.findById({_id: req.params.id}).exec()
      if(!existingStock.productId.equals(productId) || existingStock.stockNumber !== stockNumber) {
        existingStock = new Stock({
          productId, 
          stockNumber
        })
        await existingStock.save()
        res.json(existingStock).status(200)
      }else {
        res.json({error: 'The data are the same. Therefore it was not updated.'}).status(500)
      }
      
    } catch (error) {
      console.log();
      res.json({error: 'There is no stock that match this id.'}).status(500)
    }
    
  }

  const deleteStock = async (req,res) => {
    
      Stock.findByIdAndDelete({_id: req.params.id}).then
      ((deletedStock) => {
        if(deletedStock) {
          res.json({message: 'Your removal was successfull!'})
        }else {
          res.json({error: 'There is no item that match this id.'}).status(404)
        }
        
      }).catch((error) => {
        console.log(error);
        res.json({error: 'It was not possible to delete this stock.'}).status(500)
      })
      
    } 
  

module.exports = {
    createStock,
    getStock,
    getAllStock,
    updateStock,
    deleteStock
}
const Stock = require('../model/stock')
const Product = require('../model/product')

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
  
      res.json({ totalStock }).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to get stock data." });
    }
  };
  
  

module.exports = {
    createStock,
    getStock,
    getAllStock,
}
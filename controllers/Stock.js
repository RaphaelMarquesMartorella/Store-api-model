const Stock = require('../model/stock')

const createStock = async (req, res) => {
    const { productId, stockNumber } = req.body;
    try {
      const existingStock = await Stock.findOne({ productId }).exec();
      if (existingStock) {
        // If stock already exists for the product, update the quantity
        existingStock.stockNumber += stockNumber;
        await existingStock.save();
        res.status(201).json(existingStock);
      } else {
        // If no stock exists for the product, create a new one
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
  

module.exports = {
    createStock
}
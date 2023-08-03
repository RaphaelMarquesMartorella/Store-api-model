const Sales = require("../model/sales");
const Stock = require('../model/stock')


const createSales = async (req, res) => {
    const { clientId, productId } = req.body;
    try {
      // Find the existing sale document for the client
      let existingSale = await Sales.findOne({ clientId }).exec();
  
      if (!existingSale) {
        // If no sale exists for the client, create a new one
        existingSale = new Sales({
          clientId: clientId,
          productId: [productId],
        });
      } else {
        // If a sale already exists for the client, push the new productId to the array
        existingSale.productId.push(productId);
      }
  
      // Save the updated sale document
      await existingSale.save();
  
      // Update the stock
      const stock = await Stock.findOne({ productId }).exec();
      if (stock) {
        stock.stockNumber--;
        await stock.save();
      }
  
      res.status(201).json(existingSale);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "It was not possible to create this sale." });
    }
  };
  
  

const getSales = async (req, res) => {
  try {
    const response = await Sales.find({});
    res.json(response).staus(200);
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to get the sales." });
  }
};

const getOneSale = async (req, res) => {
  try {
    const response = await Sales.findById({ _id: req.params.id });
    res.json(response).staus(200);
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to get this sale." });
  }
};

const updateSale = async (req, res) => {
    const {  clientId, productId, newPosition } = req.body;
    try {
      let existingSale = await Sales.findById({ _id: req.params.id }).exec();
  
      if (!existingSale) {
        res.status(404).json({ message: 'Sale not found.' });
      } else {
       
        if (existingSale.clientId !== clientId) {
          existingSale.clientId = clientId;
        }
        if (!existingSale.productId.includes(productId)) {
          existingSale.productId.push(productId);
        }
  
        if (newPosition !== undefined && newPosition >= 0 && newPosition < existingSale.productId.length) {
          const currentIndex = existingSale.productId.indexOf(productId);
          if (currentIndex !== -1) {
            existingSale.productId.splice(currentIndex, 1); // Remove the productId from the current position
            existingSale.productId.splice(newPosition, 0, productId); // Insert the productId at the new position
          }
        }
  
        await existingSale.save();
        res.status(200).json(existingSale);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Could not update this sale.' });
    }
  };
  
  
const deleteSale = async (req, res) => {
  try {
    const response = await Sales.findByIdAndDelete({ _id: req.params.id });
    if (response) {
      res.json(response).staus(200);
    } else {
      res.json("It was not possible to delete this sale.").staus(200);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to delete this sale." });
  }
};

module.exports = {
  createSales,
  getSales,
  getOneSale,
  updateSale,
  deleteSale,
};

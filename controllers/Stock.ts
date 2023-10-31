const Stock = require("../model/stock");
const Product = require("../model/product");
import { Request, Response } from "express";

export const createStock = async (req: Request, res: Response) => {
  const { productId, stockNumber } = req.body;
  try {
    const existingProduct = await Product.findOne({ productId });
    const existingStock = await Stock.findOne({ productId }).exec();

    if (existingProduct) {
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
        res.status(201).json({message: "Stock created successfully!", Stock: newStock});
      }
    } else {
      res
        .status(404)
        .json({ error: "There is no product with this productId." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "It was not possible to create the stock." });
  }
};

export const getStock = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (stock) {
      res.json(stock).status(200);
    } else {
      res.json({ error: "Could not find this stock" }).status(200);
    }
  } catch (error) {
    res.json({error: 'It was not possible  to get this stock.'}).status(500);
    console.log(error);
  }
};

export const getAllStock = async (req: Request, res: Response) => {
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

export const updateStock = async (req: Request, res: Response) => {
  const { productId, stockNumber } = req.body;
  try {
    let existingProduct = null;
    if (productId) {
      existingProduct = await Product.findOne({ productId });
      if (!existingProduct) {
        return res.json({ error: "There is no product with this productId." }).status(404);
      }
    }

    let existingStock = await Stock.findById(req.params.id).exec();
    if (!existingStock) {
      return res.json({ error: "Stock not found." }).status(404);
    }

    if (productId && !existingStock.productId.equals(productId)) {
      existingStock.productId = productId;
    }

    if (stockNumber && existingStock.stockNumber !== stockNumber) {
      existingStock.stockNumber += stockNumber;
    }

    if (existingStock.isModified("productId") || existingStock.isModified("stockNumber")) {
      await existingStock.save();
      return res.json(existingStock).status(200);
    } else if (productId && !existingStock.productId.equals(productId)) {
      return res.json({ message: "The productId was updated." }).status(200);
    } else if (stockNumber && existingStock.stockNumber !== stockNumber) {
      return res.json({ message: "The stockNumber was updated." }).status(200);
    } else {
      return res.json({ message: "There was no change. Therefore it was not possible to update." }).status(200);
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "It was not possible to update." }).status(500);
  }
};


export const deleteStock = async (req: Request, res: Response) => {
  Stock.findByIdAndDelete({ _id: req.params.id })
    .then((deletedStock:any) => {
      if (deletedStock) {
        res.json({ message: "Your removal was successfull!" }).status(200);
      } else {
        res.json({ error: "There is no item that match this id." }).status(404);
      }
    })
    .catch((error:Error) => {
      console.log(error);
      res
        .json({ error: "It was not possible to delete this stock." })
        .status(500);
    });
};

module.exports = {
  createStock,
  getStock,
  getAllStock,
  updateStock,
  deleteStock,
};

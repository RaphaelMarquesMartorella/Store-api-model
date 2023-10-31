const Product = require("../model/product");
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const { productName } = req.body;
  try {
    const existingProduct = await Product.findOne({ productName });
    const response = await Product.create({ ...req.body });
    if (!existingProduct) {
      if (response) {
        res
          .json({ message: "Product created successfully!", Product: response })
          .status(201);
      } else {
        res.json("There was a problem.").status(500);
      }
    } else {
      res.json({ error: "This product was already added." });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (_: Request, res: Response) => {
  try {
    const response = await Product.find({});
    res.json({ allProducts: response }).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get the products." }).status(500);
    console.log(error);
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const response = await Product.findById({ _id: req.params.id });
    res.json(response).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get this product." }).status(500);
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const response = await Product.findByIdAndRemove(req.params.id);
    if (response) {
      res.json("The removal was succesfull.").status(200);
    } else {
      res.json("There is no item that match this id.").status(500);
    }
  } catch (error) {
    res.json({error: 'It was not possible to delete this product.'}).status(500)
    console.log(error);
  }
};
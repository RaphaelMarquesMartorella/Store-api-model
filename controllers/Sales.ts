const Sales = require("../model/sales");
const Stock = require("../model/stock");
const Client = require("../model/client");
const Product = require("../model/product");
import { Request, Response } from "express";

export const createSales = async (req: Request, res: Response) => {
  const { clientId, productId } = req.body;
  
  try {
    const products = await Product.find({
      productId: { $in: productId },
    }).exec();

    const allProductsExist = productId.every((id:any) =>
      products.some((product:any) => product.productId.equals(id))
    );

    if (!allProductsExist) {
      return res.status(404).json({
        error: "One or more productIds do not exist in the products database.",
      });
    }

    const client = await Client.findOne({ clientId }).exec();

    if (!client) {
      return res.status(404).json({ error: "There is no client with this clientId." });
    }

    let existingSale = await Sales.findOne({ clientId }).exec();


    existingSale = new Sales({
      clientId: clientId,
      productId: [...productId],
    });

    await existingSale.save();

    for (const productIdItem of productId) {
      const stock = await Stock.findOne({ productId: productIdItem }).exec();
      if (stock && stock.stockNumber > 0) {
        stock.stockNumber--;
        await stock.save();
      }
    }

    res
      .status(201)
      .json({ message: "Sale created successfully!", sale: existingSale });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "It was not possible to create this sale." });
  }
};





export const getSales = async (req: Request, res: Response) => {
  try {
    const response = await Sales.find({});
    res.json({ allSales: response }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to get the sales." }).status(500);
  }
};

export const getOneSale = async (req: Request, res: Response) => {
  try {
    const response = await Sales.findById({ _id: req.params.id });
    res.json(response).status(200);
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to get this sale." }).status(500);
  }
};

export const updateSale = async (req: Request, res: Response) => {
  const { clientId, productId } = req.body;
  
  try {
    const products = await Product.find({
      productId: { $in: productId },
    }).exec();
    let existingSale = await Sales.findById({ _id: req.params.id }).exec();
    

    if (!existingSale) {
      return res.status(404).json({ message: "Sale not found." });
    } else {
      const allProductsExist = productId.every((id:any) =>
        products.some((product:any) => product.productId.equals(id))
      );
      if (!allProductsExist) {
        return res
          .status(404)
          .json({
            error:
              "One or more productIds do not exist in the products database.",
          });
      }

      const existingProductIds = existingSale.productId.map(String);
      const newProductIds = productId.map(String);

      const hasChanges =
        !existingSale.clientId.equals(clientId) ||
        existingSale.productId.length !== productId.length ||
        existingProductIds.some((id:any) => !newProductIds.includes(id));

      if (!hasChanges) {
        return res
          .status(300)
          .json({
            error: "There were no changes. Therefore, it was not possible to update.",
          });
      }

      existingSale.clientId = clientId;
      existingSale.productId = productId;

      await existingSale.save();
      res
        .status(200)
        .json({ message: "Your update was successful!", Sales: existingSale });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update this sale." });
  }
};



export const deleteSale = async (req: Request, res: Response) => {
  try {
    const response = await Sales.findByIdAndDelete({ _id: req.params.id });
    if (response) {
      res.json({ message: "The removal was successfull." }).status(200);
    } else {
      res.json("It was not possible to delete this sale.").status(200);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to delete this sale." }).status(500);
  }
};
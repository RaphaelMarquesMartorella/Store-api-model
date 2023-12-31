const Request = require("../model/request");
const Sales = require("../model/sales");

import { Request as requestType, Response } from "express";

export const createRequestPerClient = async (req: requestType, res:Response) => {
  const { saleId, status, clientId } = req.body;
  try {
    const existingSales = await Sales.find({ clientId });

    if (existingSales.length > 0) {
      const productIds = existingSales.flatMap((sale:any) => sale.productId);
      const quantity = productIds.length;

      const existingRequest = await Request.findOne({ saleId });

      if (!existingRequest) {
        const newRequest = new Request({
          saleId,
          status,
          quantity,
          productId: productIds,
          clientId,
        });

        await newRequest.save();
        res.json(newRequest).status(201);
      } else {
        res
          .json({ error: "There is already a request with this saleId." })
          .status(404);
      }
    } else {
      res
        .json({ error: "Could not find any sales that match the clientId." })
        .status(404);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to create a request." }).status(500);
  }
};

export const createRequest = async (req: requestType, res:Response) => {
  const { saleId, status } = req.body;
  try {
    let existingSale = await Sales.findOne({ saleId });
    const existingRequest = await Request.findOne({ saleId });
    if(existingSale) {
      
    let quantity = existingSale.productId.length;

    if (!existingRequest) {
      
      const newRequest = new Request({
        saleId,
        clientId: existingSale.clientId,
        productId: existingSale.productId,
        status,
        quantity,
      });
      await newRequest.save();
      res.json({message: "Request created successfully!", Request: newRequest}).status(200);
    } else {
      res
        .json({ error: "There is already a request for the sale." })
        .status(404);
    }
  } else {
    res.json({error: 'There is no sale with this saleId.'})
  }
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to create a request." }).status(500);
  }
};

export const getOneRequest = async (req: requestType, res:Response) => {
  try {
    const existingRequest = await Request.findById(req.params.id);
    res.json({ existingRequest }).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get this request." }).status(500);
  }
};

export const getRequests = async (_: requestType, res:Response) => {
  try {
    const allRequests = await Request.find();
    res.json({ allRequests }).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get all requests." }).status(500);
  }
};

export const updateRequest = async (req: requestType, res:Response) => {
  const { status } = req.body;
  try {
    let existingRequest = await Request.findById(req.params.id);
    if (existingRequest) {
      existingRequest.status = status;
      await existingRequest.save();
      res.json(existingRequest).status(200);
    } else {
      res.json({ error: "There is not item that match this id." }).status(404);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to update." }).status(500);
  }
};

export const deleteRequest = async (req: requestType, res:Response) => {
  try {
    const response = await Request.findByIdAndDelete({ _id: req.params.id });
    if (response) {
      res.json({ message: "The removal was successfull." }).status(200);
    } else {
      res.json("There is no request to remove.").status(404);
    }
  } catch (error) {
    console.log(error);
    res
      .json({ error: "It was not possible to delete this request." })
      .status(500);
  }
};

const Client = require("../model/client");
import { Request, Response } from "express";

export const createClient = async (req: Request, res: Response) => {
    const { fullName, adress, email, phone } = req.body;
  
    const client = {
      fullName,
      adress,
      email,
      phone,
    };
    
    try {
      const existingEmail = await Client.findOne({ email });
      const existingPhone = await Client.findOne({ phone });
      if (existingEmail) {
        res.json({ error: "This email has already been registered." }).status(404);
      } if (existingPhone) {    
        res.json({ error: "This phone has already been registered." }).status(404);
      } else {
        const response = await Client.create(client);
        res.json({ message: "Client created successfully!", client: response }).status(200);
      }
    } catch (error) {
      console.log(error);
      console.log(req.body);
      res.status(500).json({ error: "Server error" });
    }
  };
  
export const getClients = async (_: Request, res: Response) => {
  try {
    const response = await Client.find({});
    res.json({ allClients: response }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const getOneClient = async (req: Request, res: Response) => {
  try {
    const response = await Client.findById({ _id: req.params.id });
    res.json(response).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async (req: Request, res: Response) => {
    const { fullName, adress, email, phone } = req.body;
    
    const updatedClient = {
      fullName,
      adress,
      email,
      phone,
    };
  
    try {
      const response = await Client.findByIdAndUpdate(
        { _id: req.params.id },
        updatedClient,
        { new: true }
      );
  
      if (!response) {
        return res.status(404).json({ error: "Client not found." });
      }
  
      res.json({ message: "Client updated successfully!", client: response }).status(200);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const response = await Client.findByIdAndRemove({ _id: req.params.id });
    if (response) {
      res.json("The removal was succesfull.").status(200);
    } else {
      res.json("There is no item that match this id.").status(500);
    }
  } catch (error) {
    console.log(error);
  }
};

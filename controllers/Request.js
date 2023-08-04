const Request = require("../model/request");
const Sales = require("../model/sales");

const createRequest = async (req, res) => {
  const { saleId, status, quantity } = req.body;
  try {
    const existingSale = await Sales.findOne({ saleId });

    if (existingSale) {
      const existingRequest = await Request.findOne({ saleId });

      if (!existingRequest) {
        const newRequest = new Request({
          saleId,
          status,
          quantity,
          productId: existingSale.productId,
          clientId:existingSale.clientId
          
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
        .json({ error: "Could not find a sale that matches the saleId." })
        .status(404);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "It was not possible to create a request." }).status(500);
  }
};

const getOneRequest = async (req, res) => {
  try {
    const existingRequest = await Request.findById({ _id: req.params.id });
    res.json({ existingRequest }).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get this request." }).status(500);
  }
};

const getRequests = async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.json({ allRequests }).status(200);
  } catch (error) {
    res.json({ error: "It was not possible to get all requests." }).status(500);
  }
};

const updateRequest = async (req, res) => {
  const { status } = req.body;
  try {
    let existingRequest = await Request.findById({ _id: req.params.id });
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

const deleteRequest = async (req, res) => {
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

module.exports = {
  createRequest,
  getOneRequest,
  getRequests,
  updateRequest,
  deleteRequest,
};

const Client = require("../model/client");

const createClient = async (req, res) => {
  const { fullName, adress, email, phone } = req.body;
  try {
    const response = await Client.create({
        fullName,
        adress,
        email,
        phone,
    });
      res.json(response).status(201);
  } catch (error) {
    console.log(error);
  }
};

const getClients = async (req,res) => {
    
    try {
        const response = await Client.find({})
        res.json({allClients: response}).status(200)
    } catch (error) {
        console.log(error);
    }
}

const getOneClient = async (req,res) => {
    
    try {
        const response = await Client.findById({_id: req.params.id})
        res.json(response).status(200)
    } catch (error) {
        console.log(error);
    }
}
 
const updateClient = async (req,res) => {
    try {
        const response = await Client.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true})
        res.json(response).status(200)
    } catch (error) {
        console.log(error);
    }
}

const deleteClient = async (req,res) => {
    try {
        const response = await Client.findByIdAndRemove({_id: req.params.id})
        if(response){
            res.json('The removal was succesfull.').status(200)
        }else {
            res.json('There is no item that match this id.').status(500)
        }
    } catch (error) {
        console.log(error);
    }
    
}




module.exports = {
  createClient,
  getClients,
  getOneClient, 
  updateClient,
  deleteClient
};

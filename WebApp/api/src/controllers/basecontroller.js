const BaseServices = require("../services/baseservices");

class BaseController {
    
    constructor(model) {
        this.model = model;
    }
  
    getAll=async (req, res) => {
      try {
        const items = await BaseServices.findAndCountAll({model:this.model,query:req.query})
        return res.json(items);
      } catch (error) {
        console.log(error);
        return res.status(500).json({error});
      }
    }

    
  
    getById=async (req, res) => {
      const { id } = req.params;
      const {include} = req.query;
      
      try {
        const item = await BaseServices.findById({model:this.model,id:id,include:include})
        
        if (!item) {
          return res.status(404).json({message:'item not found'});
        }
        return res.json(item);
      } catch (error) {
        return res.status(500).json({error});
      }
    }

    getBy=async (req, res) => {
      const {fieldName,value} = req.query;
      console.log(req.query);
      
      try {
        const item = await BaseServices.findBy({model:this.model,fieldName:fieldName,value:value})
        
        if (!item) {
          return res.status(404).json({message:'item not found'});
        }
        return res.json(item);
      } catch (error) {
        return res.status(500).json({error});
      }
    }
  
    create=async (req, res) => {
      const data = req.body
      try {
        const newItem = await BaseServices.create({model:this.model,data:data})
        return res.status(201).json(newItem);
      } catch (error) {
        return res.status(500).json({error});
      }
    }
  
    update=async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      try {
        const item = await BaseServices.update({model:this.model, id:id, data:data})
        if (!item) {
          return res.status(404).json({message:'item not found'});
        }
        return res.json(item);
      } catch (error) {
        return res.status(500).json({error});
      }
    }
  
    delete=async (req, res) => {
      const { id } = req.params;
      try {
        const result = await BaseServices.delete({model:this.model, id:id})
        if (!result) {
          return res.status(404).json({message:'item not found'});
        }
        return res.sendStatus(204);

      } catch (error) {
        console.log(3);
        return res.status(500).json({error});
      }
    }


    
    
}
  
  
  module.exports = BaseController;
  
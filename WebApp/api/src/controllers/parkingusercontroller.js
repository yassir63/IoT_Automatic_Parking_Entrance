const {ParkingUser,Visitor,Employee,Vehicle} = require('../models');
const BaseServices = require('../services/baseservices');
const BaseController = require('./basecontroller');
const crypto = require('crypto');

class ParkingUserController extends BaseController {
    constructor() {
        super(ParkingUser)
    }

    getUserData=async (req,res)=>{
        console.log("fetch");
        const {licensePlateNumber,rfidCode,QrCode} = req.query;
        try {
            let item={}
            if(QrCode){
                item = await BaseServices.findBy({model:Visitor,fieldName:"QrCode",value:QrCode})
                if(item){
                    item = await BaseServices.findById({model:ParkingUser,id:item.ParkingUserId,include:'{ "all": true, "nested": true }'})
                }
            }else if(rfidCode){
                item = await BaseServices.findBy({model:Employee,fieldName:"rfidCode",value:rfidCode})
                if(item){
                    item = await BaseServices.findById({model:ParkingUser,id:item.ParkingUserId,include:'{ "all": true, "nested": true }'})
                }
            }else if(licensePlateNumber){
                item = await BaseServices.findBy({model:Vehicle,fieldName:"licensePlateNumber",value:licensePlateNumber})
                if(item){
                    item = await BaseServices.findById({model:ParkingUser,id:item.ParkingUserId,include:'{ "all": true, "nested": true }'})
                }
            }
            if(item){
                // const jsonString = JSON.stringify(item);
                // const hash = crypto.createHash('sha256').update(jsonString).digest('hex');
                return res.json(item);
            }else{
                return res.json({});
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    getPermissions=async (req,res)=>{
        const parkingUserId = req.params.id;
        try {
            const parkingUser = await ParkingUser.findByPk(parkingUserId);
            if (!parkingUser) {
              return res.status(404).json({message:'item not found'});
            }
            const permissions = await parkingUser.getPermissions()
            console.log(permissions);
            return res.json(permissions);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    addPermission = async (req,res)=>{
        const parkingUserId = req.params.id;
        const {permissionId}=req.body
        if(!permissionId) return res.status(500).json({error:'permissionId is required'});
        try {
            
            const parkingUser = await ParkingUser.findByPk(parkingUserId);
            if (!parkingUser) {
                return res.status(404).json({message:'item not found'});
            }
            if(await parkingUser.hasPermission(permissionId)) return res.status(500).json({error:'already exists'})

            await parkingUser.addPermission(permissionId)
            await parkingUser.reload()
            return res.status(201).json(parkingUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    removePermission= async (req,res)=>{
        const parkingUserId = req.params.id;
        const {permissionId}=req.body
        if(!permissionId) return res.status(500).json({error:'permissionId is required'});
        try {
            const parkingUser = await ParkingUser.findByPk(parkingUserId);
            if (!parkingUser) {
                return res.status(404).json({message:'item not found'});
            }
            if(!await parkingUser.hasPermission(permissionId)) return res.status(500).json({error:'this Permission doesnt existe for this user'})

            await cours.removePermission(permissionId)

            return res.sendStatus(204);

        } catch (error) {
            return res.status(500).json(error);
        }

    } 

    removeAllPermissions= async (req,res)=>{
        const parkingUserId = req.params.id;
        try {
            const parkingUser = await ParkingUser.findByPk(parkingUserId);
            if (!parkingUser) {
                return res.status(404).json({message:'item not found'});
            }
            await parkingUser.setPermissions([])
            
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
      
}

module.exports = ParkingUserController;
const {Permission} = require('../models');
const BaseController = require('./basecontroller');


class PermissionController extends BaseController {
    constructor() {
        super(Permission)
    }

    getParkingUsers=async (req,res)=>{
        const permissionId = req.params.id;
        try {
            const permission = await Permission.findByPk(permissionId);
            if (!permission) {
              return res.status(404).json({message:'item not found'});
            }
            const parkingUsers = await permission.getParkingUsers()
            console.log(parkingUsers);
            return res.json(parkingUsers);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    addParkingUser = async (req,res)=>{
        const permissionId = req.params.id;
        const {parkingUserId}=req.body
        if(!parkingUserId) return res.status(500).json({error:'parkingUserId is required'});
        try {
            
            const permission = await Permission.findByPk(permissionId);
            if (!permission) {
                return res.status(404).json({message:'item not found'});
            }
            if(await permission.hasParkingUser(parkingUserId)) return res.status(500).json({error:'already existe'})

            await permission.addParkingUser(parkingUserId)
            await permission.reload()
            return res.status(201).json(permission);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    removeParkingUser = async (req,res)=>{
        const permissionId = req.params.id;
        const {parkingUserId}=req.body
        if(!parkingUserId) return res.status(500).json({error:'parkingUserId is required'});
        try {
            const permission = await Permission.findByPk(parkingUserId);
            if (!permission) {
                return res.status(404).json({message:'item not found'});
            }
            if(!await permission.hasParkingUser(parkingUserId)) return res.status(500).json({error:'this ParkingUser doesnt have this Permission'})

            await permission.removeParkingUser(parkingUserId)

            return res.sendStatus(204);

        } catch (error) {
            return res.status(500).json(error);
        }

    } 

    removeAllParkingUsers= async (req,res)=>{
        const permissionId = req.params.id;
        try {
            const permission = await ParkingUser.findByPk(permissionId);
            if (!permission) {
                return res.status(404).json({message:'item not found'});
            }
            await permissionId.setParkingUsers([])
            
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
      
}

module.exports = PermissionController;
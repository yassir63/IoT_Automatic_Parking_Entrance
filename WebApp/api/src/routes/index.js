const express = require('express');
const indexrouter = express.Router();

const userRouter=require('./userrouter')
const employeeRouter=require('./employeerouter')
const visitorRouter=require('./visitorrouter')
const vehicleRouter=require('./vehiclerouter')
const parkingUserRouter=require('./parkinguserrouter')
const siteRouter=require('./siterouter')
const permissionRouter=require('./permissionrouter')

indexrouter.use('/users',userRouter)
indexrouter.use('/employees',employeeRouter)
indexrouter.use('/visitors',visitorRouter)
indexrouter.use('/vehicles',vehicleRouter)

indexrouter.use('/parkingusers',parkingUserRouter)
indexrouter.use('/sites',siteRouter)
indexrouter.use('/permissions',permissionRouter)

module.exports = indexrouter;
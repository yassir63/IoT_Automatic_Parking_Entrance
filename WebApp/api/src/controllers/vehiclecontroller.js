const {Vehicle} = require('../models');
const BaseController = require('./basecontroller');


class VehicleController extends BaseController {
    constructor() {
        super(Vehicle)
    }

    
}

module.exports = VehicleController;
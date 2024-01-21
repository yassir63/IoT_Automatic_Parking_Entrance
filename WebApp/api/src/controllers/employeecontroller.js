const {Employee} = require('../models');
const BaseController = require('./basecontroller');


class EmployeeController extends BaseController {
    constructor() {
        super(Employee)
    }

    
}

module.exports = EmployeeController;
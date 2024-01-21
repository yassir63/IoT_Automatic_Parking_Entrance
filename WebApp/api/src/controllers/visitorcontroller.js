const {Visitor} = require('../models');
const BaseController = require('./basecontroller');


class VisitorController extends BaseController {
    constructor() {
        super(Visitor)
    }

    
}

module.exports = VisitorController;
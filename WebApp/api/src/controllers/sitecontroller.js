const {Site} = require('../models');
const BaseController = require('./basecontroller');


class SiteController extends BaseController {
    constructor() {
        super(Site)
    }

      
}

module.exports = SiteController;
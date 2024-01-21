const { Op } = require("sequelize");

const utils={}

utils.fromFiltersToWhereObj=(filters)=>{
    let whereObj={}
    filters.forEach(filter => {
      const {fieldName,type,value}=filter
      switch (type) {
        case 'like':
          whereObj={...whereObj,[fieldName] : { [Op.like] : `%${value}%` }}
          break;
        case 'eq':
          whereObj={...whereObj, [fieldName] : value}
          break;
        case 'in':
          whereObj={...whereObj,[fieldName] : { [Op.in] : value }}
          break;
        case 'between':
          whereObj={...whereObj,[fieldName] : { [Op.between] : value }}
          break;
        case 'gt':
          whereObj={...whereObj,[fieldName] : { [Op.gt] : value }}
          break;
        case 'lt':
          whereObj={...whereObj,[fieldName] : { [Op.lt] : value }}
          break;
        default:
          break;
      }
    });
    return whereObj;
  }


module.exports = utils;
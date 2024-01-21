const { Op } = require("sequelize");

const BaseServices= {}

fromFiltersToWhereObj=(filters)=>{
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

BaseServices.findAndCountAll = async ({model,query}) => {
    
    const { page,limit,filters,order,include} = query;
    let options={}
    if(page && limit){
        options={...options,offset: parseInt(page)*parseInt(limit),limit: parseInt(limit)}
    }
    if(filters){
        const filtersArray=JSON.parse(filters)
        if(filtersArray.length>0){
        const whereObj=fromFiltersToWhereObj(filtersArray)
        console.log(filtersArray);
        console.log(whereObj);
        options={...options,where : whereObj}
        }
        
    }
    if(order){
        const {fieldName,direction}=JSON.parse(order)
        options.order=[[fieldName,direction]]
    }
    if(include){
        options.include=JSON.parse(include)
    }
    const items = await model.findAndCountAll(options);
    return items

}

BaseServices.findById = async ({model,id,include}) => {
    let options={}
    if(include){
    options.include=JSON.parse(include)
    }
    console.log(options);
    const item = await model.findByPk(id,options);
    return item
}

BaseServices.findBy = async ({model,fieldName,value}) => {
    let options={}
    const whereObj={[fieldName] : value}
    options.where=whereObj
    options.include={ all: true, nested: true }
    console.log(options);
    const items = await model.findAll(options);
    return items[0]
}

BaseServices.create = async ({model,data}) => {
    const newItem = await model.create(data);
    return newItem
}

BaseServices.update = async ({model,id,data}) => {
    const item = await model.findByPk(id);
    if (!item) return item
    item.set(data)
    await item.save()
    return item
}

BaseServices.delete = async ({model,id}) => {
    const item = await model.findByPk(id);
    if (!item) return 0
    await item.destroy();
    return 1
}



module.exports = BaseServices;
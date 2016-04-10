var ObjectID = require('mongodb').ObjectID;
module.exports = function(db){
  var listprodModel = {};
  var listProdColl = db.collection('products');

  listprodModel.getAllProducts=function(idString, handler){
    /*var query = {"_id":new ObjectID(idString)};*/
    listProdColl.find({}).toArray(function(err,products){
      if(err){
        console.log(err);
        handler(err,null);
      }else{
        handler(null,products);
      }
    });
  };

  return listprodModel;
};

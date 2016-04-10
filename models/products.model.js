var ObjectID = require('mongodb').ObjectID;

function Productos(db){
  if(!(this instanceof Productos)){
    console.log("no fue instanciado");
    return new Productos(db);
  }
  this.productos=db.collection("productos");
};

Productos.prototype.getAllProductos = function(handler){
  this.productos.find({}).toArray(
    function(err,docs){
      if(err){
        console.log(err);
        handler(err,null);
      }else{
        handler(null,docs);
      }
    }
  );
};

module.exports=Productos;

var ObjectID = require('mongodb').ObjectID;

function Contactos(db){
  if(!(this instanceof Contactos)){
    console.log("no fue instanciado");
    return new Contactos(db);
  }
  this.contactos=db.collection("ContactUs");
};

Contactos.prototype.getAllContacts = function(handler){
  this.contactos.find({}).toArray(
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

module.exports=Contactos;

var ObjectID = require('mongodb').ObjectID;

function Contactos2(db){
  if(!(this instanceof Contactos2)){
    console.log("no fue instanciado");
    return new Contactos2(db);
  }
  this.contactos2=db.collection("Comentariosprod");
};

Contactos2.prototype.getAllContacts2 = function(handler){
  this.contactos2.find({}).toArray(
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

module.exports=Contactos2;

var ObjectID = require('mongodb').ObjectID;
var md5 = require('md5');
module.exports = function(db){
  var UsModel = {};
  var USColl = db.collection('Usuarios');
  UsModel.insertUs = function(correo,nombreUsuario,primerapellido,segundoapellido,telefono,
    identidad,fechanac,password,handler){
    var us = {"correo" : correo,
                "nombreUsuario" :nombreUsuario,
                "primerapellido":primerapellido,
                "segundoapellido":segundoapellido,
                "telefono":telefono,
                "identidad":identidad,
                "fechanac":fechanac,
                "password":password};
                var saltedPassword = "";
                if(us.created % 2 === 0){
                    saltedPassword = us.correo.substring(0,3) + us.contrasena;
                }else{
                    saltedPassword = us.contrasena + us.correo.substring(0,3);
                }
                us.contrasena = md5(saltedPassword);
                USColl.insertOne(us,function(err,rslt){
                  if(err){
                    handler(err,false);
                  }else{
                    handler(null,true);
                  }
                });
  };
  UsModel.getUsById=function(idString, handler){
    var query = {"_id":new ObjectID(idString)};
    USColl.findOne(query,function(err,doc){
      if(err || !doc){
        if(err){
          handler(err,null);
        }else{
          handler(new Error("No existe este documento"),null);
        }
      }else{
        handler(null,doc);
      }
    });
  };

  return UsModel;
};

var comentarioStruct = require('./comentario.struct.js'),
  md5 = require('md5');

var ComentarioModel = function(db) {
  if (!(this instanceof ComentarioModel)) {
    console.log("No fue llamado como instancia");
    return new ComentarioModel(db);
  }
  this.comentarioColl = db.collection('ContactUs');
};

ComentarioModel.prototype.nuevoComentario = function(data, handler) {
  var newComent = comentarioStruct.comentario();
  newComent.emaile = data.emaile;
  newComent.comentario=data.comentario;

  this.comentarioColl.insertOne(newComent, function(err, rslt) {
    if (err) {
      console.log(err);
      handler(err, null);
    } else {
      handler(null, rslt.insertedId);
    }
  });
}

module.exports = ComentarioModel;

var comentarioStruct = require('./comentario2.struct.js'),
  md5 = require('md5');

var ComentarioModel2 = function(db) {
  if (!(this instanceof ComentarioModel2)) {
    console.log("No fue llamado como instancia");
    return new ComentarioModel2(db);
  }
  this.comentarioColl = db.collection('Comentariosmsj');
};

ComentarioModel2.prototype.nuevoComentario2 = function(data, handler) {
  var newComent2 = comentarioStruct.comentario();
  newComent2.email = data.email;
  newComent2.description=data.description;

  this.comentarioColl.insertOne(newComent2, function(err, rslt) {
    if (err) {
      console.log(err);
      handler(err, null);
    } else {
      handler(null, rslt.insertedId);
    }
  });
}

module.exports = ComentarioModel2;

var express = require('express');
var router = express.Router();

function validaForm(){
  if($("#txtNombreUs").val() == ""){
      alert("El campo Nombre no puede estar vacío.");
      $("#txtNombreUs").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
      return false;
  }
  if($("#txtPrimerApellido").val() == ""){
      alert("El campo primer apellido no puede estar vacío.");
      $("#txtPrimerApellido").focus();
      return false;
  }
  if($("#txtSegundoApellido").val() == ""){
      alert("El campo segundo apellido no puede estar vacío.");
      $("#txtSegundoApellido").focus();
      return false;
  }
  if($("#txtTelefono").val() == ""){
      alert("El campo telefono no puede estar vacío.");
      $("#txtTelefono").focus();
      return false;
  }
  if($("#txtId").val() == ""){
      alert("El campo identidad no puede estar vacío.");
      $("#txtId").focus();
      return false;
  }
  if($("#txtFechaNac").val() == ""){
      alert("El campo fecha de nacimiento no puede estar vacío.");
      $("#txtFechaNacechanac").focus();
      return false;
  }

    return true; // Si todo está correcto
}

function getUsRoute(db) {

  var UsModel = require('../models/usersr.model.js')(db);

  /*aplicacion de insercion*/
  router.get('/newusers', function(req, res, next) {
    res.render('registrarus', {});
  });

  router.post('/insertUs', function(req, res, next) {

    UsModel.insertUs(req.body.correo, req.body.nombreUsuario, req.body.primerapellido,req.body.segundoapellido,
      req.body.telefono,req.body.identidad,req.body.fechanac,req.body.contrasena,function(err, status) {
      res.status(200).json({
        "status": "ok"
      });
    });
  });

  router.get('/getbyid/:id', function(req, res, next) {
    UsModel.getUsById(req.params.id, function(err, doc) {
      if (err) {
        res.status(500).json({
          "err": err
        });
      } else {
        res.status(200).json(doc);
      }
    });
  });

  router.get('/listUs', function(req, res, next) {
    UsModel.getAllUsers(req.params.id, function(err, doc) {
      if (err) {
        res.status(500).json({
          "err": err
        });
      } else {
        res.status(200).json(doc);
      }
    });
  });


  return router;
}

module.exports = getUsRoute;

var express = require('express');
var router = express.Router();
var validator = require('./validator.js');
var dummyData = require('../models/dummyData.js');

var Contactos = require('../models/contacts.model.js');
var Contactos2 = require('../models/contacts2.model.js');
var Productos = require('../models/products.model.js');

var Usuarios = require('../models/usuarios.model.js');
var Comentarios = require('../models/comentarios.model.js');
var Comentarios2 = require('../models/comentarios2.model.js');

module.exports = function(db) {



    //HTTP STATUS CHEAT
    /*
        200 OK
        304 Use Cache
        400 Bad Request
        401 Not Authorized
        403 Forbidden
        404 Not Found
        408 Request Timeout
        501 Not Implemented
    */

    /* HTTP Methods  <---> CRUD
            get /  select
            post / insert
            put /  update
            delete / delete
    */

    //Public API
    router.post('/login', function(req, res) {
      res.status(501).json({
        "error": "Not Implemented"
      });
    });

    router.get('/logout', function(req, res){
        req.session.clear();
        res.status(200).json({"ok":true});
    });

    //Private API
    /*router.use(function(req,res,next){
        if(req.session.logged){
            next();
        }else{
            res.status(401).json({"error":"No puede usar el api sin estar autorizado"});
        }
    });*/
    console.log(dummyData);
    router.get('/getappstate', validator, function(req, res, next) {
      res.status(200).json(dummyData.getAppState());
    });

    router.get('/getcurrentproyect', validator, function(req, res, next) {
      res.status(200).json(dummyData.getProyectData());
    });

    var productos = new Productos(db);
    router.get('/obtenerproductos', function(req, res, next) {
      productos.getAllProductos(function(err, productosDoc) {
        if (err) {
          res.status(500).json({
            "error": "No se dio la obtencion de productos"
          });
        } else {
          res.status(200).json(productosDoc);
        }
      });
    });


    var contactos = new Contactos(db);
    router.get('/obtenercontactos', function(req, res, next) {
      contactos.getAllContacts(function(err, contactosDoc) {
        if (err) {
          res.status(500).json({
            "error": "No se dio la obtencion de productos"
          });
        } else {
          res.status(200).json(contactosDoc);
        }
      });
    });

    var usuariosModel = new Usuarios(db);
    router.post('/newUser', function(req, res, next) {

      var  email= req.body.txtEmail,
          password= req.body.txtPswd;

        usuariosModel.findOne({newUser: email}, {
            fields: {
              _id: 1,
              newUser: 1,
              password: 1,
              created: 1
            }
          }, function(err, doc) {
            if (err) {
              res.status(401).json({
                "error": "su logueo no fue satisfactorio"
              });
            } else{
              if (doc) {
                var saltedPassword = "";
                if (doc.created % 2 === 0) {
                  saltedPassword = doc.newUser.substring(0, 3) + password;
                } else {
                  saltedPassword = password + doc.newUser.substring(0, 3);
                }
                if (doc.password === md5(saltedPassword)) {
                  req.session.newUser = doc.newUser;
                  doc.password = "";
                  req.session.userDoc = doc;
                  newUser.updateOne({
                    "_id": doc._id
                  }, {
                    "$set": {
                      "lastlogin": Date.now(),
                      "failedtries": 0
                    }
                  });
                  res.status(200).json({
                    "ok": true
                  });
                } else {
                  req.session.newUser = "";
                  req.session.userDoc = {};
                  newUser.updateOne({
                    "_id": doc._id
                  }, {
                    "$ic": {
                      "failedtries": 1
                    }
                  });
                  res.status(401).json({"error":"Log In Failed"});
                }
              } else {

                  res.status(401).json({
                    "error": "Log In Failed"
                  });

              }
            }
                  //req.session.userid=id;
               //res.status(200).json(id);


            });
        });



      var comentariosModel = new Comentarios(db); router.post('/newComent', function(req, res, next) {
        var newComent = {
          "emaile": req.body.txtemaile,
          "comentario": req.body.txtComent
        }
        comentariosModel.nuevoComentario(newComent, function(err, id) {
          if (err) {
            res.status(500).json({
              "error": "no se pudo almacenar el contanto"
            });
          } else {
            //req.session.userid=id;
            res.status(200).json(id);
          }
        });
      });


      var comentariosModel2 = new Comentarios2(db); router.post('/newComentdos', function(req, res, next) {
        var newComent2 = {
          "email": req.body.txtemail,
          "description": req.body.description
        }
        comentariosModel2.nuevoComentario2(newComent2, function(err, id) {
          if (err) {
            res.status(500).json({
              "error": "no se pudo almacenar el contanto"
            });
          } else {
            //req.session.userid=id;
            res.status(200).json(id);
          }
        });
      });

  /*   //Backlog Entries
      router.use(function(req,res,next){
          if((req.session.user||"")===""){
              console.log("Error checking Session");
              res.status(403).json({"error":"Session Not Set"});
          }else{
              next();
          }
      });*/


      return router;
    };

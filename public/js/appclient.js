$("#page_productlist").on("pagecreate", page_productlist_onload);
$("#page_contactlist").on("pagecreate", page_contactlist_onload);
$("#page_newUser").on("pagecreate", page_newUser_onload);
$("#page_User").on("pagecreate", page_User_onload);
$("#page_proyectList").on("pagecreate", page_proyectList_onload);;
$("#page_carDetail").on("pagecreate", page_carDetail_onload);
$("#page_contactanos").on("pagecreate", page_contactanos_onload);

var _productos = [];
var _selectedProyectId = "";

function validaForm(){
    // Campos de texto
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

function page_productlist_onload(e) {
  cargarDocumentos();
  onListItemClick();
}


function page_contactlist_onload(e) {
  cargarDocumentos2();
}


function page_carDetail_onload(e){
  cargarDocumentos();
  onListItemClick2();
}

function page_newUser_onload(e) {
  $("#btnNewUser").on("click", function(e) {
    var query = {};
    $("form").find("input").each(function(i, obj) {
      var ip = $(obj);
      if (ip.attr("name") === "txtEmail") {
        query.txtEmail = ip.val();
      }
      if (ip.attr("name") === "txtPswd") {
        query.txtPswd = ip.val();
      }
    });
    $.post(
      "api/newuser",
      query,
      function(data, successtxt, xhr) {
        console.log(data);
      },
      "json"
    );
  });
}

function page_User_onload(e) {
  $("#btnUser").on("click", function(e) {
    var query = {};
    $("form").find("input").each(function(i, obj) {
      var ip = $(obj);
      if (ip.attr("name") === "txtNameComplete") {
        query.txtNameComplete = ip.val();
      }
      if (ip.attr("name") === "txtPrimerApellido") {
        query.txtPrimerApellido = ip.val();
      }
      if (ip.attr("name") === "txtSegundoApellido") {
        query.txtSegundoApellido = ip.val();
      }
      if (ip.attr("name") === "txtIdentidad") {
        query.txtIdentidad = ip.val();
      }
      if (ip.attr("name") === "txtFechaNac") {
        query.txtFechaNac = ip.val();
      }
      if (ip.attr("name") === "txtTelefono") {
        query.txtTelefono = ip.val();
      }
      if (ip.attr("name") === "txtDireccion") {
        query.txtDireccion = ip.val();
      }
      if (ip.attr("name") === "txtEmail") {
        query.txtEmail = ip.val();
      }
      if (ip.attr("name") === "txtPswd") {
        query.txtPswd = ip.val();
      }
    });
    $.post(
      "api/user",
      query,
      function(data, successtxt, xhr) {
        console.log(data);
      },
      "json"
    );
  });
}


function page_proyectList_onload(e) {
  $("#btnNewComent").on("click", function(e) {
    var query = {};
    $("#form").find("input").each(function(i, obj) {
      var ip = $(obj);
      if (ip.attr("name") === "txtemaile") {
        query.txtemaile = ip.val();
      }
      if (ip.attr("name") === "txtComent") {
        query.txtComent = ip.val();
      }
    });
    $.post(
      "api/newcoment",
      query,
      function(data, successtxt, xhr) {
        console.log(data);
      },
      "json"
    );
  });
  cargarDocumentos2();
}

function page_contactanos_onload(e) {
  $("#btnNewComentProd").on("click", function(e) {
    var query = {};
    $("#newbacklog_form").find("input").each(function(i, obj) {
      var ip = $(obj);
      if (ip.attr("name") === "txtemail") {
        query.txtemail = ip.val();
      }
      if (ip.attr("name") === "description") {
        query.description = ip.val();
      }
    });
    $.post(
      "api/newcomentdos",
      query,
      function(data, successtxt, xhr) {
        console.log(data);
      },
      "json"
    );
  });
  //cargarDocumentos3();
}


function cargarDocumentos() {
  $.get(
    '/api/obtenerproductos', {},
    function(data, successtxt, xhr) {
      console.log(data);
      var htmlstr = "";
      _productos = data;
      data.map(function(doc, index) {

        htmlstr +="<div class='col-sm-6 col-lg-6 col-md-4'>";

        htmlstr +="<div class='row'>";
        htmlstr +="<div class='col-sm-6 col-lg-6 col-md-6'>";
        htmlstr +="<div class='thumbnail'>";
        htmlstr += '<li><a data-id="' + doc._id + '" href="#page_productDetail">' +  doc.nombre + "</br>"+ doc.precio+ "</a></li>";
        htmlstr +="<div class='ratings'>";
        htmlstr += "<p>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "</p>";
        htmlstr +="</div>";
        htmlstr +="<div class='caption'>";
        htmlstr += "<h4 class='pull-right'>" + doc.precio + "</h4>";
        htmlstr += '<img src="' + doc.foto + '" class=" img-thumbnail "/>';
        htmlstr +="</div>";
        htmlstr +="</div>";
        htmlstr +="</div>";
        htmlstr +="</div>";
        htmlstr +="</div>";
      })
      var lst = $("#productsListView");
      lst.html(htmlstr);
      lst.listview("refresh");
      //console.log(data);
    },
    'json'
  );
}

function cargarDocumentos2() {
  $.get(
    '/api/obtenercontactos', {},
    function(data, successtxt, xhr) {
      console.log(data);
      var htmlstr = "";
      _contactos = data;
      data.map(function(doc, index) {

        htmlstr += "<span class='glyphicon glyphicon-user'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-thumbs-up'>"
        htmlstr+="</span>";

        htmlstr += '<li>"' + doc.correo + "</br>"+  doc.comentario +"</li>";
        htmlstr +="<div class='ratings'>";
        htmlstr += "<p>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";

        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";

        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";

        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";

        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "</p>";
                htmlstr +="</div>";
                htmlstr +="</div>";
      })
      var lst = $("#contactsListView");
      lst.html(htmlstr);
      lst.listview("refresh");
      //console.log(data);
    },
    'json'
  );
}



function onListItemClick() {
  var counter=0;
  $("#productsListView").on("click", "a",

    function(e) {
      counter++;
      //e.preventDefault();
      //e.stopPropagation();
      var idClicked = $(this).data("id");

      _selectedProyectId = idClicked;
      getSelectedProyect();
    }
  );
}

function onListItemClick2() {
  $("#productsListView").on("click", "a",
    function(e) {
      //e.preventDefault();
      //e.stopPropagation();
      var idClicked = $(this).data("id");
      _selectedProyectId = idClicked;
      getSelectedProyect2();
    }
  );
}



function getSelectedProyect() {
  _productos.map(
    function(proyect, index) {
      if (proyect._id === _selectedProyectId) {
        var htmlstr = "";
        htmlstr +="<div class='row'>";
        htmlstr +="<div class='col-sm-4'>";
        htmlstr +="<div class='team-member'>";
        htmlstr += "<h3>" + proyect.nombre + "</h3>";
        htmlstr += '<img src="' + proyect.foto + '" class="img-responsive img-rounded"/>';
        htmlstr += "<p class='pull-right'>" + proyect.precio + "</p>";
        htmlstr +="<div class='ratings'>";
        htmlstr += "<p>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "<span class='glyphicon glyphicon-star'>"
        htmlstr+="</span>";
        htmlstr += "</p>";
        htmlstr +="</div>";
        htmlstr +="</div>";
        htmlstr +="</div>";
        htmlstr +="</div>";
        $("#productDetail").html(htmlstr);

      }
    }
  );
  _selectedProyectId;
}


function getSelectedProyect2() {
  _productos.map(
    function(proyect, index) {
      if (proyect._id === _selectedProyectId) {
        var htmlstr = "";
        htmlstr += "<h3>" + proyect.nombre + "</h3>";
        htmlstr += '<img src="' + proyect.foto + '"/>';
        htmlstr += "<p>" + proyect.precio + "</p>";

        $("#carDetail").html(htmlstr);

      }
    }
  );
  _selectedProyectId;
}

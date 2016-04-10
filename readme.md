#FERRETERIA FAMACO


##CASO DE USO

###ACTORES

ADMON

###DESCRIPCION

Una SAP para gestionar los productos,
usuarios,ventas de productos para un mejor control.

1. admin ingresa al browser.
2. este le brinda un listado de los usuarios y productos vendidos.
3. el administrador puede ingresar productos.

###excepciones
* en todo momento el administrador puede cancelar cualquier accion.
* cuando el API reciba un error se notificara.

```
    {json}
{
      productos{
      "idproducto":"",
      "nombre":"",
      "descproducto":"",
      "foto":"",
      "precio":0
    }

    factura{
            "idfactura":"",
            "fecha":Date(),
            "usuario":"",
            "subtotal":0,
            "isv":0,
            "total":0
    }

    roles{
          "idrol":"",
          "rolest":"",
          "descrol":""
    }

    usuarios{
            "email":"",
            "nombre":"",
            "primerapellido":"",
            "segundoapellido":"",
            "telefono":"",
            "identidad":"",
            "fechanac":Date(),
            "contrasena":"",            
            "rol":0
    }
}
```

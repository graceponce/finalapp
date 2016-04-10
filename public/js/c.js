$(document).ready(
    function(){
       var caruselItems = $(".carusel .trail "),
            caruselTrail = $(".carusel .trail"),
            maxItems = caruselItems.length,
            currentItem = 0,
            factor = $(".carusel").width(),
            navigateBar = $(".carusel .navigate"),
            navigateArrows = $(".carusel .arrows"),
            navigateDots = "",
            manualChange = false;
        for(var i = 0; i<2; i++)
          navigateDots += '<div data-item="'+i+'"></div>';

        navigateDots = $(navigateDots);
        navigateBar.html(navigateDots);
        $(navigateDots.get(currentItem)).addClass("selected");
        caruselTrail.css({"width":(maxItems * factor + 1) + "px"});
        function setCurrentItem(newCurrentItem){
            $(navigateDots.get(currentItem)).removeClass("selected");
            currentItem = newCurrentItem;
            caruselTrail.css({"left":(-1 * factor * currentItem)});
            $(navigateDots.get(currentItem)).addClass("selected");
        }
        $(".carusel").click(
            function(e){
                var newCurrentItem = (e.originalEvent.x < factor / 1) ? currentItem - 1: currentItem + 1;
                if(newCurrentItem==maxItems) newCurrentItem = 0;
                if(newCurrentItem<0) newCurrentItem = maxItems - 1;
                setCurrentItem(newCurrentItem);
                manualChange = true;
            }//evento click
        ).mousemove(
            function(e){
                if((factor/2) > e.originalEvent.x || (factor * 1 / 2) < e.originalEvent.x){
                    if(navigateArrows.hasClass("hidden")){
                        navigateArrows.removeClass("hidden");
                        setTimeout(function(){navigateArrows.addClass("hidden");},3000);
                    }
                }else{
                    navigateArrows.addClass("hidden");
                }
            }
        );
        navigateDots.click(
            function(e){
                e.preventDefault();
                e.stopPropagation();
                setCurrentItem(parseInt($(this).data("item")));
                manualChange = true;
            }
        );//click navigateDots;
        function tickCarusel(){
            if(!manualChange){
                var newCurrentItem =  currentItem + 1;
                if(newCurrentItem==maxItems) newCurrentItem = 0;
                setCurrentItem(newCurrentItem);
            }else{
                manualChange = false;
            }
            setTimeout(tickCarusel, 5000);
        }
        setTimeout(tickCarusel, 5000);
    }
); //ready

function validar(){
    var txtCorreo = document.getElementById("txtCorreo"),
        txtNombre = document.getElementById("txtNombre"),
        txtAsunto = document.getElementById("txtAsunto"),
        txtMensaje = document.getElementById("txtMensaje"),
        validated = true,
        errors = new Array();

    var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
       numericoPattern = /^\d+$/,
       notEmptyPattern = /\S+/;

   if(!emailPattern.test(txtCorreo.value)){
       validated = false;
       errors.push("Correo Electrónico Mal Formado");
   }

    if(!notEmptyPattern.test(txtNombre.value)){
        validated = false;
        errors.push("Nombre Completo no puede ir Vacío");
    }
    if(!notEmptyPattern.test(txtAsunto.value)){
        validated = false;
        errors.push("el Asunto no Puede Venir Vacío");
    }
    if(!notEmptyPattern.test(txtMensaje.value)){
        validated = false;
        errors.push("Debe haber un Mensaje");
    }
    if(!validated){
        var errorMsgs = errors.toString().replace(",","\n");
        alert(errorMsgs);
    }else {
        frmData.submit();
    }
}

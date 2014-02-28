$(function(){

        $("#pulsante").on("click", function() {
          $("#formcommento").removeClass("hide");
        });

        $("#chiudi").on("click", function() {
          $("#formcommento").addClass("hide");
        });



});
$(window).on('load', function() {
    if ($("#visura_proprietari_veicolo_ordine_cliente_tipoCliente").length || $("#visura_proprietari_veicolo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
   if ($('#visura_proprietari_veicolo_ordine_datiProdotto_tipoDiVeicolo').val() !== "" ) {
        $("table[name$='prezzoBase']").addClass("hidden");
        $("table[name$='riepilogo']").removeClass("hidden");
    }
});


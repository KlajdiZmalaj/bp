$(window).on('load', function() {
    if ($("#visura_sede_unita_locali_ordine_cliente_tipoCliente").length || $("#visura_sede_unita_locali_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#cfAzienda').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#opzioniSpedizione').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
}

$(document).ready(function(){ 
    $("#visura_sede_unita_locali_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#visura_sede_unita_locali_ordine_datiProdotto_comune");
    });

    $('#azienda').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#azienda').find('input:text').val() !== '') {
        mostraCampi();
    }
});


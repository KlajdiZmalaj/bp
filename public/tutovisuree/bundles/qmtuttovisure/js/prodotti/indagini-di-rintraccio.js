$(window).on('load', function() {
    if ($("#indagini_di_rintraccio_ordine_cliente_tipoCliente").length || $("#indagini_di_rintraccio_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#datiSms').removeClass('hidden');
}

$(document).ready(function(){

    $('#persona').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#persona').find('input:text').val() !== '') {
        mostraCampi();
    }

    $("#indagini_di_rintraccio_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#indagini_di_rintraccio_ordine_datiProdotto_comune");
    });

});

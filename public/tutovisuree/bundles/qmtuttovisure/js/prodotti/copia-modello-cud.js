$(window).on('load', function() {
    if ($("#copia_modello_cud_ordine_cliente_tipoCliente").length || $("#copia_modello_cud_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#altro').removeClass('hidden');
}

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $('#persona').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#persona').find('input:text').val() !== '') {
        mostraCampi();
    }

    $("#copia_modello_cud_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#copia_modello_cud_ordine_datiProdotto_comune");
    });


});


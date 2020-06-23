$(window).on('load', function() {
    if ($("#visura_procedure_in_corso_ordine_cliente_tipoCliente").length || $("#visura_procedure_in_corso_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#cfAzienda').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#altroTitolo').removeClass('hidden');
    $('#altro').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
}

$(document).ready(function(){ 
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    $("#visura_procedure_in_corso_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#visura_procedure_in_corso_ordine_datiProdotto_comune");
    });

    $('#azienda').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#azienda').find('input:text').val() !== '') {
        mostraCampi();
    }
});


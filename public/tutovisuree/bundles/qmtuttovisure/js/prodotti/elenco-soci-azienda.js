$(window).on('load', function() {
    if ($("#elenco_soci_azienda_ordine_cliente_tipoCliente").length || $("#elenco_soci_azienda_ordine_tipoCheckOut").length) {
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
 
    $("#elenco_soci_azienda_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#elenco_soci_azienda_ordine_datiProdotto_comune");
    });

    $('#azienda').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#azienda').find('input:text').val() !== '') {
        mostraCampi();
    }

});
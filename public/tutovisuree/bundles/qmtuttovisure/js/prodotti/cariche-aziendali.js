$(window).on('load', function() {
    if ($("#cariche_aziendali_ordine_cliente_tipoCliente").length || $("#cariche_aziendali_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#altroTitolo').removeClass('hidden');
    $('#altro').removeClass('hidden');
}

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
 
    $("#cariche_aziendali_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#cariche_aziendali_ordine_datiProdotto_comune");
    });

    $('#persona').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#persona').find('input:text').val() !== '') {
        mostraCampi();
    }

});


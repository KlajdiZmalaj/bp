$(window).on('load', function() {
    if ($("#visura_statuto_ordine_cliente_tipoCliente").length || $("#visura_statuto_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#cfAzienda').removeClass('hidden');
    $('#provincia').removeClass('hidden');
    $('#opzioniSpedizione').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#altroTitolo').removeClass('hidden');
    $('#altro').removeClass('hidden');
    $('#attoCostitutivo').removeClass('hidden');
}

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#attoCostitutivo'), {parziali: Tuttovisure.parziali});

    $('#azienda').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#azienda').find('input:text').val() !== '') {
        mostraCampi();
    }

});


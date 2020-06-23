$(window).on('load', function () {
    if ($("#comunica_pec_alla_cciaa_ordine_cliente_tipoCliente").length || $("#comunica_pec_alla_cciaa_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#codiceFiscaleAzienda').removeClass('hidden');
    $('#luogo').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#indirizzoPec').removeClass('hidden');
}

$(document).ready(function () {
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    if($('#azienda').find('input:text').val() !== ""){
        mostraCampi()
    }

    $('#azienda').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    $("#comunica_pec_alla_cciaa_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#comunica_pec_alla_cciaa_ordine_datiProdotto_comune");
    });

});


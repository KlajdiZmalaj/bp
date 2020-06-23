$(window).on('load', function() {
    if ($("#elenco_immobili_ordine_cliente_tipoCliente").length || $("#elenco_immobili_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){

    $("#elenco_immobili_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#elenco_immobili_ordine_datiProdotto_comune");

        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    });

    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    }

});
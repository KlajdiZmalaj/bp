$(window).on('load', function() {
    if ($("#elaborato_planimetrico_ordine_cliente_tipoCliente").length || $("#elaborato_planimetrico_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $("#elaborato_planimetrico_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#elaborato_planimetrico_ordine_datiProdotto_comune");
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    });

    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    }
});
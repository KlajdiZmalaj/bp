$(window).on('load', function() {
    if ($("#rendita_catastale_ordine_cliente_tipoCliente").length || $("#rendita_catastale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $("input[name$='rendita_catastale_ordine[datiProdotto][tipoDiImmobile]']").change(function() {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    });

    if($("input[name$='rendita_catastale_ordine[datiProdotto][tipoDiImmobile]']").is(':checked')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    }

    $("#rendita_catastale_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#rendita_catastale_ordine_datiProdotto_comune");
    });
});
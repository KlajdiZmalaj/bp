$(window).on('load', function() {
    if ($("#trascrizione_atti_immobiliari_ordine_cliente_tipoCliente").length || $("#trascrizione_atti_immobiliari_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $("#trascrizione_atti_immobiliari_ordine_datiProdotto_tipoDiAtto").change(function() {
        $('#datiCopia').removeClass('hidden');
    });

    if ($("#trascrizione_atti_immobiliari_ordine_datiProdotto_tipoDiAtto").val() !== '') {
        $('#datiCopia').removeClass('hidden');
    }


    $("#trascrizione_atti_immobiliari_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#trascrizione_atti_immobiliari_ordine_datiProdotto_comune");
    });

});
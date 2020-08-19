
$(window).on('load', function () {
    if ($("#certificato_antipedofilia_ordine_cliente_tipoCliente").length || $("#certificato_antipedofilia_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#opzioniSpedizione').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#altroTitolo').removeClass('hidden');
    $('#altro').removeClass('hidden');

}

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    $('#persona').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if ($('#persona').find('input:text').val() !== '') {
        mostraCampi();
    }

    $("#certificato_antipedofilia_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#certificato_antipedofilia_ordine_datiProdotto_comune");
    });

    $('#certificato_antipedofilia_ordine_opzioniProdotto_altro_0').change(function () {
        if (!$(this).is(':checked')) {
            $('#certificatoCarichiSide').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        } else {
            $('#certificatoCarichiSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
    });

    $("input[name$='certificato_antipedofilia_ordine[spedizione][spedizione_nazionale]']").change(function () {
        if ($(this).val() == "internazionale") {
            $('.spedizione_internazionale').removeClass('hidden');
            $('.spedizione_internazionale').children('.form-control').removeClass('hidden');
            $('.spedizione_internazionale').find('input:radio').prop('required', true);
        } else {
            $('.spedizione_internazionale').addClass('hidden');
            $('.spedizione_internazionale').children('.form-control').addClass('hidden');
            $('.spedizione_internazionale').find('input:radio').prop('required', false);
            $('.spedizione_internazionale').find('select').val('');

        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#certificato_antipedofilia_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
        $('.spedizione_internazionale').removeClass('hidden');
        $('.spedizione_internazionale').children('.form-control').removeClass('hidden');
        $('.spedizione_internazionale').find('input:radio').prop('required', true);
    } else {
        $('.spedizione_internazionale').addClass('hidden');
        $('.spedizione_internazionale').children('.form-control').addClass('hidden');
        $('.spedizione_internazionale').find('input:radio').prop('required', false);
        $('.spedizione_internazionale').find('select').val('');
    }

});


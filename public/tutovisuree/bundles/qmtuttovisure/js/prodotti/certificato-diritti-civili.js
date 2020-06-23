$(window).on('load', function () {
    if ($("#certificato_diritti_civili_ordine_cliente_tipoCliente").length || $("#certificato_diritti_civili_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {

    if ( $("#persona").find('input:text').val() !== '') {
        $("#datiPersona").removeClass('hidden');
        $("#indirizzo").removeClass('hidden');
        $("#opzioniSpedizione").removeClass('hidden');
        $("#ordine-urgenza").removeClass('hidden');
        if ($("#certificato_diritti_civili_ordine_datiProdotto_estero").is(':checked')) {
            $("#nazione").find('select').prop('disabled', false);
            $("#provinciaComune").find('select').val(0);
            $("#provinciaComune").addClass('hidden');
            $("#indirizzo2").removeClass('hidden');
            $("#nazione").removeClass('hidden');
        } else {
            $("#nazione").find('select').val(0);
            $("#nazione").find('select').prop('required', false);
            $("#nazione").find('select').prop('disabled', true);
            $("#indirizzo2").addClass('hidden');
            $("#provinciaComune").removeClass('hidden');
        }
    }

    $("#persona").find('input:text').on('propertychange change keyup keypress input paste', function () {
        $("#datiPersona").removeClass('hidden');
        $("#indirizzo").removeClass('hidden');
        $("#opzioniSpedizione").removeClass('hidden');
        $("#ordine-urgenza").removeClass('hidden');
        $("#estero").find('input:checkbox').prop('checked', false);
        $("#nazione").find('select').val(0);
        $("#nazione").find('select').prop('required', false);
        $("#nazione").find('select').prop('disabled', true);
        $("#indirizzo2").addClass('hidden');
        $("#provinciaComune").removeClass('hidden');
        if ($("#certificato_diritti_civili_ordine_datiProdotto_estero").is(':checked')) {
            $("#provinciaComune").find('select').val(0);
            $("#provinciaComune").find('select').prop('required', false);
            $("#provinciaComune").addClass('hidden');
        }
    });

    $("#certificato_diritti_civili_ordine_datiProdotto_estero").change(function () {
        if (!$("#certificato_diritti_civili_ordine_datiProdotto_estero").is(':checked')) {
            $("#nazione").find('select').prop('required', false);
            $("#nazione").find('select').prop('disabled', true);
            $("#nazione").addClass('hidden');
            $("#indirizzo2").addClass('hidden');
            $("#provinciaComune").removeClass('hidden');
        } else {
            $("#nazione").find('select').val(0);
            $("#nazione").find('select').prop('disabled', false);
            $("#nazione").find('select').prop('required', false);
            $("#nazione").removeClass('hidden');
            $("#indirizzo2").removeClass('hidden');
            $("#provinciaComune").find('select').val(0);
            $("#provinciaComune").find('select').prop('required', false);
            $("#provinciaComune").addClass('hidden');
        }
    });

    $("#certificato_diritti_civili_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_diritti_civili_ordine_datiProdotto_comune");
    });

    $("input[name$='certificato_diritti_civili_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_diritti_civili_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


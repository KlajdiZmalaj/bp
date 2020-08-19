$(window).on('load', function() {
    if ($("#certificato_cronologico_veicolo_ordine_cliente_tipoCliente").length || $("#certificato_cronologico_veicolo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $('#certificato_cronologico_veicolo_ordine_datiProdotto_tipoDiVeicolo').change(function() {
        if ($(this).val() !== "") {
            $('#ordine-urgenza').removeClass('hidden');
        }
    });

   if ($('#certificato_cronologico_veicolo_ordine_datiProdotto_tipoDiVeicolo').val() !== "" ) {
        $("table[name$='prezzoBase']").addClass("hidden");
        $("table[name$='riepilogo']").removeClass("hidden");
        $('#ordine-urgenza').removeClass('hidden');
    }

    $("input[name$='certificato_cronologico_veicolo_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_cronologico_veicolo_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


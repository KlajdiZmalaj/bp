$(window).on('load', function() {
    if ($("#certificato_carichi_pendenti_ordine_cliente_tipoCliente").length || $("#certificato_carichi_pendenti_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#opzioniSpedizione').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
}

$(document).ready(function(){
    
    $("#certificato_carichi_pendenti_ordine_datiProdotto_estero").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_carichi_pendenti_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'nazione',
                    'indirizzo2'
                ],
                'obbligatori': [
                    
                ]
            }
        },
        'reset': [
            'nazione',
            'provinciaComune',
            'indirizzo2'
        ],
        'clean': [

        ]
    });
    
    
    $("#certificato_carichi_pendenti_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#certificato_carichi_pendenti_ordine_datiProdotto_comune");
    });

    $('#persona').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if ($('#persona').find('input:text').val() !== '') {
        mostraCampi();
    }
    
    $("#certificato_carichi_pendenti_ordine_datiProdotto_estero").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='certificato_carichi_pendenti_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_carichi_pendenti_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


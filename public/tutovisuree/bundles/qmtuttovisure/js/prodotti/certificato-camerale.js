$(window).on('load', function() {
    if ($("#certificato_camerale_ordine_cliente_tipoCliente").length || $("#certificato_camerale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){

    $("input[name$='certificato_camerale_ordine[datiProdotto][tipoCertificato]']").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_camerale_ordine_',
        'valori': {
            'ordinario': {
                'mostra': [
                    'certificatoPer'
                ],
                'obbligatori': [
                    'certificatoPer'
                ]
            },
            'storico': {
                'mostra': [
                    'certificatoPer'
                ],
                'obbligatori': [
                    'certificatoPer'
                ]
            },
            'artigiano': {
                'mostra': [
                    'certificatoPer'
                ],
                'obbligatori': [
                    'certificatoPer'
                ]
            }
        },
        'reset': [
            'certificatoPer'
        ],
        'clean': [

        ]
    });
    
    $("input[name$='certificato_camerale_ordine[datiProdotto][certificatoPer]']").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_camerale_ordine_',
        'valori': {
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'ordine-urgenza',
                    'certificatoPer',
                    'opzioniSpedizione',
                    'bolli',
                    'provinciaComune'
                ],
                'obbligatori': [
                     'datiTipoDiImmobileVisura',
                    'bolli',
                ]
            },
            'dittaIndividuale': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'certificatoPer',
                    'opzioniSpedizione',
                    'bolli',
                    'provinciaComune'
                ],
                 'obbligatori': [
                     'bolli',
                ]
            }
        },
        'reset': [
            'datiAzienda',
            'datiPersona',
            'bolli',
            'ordine-urgenza'
        ],
        'clean': [

        ]
    });
    
    $("input[name$='certificato_camerale_ordine[datiProdotto][bolli]']").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_camerale_ordine_',
        'valori': {
            'esente': {
                'mostra': [
                    'chiusura'
                ],
                'obbligatori': [
                    
                ]
            }
        },
        'reset': [
            'chiusura'
        ],
        'clean': [
        ]
    });    
    
    $("#certificato_camerale_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#certificato_camerale_ordine_datiProdotto_comune");
    });

    $("input[name$='certificato_camerale_ordine[datiProdotto][tipoCertificato]']").logicaOpzioniProdotto().refreshOpzioni();
    
    $("input[name$='certificato_camerale_ordine[datiProdotto][certificatoPer]']").logicaOpzioniProdotto().refreshOpzioni();
    
    $("input[name$='certificato_camerale_ordine[datiProdotto][bolli]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='certificato_camerale_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_camerale_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


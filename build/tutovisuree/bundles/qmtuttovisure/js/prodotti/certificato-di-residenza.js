function filtraDatiParziali(data) {
    $.each(data.opzioni, function(i, v) {
        if (v) {
            if (v.nome.substring(0, 14) == "Gruppo lingue ") {
                $.each(data.datiProdotto, function(j, v) {
                    if ('traduzione' == v.name) {
                        var strsplit = v.val.split('_');
                        var nome = strsplit[1];
                        if (nome == "lingueSlave") {
                            nome = "Lingue slave";
                        }
                        if (nome == "portogheseEuropeo") {
                            nome = "Portoghese europeo";
                        }
                        nome = 'Traduzione in ' + nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

                        data.opzioni[i].testo = nome;
                    }
                });
            }
        }
    });
    return data;
}

$(window).on('load', function() {
    rivets.bind($('#traduzione'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#scegli'), {parziali: Tuttovisure.parziali});
    if ($("#certificato_di_residenza_ordine_cliente_tipoCliente").length || $("#certificato_di_residenza_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $("input[name$='certificato_di_residenza_ordine[opzioniProdotto][scegliDocumento]']").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_di_residenza_ordine_',
        'valori': {
            'certificatoDiResidenza': {
                'mostra': [
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'traduzione'
                ],
                'obbligatori': [

                ]
            },
            'certificatoStoricoDiResidenza': {
                'mostra': [
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'traduzione',
                    'storica'
                ],
                'obbligatori': [

                ]
            },
        },
        'reset': [
            'datiPersona',
            'provinciaComune',
            'ordine-urgenza',
            'legalizzazioneTitolo',
            'traduzione',
            'storica'
        ],
        'clean': [

        ]
    });

    $("#certificato_di_residenza_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_di_residenza_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'lingue',
                    'validita'
                ],
                'obbligatori': [
                    'lingue',
                    'validita'
                ]
            }
        },
        'reset': [
            'lingue',
            'validita'

        ],
        'clean': [

        ]
    });

    $("#certificato_di_residenza_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").change(function() {
        if(!$(this).is(':checked')) {
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#certificato_di_residenza_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='certificato_di_residenza_ordine[opzioniProdotto][scegliDocumento]']").logicaOpzioniProdotto().refreshOpzioni();


    $("#certificato_di_residenza_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_di_residenza_ordine_datiProdotto_comune");
    });

    $("#certificato_di_residenza_ordine_datiProdotto_traduzione").change(function() {
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='certificato_di_residenza_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_di_residenza_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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

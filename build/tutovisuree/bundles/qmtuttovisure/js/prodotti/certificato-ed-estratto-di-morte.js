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
    rivets.bind($('#multilingua'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#scegli'), {parziali: Tuttovisure.parziali});
    if ($("#certificato_ed_estratto_di_morte_ordine_cliente_tipoCliente").length || $("#certificato_ed_estratto_di_morte_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $("input[name$='certificato_ed_estratto_di_morte_ordine[opzioniProdotto][tipoCertificato]']").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_ed_estratto_di_morte_ordine_',
        'valori': {
            'certificatoDiMorte': {
                'mostra': [
                    'utilizzaDati',
                    'datiPersona',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione'
                ],
                'obbligatori': [
                    'utilizzaDati'
                ]
            },
            'estrattoDiMorte': {
                'mostra': [
                    'decessoTitolo',
                    'provinciaComuneDecesso',
                    'datiPersona',
                    'multilingua',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione'
                ],
                'obbligatori': [

                ]
            },
            'copiaAttoDiMorte': {
                'mostra': [
                    'utilizzaDati',
                    'datiPersona',
                    'maternitaEPaternita',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione'
                ],
                'obbligatori': [
                    'utilizzaDati'
                ]
            },
        },
        'reset': [
            'utilizzaDati',
            'datiPersona',
            'ordine-urgenza',
            'multilingua',
            'legalizzazioneTitolo',
        ],
        'clean': [

        ]
    });

    $("input[name$='certificato_ed_estratto_di_morte_ordine[datiProdotto][utilizzaDati]']").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_ed_estratto_di_morte_ordine_',
        'valori': {
            'luogoUltimaResidenza': {
                'mostra': [
                    'residenzaTitolo',
                    'provinciaComune'
                ],
                'obbligatori': [

                ]
            },
            'luogoDecesso': {
                'mostra': [
                    'decessoTitolo',
                    'provinciaComuneDecesso'
                ],
                'obbligatori': [

                ]
            },
        },
        'reset': [
            'residenzaTitolo',
            'decessoTitolo',
            'provinciaComune',
            'provinciaComuneDecesso'


        ],
        'clean': [

        ]
    });

    $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_ed_estratto_di_morte_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'convenzioni'
                ],
                'obbligatori': [
                    'convenzioni'
                ]
            }
        },
        'reset': [
            'convenzioni',

        ],
        'clean': [

        ]
    });

    $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_ed_estratto_di_morte_ordine_',
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

    $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").change(function() {
        if(!$(this).is(':checked')) {
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        }
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune').closest("div[class*='row']").removeClass('alert-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune').closest("div[class*='row']").removeClass('alert-danger-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune').closest("div[class*='row']").find('.alert-message').remove();
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso').closest("div[class*='row']").removeClass('alert-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso').closest("div[class*='row']").removeClass('alert-danger-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso').closest("div[class*='row']").find('.alert-message').remove();
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#certificato_ed_estratto_di_morte_ordine_datiProdotto_utilizzaDati").change(function() {
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune').closest("div[class*='row']").removeClass('alert-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune').closest("div[class*='row']").removeClass('alert-danger-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune').closest("div[class*='row']").find('.alert-message').remove();
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso').closest("div[class*='row']").removeClass('alert-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso').closest("div[class*='row']").removeClass('alert-danger-form');
        $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso').closest("div[class*='row']").find('.alert-message').remove();
    });

    $("input[name$='certificato_ed_estratto_di_morte_ordine[opzioniProdotto][tipoCertificato]']").change(function() {
        if($(this).is(':checked')) {
            if($(this).val() == 'estrattoDiMorte') {
                $("input[name$='certificato_ed_estratto_di_morte_ordine[datiProdotto][utilizzaDati]']").logicaOpzioniProdotto().refreshOpzioni();
                $("input[name$='certificato_ed_estratto_di_morte_ordine[opzioniProdotto][tipoCertificato]']").logicaOpzioniProdotto().refreshOpzioni();
            } else {
                $('#convenzioni').addClass('hidden');
                $('#convenzioni').find('select').val(0);
                if($('#utilizzaDati').find('input:radio').not(':checked')) {
                    $("input[name$='certificato_ed_estratto_di_morte_ordine[datiProdotto][utilizzaDati]']").logicaOpzioniProdotto().refreshOpzioni();
                }
            }

            $('#traduzione').removeClass('hidden');
        } else {
            $('#traduzione').addClass('hidden');
        }

    });

    if ($('#scegli').find('input:radio').is(':checked')) {
        if($("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_multilingua").is(':checked')) {
            $('#traduzione').addClass('hidden');
            $('#traduzione').find('input:checkbox').prop('checked', false);
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        } else {
            $('#traduzione').removeClass('hidden');
            $('#convenzioni').find('select').val(0);
        }
    } else {
        $('#traduzione').addClass('hidden');
    }

    $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_multilingua").change(function() {
        if($(this).is(':checked')) {
            $('#traduzione').addClass('hidden');
            $('#traduzione').find('input:checkbox').prop('checked', false);
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        } else {
            $('#traduzione').removeClass('hidden');
            $('#convenzioni').addClass('hidden');
            $('#convenzioni').find('select').val(0);
        }
        $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto().refreshOpzioni();

        $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto().refreshOpzioni();
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#certificato_ed_estratto_di_morte_ordine_datiProdotto_traduzione").change(function() {
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='certificato_ed_estratto_di_morte_ordine[opzioniProdotto][tipoCertificato]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='certificato_ed_estratto_di_morte_ordine[datiProdotto][utilizzaDati]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto().refreshOpzioni();

    $("#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto().refreshOpzioni();


    $("#certificato_ed_estratto_di_morte_ordine_datiProdotto_provinciaNascita").val(0);

    $("#certificato_ed_estratto_di_morte_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_ed_estratto_di_morte_ordine_datiProdotto_comune");
    });

    $("#certificato_ed_estratto_di_morte_ordine_datiProdotto_provinciaNascita").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneNascita");
    });

    $("#certificato_ed_estratto_di_morte_ordine_datiProdotto_provinciaDecesso").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_ed_estratto_di_morte_ordine_datiProdotto_comuneDecesso");
    });


    $('#certificato_ed_estratto_di_morte_ordine_datiProdotto_provinciaDecesso').val(0);

    if($('#certificato_ed_estratto_di_morte_ordine_opzioniProdotto_tipoCertificato_1').is(':checked')) {
        $('#decessoTitolo').removeClass('hidden');
        $('#provinciaComuneDecesso').removeClass('hidden');
    }

    $("input[name$='certificato_ed_estratto_di_morte_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_ed_estratto_di_morte_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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

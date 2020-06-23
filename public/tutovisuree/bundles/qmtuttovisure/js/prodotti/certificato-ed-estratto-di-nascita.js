function filtraDatiParziali(data) {
    $.each(data.opzioni, function (i, v) {
        if (v) {
            if (v.nome.substring(0, 14) == "Gruppo lingue ") {
                $.each(data.datiProdotto, function (j, v) {
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

$(window).on('load', function () {
    if ($("#certificato_ed_estratto_di_nascita_ordine_cliente_tipoCliente").length || $("#certificato_ed_estratto_di_nascita_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#traduzione'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#multilingua'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#scegli'), {parziali: Tuttovisure.parziali});

    $("input[name$='certificato_ed_estratto_di_nascita_ordine[opzioniProdotto][tipoCertificato]']").logicaOpzioniProdotto({
        'prefix_form': 'certificato_ed_estratto_di_nascita_ordine_',
        'valori': {
            'certificatoDiNascita': {
                'mostra': [
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione'
                ],
                'obbligatori': []
            },
            'estrattoDiNascita': {
                'mostra': [
                    'datiPersona',
                    'provinciaComune',
                    'multilingua',
                    'maternitaEPaternita',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione'
                ],
                'obbligatori': []
            },
            'copiaAttoDiNascita': {
                'mostra': [
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione'
                ],
                'obbligatori': []
            },
        },
        'reset': [
            'multilingua',
            'datiPersona',
            'provinciaComune',
            'maternitaEPaternita',
            'ordine-urgenza',
            'legalizzazioneTitolo'

        ],
        'clean': []
    });

    $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto({
        'prefix_form': 'certificato_ed_estratto_di_nascita_ordine_',
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
        'clean': []
    });


    $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto({
        'prefix_form': 'certificato_ed_estratto_di_nascita_ordine_',
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
        'clean': []
    });

    $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").change(function () {
        if (!$(this).is(':checked')) {
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='certificato_ed_estratto_di_nascita_ordine[opzioniProdotto][tipoCertificato]']").change(function () {
        if ($(this).is(':checked')) {
            if ($(this).val() != 'estrattoDiNascita') {
                $('#convenzioni').addClass('hidden');
                $('#convenzioni').find('select').val(0);
            }
            $('#traduzione').removeClass('hidden');
        } else {
            $('#traduzione').addClass('hidden');
        }
        $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto().refreshOpzioni();
    });

    if ($('#scegli').find('input:radio').is(':checked')) {

        if ($("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_multilingua").is(':checked')) {
            $('#traduzione').addClass('hidden');
            $('#traduzione').find('input:checkbox').prop('checked', false);
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        } else {
            $('#traduzione').removeClass('hidden');
            $('#convenzioni').addClass('hidden');
            $('#convenzioni').find('select').val(0);
        }
    } else {
        $('#traduzione').addClass('hidden');
    }

    $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_multilingua").change(function () {
        if ($(this).is(':checked')) {
            $('#traduzione').addClass('hidden');
            $('#traduzione').find('input:checkbox').prop('checked', false);
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        } else {
            $('#traduzione').removeClass('hidden');
            $('#convenzioni').find('select').val(0);
            $('#convenzioni').addClass('hidden');
        }
        $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto().refreshOpzioni();

        $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto().refreshOpzioni();
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#certificato_ed_estratto_di_nascita_ordine_datiProdotto_traduzione").change(function () {
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='certificato_ed_estratto_di_nascita_ordine[opzioniProdotto][tipoCertificato]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_multilingua").logicaOpzioniProdotto().refreshOpzioni();

    $("#certificato_ed_estratto_di_nascita_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto().refreshOpzioni();


    $("#certificato_ed_estratto_di_nascita_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#certificato_ed_estratto_di_nascita_ordine_datiProdotto_comune");
    });

    $("input[name$='certificato_ed_estratto_di_nascita_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_ed_estratto_di_nascita_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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

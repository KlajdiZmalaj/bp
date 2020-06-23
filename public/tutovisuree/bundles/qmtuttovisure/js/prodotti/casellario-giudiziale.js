function filtraDatiParziali(data) {
    $.each(data.opzioni, function (i, v) {
        if (v) {
            if (v.nome.substring(0, 14) == "Gruppo lingue ") {
                $.each(data.datiProdotto, function (j, v) {
                    if ('traduzione' == v.name && v.val) {
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
    if ($("#casellario_giudiziale_ordine_cliente_tipoCliente").length || $("#casellario_giudiziale_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#usoEstero'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#legalizzazione'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#certificatoCarichiPendentiAdUsoEstero'), {parziali: Tuttovisure.parziali});

    $("input[name$='casellario_giudiziale_ordine[opzioniProdotto][tipo]']").logicaOpzioniProdotto({
        'valori': {
            'certificatoCivile': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'uso',
                    'indirizzo',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'usoEstero',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': []
            },
            'certificatoPenale': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'uso',
                    'indirizzo',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'usoEstero',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': []
            },
            'certificatoGenerale': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'uso',
                    'indirizzo',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'usoEstero',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': []
            },
            'certificatoPenalePerOnlus': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'uso',
                    'indirizzo',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'usoEstero',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': []
            },
        },
        'reset': [
            'datiPersona',
            'ordine-urgenza',
            'uso',
            'indirizzo',
            'legalizzazioneTitolo',
            'usoEstero',
            'altroTitolo',
            'altro'
        ],
        'clean': []
    });

    $("#casellario_giudiziale_ordine_datiProdotto_estero").logicaOpzioniProdotto({
        'prefix_form': 'casellario_giudiziale_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'nazione',
                    'indirizzo2'
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'nazione',
            'indirizzo2',
            'provinciaComune',
        ],
        'clean': []
    });

    $("#casellario_giudiziale_ordine_opzioniProdotto_certificatoPerUsoEstero").logicaOpzioniProdotto({
        'prefix_form': 'casellario_giudiziale_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'legalizzazione',
                    'traduzione',
                    'validita',
                    'certificatoCarichiPendentiAdUsoEstero'
                ],
                'obbligatori': [
                    'legalizzazione'
                ]
            }
        },
        'reset': [
            'legalizzazione',
            'traduzione',
            'validita',
            'certificatoCarichiPendentiAdUsoEstero'
        ],
        'clean': []
    });

    $("#casellario_giudiziale_ordine_datiProdotto_daTradurre").change(function () {
        if ($(this).is(':checked')) {
            $('#lingue').removeClass('hidden');
            $('#lingue').find('select').prop('required', true);
        } else {
            $('#lingue').addClass('hidden');
            $('#lingue').find('select').prop('required', false);
            $('#lingue').find('select').val(0);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#casellario_giudiziale_ordine_datiProdotto_daTradurre").is(':checked')) {
        $('#lingue').removeClass('hidden');
        $('#lingue').find('select').prop('required', true);
    } else {
        $('#lingue').addClass('hidden');
        $('#lingue').find('select').prop('required', false);
        if (!$("#casellario_giudiziale_ordine_datiProdotto_legalizzazione_2").is(":checked")) {
            $('#lingue').find('select').val(0);
        }
    }


    $("#casellario_giudiziale_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#casellario_giudiziale_ordine_datiProdotto_comune");
    });

    $("input[name$='casellario_giudiziale_ordine[opzioniProdotto][tipo]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_ordine_datiProdotto_estero").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_ordine_opzioniProdotto_certificatoPerUsoEstero").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_ordine_datiProdotto_daTradurre").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_ordine_datiProdotto_traduzione").change(function () {
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#casellario_giudiziale_ordine_opzioniProdotto_certificatoPerUsoEstero").change(function () {
        if (!$(this).is(":checked")) {
            $('#legalizzazione').find('input:radio').prop('checked', false);
            $('#legalizzazione').find('select').val(0);
            $('#lingue').find('select').val(0);
            $('#lingue').addClass('hidden');
            $('#traduzione').find('input:checkbox').prop('checked', false);
            $('#traduzione').find('select').val(0);
            $('#altroTitolo').removeClass('hidden');
            $('#altro').removeClass('hidden');
            $('#certificatoCarichiPendentiAdUsoEstero').find('input:checkbox').prop('checked', false);
            $('#certificatoCarichiEsteroSide').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }else {
            $('#altroTitolo').addClass('hidden');
            $('#altro').addClass('hidden');
            $('#altro').find('input:checkbox').prop('checked', false);
            $('#certificatoCarichiSide').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });


    $('#casellario_giudiziale_ordine_opzioniProdotto_certificatoCarichiPendentiAdUsoEstero').change(function () {
        if (!$(this).is(':checked')) {
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        } else {
            $('#certificatoCarichiEsteroSide').removeClass('hidden');
            $('#certificatoCarichiSide').addClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
    });

    $('#casellario_giudiziale_ordine_opzioniProdotto_altro_0').change(function () {
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

    if (!$("#casellario_giudiziale_ordine_opzioniProdotto_certificatoPerUsoEstero").is(":checked")) {
        $('#legalizzazione').find('input:radio').prop('checked', false);
        $('#legalizzazione').find('select').val(0);
        $('#lingue').find('select').val(0);
        $('#lingue').addClass('hidden');
        $('#traduzione').find('input:checkbox').prop('checked', false);
        $('#traduzione').find('select').val(0);
        $('#certificatoCarichiPendentiAdUsoEstero').find('input:checkbox').prop('checked', false);
    } else {
        $('#traduzione').removeClass('hidden');
        if ($("#casellario_giudiziale_ordine_datiProdotto_legalizzazione_2").is(":checked")) {
            $('#certificatoDaTradurre').find('input:checkbox').prop('checked', false);
            $('#certificatoDaTradurre').addClass('hidden');
            $('#lingue').removeClass('hidden');
        }
        $('#altroTitolo').addClass('hidden');
        $('#altro').addClass('hidden');
    }

    $("input[name$='casellario_giudiziale_ordine[datiProdotto][legalizzazione]']").change(function () {
        if ($(this).val() == "legalizzazioneEsteraTraduzioneCertificata") {
            $('#traduzione').removeClass('hidden');
            $('#certificatoDaTradurre').find('input:checkbox').prop('checked', false);
            $('#certificatoDaTradurre').addClass('hidden');
            $('#lingue').removeClass('hidden');
            $('#lingue').find('select').prop('required', true);
        } else {
            $('#certificatoDaTradurre').removeClass('hidden');
            $('#lingue').addClass('hidden');
            $('#lingue').find('select').prop('required', false);
            $('#traduzione').find('input:checkbox').prop('checked', false);
            $('#traduzione').find('select').val(0);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#casellario_giudiziale_ordine_opzioniProdotto_tipo_0").change(function () {
        usoEsteroCheckbox();
    });
    $("#casellario_giudiziale_ordine_opzioniProdotto_tipo_1").change(function () {
        usoEsteroCheckbox();
    });
    $("#casellario_giudiziale_ordine_opzioniProdotto_tipo_2").change(function () {
        usoEsteroCheckbox();
    });
    $("#casellario_giudiziale_ordine_opzioniProdotto_tipo_3").change(function () {
        usoEsteroCheckbox();
    });

    $("input[name$='casellario_giudiziale_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#casellario_giudiziale_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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

function usoEsteroCheckbox(){
    if ($('#usoEstero').find('input:checkbox').is(":checked")) {
        $('#altroTitolo').addClass('hidden');
        $('#altro').addClass('hidden');
    }else{
        $('#altroTitolo').removeClass('hidden');
        $('#altro').removeClass('hidden');
    }
}

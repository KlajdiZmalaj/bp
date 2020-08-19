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
    if ($("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_cliente_tipoCliente").length || $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#legalizzazione'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#altriServizi'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#tipoCasellario'), {parziali: Tuttovisure.parziali});

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_opzioniProdotto_casellarioGiudiziale").logicaOpzioniProdotto( {
        'valori': {
            '1': {
                'mostra': [
                    'datiPersona',
                    'tipoCasellario',
                    'ordine-urgenza',
                    'uso',
                    'indirizzo',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'legalizzazione',
                    'traduzione',
                    'validita'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [
        ],
        'clean': [

        ]
    });

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_opzioniProdotto_carichiPendenti").logicaOpzioniProdotto( {
        'valori': {
            '1': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'uso',
                    'indirizzo',
                    'legalizzazioneTitolo',
                    'opzioniSpedizione',
                    'legalizzazione',
                    'traduzione',
                    'validita'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [

        ],
        'clean': [

        ]
    });

    if ($('#altriServizi').length) {
        $('#altriServizi').find('input[type=checkbox]').each(function () {
            $(this).click(function() {
                $('#noSelection').addClass('hidden');
                $('#noSelection').removeClass('alert-form');
            });
        });
    }

    $('button[name="formButtonAvanti"]').click(function(e) {
        var flag = false;

        if ($('#altriServizi').length) {
            $('#altriServizi').find('input[type=checkbox]').each(function () {
                if($(this).is(':checked')){
                    flag = true;
                    return;
                }
            });
        } else {
            flag = true;
        }

        if (flag == false) {
            e.preventDefault();
            $('#noSelection').removeClass('hidden');
            $('#noSelection').addClass('alert-form');
            var noSelection = $('#topRichiesta').offset().top;
            $('html, body').animate({scrollTop:noSelection}, 300);
            return false;
        }
    });

    $('button[name="formButtonCompleta"]').click(function(e) {
        var flag = false;

        if ($('#altriServizi').length) {
            $('#altriServizi').find('input[type=checkbox]').each(function () {
                if($(this).is(':checked')){
                    flag = true;
                    return;
                }
            });
        } else {
            flag = true;
        }

        if (flag == false) {
            e.preventDefault();
            $('#noSelection').removeClass('hidden');
            $('#noSelection').addClass('alert-form');
            var noSelection = $('#topRichiesta').offset().top;
            $('html, body').animate({scrollTop:noSelection}, 300);
            return false;
        }
    });

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_opzioniProdotto_casellarioGiudiziale").change(function () {
        if (!$(this).is(':checked')) {
            $('#tipoCasellario').find('input:radio').prop('checked', false);
            $('#tipoCasellario').addClass('hidden');
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_opzioniProdotto_casellarioGiudiziale").is(':checked')) {
        $('#tipoCasellario').find('input:radio').removeClass('hidden');
    } else {
        $('#tipoCasellario').find('input:radio').prop('checked', false);
    }

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_opzioniProdotto_carichiPendenti").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_opzioniProdotto_casellarioGiudiziale").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_estero").logicaOpzioniProdotto({
        'prefix_form': 'casellario_giudiziale_carichi_pendenti_uso_estero_ordine_',
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

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_daTradurre").change(function () {
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

    if ($("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_daTradurre").is(':checked')) {
        $('#lingue').removeClass('hidden');
        $('#lingue').find('select').prop('required', true);
    } else {
        $('#lingue').addClass('hidden');
        $('#lingue').find('select').prop('required', false);
        if (!$("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_legalizzazione_2").is(":checked")) {
            $('#lingue').find('select').val(0);
        }
    }

    if ($("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_legalizzazione_2").is(":checked")) {
        $('#traduzione').removeClass('hidden');
        $('#certificatoDaTradurre').find('input:checkbox').prop('checked', false);
        $('#certificatoDaTradurre').addClass('hidden');
        $('#lingue').removeClass('hidden');
        $('#lingue').find('select').prop('required', true);
    }

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_comune");
    });

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_estero").logicaOpzioniProdotto().refreshOpzioni();

    $("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_datiProdotto_traduzione").change(function () {
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='casellario_giudiziale_carichi_pendenti_uso_estero_ordine[datiProdotto][legalizzazione]']").change(function () {
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

    $("input[name$='casellario_giudiziale_carichi_pendenti_uso_estero_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#casellario_giudiziale_carichi_pendenti_uso_estero_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


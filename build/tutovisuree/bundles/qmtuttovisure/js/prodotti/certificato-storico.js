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
    rivets.bind($('#altriServizi'), {parziali: Tuttovisure.parziali});
    if ($("#certificato_storico_ordine_cliente_tipoCliente").length || $("#certificato_storico_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $("#certificato_storico_ordine_opzioniProdotto_statoStoricoDiFamiglia").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_storico_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'famiglia',
                    'famigliaTitolo',
                    'provinciaComune',
                    'personaTitolo',
                    'datiPersona',
                    'ordine-urgenza',
                    'opzioniSpedizione'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [
            'famiglia',
            'famigliaTitolo'
        ],
        'clean': [

        ]
    });

    $("#certificato_storico_ordine_opzioniProdotto_certificatoStoricoDiResidenza").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_storico_ordine_',
        'valori': {
            '1': {
                'mostra': [
                    'residenza',
                    'residenzaTitolo',
                    'opzioniSpedizione',
                    'provinciaComune',
                    'personaTitolo',
                    'datiPersona',
                    'ordine-urgenza'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [
            'residenza',
            'residenzaTitolo',
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

    $("#certificato_storico_ordine_opzioniProdotto_statoStoricoDiFamiglia").logicaOpzioniProdotto().refreshOpzioni();

    $("#certificato_storico_ordine_opzioniProdotto_certificatoStoricoDiResidenza").logicaOpzioniProdotto().refreshOpzioni();


    $("#certificato_storico_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_storico_ordine_datiProdotto_comune");
    });

    $("input[name$='certificato_storico_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_storico_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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

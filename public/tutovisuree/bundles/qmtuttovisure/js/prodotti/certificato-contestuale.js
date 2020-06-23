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

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#provinciaComune').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#opzioniSpedizione').removeClass('hidden');
    $('#legalizzazioneTitolo').removeClass('hidden');
    $('#traduzione').removeClass('hidden');
}

$(window).on('load', function() {
    if ($("#certificato_contestuale_ordine_cliente_tipoCliente").length || $("#certificato_contestuale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $('#persona').find('input:text').on('propertychange change keyup keypress input paste', function () {
        mostraCampi();
    });

    if($('#persona').find('input:text').val() !== '') {
        mostraCampi();
    }


    rivets.bind($('#traduzione'), {parziali: Tuttovisure.parziali});
    $("#certificato_contestuale_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto( {
        'prefix_form': 'certificato_contestuale_ordine_',
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

    $("#certificato_contestuale_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").change(function() {
        if(!$(this).is(':checked')) {
            $('#lingue').find('select').val(0);
            $('#validita').find('select').val(0);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#certificato_contestuale_ordine_opzioniProdotto_certificatoDaTradurreELegalizzare").logicaOpzioniProdotto().refreshOpzioni();

    $("#certificato_contestuale_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#certificato_contestuale_ordine_datiProdotto_comune");
    });

    $("#certificato_contestuale_ordine_datiProdotto_traduzione").change(function() {
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='certificato_contestuale_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_contestuale_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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

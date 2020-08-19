$(window).on('load', function() {
    if ($("#estratto_conto_debitorio_equitalia_ordine_cliente_tipoCliente").length || $("#estratto_conto_debitorio_equitalia_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#visuraCamerale'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#persona'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#azienda'), {parziali: Tuttovisure.parziali});

    $("input[name$='estratto_conto_debitorio_equitalia_ordine[opzioniProdotto][ricercaPer]']").logicaOpzioniProdotto( {
        'valori': {
            'personaFisica': {
                'mostra': [
                    'datiPersona',
                    'personaTitolo',
                    'ordine-urgenza',
                    'provinciaComune',
                    'opzioniSpedizione'
                ],
                'obbligatori': []
            },
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'aziendaTitolo',
                    'ordine-urgenza',
                    'visuraCameraleTitolo',
                    'visuraCamerale',
                    'provinciaComune',
                    'opzioniSpedizione'
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'datiPersona',
            'personaTitolo',
            'datiAzienda',
            'aziendaTitolo',
            'ordine-urgenza',
            'visuraCameraleTitolo',
            'visuraCamerale',
        ],
        'clean': [

        ]
    });

    $("input[name$='estratto_conto_debitorio_equitalia_ordine[opzioniProdotto][ricercaPer]']").change(function() {
        if ($(this).val() === 'personaFisica') {
            $('#provinciaComune').find('span').text('di residenza:');
            $('#indirizzo').find('span').text('di residenza:');
        }
        if ($(this).val() === 'azienda') {
            $('#provinciaComune').find('span').text('sede legale:');
            $('#indirizzo').find('span').text('sede legale:');
        }
    });

    if ($("#estratto_conto_debitorio_equitalia_ordine_opzioniProdotto_ricercaPer_0").is(':checked')) {
        $('#provinciaComune').find('span').text('di residenza:');
        $('#indirizzo').find('span').text('di residenza:');
    }

    if ($("#estratto_conto_debitorio_equitalia_ordine_opzioniProdotto_ricercaPer_1").is(':checked')) {
        $('#provinciaComune').find('span').text('sede legale:');
        $('#indirizzo').find('span').text('sede legale:');
    }

    $("#estratto_conto_debitorio_equitalia_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#estratto_conto_debitorio_equitalia_ordine_datiProdotto_comune");
    });

    $("input[name$='estratto_conto_debitorio_equitalia_ordine[opzioniProdotto][ricercaPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='estratto_conto_debitorio_equitalia_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#estratto_conto_debitorio_equitalia_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


$(window).on('load', function () {
    if ($("#verifica_cartelle_equitalia_ordine_cliente_tipoCliente").length || $("#verifica_cartelle_equitalia_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#estrattoDiRuolo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#FinoA'), {parziali: Tuttovisure.parziali});

    $("input[name$='verifica_cartelle_equitalia_ordine[datiProdotto][verificaPer]']").logicaOpzioniProdotto({
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersonaTitolo',
                    'datiPersona',
                    'ordine-urgenza',
                    'numeroCartella',
                    'numeroCartellaTitolo',
                    'pianoRatealeTitolo',
                    'pianoRateale',
                    'estrattoDiRuoloTitolo',
                    'estrattoDiRuolo',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': []
            },
            'azienda': {
                'mostra': [
                    'datiAziendaTitolo',
                    'datiAzienda',
                    'ordine-urgenza',
                    'numeroCartella',
                    'numeroCartellaTitolo',
                    'pianoRatealeTitolo',
                    'pianoRateale',
                    'estrattoDiRuoloTitolo',
                    'estrattoDiRuolo',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': []
            },
        },
        'reset': [
            'datiPersonaTitolo',
            'datiPersona',
            'datiAziendaTitolo',
            'datiAzienda',
            'ordine-urgenza',
            'numeroCartella',
            'numeroCartellaTitolo',
            'pianoRatealeTitolo',
            'pianoRateale',
            'estrattoDiRuoloTitolo',
            'estrattoDiRuolo',
            'altroTitolo',
            'altro'
        ],
        'clean': []
    });



    $("input[name$='verifica_cartelle_equitalia_ordine[datiProdotto][pianoRateale]']").logicaOpzioniProdotto({
        'valori': {
            'si': {
                'mostra': [
                    'finoA'
                ]
            }
        },
        'reset': [
            'finoA'
        ],
        'clean': []
    });

    $("input[name$='verifica_cartelle_equitalia_ordine[datiProdotto][pianoRateale]']").logicaOpzioniProdotto().refreshOpzioni();
    $("input[name$='verifica_cartelle_equitalia_ordine[datiProdotto][verificaPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#verifica_cartelle_equitalia_ordine_datiProdotto_pianoRateale_1").change(function () {
        $('#finoA').find('select').val(0);
        Tuttovisure.Ordine.aggiornaParziali();
    });

});


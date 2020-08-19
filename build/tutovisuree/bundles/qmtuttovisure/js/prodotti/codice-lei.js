$(window).on('load', function () {
    if ($("#codice_lei_ordine_cliente_tipoCliente").length || $("#codice_lei_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    $("input[name$='codice_lei_ordine[datiProdotto][richiediCodicePer]']").logicaOpzioniProdotto({
        'valori': {
            'impresa': {
                'mostra': [
                    'datiImpresaTitolo',
                    'datiImpresa',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            },
            'fondi': {
                'mostra': [
                    'datiFondoInvestimentoTitolo',
                    'datiFondo',
                    'provinciaComune',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            },
            'altroEnte': {
                'mostra': [
                    'datiEnteTitolo',
                    'datiEnte',
                    'provinciaComune',
                    'emailPec',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            },
        },
        'reset': [
            'datiImpresaTitolo',
            'datiImpresa',
            'datiFondoInvestimentoTitolo',
            'datiFondo',
            'datiEnteTitolo',
            'datiEnte',
            'provinciaComune',
            'emailPec',
            'ordine-urgenza'
        ],
        'clean': []
    });

    $("input[name$='codice_lei_ordine[datiProdotto][modalitaPagamento]']").logicaOpzioniProdotto({
        'valori': {
            'split': {
                'mostra': [],
                'obbligatori': []
            },
            'esenzioneIva': {
                'mostra': [
                    'dichiarazioneIntento'
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'dichiarazioneIntento'
        ],
        'clean': []
    });

    $("#codice_lei_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#codice_lei_ordine_datiProdotto_comune");
    });


    $("input[name$='codice_lei_ordine[datiProdotto][richiediCodicePer]']").logicaOpzioniProdotto().refreshOpzioni();
    $("input[name$='codice_lei_ordine[datiProdotto][modalitaPagamento]']").logicaOpzioniProdotto().refreshOpzioni();
});


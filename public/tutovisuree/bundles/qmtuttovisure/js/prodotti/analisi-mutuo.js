$(window).on('load', function () {
    if ($("#analisi_mutuo_ordine_cliente_tipoCliente").length || $("#analisi_mutuo_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    $("input[name$='analisi_mutuo_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto({
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersonaTitolo',
                    'datiPersona',
                    'ordine-urgenza',
                    'numeroMutui',
                    'numeroMutuiTitolo',
                    'conti',
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
                    'numeroMutui',
                    'numeroMutuiTitolo',
                    'conti',
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
            'numeroMutui',
            'numeroMutuiTitolo',
            'conti',
            'altroTitolo',
            'altro'
        ],
        'clean': []
    });

    function numeroMutui(value) {
        $('#conti').find('select').val(0);
        Tuttovisure.Ordine.aggiornaParziali();
        switch (value) {
            case '1':
                $('#mutuo1').removeClass('hidden');
                $('#mutuo2').addClass('hidden');
                $('#mutuo3').addClass('hidden');
                $('#mutuo4').addClass('hidden');
                $('#mutuo5').addClass('hidden');
                break;

            case '2':
                $('#mutuo1').removeClass('hidden');
                $('#mutuo2').removeClass('hidden');
                $('#mutuo3').addClass('hidden');
                $('#mutuo4').addClass('hidden');
                $('#mutuo5').addClass('hidden');
                break;

            case '3':
                $('#mutuo1').removeClass('hidden');
                $('#mutuo2').removeClass('hidden');
                $('#mutuo3').removeClass('hidden');
                $('#mutuo4').addClass('hidden');
                $('#mutuo5').addClass('hidden');
                break;

            case '4':
                $('#mutuo1').removeClass('hidden');
                $('#mutuo2').removeClass('hidden');
                $('#mutuo3').removeClass('hidden');
                $('#mutuo4').removeClass('hidden');
                $('#mutuo5').addClass('hidden');
                break;

            case '5':
                $('#mutuo1').removeClass('hidden');
                $('#mutuo2').removeClass('hidden');
                $('#mutuo3').removeClass('hidden');
                $('#mutuo4').removeClass('hidden');
                $('#mutuo5').removeClass('hidden');
                break;

            default:
                $('#mutuo1').addClass('hidden');
                $('#mutuo2').addClass('hidden');
                $('#mutuo3').addClass('hidden');
                $('#mutuo4').addClass('hidden');
                $('#mutuo5').addClass('hidden');
                break;
        }
    }


    $("input[name$='analisi_mutuo_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#analisi_mutuo_ordine_datiProdotto_numeroMutui").change(function () {
        numeroMutui($("#analisi_mutuo_ordine_datiProdotto_numeroMutui").val());
    });

    numeroMutui($("#analisi_mutuo_ordine_datiProdotto_numeroMutui").val());
});


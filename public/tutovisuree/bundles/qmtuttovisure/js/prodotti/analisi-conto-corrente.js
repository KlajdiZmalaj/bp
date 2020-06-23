$(window).on('load', function () {
    if ($("#analisi_conto_corrente_ordine_cliente_tipoCliente").length || $("#analisi_conto_corrente_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    $("input[name$='analisi_conto_corrente_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto({
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersonaTitolo',
                    'datiPersona',
                    'ordine-urgenza',
                    'numeroConti',
                    'numeroContiTitolo',
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
                    'numeroConti',
                    'numeroContiTitolo',
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
            'numeroConti',
            'numeroContiTitolo',
            'conti',
            'altroTitolo',
            'altro'
        ],
        'clean': []
    });

    function numeroConti(value) {
        $('#conti').find('select').val(0);
        Tuttovisure.Ordine.aggiornaParziali();
        switch (value) {
            case '1':
                $('#contoCorrente1').removeClass('hidden');
                $('#contoCorrente2').addClass('hidden');
                $('#contoCorrente3').addClass('hidden');
                $('#contoCorrente4').addClass('hidden');
                $('#contoCorrente5').addClass('hidden');
                break;

            case '2':
                $('#contoCorrente1').removeClass('hidden');
                $('#contoCorrente2').removeClass('hidden');
                $('#contoCorrente3').addClass('hidden');
                $('#contoCorrente4').addClass('hidden');
                $('#contoCorrente5').addClass('hidden');
                break;

            case '3':
                $('#contoCorrente1').removeClass('hidden');
                $('#contoCorrente2').removeClass('hidden');
                $('#contoCorrente3').removeClass('hidden');
                $('#contoCorrente4').addClass('hidden');
                $('#contoCorrente5').addClass('hidden');
                break;

            case '4':
                $('#contoCorrente1').removeClass('hidden');
                $('#contoCorrente2').removeClass('hidden');
                $('#contoCorrente3').removeClass('hidden');
                $('#contoCorrente4').removeClass('hidden');
                $('#contoCorrente5').addClass('hidden');
                break;

            case '5':
                $('#contoCorrente1').removeClass('hidden');
                $('#contoCorrente2').removeClass('hidden');
                $('#contoCorrente3').removeClass('hidden');
                $('#contoCorrente4').removeClass('hidden');
                $('#contoCorrente5').removeClass('hidden');
                break;

            default:
                $('#contoCorrente1').addClass('hidden');
                $('#contoCorrente2').addClass('hidden');
                $('#contoCorrente3').addClass('hidden');
                $('#contoCorrente4').addClass('hidden');
                $('#contoCorrente5').addClass('hidden');
                break;
        }
    }


    $("input[name$='analisi_conto_corrente_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#analisi_conto_corrente_ordine_datiProdotto_numeroConti").change(function () {
        numeroConti($("#analisi_conto_corrente_ordine_datiProdotto_numeroConti").val());
    });

    numeroConti($("#analisi_conto_corrente_ordine_datiProdotto_numeroConti").val());
});


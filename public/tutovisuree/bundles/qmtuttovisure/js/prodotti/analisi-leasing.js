$(window).on('load', function () {
    if ($("#analisi_leasing_ordine_cliente_tipoCliente").length || $("#analisi_leasing_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    $("input[name$='analisi_leasing_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto({
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersonaTitolo',
                    'datiPersona',
                    'ordine-urgenza',
                    'numeroLeasing',
                    'numeroLeasingTitolo',
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
                    'numeroLeasing',
                    'numeroLeasingTitolo',
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
            'numeroLeasing',
            'numeroLeasingTitolo',
            'conti',
            'altroTitolo',
            'altro'
        ],
        'clean': []
    });

    function numeroLeasing(value) {
        $('#conti').find('select').val(0);
        Tuttovisure.Ordine.aggiornaParziali();
        switch (value) {
            case '1':
                $('#leasing1').removeClass('hidden');
                $('#leasing2').addClass('hidden');
                $('#leasing3').addClass('hidden');
                $('#leasing4').addClass('hidden');
                $('#leasing5').addClass('hidden');
                break;

            case '2':
                $('#leasing1').removeClass('hidden');
                $('#leasing2').removeClass('hidden');
                $('#leasing3').addClass('hidden');
                $('#leasing4').addClass('hidden');
                $('#leasing5').addClass('hidden');
                break;

            case '3':
                $('#leasing1').removeClass('hidden');
                $('#leasing2').removeClass('hidden');
                $('#leasing3').removeClass('hidden');
                $('#leasing4').addClass('hidden');
                $('#leasing5').addClass('hidden');
                break;

            case '4':
                $('#leasing1').removeClass('hidden');
                $('#leasing2').removeClass('hidden');
                $('#leasing3').removeClass('hidden');
                $('#leasing4').removeClass('hidden');
                $('#leasing5').addClass('hidden');
                break;

            case '5':
                $('#leasing1').removeClass('hidden');
                $('#leasing2').removeClass('hidden');
                $('#leasing3').removeClass('hidden');
                $('#leasing4').removeClass('hidden');
                $('#leasing5').removeClass('hidden');
                break;

            default:
                $('#leasing1').addClass('hidden');
                $('#leasing2').addClass('hidden');
                $('#leasing3').addClass('hidden');
                $('#leasing4').addClass('hidden');
                $('#leasing5').addClass('hidden');
                break;
        }
    }


    $("input[name$='analisi_leasing_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#analisi_leasing_ordine_datiProdotto_numeroLeasing").change(function () {
        numeroLeasing($("#analisi_leasing_ordine_datiProdotto_numeroLeasing").val());
    });

    numeroLeasing($("#analisi_leasing_ordine_datiProdotto_numeroLeasing").val());
});


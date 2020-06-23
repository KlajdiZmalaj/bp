$(window).on('load', function () {
    if ($("#analisi_conto_anticipi_ordine_cliente_tipoCliente").length || $("#analisi_conto_anticipi_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});

    $("input[name$='analisi_conto_anticipi_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto({
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
                $('#contoAnticipi1').removeClass('hidden');
                $('#contoAnticipi2').addClass('hidden');
                $('#contoAnticipi3').addClass('hidden');
                $('#contoAnticipi4').addClass('hidden');
                $('#contoAnticipi5').addClass('hidden');
                break;

            case '2':
                $('#contoAnticipi1').removeClass('hidden');
                $('#contoAnticipi2').removeClass('hidden');
                $('#contoAnticipi3').addClass('hidden');
                $('#contoAnticipi4').addClass('hidden');
                $('#contoAnticipi5').addClass('hidden');
                break;

            case '3':
                $('#contoAnticipi1').removeClass('hidden');
                $('#contoAnticipi2').removeClass('hidden');
                $('#contoAnticipi3').removeClass('hidden');
                $('#contoAnticipi4').addClass('hidden');
                $('#contoAnticipi5').addClass('hidden');
                break;

            case '4':
                $('#contoAnticipi1').removeClass('hidden');
                $('#contoAnticipi2').removeClass('hidden');
                $('#contoAnticipi3').removeClass('hidden');
                $('#contoAnticipi4').removeClass('hidden');
                $('#contoAnticipi5').addClass('hidden');
                break;

            case '5':
                $('#contoAnticipi1').removeClass('hidden');
                $('#contoAnticipi2').removeClass('hidden');
                $('#contoAnticipi3').removeClass('hidden');
                $('#contoAnticipi4').removeClass('hidden');
                $('#contoAnticipi5').removeClass('hidden');
                break;

            default:
                $('#contoAnticipi1').addClass('hidden');
                $('#contoAnticipi2').addClass('hidden');
                $('#contoAnticipi3').addClass('hidden');
                $('#contoAnticipi4').addClass('hidden');
                $('#contoAnticipi5').addClass('hidden');
                break;
        }
    }


    $("input[name$='analisi_conto_anticipi_ordine[datiProdotto][analisiPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#analisi_conto_anticipi_ordine_datiProdotto_numeroConti").change(function () {
        numeroConti($("#analisi_conto_anticipi_ordine_datiProdotto_numeroConti").val());
    });

    numeroConti($("#analisi_conto_anticipi_ordine_datiProdotto_numeroConti").val());
});


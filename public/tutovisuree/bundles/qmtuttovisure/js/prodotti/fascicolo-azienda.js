$(window).on('load', function() {
    if ($("#fascicolo_azienda_ordine_cliente_tipoCliente").length || $("#fascicolo_azienda_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#tipologia'), {parziali: Tuttovisure.parziali});

    $("#fascicolo_azienda_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#fascicolo_azienda_ordine_datiProdotto_comune");
    });

    $('input[name="fascicolo_azienda_ordine[opzioniProdotto][visuraSu]"]').logicaOpzioniProdotto(
        {
            'valori': {
                'societaDiCapitali': {
                    'mostra': [
                        'datiAzienda',
                        'ordine-urgenza',
                        'altroTitolo',
                        'altro',
                    ],
                    'obbligatori': []
                },
                'societaDiPersone': {
                    'mostra': [
                        'datiAzienda',
                        'ordine-urgenza',
                        'altroTitolo',
                        'altro',
                    ],
                    'obbligatori': []
                }
            },
            'reset': [
                'datiAzienda',
                'ordine-urgenza',
                'altroTitolo',
                'altro',
            ],
            'clean': []
        }
    );

    $('input[name="fascicolo_azienda_ordine[opzioniProdotto][visuraSu]"]').logicaOpzioniProdotto().refreshOpzioni();


    $("input[name$='fascicolo_azienda_ordine[opzioniProdotto][visuraSu]']").change(function () {
        if ($(this).val() === 'societaDiCapitali') {
            $('#altro1').removeClass('hidden');
        }
        if ($(this).val() === 'societaDiPersone') {
            $('#altro1').addClass('hidden');
            $('#altro1').find('input:checkbox').prop('checked', false);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($('#fascicolo_azienda_ordine_opzioniProdotto_visuraSu_0').is(':checked')) {
        $('#altro1').removeClass('hidden');
    }

    if ($('#fascicolo_azienda_ordine_opzioniProdotto_visuraSu_1').is(':checked')) {
        $('#altro1').addClass('hidden');
        $('#altro1').find('input:checkbox').prop('checked', false);
    }

});
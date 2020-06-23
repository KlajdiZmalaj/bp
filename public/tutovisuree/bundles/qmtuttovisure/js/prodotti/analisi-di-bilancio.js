$(window).on('load', function() {
    if ($("#analisi_di_bilancio_ordine_cliente_tipoCliente").length || $("#analisi_di_bilancio_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#analisiBilancio'), {parziali: Tuttovisure.parziali});

    $("input[name$='analisi_di_bilancio_ordine[opzioniProdotto][analisiSu]']").logicaOpzioniProdotto({
        'prefix_form': 'analisi_di_bilancio_ordine_',
        'valori': {
            '2Anni': {
                'mostra': [
                    'datiAzienda',
                    'altro',
                    'altroTitolo',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza',
                    'visuraCamerale'
                ],
                'obbligatori': []
            },
            '3Anni': {
                'mostra': [
                    'datiAzienda',
                    'altro',
                    'altroTitolo',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza',
                    'visuraCamerale'
                ],
                'obbligatori': []
            }
        },
        'reset': [],
        'clean': []
    });

    if ($("#analisi_di_bilancio_ordine_opzioniProdotto_analisiSu_0").is(':checked')) {
        $('#datiAzienda').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#bloccoOrdineUrgenza').removeClass('hidden');
        $('#visuraCamerale').removeClass('hidden');
    }

    if ($("#analisi_di_bilancio_ordine_opzioniProdotto_analisiSu_1").is(':checked')) {
        $('#datiAzienda').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#bloccoOrdineUrgenza').removeClass('hidden');
        $('#visuraCamerale').removeClass('hidden');
    }

    $('#analisi_di_bilancio_ordine_datiProdotto_visuraCamerale').change(function() {
      if ($(this).is(':not(:checked)')) {
          Tuttovisure.Ordine.aggiornaParziali();
      } 
    });
    
    $("#analisi_di_bilancio_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#analisi_di_bilancio_ordine_datiProdotto_comune");
    });
    
    $("input[name$='analisi_di_bilancio_ordine[opzioniProdotto][visuraSu]']").logicaOpzioniProdotto().refreshOpzioni();
    
    $("input[name$='analisi_di_bilancio_ordine[datiProdotto][periodo]']").logicaOpzioniProdotto().refreshOpzioni();

});


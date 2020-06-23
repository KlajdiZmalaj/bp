$(window).on('load', function() {
    if ($("#bilancio_aziendale_ordine_cliente_tipoCliente").length || $("#bilancio_aziendale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#analisiBilancio'), {parziali: Tuttovisure.parziali});

    $("input[name$='bilancio_aziendale_ordine[opzioniProdotto][visuraSu]']").logicaOpzioniProdotto( {
        'prefix_form': 'bilancio_aziendale_ordine_',
        'valori': {
            'bilancioEsercizio': {
                'mostra': [
                    'bilancioEsercizio',
                    'datiAzienda',
                    'altro',
                    'altroTitolo',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza',
                    'visuraCamerale'
                ],
                'obbligatori': [

                ]
            },
            'analisiBilancio': {
                'mostra': [
                    'analisiBilancio',
                    'datiAzienda',
                    'altro',
                    'altroTitolo',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza',
                    'visuraCamerale'
                ],
                 'obbligatori': [
                    'analisiBilancio'
                ]
            }
        },
        'reset': [
            'bilancioEsercizio',
            'analisiBilancio',
            'datiAzienda',
            'altro',
            'altroTitolo',
            'ordine-urgenza',
            'bloccoOrdineUrgenza'
        ],
        'clean': [

        ]
    });
    
    $("input[name$='bilancio_aziendale_ordine[datiProdotto][periodo]']").logicaOpzioniProdotto( {
        'prefix_form': 'bilancio_aziendale_ordine_',
        'valori': {
            'storico': {
                'mostra': [
                    'anno'
                ],
                'obbligatori': [
                    'anno'
                ]
            }
        },
        'reset': [
            'anno'
        ],
        'clean': [
        ]
    });
    
    $('#bilancio_aziendale_ordine_datiProdotto_visuraCamerale').change(function() {
      if ($(this).is(':not(:checked)')) {
          Tuttovisure.Ordine.aggiornaParziali();
      } 
    });
    
    $("#bilancio_aziendale_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#bilancio_aziendale_ordine_datiProdotto_comune");
    });
    
    $("input[name$='bilancio_aziendale_ordine[opzioniProdotto][visuraSu]']").logicaOpzioniProdotto().refreshOpzioni();
    
    $("input[name$='bilancio_aziendale_ordine[datiProdotto][periodo]']").logicaOpzioniProdotto().refreshOpzioni();
});


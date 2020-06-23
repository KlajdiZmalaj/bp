$(window).on('load', function() {
    if ($("#estratto_di_mappa_ordine_cliente_tipoCliente").length || $("#estratto_di_mappa_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#foglio'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#mappeLimitrofe'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#indirizzoImponibile'), {parziali: Tuttovisure.parziali});
    
    $("#estratto_di_mappa_ordine_opzioniProdotto_interoFoglio").logicaOpzioniProdotto( {
        'valori': {
            '1': {
                'mostra': [
                   'foglio'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [
            'formato',
            'particella',
            'sezione'
        ],
        'clean': [
        ]
    });
    
    $("#estratto_di_mappa_ordine_opzioniProdotto_mappeLimitrofe").logicaOpzioniProdotto( {
        'valori': {
            '1': {
                'mostra': [
                   'mappeLimitrofe'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [
        ],
        'clean': [
        ]
    });
    
    $('#estratto_di_mappa_ordine_opzioniProdotto_altro_1').on('checked').logicaOpzioniProdotto(
      {
        'valori': {
            'visuraIpoteche': {
                'mostra': [
                    'datiConservatorie'
                ],
                'obbligatori': [
                    'datiConservatorie'
                ]
            }
        },
        'reset': [
            'datiConservatorie'
        ],
        'clean': [
        ]
      }
    );

    $("#estratto_di_mappa_ordine_opzioniProdotto_altro_1").change(function() {
        if(!$(this).is(':checked')) {
            $('#datiConservatorie').find('select').val(0);
        }
    });
    
    $("#estratto_di_mappa_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#estratto_di_mappa_ordine_datiProdotto_comune");
        $('#datiCatastali').removeClass('hidden');
        $('#bloccoOpzioniDati').removeClass('hidden');
        $('#formato').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#altro').removeClass('hidden');
    });

    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#datiCatastali').removeClass('hidden');
        $('#bloccoOpzioniDati').removeClass('hidden');
        $('#formato').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#altro').removeClass('hidden');
    }
    
    $("#estratto_di_mappa_ordine_opzioniProdotto_interoFoglio").logicaOpzioniProdotto().refreshOpzioni();
    
    $("#estratto_di_mappa_ordine_opzioniProdotto_mappeLimitrofe").logicaOpzioniProdotto().refreshOpzioni();
    
    $('#estratto_di_mappa_ordine_opzioniProdotto_altro_1').logicaOpzioniProdotto().refreshOpzioni();
    
});
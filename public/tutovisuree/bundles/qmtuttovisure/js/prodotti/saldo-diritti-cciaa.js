$(window).on('load', function() {
    if ($("#saldo_diritti_cciaa_ordine_cliente_tipoCliente").length || $("#saldo_diritti_cciaa_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });
    
    $('input[name="saldo_diritti_cciaa_ordine[datiProdotto][visuraSu]"]').logicaOpzioniProdotto(
      {
        'prefix_form': 'saldo_diritti_cciaa_ordine_',
        'valori': {
            'societaDiCapitali': {
                'mostra': [
                    'societaTitolo',
                    'datiAzienda',
                    'ordine-urgenza',
                    'altro',
                    'provinciaComune'
                ],
                'obbligatori': [

                ]
            },
            'societaDiPersone': {
                'mostra': [
                    'societaTitolo',
                    'datiAzienda',
                    'ordine-urgenza',
                    'altro',
                    'provinciaComune'
                ],
                 'obbligatori': [

                ]
            },
            'impresaIndividuale': {
                'mostra': [
                    'individualeTitolo',
                    'datiPersona',
                    'ordine-urgenza',
                    'altro',
                    'provinciaComune'
                ],
                 'obbligatori': [

                ]
            }
        },
        'reset': [
            'societaTitolo',
            'individualeTitolo',
            'datiAzienda',
            'datiPersona',
            'altro',
            'ordine-urgenza',
            'provinciaComune'
        ],
        'clean': [
        ]
      }
    );
    


    $("#saldo_diritti_cciaa_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#saldo_diritti_cciaa_ordine_datiProdotto_comune");
    });
    
    $('input[name="saldo_diritti_cciaa_ordine[datiProdotto][visuraSu]"]').logicaOpzioniProdotto().refreshOpzioni();
       
});


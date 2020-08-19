$(window).on('load', function() {
    if ($("#partecipazioni_in_societa_ordine_cliente_tipoCliente").length || $("#partecipazioni_in_societa_ordine_tipoCheckOut").length) {
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

    $('input[name="partecipazioni_in_societa_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
      {
        'prefix_form': 'partecipazioni_in_societa_ordine_',
        'valori': {
            'persona': {
                'mostra': [
                    'personaTitolo',
                    'datiPersona',
                    'provinciaComune',
                    'altro',
                    'altroTitolo',
                    'altro0',
                    'altro2',
                    'ordine-urgenza'
                ],
                'obbligatori': [

                ]
            },
            'azienda': {
                'mostra': [
                    'aziendaTitolo',
                    'datiAzienda',
                    'altro',
                    'altroTitolo',
                    'altro0',
                    'altro1',
                    'ordine-urgenza'
                ],
                 'obbligatori': [

                ]
            }
        },
        'reset': [
            'personaTitolo',
            'datiPersona',
            'aziendaTitolo',
            'datiAzienda',
            'provinciaComune',
            'altro',
            'altroTitolo',
            'altro0',
            'altro1',
            'altro2',
            'ordine-urgenza'
        ],
        'clean': [
        ]
      }
    );


    $("#partecipazioni_in_societa_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#partecipazioni_in_societa_ordine_datiProdotto_comune");
    });

    $('input[name="partecipazioni_in_societa_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

});


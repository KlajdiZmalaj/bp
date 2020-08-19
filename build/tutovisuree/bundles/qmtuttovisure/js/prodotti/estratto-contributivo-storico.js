$(window).on('load', function() {
    if ($("#estratto_contributivo_storico_ordine_cliente_tipoCliente").length || $("#estratto_contributivo_storico_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#cud'), {parziali: Tuttovisure.parziali});

    $('input[name="estratto_contributivo_storico_ordine[datiProdotto][tipo]"]').logicaOpzioniProdotto(
        {
            'valori': {
                'altro': {
                    'mostra': [
                        'specificare',
                        'datiPersona',
                        'provinciaComune',
                        'ordine-urgenza',
                        'altro'
                    ]
                },
                'inps': {
                    'mostra': [
                        'datiPersona',
                        'provinciaComune',
                        'ordine-urgenza',
                        'altro'
                    ]
                },
                'inpdap': {
                    'mostra': [
                        'datiPersona',
                        'provinciaComune',
                        'ordine-urgenza',
                        'altro'
                    ]
                },
            },
            'reset': [
                'specificare',
                'provinciaComune',
                'datiPersona',
                'ordine-urgenza',
                'altro'
            ]
        }
    );

    $('input[name="estratto_contributivo_storico_ordine[datiProdotto][tipo]"]').logicaOpzioniProdotto().refreshOpzioni();


    $("#estratto_contributivo_storico_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#estratto_contributivo_storico_ordine_datiProdotto_comune");
    });


});
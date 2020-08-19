$(window).on('load', function () {
    if ($("#visura_camerale_ordine_cliente_tipoCliente").length || $("#visura_camerale_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    $('#richiediOra').click(function () {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        return false;
    });

    $('input[name="visura_camerale_ordine[opzioniProdotto][visuraSu]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'visura_camerale_ordine_',
            'valori': {
                'societaDiCapitali': {
                    'mostra': [
                        'societaTitolo',
                        'datiAzienda',
                        'ordine-urgenza',
                        'altro',
                        'altro1',
                        'altro2'
                    ],
                    'obbligatori': []
                },
                'societaDiPersone': {
                    'mostra': [
                        'societaTitolo',
                        'datiAzienda',
                        'ordine-urgenza',
                        'altro',
                        'altro1',
                        'altro2'
                    ],
                    'obbligatori': []
                },
                'impresaIndividuale': {
                    'mostra': [
                        'individualeTitolo',
                        'ordine-urgenza',
                        'datiPersona',
                        'altro'
                    ],
                    'obbligatori': []
                }
            },
            'reset': [
                'societaTitolo',
                'individualeTitolo',
                'ordine-urgenza',
                'datiAzienda',
                'datiPersona',
                'altro',
                'altro1',
                'altro2',
                'tipoDiBilancio'
            ],
            'clean': []
        }
    );


    $("#visura_camerale_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#visura_camerale_ordine_datiProdotto_comune");
    });

    $('input[name="visura_camerale_ordine[opzioniProdotto][tipoDiVisura]"]').logicaOpzioniProdotto().refreshOpzioni();

    $('input[name="visura_camerale_ordine[opzioniProdotto][visuraSu]"]').logicaOpzioniProdotto().refreshOpzioni();

});


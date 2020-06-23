$(window).on('load', function() {
    if ($("#visura_cattivo_pagatore_ordine_cliente_tipoCliente").length || $("#visura_cattivo_pagatore_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#bancaItalia'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#cai'), {parziali: Tuttovisure.parziali});
    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('input[name="visura_cattivo_pagatore_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'visura_cattivo_pagatore_ordine_',
            'valori': {
                'azienda': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'provinciaComune',
                        'ordine-urgenza',
                        'indirizzo',
                        'contatti',
                        'bancaItalia',
                        'cai'
                    ],
                    'obbligatori': [

                    ]
                },
                'persona': {
                    'mostra': [
                        'personaTitolo',
                        'datiPersona',
                        'provinciaComune',
                        'ordine-urgenza',
                        'indirizzo',
                        'contatti',
                        'bancaItalia',
                        'cai'
                    ],
                    'obbligatori': [

                    ]
                }
            },
            'reset': [
                'personaTitolo',
                'aziendaTitolo',
                'datiAzienda',
                'datiPersona',
                'provinciaComune',
                'ordine-urgenza',
                'indirizzo',
                'contatti',
                'bancaItalia',
                'cai'
            ],
            'clean': [
            ]
        }
    );

    $("input[name$='visura_cattivo_pagatore_ordine[datiProdotto][visuraPer]']").change(function() {
        if ($(this).val() === 'persona') {
            $('#provinciaComune').find('span').text('di residenza:');
            $('#indirizzo').find('span').text('di residenza:');
        }
        if ($(this).val() === 'azienda') {
            $('#provinciaComune').find('span').text('sede legale:');
            $('#indirizzo').find('span').text('sede legale:');
        }
    });

    if ($("#visura_cattivo_pagatore_ordine_datiProdotto_visuraPer_0").is(':checked')) {
        $('#provinciaComune').find('span').text('di residenza:');
        $('#indirizzo').find('span').text('di residenza:');
    }

    if ($("#visura_cattivo_pagatore_ordine_datiProdotto_visuraPer_1").is(':checked')) {
        $('#provinciaComune').find('span').text('sede legale:');
        $('#indirizzo').find('span').text('sede legale:');
    }


    $("#visura_cattivo_pagatore_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#visura_cattivo_pagatore_ordine_datiProdotto_comune");
    });

    $('input[name="visura_cattivo_pagatore_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

});


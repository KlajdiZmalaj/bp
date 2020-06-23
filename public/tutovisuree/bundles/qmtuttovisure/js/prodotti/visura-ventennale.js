$(window).on('load', function () {
    if ($("#visura_ventennale_ordine_cliente_tipoCliente").length || $("#visura_ventennale_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    $('input[name="visura_ventennale_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'visura_ventennale_ordine_',
            'valori': {
                'personaFisica': {
                    'mostra': [
                        'personaFisicaTitolo',
                        'datiPersona',
                        'datiConservatorie',
                        'ordine-urgenza'
                    ],
                    'obbligatori': [
                        'datiConservatorie'
                    ]
                },
                'azienda': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'provinciaComune',
                        'datiConservatorie',
                        'ordine-urgenza'
                    ],
                    'obbligatori': [
                        'datiConservatorie'
                    ]
                },
                'immobile': {
                    'mostra': [
                        'immobileTitolo',
                        'datiImmobile',
                        'provinciaComune',
                        'datiConservatorie',
                        'ordine-urgenza',
                        'tipoImmobile'
                    ],
                    'obbligatori': [
                        'datiConservatorie',
                        'tipoImmobile'
                    ]
                }
            },
            'reset': [
                'aziendaTitolo',
                'personaFisicaTitolo',
                'immobileTitolo',
                'datiPersona',
                'datiAzienda',
                'tipoImmobile',
                'provinciaComune',
                'datiImmobile',
                'datiConservatorie',
                'ordine-urgenza'
            ]
        }
    );

    $("#visura_ventennale_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#visura_ventennale_ordine_datiProdotto_comune");
    });

    $('input[name="visura_ventennale_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto().refreshOpzioni();
});
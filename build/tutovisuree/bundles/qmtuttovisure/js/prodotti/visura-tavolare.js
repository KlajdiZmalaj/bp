$(window).on('load', function () {
    if ($("#visura_tavolare_ordine_cliente_tipoCliente").length || $("#visura_tavolare_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#scegliServizio'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#utilizzaDati'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $('input[name="visura_tavolare_ordine[opzioniProdotto][utilizzaDati]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'visura_tavolare_ordine_',
            'valori': {
                'personaProprietaria': {
                    'mostra': [
                        'personaTitolo',
                        'datiPersona',
                        'ordine-urgenza',
                        'ricercaSu',
                        'altro',
                        'altroTitolo',
                    ],
                    'obbligatori': [
                        'ricercaSu',
                    ]
                },
                'aziendaIntestataria': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'ordine-urgenza',
                        'ricercaSu',
                        'altro',
                        'altroTitolo',
                    ],
                    'obbligatori': [
                        'ricercaSu',
                    ]
                },
                'immobile': {
                    'mostra': [
                        'tipoDiImmobile',
                        'immobile',
                        'ordine-urgenza',
                        'ricercaSu',
                        'altro',
                        'altroTitolo',
                    ],
                    'obbligatori': [
                        'tipoDiImmobile',
                        'ricercaSu'
                    ]
                },
                'indirizzo': {
                    'mostra': [
                        'indirizzo',
                        'indirizzoTitolo',
                        'ordine-urgenza',
                        'ricercaSu',
                        'altroTitolo',
                        'altro'
                    ],
                    'obbligatori': [
                        'ricercaSu',
                    ]
                }
            },
            'reset': [
                'aziendaTitolo',
                'personaTitolo',
                //'particella',
                //'partitaTavolare',
                'datiPersona',
                'datiAzienda',
                'ordine-urgenza',
                'indirizzo',
                'indirizzoTitolo',
                //'particella',
                //'datiParticelle',
                //'terreno',
                // 'fabbricato',
                'tipoDiImmobile',
                'immobile',
                'altroTitolo',
                'altro',
                'ricercaSu',

            ],
            'clean': []
        }
    );

    $('input[name="visura_tavolare_ordine[datiProdotto][tipoDiImmobile]"]').logicaOpzioniProdotto(
        {
            'valori': {
                'fabbricati': {
                    'mostra': [
                        'immobileTitolo',
                        'fabbricato',
                        'particella'
                    ]
                },
                'terreni': {
                    'mostra': [
                        'immobileTitolo',
                        'terreno'
                    ],
                    'obbligatori': [
                        'datiRicerca',
                    ]
                }
            },
            'reset': [
                'immobileTitolo',
                'fabbricato',
                'terreno',
                'particella'
            ],
            'clean': []
        }
    );

    $('input[name="visura_tavolare_ordine[datiProdotto][datiRicerca]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'visura_tavolare_ordine_',
            'valori': {
                'particelle': {
                    'mostra': [
                        'datiParticelle',
                        'particella'
                    ]
                },
                'partita_tavolare': {
                    'mostra': [
                        'partitaTavolare'
                    ]
                }
            },
            'reset': [
                'datiParticelle',
                'partitaTavolare'
            ]
        }
    );

    $("input[name$='visura_tavolare_ordine[datiProdotto][ricercaSu]']").change(function () {
        Tuttovisure.provinciaComune($(this), "#visura_tavolare_ordine_datiProdotto_comune");

        if($("#visura_tavolare_ordine_datiProdotto_ricercaSu_1").is(':checked')) {
            $('#lingua').removeClass('hidden');
            $('#visura_tavolare_ordine_datiProdotto_visuraInLingua_0').prop('checked', true);
        } else {
            $('#lingua').addClass('hidden');
            $('#lingua').find('input:radio').prop('checked', false);
        }
    });

    $('input[name="visura_tavolare_ordine[opzioniProdotto][utilizzaDati]"]').change(function () {
        $('input[name="visura_tavolare_ordine[datiProdotto][tipoDiImmobile]"]').logicaOpzioniProdotto().refreshOpzioni();
        $('input[name="visura_tavolare_ordine[datiProdotto][datiRicerca]"]').logicaOpzioniProdotto().refreshOpzioni();
    });

    $('input[name="visura_tavolare_ordine[datiProdotto][tipoDiImmobile]"]').change(function () {
        $('input[name="visura_tavolare_ordine[datiProdotto][datiRicerca]"]').logicaOpzioniProdotto().refreshOpzioni();
    });

    $('input[name="visura_tavolare_ordine[datiProdotto][datiRicerca]"]').change(function () {
        if ($(this).val() == 'partita_tavolare') {
            $('#particella').addClass('hidden');
            $('#particella').find('input:text').val('');
        }
    });


    if ($('#visura_tavolare_ordine_datiProdotto_tipoDiImmobile_0').is(':checked')) {
        $('#immobileTitolo').removeClass('hidden');
        $('#fabbricato').removeClass('hidden');
        $('#particella').removeClass('hidden');

    }

    if ($('#visura_tavolare_ordine_datiProdotto_tipoDiImmobile_1').is(':checked')) {
        $('#immobileTitolo').removeClass('hidden');
        $('#terreno').removeClass('hidden');
    }


    if ($('#visura_tavolare_ordine_datiProdotto_datiRicerca_1').is(':checked')) {
        $('#particella').addClass('hidden');
        $('#particella').find('input:text').val('');
    }

    if (!$('#lingua').find('input:radio').is(':checked') || $("#visura_tavolare_ordine_datiProdotto_ricercaSu_1").is('checked')) {
        $('#visura_tavolare_ordine_datiProdotto_visuraInLingua_0').prop('checked', true);
    }

    $('input[name="visura_tavolare_ordine[opzioniProdotto][utilizzaDati]"]').logicaOpzioniProdotto().refreshOpzioni();

    $('input[name="visura_tavolare_ordine[datiProdotto][datiRicerca]"]').logicaOpzioniProdotto().refreshOpzioni();

    $('input[name="visura_tavolare_ordine[datiiProdotto][tipoDiImmobile]"]').logicaOpzioniProdotto().refreshOpzioni();
});
$(window).on('load', function() {
    if ($("#visura_bollo_veicolo_ordine_cliente_tipoCliente").length || $("#visura_bollo_veicolo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){

    $("input[name$='visura_bollo_veicolo_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto( {
        'prefix_form': 'visura_bollo_veicolo_ordine_',
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersona',
                    'personaTitolo',
                    'provinciaComune',
                    'indirizzo',
                    'ordine-urgenza',
                    'tipoVeicolo',
                    'datiVeicolo',
                    'attualeProprietario',
                    'targa'
                ],
                'obbligatori': [

                ]
            },
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'aziendaTitolo',
                    'provinciaComune',
                    'indirizzo',
                    'ordine-urgenza',
                    'tipoVeicolo',
                    'datiVeicolo',
                    'attualeProprietario',
                    'targa'
                ],
                'obbligatori': [

                ]
            }
        },
        'reset': [
            'datiPersona',
            'personaTitolo',
            'datiAzienda',
            'aziendaTitolo',
            'provinciaComune',
            'indirizzo',
            'ordine-urgenza',
            'tipoVeicolo',
            'datiVeicolo',
            'attualeProprietario',
            'targa'
        ],
        'clean': [

        ]
    });

    $("input[name$='visura_bollo_veicolo_ordine[datiProdotto][attualeProprietario]']").logicaOpzioniProdotto( {
        'valori': {
            'no' : {
                'mostra': [
                    'proprietarioData'
                ],
                'obbligatori': [
                    'proprietarioData'
                ]
            }
        },
        'reset': [
            'proprietarioData'
        ],
        'clean': [

        ]
    });

    $("input[name$='visura_bollo_veicolo_ordine[datiProdotto][visuraPer]']").change(function() {
        if ($(this).val() === 'persona') {
            $('#provinciaComune').find('span').text('di residenza:');
            $('#indirizzo').find('span').text('di residenza:');
        }
        if ($(this).val() === 'azienda') {
            $('#provinciaComune').find('span').text('sede legale:');
            $('#indirizzo').find('span').text('sede legale:');
        }
    });

    if ($("#visura_bollo_veicolo_ordine_datiProdotto_visuraPer_0").is(':checked')) {
        $('#provinciaComune').find('span').text('di residenza:');
        $('#indirizzo').find('span').text('di residenza:');
    }

    if ($("#visura_bollo_veicolo_ordine_datiProdotto_visuraPer_1").is(':checked')) {
        $('#provinciaComune').find('span').text('sede legale:');
        $('#indirizzo').find('span').text('sede legale:');
    }

    $("#visura_bollo_veicolo_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#visura_bollo_veicolo_ordine_datiProdotto_comune");
    });

    $("#visura_bollo_veicolo_ordine_datiProdotto_attualeProprietario").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visura_bollo_veicolo_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visura_bollo_veicolo_ordine[datiProdotto][attualeProprietario]']").logicaOpzioniProdotto().refreshOpzioni();


});


$(window).on('load', function() {
    if ($("#perdita_possesso_veicolo_ordine_cliente_tipoCliente").length || $("#perdita_possesso_veicolo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    $("input[name$='perdita_possesso_veicolo_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto( {
        'prefix_form': 'perdita_possesso_veicolo_ordine_',
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersona',
                    'personaTitolo',
                    'provinciaComune',
                    'indirizzo',
                    'ordine-urgenza',
                    'tipoVeicolo',
                    'targa',
                    'ritiro',
                    'certificatoTitolo',
                    'certificato',
                    'altro',
                    'perditaPossesso',
                    'veicoloTitolo',
                    'datiVeicolo'
                ],
                'obbligatori': [
                    'certificato'
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
                    'targa',
                    'ritiro',
                    'certificatoTitolo',
                    'certificato',
                    'altro',
                    'perditaPossesso',
                    'veicoloTitolo',
                    'datiVeicolo'
                ],
                'obbligatori': [
                    'certificato'
                ]
            }
        },
        'reset': [
            'certificatoTitolo',
            'certificato',
            'datiPersona',
            'personaTitolo',
            'datiAzienda',
            'aziendaTitolo',
            'provinciaComune',
            'indirizzo',
            'ordine-urgenza',
            'tipoVeicolo',
            'targa',
            'ritiro',
            'altro',
            'perditaPossesso',
            'veicoloTitolo',
            'datiVeicolo'
        ],
        'clean': [

        ]
    });

    $("input[name$='perdita_possesso_veicolo_ordine[datiProdotto][visuraPer]']").change(function() {
        if ($(this).val() === 'persona') {
            $('#provinciaComune').find('span').text('di residenza:');
            $('#indirizzo').find('span').text('di residenza:');
        }
        if ($(this).val() === 'azienda') {
            $('#provinciaComune').find('span').text('sede legale:');
            $('#indirizzo').find('span').text('sede legale:');
        }
    });

    if ($("#perdita_possesso_veicolo_ordine_datiProdotto_visuraPer_0").is(':checked')) {
        $('#provinciaComune').find('span').text('di residenza:');
        $('#indirizzo').find('span').text('di residenza:');
    }

    if ($("#perdita_possesso_veicolo_ordine_datiProdotto_visuraPer_1").is(':checked')) {
        $('#provinciaComune').find('span').text('sede legale:');
        $('#indirizzo').find('span').text('sede legale:');
    }

    $("#perdita_possesso_veicolo_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#perdita_possesso_veicolo_ordine_datiProdotto_comune");
    });

    $("#perdita_possesso_veicolo_ordine_datiProdotto_provinciaRitiro").change(function() {
        Tuttovisure.provinciaComune($(this), "#perdita_possesso_veicolo_ordine_datiProdotto_comuneRitiro");
    });

    $("#perdita_possesso_veicolo_ordine_datiProdotto_provinciaRitiro").val(0);


    $("input[name$='perdita_possesso_veicolo_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();


});


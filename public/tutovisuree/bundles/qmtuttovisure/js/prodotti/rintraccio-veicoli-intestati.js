$(window).on('load', function () {
    if ($("#rintraccio_veicoli_intestati_ordine_cliente_tipoCliente").length || $("#rintraccio_veicoli_intestati_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function () {
    $('#richiediOra').click(function () {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        return false;
    });

    $('input[name="rintraccio_veicoli_intestati_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'rintraccio_veicoli_intestati_ordine_',
            'valori': {
                'aziendaPersonaGiuridica': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'provinciaComune',
                        'ordine-urgenza'
                    ],
                    'obbligatori': []
                },
                'personaFisica': {
                    'mostra': [
                        'personaTitolo',
                        'datiPersona',
                        'ordine-urgenza'
                    ],
                    'obbligatori': []
                }
            },
            'reset': [
                'personaTitolo',
                'aziendaTitolo',
                'datiAzienda',
                'datiPersona',
                'provinciaComune',
                'ordine-urgenza'
            ],
            'clean': []
        }
    );


    $("#rintraccio_veicoli_intestati_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#rintraccio_veicoli_intestati_ordine_datiProdotto_comune");
    });

    $('input[name="rintraccio_veicoli_intestati_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

});


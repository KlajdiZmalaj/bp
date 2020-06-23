$(window).on('load', function () {
    if ($("#ispezione_nazionale_conservatoria_ordine_cliente_tipoCliente").length || $("#ispezione_nazionale_conservatoria_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    $('input[name="ispezione_nazionale_conservatoria_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'ispezione_nazionale_conservatoria_ordine_',
            'valori': {
                'personaFisica': {
                    'mostra': [
                        'personaFisicaTitolo',
                        'datiPersona',
                        'ordine-urgenza'
                    ]
                },
                'azienda': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'provinciaComune',
                        'ordine-urgenza'
                    ]
                }
            },
            'reset': [
                'aziendaTitolo',
                'personaFisicaTitolo',
                'datiPersona',
                'datiAzienda',
                'provinciaComune',
                'ordine-urgenza'
            ]
        }
    );

    $("#ispezione_nazionale_conservatoria_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#ispezione_nazionale_conservatoria_ordine_datiProdotto_comune");
    });

    $('input[name="ispezione_nazionale_conservatoria_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto().refreshOpzioni();
});
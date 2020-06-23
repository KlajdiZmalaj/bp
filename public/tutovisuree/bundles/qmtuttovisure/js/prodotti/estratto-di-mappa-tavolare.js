$(window).on('load', function () {
    if ($("#estratto_di_mappa_tavolare_ordine_cliente_tipoCliente").length || $("#estratto_di_mappa_tavolare_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {

    $('input[name="estratto_di_mappa_tavolare_ordine[opzioniProdotto][tipologia]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'estratto_di_mappa_tavolare_ordine_',
            'valori': {
                'estrattoDiMappa': {
                    'mostra': [
                        'estrattoMappa'
                    ]
                },
                'mappaInDxf': {
                    'mostra': [
                        'dxf'
                    ]
                }
            },
            'reset': [
                'estrattoMappa',
                'dxf'
            ]
        }
    );


    $("input[name$='estratto_di_mappa_tavolare_ordine[datiProdotto][ricercaSu]']").change(function () {
        Tuttovisure.provinciaComune($(this), "#estratto_di_mappa_tavolare_ordine_datiProdotto_comune");
        $('#estratto').removeClass('hidden');

        if($("#estratto_di_mappa_tavolare_ordine_datiProdotto_ricercaSu_1").is(':checked')) {
            $('#lingua').removeClass('hidden');
            $('#estratto_di_mappa_tavolare_ordine_datiProdotto_visuraInLingua_0').prop('checked', true);
        } else {
            $('#lingua').addClass('hidden');
            $('#lingua').find('input:radio').prop('checked', false);
        }

    });


    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#estratto').removeClass('hidden');
    }

    if (!$('#lingua').find('input:radio').is(':checked') || $("#estratto_di_mappa_tavolare_ordine_datiProdotto_ricercaSu_1").is('checked')) {
        $('#estratto_di_mappa_tavolare_ordine_datiProdotto_visuraInLingua_0').prop('checked', true);
    }


    $('input[name="estratto_di_mappa_tavolare_ordine[opzioniProdotto][tipologia]"]').logicaOpzioniProdotto().refreshOpzioni();

});
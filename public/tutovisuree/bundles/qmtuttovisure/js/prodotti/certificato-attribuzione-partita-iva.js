$(window).on('load', function () {
    if ($("#certificato_attribuzione_partita_iva_ordine_cliente_tipoCliente").length || $("#certificato_attribuzione_partita_iva_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $("input[name$='certificato_attribuzione_partita_iva_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto({
        'prefix_form': 'visura_catastale_ordine_',
        'valori': {
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'provinciaComune',
                    'ordine-urgenza',
                    'opzioniSpedizione',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': [
                ]
            },
            'impresaIndividuale': {
                'mostra': [
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza',
                    'opzioniSpedizione',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': [
                ]
            },
            'associazioni': {
                'mostra': [
                    'datiAzienda',
                    'provinciaComune',
                    'ordine-urgenza',
                    'opzioniSpedizione',
                    'altroTitolo',
                    'altro'
                ],
                'obbligatori': [
                ]
            }
        },
        'reset': [
            'datiAzienda',
            'datiPersona'
        ],
        'clean': []
    });

    $("#certificato_attribuzione_partita_iva_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#certificato_attribuzione_partita_iva_ordine_datiProdotto_comune");
    });

    $("input[name$='certificato_attribuzione_partita_iva_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='certificato_attribuzione_partita_iva_ordine[spedizione][spedizione_nazionale]']").change(function () {
        if ($(this).val() == "internazionale") {
            $('.spedizione_internazionale').removeClass('hidden');
            $('.spedizione_internazionale').children('.form-control').removeClass('hidden');
            $('.spedizione_internazionale').find('input:radio').prop('required', true);
        } else {
            $('.spedizione_internazionale').addClass('hidden');
            $('.spedizione_internazionale').children('.form-control').addClass('hidden');
            $('.spedizione_internazionale').find('input:radio').prop('required', false);
            $('.spedizione_internazionale').find('select').val('');

        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#certificato_attribuzione_partita_iva_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
        $('.spedizione_internazionale').removeClass('hidden');
        $('.spedizione_internazionale').children('.form-control').removeClass('hidden');
        $('.spedizione_internazionale').find('input:radio').prop('required', true);
    } else {
        $('.spedizione_internazionale').addClass('hidden');
        $('.spedizione_internazionale').children('.form-control').addClass('hidden');
        $('.spedizione_internazionale').find('input:radio').prop('required', false);
        $('.spedizione_internazionale').find('select').val('');
    }

    });


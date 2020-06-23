
$(window).on('load', function () {
    if ($("#visure_aci_pra_ordine_cliente_tipoCliente").length || $("#visure_aci_pra_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#immatricolazione'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#scegliUrgenza'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#infoUrgenza'), {parziali: Tuttovisure.parziali});

    if ($('#visure_aci_pra_ordine_datiProdotto_tipoDiVeicolo').val() !== "") {
        $("table[name$='prezzoBase']").addClass("hidden");
        $("table[name$='riepilogo']").removeClass("hidden");
    }

    $('button[name="richiediTarga"]').click(function () {
        $('#visure_aci_pra_ordine_opzioniProdotto_scegli_0').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
    });

    $('button[name="richiediProprietari"]').click(function () {
        $('#visure_aci_pra_ordine_opzioniProdotto_scegli_1').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
    });

    $('button[name="richiediCronologico"]').click(function () {
        $('#visure_aci_pra_ordine_opzioniProdotto_scegli_2').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
    });



    $("input[name$='visure_aci_pra_ordine[opzioniProdotto][scegli]']").logicaOpzioniProdotto({
        'valori': {
            'visuraTarga': {
                'mostra': [
                    'immatricolazione',
                    'datiVeicolo',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza',
                    'scegliUrgenza'
                ],
                'obbligatori': []
            },
            'visuraProprietari': {
                'mostra': [
                    'datiVeicolo',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza',
                    'scegliUrgenza'
                ],
                'obbligatori': []
            },
            'certificatoCronologico': {
                'mostra': [
                    'datiVeicolo',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'immatricolazione',
            'bloccoOrdineUrgenza',
            'ordine-urgenza'
        ],
        'clean': []
    });


    $("input[name$='visure_aci_pra_ordine[opzioniProdotto][scegli]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visure_aci_pra_ordine[opzioniProdotto][scegli]']").change(function () {
        if ($(this).val() == "certificatoCronologico") {
            $('#opzioniSpedizione').removeClass('hidden');
            $('#opzioniSpedizione').find('input:radio').prop('required', true);
            $('#bloccoOrdineUrgenza').addClass('hidden');
        } else {
            if (!$('#visure_aci_pra_ordine_opzioniProdotto_immatricolataPrimaDel1993').is(':checked')) {
                $('#scegliUrgenza').removeClass('hidden');
                $('#bloccoOrdineUrgenza').removeClass('hidden');
                $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);

            }
            $('#opzioniSpedizione').addClass('hidden');
            $('#opzioniSpedizione').find('input:radio').prop('checked', false);
            $('#opzioniSpedizione').find('input:radio').prop('required', false);
            $('#opzioniSpedizione').find('select').val('');
            $('#opzioniSpedizione').find('select').addClass('hidden');
            $('#opzioniSpedizione').find('select').prop('required', false);
            $('#opzioniSpedizione').find('.row').removeClass('alert-form alert-danger-form');
            $('#opzioniSpedizione').find('.alert-message').remove();

        }
        Tuttovisure.Ordine.aggiornaParziali();
    });


    $("#visure_aci_pra_ordine_opzioniProdotto_immatricolataPrimaDel1993").change(function () {
        if ($(this).is(':checked')) {
            $('#scegliUrgenza').addClass('hidden');
            $('#bloccoOrdineUrgenza').addClass('hidden');
        } else {
            $('#scegliUrgenza').removeClass('hidden');
            $('#bloccoOrdineUrgenza').removeClass('hidden');
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#visure_aci_pra_ordine_opzioniProdotto_immatricolataPrimaDel1993").is(':checked')) {
        $('#scegliUrgenza').addClass('hidden');
        $('#bloccoOrdineUrgenza').addClass('hidden');
    }


    if ($("#visure_aci_pra_ordine_opzioniProdotto_scegli_2").is(':checked')) {
        $('#opzioniSpedizione').removeClass('hidden');
        $('#opzioniSpedizione').find('input:radio').prop('required', true);
    } else {
        $('#opzioniSpedizione').addClass('hidden');
        $('#opzioniSpedizione').find('input:radio').prop('checked', false);
        $('#opzioniSpedizione').find('input:radio').prop('required', false);
        $('#opzioniSpedizione').find('select').val('');
        $('#opzioniSpedizione').find('select').addClass('hidden');
        $('#opzioniSpedizione').find('select').prop('required', false);
    }

    $("input[name$='visure_aci_pra_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#visure_aci_pra_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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
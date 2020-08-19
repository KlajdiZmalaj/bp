$(window).on('load', function () {
    if ($("#indagini_persona_fisica_ordine_cliente_tipoCliente").length || $("#indagini_persona_fisica_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#aggiungi'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#confronta'), {parziali: Tuttovisure.parziali});

    $('button[name="richiediBase"]').click(function () {
        $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_0').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        $("#urg-riepilogo").css("display", "block");
    });

    $('button[name="richiediStorica"]').click(function () {
        $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_1').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        $("#urg-riepilogo").css("display", "block");
    });

    $('button[name="richiediRintraccio"]').click(function () {
        $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_3').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        $("#urg-riepilogo").css("display", "none");
    });

    $('button[name="richiediPatrimoniale"]').click(function () {
        $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_2').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        $("#urg-riepilogo").css("display", "none");
    });

    $("input[name$='indagini_persona_fisica_ordine[opzioniProdotto][scegli]']").logicaOpzioniProdotto({
        'prefix_form': 'indagini_persona_fisica_ordine_',
        'valori': {
            'reportBase': {
                'mostra': [
                    'ordine-urgenza',
                    'datiPersona',
                    'aggiungi',
                    'bloccoOrdineUrgenza',
                    'scegliUrgenza',
                    'consegnaStandard'
                ],
                'obbligatori': []
            },
            'reportStorico': {
                'mostra': [
                    'ordine-urgenza',
                    'datiPersona',
                    'aggiungi',
                    'bloccoOrdineUrgenza',
                    'scegliUrgenza',
                    'consegnaStandard'
                ],
                'obbligatori': []
            },
            'indagineDiRintraccio': {
                'mostra': [
                    'ordine-urgenza',
                    'datiPersona',
                    'consegnaCertificata'
                ],
                'obbligatori': []
            },
            'indaginePatrimoniale': {
                'mostra': [
                    'ordine-urgenza',
                    'datiPersona',
                    'consegnaCertificata'
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'aggiungi',
            'bloccoOrdineUrgenza',
            'consegnaCertificata',
            'consegnaStandard',
            'ordine-urgenza',
            'datiPersona',
        ],
        'clean': []
    });

    $("input[name$='indagini_persona_fisica_ordine[opzioniProdotto][scegli]']").logicaOpzioniProdotto().refreshOpzioni();

    if ($('#bloccoOrdineUrgenza').length) {
        if ($('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_2:checked').length || $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_3:checked').length) {
            $('#bloccoOrdineUrgenza').addClass('hidden');
            $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
            Tuttovisure.Ordine.aggiornaParziali();
        } else {
            $('#bloccoOrdineUrgenza').removeClass('hidden');
        }
    }

    $('#indagini_persona_fisica_ordine_opzioniProdotto_aggiungi_0').change(function () {
        if (!$(this).is(':checked')) {
            $('#verificaImmobiliIntestati').addClass('hidden');
        } else {
            $('#verificaImmobiliIntestati').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="indagini_persona_fisica_ordine_opzioniProdotto_aggiungi_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#indagini_persona_fisica_ordine_opzioniProdotto_aggiungi_1').change(function () {
        if (!$(this).is(':checked')) {
            $('#VerificaVeicoliIntestati').addClass('hidden');
        } else {
            $('#VerificaVeicoliIntestati').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="indagini_persona_fisica_ordine_opzioniProdotto_aggiungi_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_2').click(function () {
        if ($('#bloccoOrdineUrgenza').length) {
            if ($(this).is(':checked')) {
                $('#consegnaStandard').addClass('hidden');
                $('#consegnaCertificata').removeClass('hidden');
                $('#scegliUrgenza').addClass('hidden');
                Tuttovisure.Ordine.aggiornaParziali();
            } else {
                $('#consegnaStandard').removeClass('hidden');
                $('#consegnaCertificata').addClass('hidden');
                $('#scegliUrgenza').removeClass('hidden');
            }
        }
        $('#tempiConsegnaAccordion').addClass('hidden');
        $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
        $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
        $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
    });

    $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_3').click(function () {
        if ($('#bloccoOrdineUrgenza').length) {
            if ($(this).is(':checked')) {
                $('#consegnaStandard').addClass('hidden');
                $('#consegnaCertificata').removeClass('hidden');
                $('#scegliUrgenza').addClass('hidden');
                Tuttovisure.Ordine.aggiornaParziali();
            } else {
                $('#consegnaStandard').removeClass('hidden');
                $('#consegnaCertificata').addClass('hidden');
                $('#scegliUrgenza').removeClass('hidden');
            }
        }
        $('#tempiConsegnaAccordion').addClass('hidden');
        $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
        $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
        $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
    });

    $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_0').click(function () {
        $("#urg-riepilogo").css("display", "block");
    });

    $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_1').click(function () {
        $("#urg-riepilogo").css("display", "block");
    });


    if ($('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_2:checked').length || $('#indagini_persona_fisica_ordine_opzioniProdotto_scegli_3:checked').length) {
        $('#consegnaStandard').addClass('hidden');
        $('#consegnaCertificata').removeClass('hidden');
        $('#scegliUrgenza').addClass('hidden');
    } else {
        $('#consegnaStandard').removeClass('hidden');
        $('#consegnaCertificata').addClass('hidden');
        $('#scegliUrgenza').removeClass('hidden');
    }


    $("#indagini_persona_fisica_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#indagini_persona_fisica_ordine_datiProdotto_comune");
    });

});


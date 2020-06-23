$(window).on('load', function() {
    if ($("#visura_protesti_ordine_cliente_tipoCliente").length || $("#visura_protesti_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#ricercaNazionale'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#datiPersona'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#datiAzienda'), {parziali: Tuttovisure.parziali});

    $("input[name$='visura_protesti_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto( {
        'prefix_form': 'visura_protesti_ordine_',
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersona',
                    'personaTitolo',
                    'ordine-urgenza',
                    'personaOpzioni'
                ],
                 'obbligatori': [
                     'personaOpzioni'
                ]
            },
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'aziendaTitolo',
                    'ordine-urgenza',
                    'aziendaOpzioni'
                ],
                 'obbligatori': [
                     'aziendaOpzioni'
                ]
            }
        },
        'reset': [
            'datiPersona',
            'personaTitolo',
            'datiAzienda',
            'aziendaTitolo',
            'ordine-urgenza',
            'personaOpzioni',
            'aziendaOpzioni'
        ],
        'clean': [

        ]
    });


    $("#visura_protesti_ordine_opzioniProdotto_ricercaNazionale").change(function() {
        if($(this).is(':checked') && $(this).is(':visible')) {
            $('#provinciaComune').find('select').val(0);
            $('#provinciaComune').addClass('hidden');
        } else {
            $('#provinciaComune').removeClass('hidden');
        }

    });


    if($("#visura_protesti_ordine_opzioniProdotto_azienda_2").is(':checked') ||
       $("#visura_protesti_ordine_opzioniProdotto_persona_2").is(':checked')) {
        $('#bloccoOrdineUrgenza').addClass('hidden');
       $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
        $('#scegliUrgenza').addClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
    }

    $('#visura_protesti_ordine_opzioniProdotto_azienda_1').change(function () {
        if($(this).val() == 'protestiPregiudizievoliAzienda') {
            $('#consegnaStandard').addClass('hidden2');
            $('#visuraBancaItalia').addClass('hidden');
            $('#visuraProtestiRiabilitazione').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_protesti_ordine_datiProdotto_visuraPer_0').change(function () {
        if($(this).val() == 'persona') {
            $('#visuraBancaItalia').addClass('hidden');
            $('#consegnaStandard').removeClass('hidden2');
            $('#visuraProtestiRiabilitazione').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_protesti_ordine_datiProdotto_visuraPer_1').change(function () {
        if($(this).val() == 'azienda') {
            $('#visuraBancaItalia').addClass('hidden');
            $('#visuraProtestiRiabilitazione').addClass('hidden');
            $('#consegnaStandard').removeClass('hidden2');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_protesti_ordine_opzioniProdotto_azienda_2').change(function () {
        if($(this).val() == 'protestiPregiudizievoliCrifEuriscCtcExperianAzienda') {
            $('#consegnaStandard').addClass('hidden2');
        }
    });

    $('#visura_protesti_ordine_opzioniProdotto_azienda_0').change(function () {
        if($(this).val() == 'protestiAzienda') {
            $('#consegnaStandard').removeClass('hidden2');
            $('#visuraBancaItalia').addClass('hidden');
            $('#visuraProtestiRiabilitazione').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_protesti_ordine_opzioniProdotto_persona_0').change(function () {
        if($(this).val() == 'protestiPersona') {
            $('#consegnaStandard').removeClass('hidden2');
            $('#visuraBancaItalia').addClass('hidden');
            $('#visuraProtestiRiabilitazione').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });


    $('#visura_protesti_ordine_opzioniProdotto_persona_1').change(function () {
        if($(this).val() == 'protestiPregiudizievoliPersona') {
            $('#consegnaStandard').addClass('hidden2');
            $('#visuraBancaItalia').addClass('hidden');
            $('#visuraProtestiRiabilitazione').addClass('hidden');
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });


    $("input[name$='visura_protesti_ordine[opzioniProdotto][azienda]']").change(function() {
        if($(this).val() == 'protestiAzienda') {
            $('#ricercaNazionale').removeClass('hidden');
            $('#altro').addClass('hidden');
            $('#altroTitolo').addClass('hidden');
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#scegliUrgenza').removeClass('hidden');
            $('#altro').find('input:checkbox').prop('checked', false);
            if (!$("#visura_protesti_ordine_opzioniProdotto_ricercaNazionale").is(':checked')) {
                $('#provinciaComune').removeClass('hidden');
            }
            Tuttovisure.Ordine.aggiornaParziali();
        } else if($(this).val() == 'protestiPregiudizievoliCrifEuriscCtcExperianAzienda') {
            $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
            $('#bloccoOrdineUrgenza').addClass('hidden');
            $('#scegliUrgenza').addClass('hidden');
            $('#ricercaNazionale').addClass('hidden');
            $('#ricercaNazionale').find('input:checkbox').prop('checked', false);
            $('#provinciaComune').find('select').val(0);
            $('#provinciaComune').addClass('hidden');
            $('#altro').removeClass('hidden');
            $('#altroTitolo').removeClass('hidden');

            Tuttovisure.Ordine.aggiornaParziali();
        } else {
            $('#ricercaNazionale').addClass('hidden');
            $('#ricercaNazionale').find('input:checkbox').prop('checked', false);
            $('#provinciaComune').find('select').val(0);
            $('#provinciaComune').addClass('hidden');
            $('#altro').addClass('hidden');
            $('#altroTitolo').addClass('hidden');
            $('#altro').find('input:checkbox').prop('checked', false);
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#scegliUrgenza').removeClass('hidden');
            Tuttovisure.Ordine.aggiornaParziali();
        }
    });

    $("input[name$='visura_protesti_ordine[opzioniProdotto][persona]']").change(function() {
        if($(this).val() == 'protestiPersona') {
            $('#ricercaNazionale').removeClass('hidden');
            $('#altro').addClass('hidden');
            $('#altroTitolo').addClass('hidden');
            $('#altro').find('input:checkbox').prop('checked', false);
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#scegliUrgenza').removeClass('hidden');
            if (!$("#visura_protesti_ordine_opzioniProdotto_ricercaNazionale").is(':checked')) {
                $('#provinciaComune').removeClass('hidden');
            }
            Tuttovisure.Ordine.aggiornaParziali();
        } else if($(this).val() == 'protestiPregiudizievoliCrifEuriscCtcExperianPersona') {
            $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
            $('#bloccoOrdineUrgenza').addClass('hidden');
            $('#scegliUrgenza').addClass('hidden');
            $('#ricercaNazionale').addClass('hidden');
            $('#ricercaNazionale').find('input:checkbox').prop('checked', false);
            $('#provinciaComune').find('select').val(0);
            $('#provinciaComune').addClass('hidden');
            $('#altro').removeClass('hidden');
            $('#altroTitolo').removeClass('hidden');

            Tuttovisure.Ordine.aggiornaParziali();
        } else {
            $('#ricercaNazionale').addClass('hidden');
            $('#ricercaNazionale').find('input:checkbox').prop('checked', false);
            $('#provinciaComune').find('select').val(0);
            $('#provinciaComune').addClass('hidden');
            $('#altro').addClass('hidden');
            $('#altroTitolo').addClass('hidden');
            $('#altro').find('input:checkbox').prop('checked', false);
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#scegliUrgenza').removeClass('hidden');

            Tuttovisure.Ordine.aggiornaParziali();
        }
    });

    if($("#visura_protesti_ordine_opzioniProdotto_azienda_0").is(':checked') ||
        $("#visura_protesti_ordine_opzioniProdotto_persona_0").is(':checked')) {
        $('#ricercaNazionale').removeClass('hidden');
        if($("#visura_protesti_ordine_opzioniProdotto_ricercaNazionale").is(':checked')) {
            $('#provinciaComune').find('select').val(0);
            $('#provinciaComune').addClass('hidden');
        } else {
            $('#provinciaComune').removeClass('hidden');
        }
    } else {
        $('#ricercaNazionale').addClass('hidden');
    }

    $('#visura_protesti_ordine_opzioniProdotto_altro_0').change(function () {
        if (!$(this).is(':checked')) {
            $('#visuraBancaItalia').addClass('hidden');
        } else {
            $('#visuraBancaItalia').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="visura_protesti_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_protesti_ordine_opzioniProdotto_altro_1').change(function () {
        if (!$(this).is(':checked')) {
            $('#visuraProtestiRiabilitazione').addClass('hidden');
        } else {
            $('#visuraProtestiRiabilitazione').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="visura_protesti_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });


    $("input[name$='visura_protesti_ordine[datiProdotto][visuraPer]']").change(function() {
        $('#altro').addClass('hidden');
        $('#altroTitolo').addClass('hidden');
        $('#altro').find('input:checkbox').prop('checked', false);
        $('#ricercaNazionale').addClass('hidden');
        $('#ricercaNazionale').find('input:checkbox').prop('checked', false);
        $('#bloccoOrdineUrgenza').removeClass('hidden');
        $('#scegliUrgenza').removeClass('hidden');
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("input[name$='visura_protesti_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visura_protesti_ordine[opzioniProdotto][azienda]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visura_protesti_ordine[opzioniProdotto][persona]']").logicaOpzioniProdotto().refreshOpzioni();

});


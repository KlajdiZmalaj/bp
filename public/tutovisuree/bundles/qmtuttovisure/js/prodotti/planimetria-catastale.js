$(window).on('load', function() {
    if ($("#planimetria_catastale_ordine_cliente_tipoCliente").length || $("#planimetria_catastale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#visuraCertificata'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('#planimetria_catastale_ordine_opzioniProdotto_altro_1').on('checked').logicaOpzioniProdotto(
      {
        'prefix_form': 'planimetria_catastale_ordine_',
        'valori': {
            'visuraIpoteche': {
                'mostra': [
                    'datiConservatorie'
                ],
                'obbligatori': [
                    'datiConservatorie'
                ]
            }
        },
        'reset': [
            'datiConservatorie'
        ],
        'clean': [
        ]
      }
    );


    $("#planimetria_catastale_ordine_opzioniProdotto_altro_0").logicaOpzioniProdotto( {
        'prefix_form': 'planimetria_catastale_ordine_',
        'valori': {
            'visuraCatastale' : {
                'mostra': [
                    'tipoVisura',
                    'subalt'
                ],
                'obbligatori': [
                    'tipoVisura'
                ]
            }
        },
        'reset': [
            'tipoVisura',
            'subalt'
        ],
        'clean': [

        ]
    });

    $("#planimetria_catastale_ordine_opzioniProdotto_altro_3").logicaOpzioniProdotto( {
        'prefix_form': 'planimetria_catastale_ordine_',
        'valori': {
            'calcolaSuperficie' : {
                'mostra': [
                    'dimensioneImmobile',
                ],
                'obbligatori': [
                    'dimensioneImmobile'
                ]
            }
        },
        'reset': [
            'dimensioneImmobile',
        ],
        'clean': [

        ]
    });

    $("#planimetria_catastale_ordine_opzioniProdotto_altro_0").change(function() {
        if(!$(this).is(':checked')) {
            $('#tipoVisura').find('input:radio').prop('checked', false);
            $('#subalt').find('input:text').val('');
            $('#visuraCatastaleSide').addClass('hidden');
        } else {
            $('#visuraCatastaleSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#planimetria_catastale_ordine_opzioniProdotto_altro_1").change(function() {
        if(!$(this).is(':checked')) {
            $('#datiConservatorie').find('select').val(0);
            $('#visuraIpotecheSide').addClass('hidden');
        } else {
            $('#visuraIpotecheSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#planimetria_catastale_ordine_opzioniProdotto_altro_2").change(function() {
        if(!$(this).is(':checked')) {
            $('#dimensioneImmobile').find('input:radio').prop('checked', false);
            $('#mappaEdificioSide').addClass('hidden');
        } else {
            $('#mappaEdificioSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });


    $("#planimetria_catastale_ordine_opzioniProdotto_altro_3").change(function() {
        if(!$(this).is(':checked')) {
            $('#dimensioneImmobile').find('input:radio').prop('checked', false);
            $('#calcolaSuperficieSide').addClass('hidden');
        } else {
            $('#calcolaSuperficieSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#planimetria_catastale_ordine_opzioniProdotto_altro_0").is(':not(:checked)')) {
        $('#tipoVisura').find('input:checkbox').prop('checked', false);
        $('#subalt').find('input:text').val('');
    }

    $("#planimetria_catastale_ordine_opzioniProdotto_planimetriaCertificata").change(function() {
        if($(this).is(':not(:checked)')) {
            $('#opzioniSpedizione').addClass('hidden');
            $('#opzioniSpedizione').find('input:radio').prop('checked', false);
            $('#opzioniSpedizione').find('input:radio').prop('required', false);
            $('#opzioniSpedizione').find('select').val('');
            $('#opzioniSpedizione').find('select').addClass('hidden');
            $('#opzioniSpedizione').find('select').prop('required', false);
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#opzioniSpedizione').find('.row').removeClass('alert-form alert-danger-form');
            $('#opzioniSpedizione').find('.alert-message').remove();
        }
        if($(this).is(':checked')) {
            $('#opzioniSpedizione').removeClass('hidden');
            $('#opzioniSpedizione').find('input:radio').prop('required', true);
            $('#bloccoOrdineUrgenza').addClass('hidden');
            $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if($('#planimetria_catastale_ordine_opzioniProdotto_planimetriaCertificata').is(':checked')) {
        $('#opzioniSpedizione').removeClass('hidden');
        $('#opzioniSpedizione').find('input:radio').prop('required', true);
        $('#bloccoOrdineUrgenza').addClass('hidden');
        $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
    } else {
        $('#opzioniSpedizione').addClass('hidden');
        $('#opzioniSpedizione').find('input:radio').prop('checked', false);
        $('#opzioniSpedizione').find('input:radio').prop('required', false);
        $('#opzioniSpedizione').find('select').val('');
        $('#opzioniSpedizione').find('select').addClass('hidden');
        $('#opzioniSpedizione').find('select').prop('required', false);
        $('#bloccoOrdineUrgenza').removeClass('hidden');
    }


    $("#planimetria_catastale_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#planimetria_catastale_ordine_datiProdotto_comune");

        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#visuraCertificata').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
    });

    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#visuraCertificata').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
    }

    $('#planimetria_catastale_ordine_opzioniProdotto_altro_0').logicaOpzioniProdotto().refreshOpzioni();

    $('#planimetria_catastale_ordine_opzioniProdotto_altro_1').logicaOpzioniProdotto().refreshOpzioni();

    $('#planimetria_catastale_ordine_opzioniProdotto_altro_3').logicaOpzioniProdotto().refreshOpzioni();

    $('#planimetria_catastale_ordine_opzioniProdotto_planimetriaCertificata').logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='planimetria_catastale_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#planimetria_catastale_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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
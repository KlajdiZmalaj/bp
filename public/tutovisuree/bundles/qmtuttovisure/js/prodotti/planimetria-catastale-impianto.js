$(window).on('load', function() {
    if ($("#planimetria_catastale_impianto_ordine_cliente_tipoCliente").length || $("#planimetria_catastale_impianto_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('#planimetria_catastale_impianto_ordine_opzioniProdotto_altro_1').on('checked').logicaOpzioniProdotto(
      {
        'prefix_form': 'visura_catastale_ordine_',
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

    $("#planimetria_catastale_impianto_ordine_opzioniProdotto_altro_0").change(function() {
        if(!$(this).is(':checked')) {
            $('#visuraCatastaleSide').addClass('hidden');
        } else {
            $('#visuraCatastaleSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_impianto_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#planimetria_catastale_impianto_ordine_opzioniProdotto_altro_1").change(function() {
        if(!$(this).is(':checked')) {
            $('#datiConservatorie').find('select').val(0);
            $('#visuraIpotecheSide').addClass('hidden');
        } else {
            $('#visuraIpotecheSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_impianto_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#planimetria_catastale_impianto_ordine_opzioniProdotto_altro_2").change(function() {
        if(!$(this).is(':checked')) {
            $('#mappaEdificioSide').addClass('hidden');
        } else {
            $('#mappaEdificioSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="planimetria_catastale_impianto_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });



    $("#planimetria_catastale_impianto_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#planimetria_catastale_impianto_ordine_datiProdotto_comune");

        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
    });

    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
    }

    $('#planimetria_catastale_impianto_ordine_opzioniProdotto_altro_1').logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='planimetria_catastale_impianto_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#planimetria_catastale_impianto_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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
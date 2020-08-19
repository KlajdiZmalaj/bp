$(window).on('load', function() {
    if ($("#correzione_planimetria_catastale_ordine_cliente_tipoCliente").length || $("#correzione_planimetria_catastale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#allegatoPratica'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#allegato-planimetria'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });
    $("input[name$='correzione_planimetria_catastale_ordine[opzioniProdotto][allegatoPlanimetria]']").logicaOpzioniProdotto({
        'valori': {
            'haiLaPlanimetriaNo': {
                'mostra': [
                    'mandato'
                ],
            },
        },
        'reset': [
            'mandato'
        ],
        'clean': []
    });

    $('#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_1').on('checked').logicaOpzioniProdotto(
      {
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


    $("#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_0").logicaOpzioniProdotto( {
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


    $("#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_0").change(function() {
        if(!$(this).is(':checked')) {
            $('#tipoVisura').find('input:checkbox').prop('checked', false);
            $('#subalt').find('input:text').val('');
            $('#visuraCatastaleSide').addClass('hidden');
        } else {
            $('#visuraCatastaleSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="correzione_planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_1").change(function() {
        if(!$(this).is(':checked')) {
            $('#datiConservatorie').find('select').val(0);
            $('#visuraIpotecheSide').addClass('hidden');
        } else {
            $('#visuraIpotecheSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="correzione_planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_2").change(function() {
        if(!$(this).is(':checked')) {
            $('#mappaEdificioSide').addClass('hidden');
        } else {
            $('#mappaEdificioSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="correzione_planimetria_catastale_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });



    $("#correzione_planimetria_catastale_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#correzione_planimetria_catastale_ordine_datiProdotto_comune");

        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#allegato-planimetria').removeClass('hidden');
        $('#allegatoPratica').removeClass('hidden');
        $('#modifiche').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');

    });

    if (!$('table[name="riepilogo"]').hasClass('hidden')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#allegato-planimetria').removeClass('hidden');
        $('#allegatoPratica').removeClass('hidden');
        $('#modifiche').removeClass('hidden');
        $('#altro').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
    }

    $("input[name$='correzione_planimetria_catastale_ordine[opzioniProdotto][allegatoPlanimetria]']").logicaOpzioniProdotto().refreshOpzioni();

    $('#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_0').logicaOpzioniProdotto().refreshOpzioni();

    $('#correzione_planimetria_catastale_ordine_opzioniProdotto_altro_1').logicaOpzioniProdotto().refreshOpzioni();
});
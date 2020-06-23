$(window).on('load', function() {
    if ($("#calcolo_superficie_da_planimetria_ordine_cliente_tipoCliente").length || $("#calcolo_superficie_da_planimetria_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }

    if ($("#dimensione-immobile").length) {
        if ($("input[name$='calcolo_superficie_da_planimetria_ordine[opzioniProdotto][dimensioneImmobile]']:checked").length == 0) {
            $("#250mq").show();
        }
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#allegato-planimetria'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $("input[name$='calcolo_superficie_da_planimetria_ordine[opzioniProdotto][allegatoPlanimetria]']").logicaOpzioniProdotto({
        'valori': {
            'si': {
                'mostra': [
                    'ordine-urgenza',
                    'altro',
                    'altroTitolo'

                ]
            },
            'no': {
                'mostra': [
                    'provinciaSelect',
                    'comuneSelect',
                    'datiImmobile',
                    'ordine-urgenza',
                    'altro',
                    'altroTitolo'
                ]
            }
        },
        'reset': [
            'provinciaSelect',
            'comuneSelect',
            'datiImmobile',
            'ordine-urgenza',
            'altro',
            'altroTitolo'
        ],
        'clean': []
    });

    $("#dimensione-immobile").change(function () {
        $('#allegato-planimetria').removeClass('hidden');
    });

    if ($("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_dimensioneImmobile_0").is(':checked')) {
        $('#allegato-planimetria').removeClass('hidden');
        DimensioneImmobile_0();
    }

    if ($("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_dimensioneImmobile_1").is(':checked')) {
        $('#allegato-planimetria').removeClass('hidden');
        DimensioneImmobile_1();
    }

    if ($("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_dimensioneImmobile_2").is(':checked')) {
        $('#allegato-planimetria').removeClass('hidden');
        DimensioneImmobile_2();
    }

    if ($("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_dimensioneImmobile_3").is(':checked')) {
        $('#allegato-planimetria').removeClass('hidden');
        DimensioneImmobile_3();
    }

    $('#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_1').on('checked').logicaOpzioniProdotto(
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


    $("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_0").logicaOpzioniProdotto( {
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

    $("input[name$='calcolo_superficie_da_planimetria_ordine[opzioniProdotto][allegatoPlanimetria]']").logicaOpzioniProdotto().refreshOpzioni();


    $("input[name$='calcolo_superficie_da_planimetria_ordine[opzioniProdotto][dimensioneImmobile]']").change(function () {
        if ($(this).val() == '250mq') {
            DimensioneImmobile_0();
        }
        else if($(this).val() == '500mq') {
            DimensioneImmobile_1();
        } else if($(this).val() == '2000mq'){
            DimensioneImmobile_2();
        } else if($(this).val() == '5000mq') {
            DimensioneImmobile_3();
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    $("#calcolo_superficie_da_planimetria_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#calcolo_superficie_da_planimetria_ordine_datiProdotto_comune");
    });

    $("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_0").change(function() {
        if(!$(this).is(':checked')) {
            $('#tipoVisura').find('input:radio').prop('checked', false);
            $('#subalt').find('input:text').val('');
            $('#visuraCatastaleSide').addClass('hidden');
        } else {
            $('#visuraCatastaleSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_1").change(function() {
        if(!$(this).is(':checked')) {
            $('#datiConservatorie').find('select').val(0);
            $('#visuraIpotecheSide').addClass('hidden');
        } else {
            $('#visuraIpotecheSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $("#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_2").change(function() {
        if(!$(this).is(':checked')) {
            $('#mappaEdificioSide').addClass('hidden');
        } else {
            $('#mappaEdificioSide').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });


    $('#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_0').logicaOpzioniProdotto().refreshOpzioni();

    $('#calcolo_superficie_da_planimetria_ordine_opzioniProdotto_altro_1').logicaOpzioniProdotto().refreshOpzioni();
});

function DimensioneImmobile_0() {
    $('#250mq').show();
    $('#500mq').hide();
    $('#2000mq').hide();
    $('#5000mq').hide();
}

function DimensioneImmobile_1() {
    $('#500mq').show();
    $('#250mq').hide();
    $('#2000mq').hide();
    $('#5000mq').hide();
}

function DimensioneImmobile_2() {
    $('#2000mq').show();
    $('#500mq').hide();
    $('#250mq').hide();
    $('#5000mq').hide();
}

function DimensioneImmobile_3() {
    $('#5000mq').show();
    $('#2000mq').hide();
    $('#500mq').hide();
    $('#250mq').hide();
}


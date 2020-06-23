jQuery.fn.getSelector = function () {
    return this.data('selector');
};

$(window).on('load', function () {
    if ($("#visura_catastale_storica_ordine_cliente_tipoCliente").length || $("#visura_catastale_storica_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $("input[name$='visura_catastale_storica_ordine[opzioniProdotto][visuraPer]']").logicaOpzioniProdotto({
        'valori': {
            'immobile': {
                'mostra': [
                    'datiTipoDiImmobileVisura',
                    'datiImmobile',
                    'altroTitolo',
                    'altro',
                    'altro0',
                    'ordine-urgenza'
                ],
                'obbligatori': [
                    'datiTipoDiImmobileVisura'
                ]
            },
            'personaProprietaria': {
                'mostra': [
                    'datiPersona',
                    'altroTitolo',
                    'altro',
                    'altro0',
                    'ordine-urgenza',
                    'provinciale'
                ],
                'obbligatori': [
                    'opzioniDatiTipoRicerca'
                ]
            },
            'aziendaIntestataria': {
                'mostra': [
                    'datiAzienda',
                    'altroTitolo',
                    'altro',
                    'altro0',
                    'ordine-urgenza',
                    'provinciale'
                ],
                'obbligatori': [
                    'opzioniDatiTipoRicerca'
                ]
            }
        },
        'reset': [
            'datiTipoDiImmobileVisura',
            'datiPersona',
            'opzioniDatiTipoRicerca',
            'datiAzienda',
            'datiImmobile',
            'altroTitolo',
            'provinciale'
        ],
        'clean': []
    });

    $("input[name$='visura_catastale_storica_ordine[opzioniProdotto][visuraPer]']").change(function () {
        if ($(this).val() !== 'immobile') {
            $('#altro1').addClass('hidden');
            $('#altro1').find('input:checkbox').prop('checked', false);
            $('#altro2').addClass('hidden');
            $('#mandato').addClass('hidden');
            $('#altro2').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('required', false);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($('#visura_catastale_storica_ordine_opzioniProdotto_visuraPer_0').is(':not(:checked)')) {
        $('#altro1').addClass('hidden');
        $('#altro1').find('input:checkbox').prop('checked', false);
        $('#altro2').addClass('hidden');
        $('#mandato').addClass('hidden');
        $('#altro2').find('input:checkbox').prop('checked', false);
        $('#mandato').find('input:checkbox').prop('checked', false);
        $('#mandato').find('input:checkbox').prop('required', false);
    }

    $("input[name$='visura_catastale_storica_ordine[datiProdotto][tipoDiImmobile]']").change(function () {
        if ($(this).val() === 'fabbricato') {
            $('#altro1').addClass('hidden');
            $('#altro1').find('input:checkbox').prop('checked', false);
            $('#altro2').removeClass('hidden');
            $('#estrattoMappa').addClass('hidden');
            var count = 0;
            $('input:checkbox[id^="visura_catastale_storica_ordine_opzioniProdotto_altro_"]:checked').each(function(){
                count++;
            });
            if (count === 0){
                $('#tempiConsegnaAccordion').addClass('hidden');
                $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
                $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
                $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
            }
        }
        if ($(this).val() === 'terreno') {
            $('#altro2').addClass('hidden');
            $('#mandato').addClass('hidden');
            $('#altro2').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('required', false);
            $('#altro1').removeClass('hidden');
            $('#planimetriaCatastale').addClass('hidden');
            var count2 = 0;
            $('input:checkbox[id^="visura_catastale_storica_ordine_opzioniProdotto_altro_"]:checked').each(function(){
                count2++;
            });
            if (count2 === 0){
                $('#tempiConsegnaAccordion').addClass('hidden');
                $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
                $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
                $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
            }
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($('#visura_catastale_storica_ordine_datiProdotto_tipoDiImmobile_0').is(':checked')) {
        $('#altro1').addClass('hidden');
        $('#altro1').find('input:checkbox').prop('checked', false);
        $('#altro2').removeClass('hidden');
    }

    if ($('#visura_catastale_storica_ordine_datiProdotto_tipoDiImmobile_1').is(':checked')) {
        $('#altro2').addClass('hidden');
        $('#mandato').addClass('hidden');
        $('#altro2').find('input:checkbox').prop('checked', false);
        $('#mandato').find('input:checkbox').prop('checked', false);
        $('#altro1').removeClass('hidden');
    }

    if (!$('#visura_catastale_storica_ordine_opzioniProdotto_altro_0').is(':checked')) {
        $('#datiConservatorie').find('select').val(0);
    }

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_0').change(function () {
        if (!$(this).is(':checked')) {
            $('#datiConservatorie').find('select').val(0);
            $('#visuraIpoteche').addClass('hidden');
        } else {
            $('#visuraIpoteche').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="visura_catastale_storica_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_1').change(function () {
        if (!$(this).is(':checked')) {
            $('#estrattoMappa').addClass('hidden');
        } else {
            $('#estrattoMappa').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="visura_catastale_storica_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_2').change(function () {
        if (!$(this).is(':checked')) {
            $('#planimetriaCatastale').addClass('hidden');
        } else {
            $('#planimetriaCatastale').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="visura_catastale_storica_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_0').on('checked').logicaOpzioniProdotto(
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

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_2').on('checked').logicaOpzioniProdotto(
        {
            'valori': {
                'planimetriaCatastale': {
                    'mostra': [
                        'mandato'
                    ],
                    'obbligatori': [
                        'mandato'
                    ]
                }
            },
            'reset': [
                'mandato'
            ],
            'clean': []
        }
    );


    $("#visura_catastale_storica_ordine_opzioniProdotto_visuraCertificata").change(function () {
        if ($(this).is(':not(:checked)')) {
            $('#opzioniSpedizione').addClass('hidden');
            $('#opzioniSpedizione').find('input:radio').prop('checked', false);
            $('#opzioniSpedizione').find('input:radio').prop('required', false);
            $('#opzioniSpedizione').find('select').val('');
            $('#opzioniSpedizione').find('select').addClass('hidden');
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#opzioniSpedizione').find('select').prop('required', false);
            $('#opzioniSpedizione').find('.row').removeClass('alert-form alert-danger-form');
            $('#opzioniSpedizione').find('.alert-message').remove();
        }
        if ($(this).is(':checked')) {
            $('#opzioniSpedizione').removeClass('hidden');
            $('#opzioniSpedizione').find('input:radio').prop('required', true);
            $('#bloccoOrdineUrgenza').addClass('hidden');
            $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($('#visura_catastale_storica_ordine_opzioniProdotto_visuraCertificata').is(':not(:checked)')) {
        $('#opzioniSpedizione').addClass('hidden');
        $('#opzioniSpedizione').find('input:radio').prop('checked', false);
        $('#opzioniSpedizione').find('input:radio').prop('required', false);
        $('#opzioniSpedizione').find('select').val('');
        $('#opzioniSpedizione').find('select').addClass('hidden');
        $('#bloccoOrdineUrgenza').removeClass('hidden');
        $('#opzioniSpedizione').find('select').prop('required', false);
    } else {
        $('#opzioniSpedizione').removeClass('hidden');
        $('#opzioniSpedizione').find('input:radio').prop('required', true);
        $('#bloccoOrdineUrgenza').addClass('hidden');
        $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
    }

    $("#visura_catastale_storica_ordine_opzioniProdotto_visuraPer_0").change(function () {
        if ($(this).is(':checked')) {
            $('#provinciale').addClass('hidden');
        }
    });

    if ($("#visura_catastale_storica_ordine_opzioniProdotto_visuraPer_0").is(':checked')) {
        $('#provinciale').addClass('hidden');
    }

    $("#visura_catastale_storica_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#visura_catastale_storica_ordine_datiProdotto_comune");
    });

    $("input[name$='visura_catastale_storica_ordine[opzioniProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_0').logicaOpzioniProdotto().refreshOpzioni();

    $('#visura_catastale_storica_ordine_opzioniProdotto_altro_2').logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visura_catastale_storica_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#visura_catastale_storica_spedizione_spedizione_nazionale_3").is(':checked')) {
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


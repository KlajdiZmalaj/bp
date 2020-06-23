$(window).on('load', function() {
    if ($("#report_veicoli_e_immobili_ordine_cliente_tipoCliente").length || $("#report_veicoli_e_immobili_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#altriServizi'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('input[name="report_veicoli_e_immobili_ordine[datiProdotto][reportPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'report_veicoli_e_immobili_ordine_',
            'valori': {
                'azienda': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'sedeLegaleTitolo',
                        'provinciaComune',
                        'ordine-urgenza',
                        'indirizzo',
                        'altroTitolo',
                        'altro'
                    ],
                    'obbligatori': [

                    ]
                },
                'persona': {
                    'mostra': [
                        'personaTitolo',
                        'datiPersona',
                        'provinciaComune',
                        'ordine-urgenza',
                        'indirizzo',
                        'altroTitolo',
                        'altro'
                    ],
                    'obbligatori': [

                    ]
                }
            },
            'reset': [
                'personaTitolo',
                'aziendaTitolo',
                'datiAzienda',
                'sedeLegaleTitolo',
                'datiPersona',
                'provinciaComune',
                'ordine-urgenza',
                'altroTitolo',
                'altro'
            ],
            'clean': [
            ]
        }
    );

    if ($('#altriServizi').length) {
        $('#altriServizi').find('input[type=checkbox]').each(function () {
            $(this).click(function() {
                $('#noSelection').addClass('hidden');
                $('#noSelection').removeClass('alert-form');
            });
        });
    }

    $('button[name="formButtonAvanti"]').click(function(e) {
        var flag = false;

        if ($('#altriServizi').length) {
            $('#altriServizi').find('input[type=checkbox]').each(function () {
                if($(this).is(':checked')){
                    flag = true;
                    return;
                }
            });
        } else {
            flag = true;
        }

        if (flag == false) {
            e.preventDefault();
            $('#noSelection').removeClass('hidden');
            $('#noSelection').addClass('alert-form');
            var noSelection = $('#topRichiesta').offset().top;
            $('html, body').animate({scrollTop:noSelection}, 300);
            return false;
        }
    });

    $('button[name="formButtonCompleta"]').click(function(e) {
        var flag = false;

        if ($('#altriServizi').length) {
            $('#altriServizi').find('input[type=checkbox]').each(function () {
                if($(this).is(':checked')){
                    flag = true;
                    return;
                }
            });
        } else {
            flag = true;
        }

        if (flag == false) {
            e.preventDefault();
            $('#noSelection').removeClass('hidden');
            $('#noSelection').addClass('alert-form');
            var noSelection = $('#topRichiesta').offset().top;
            $('html, body').animate({scrollTop:noSelection}, 300);
            return false;
        }
    });

    $("#report_veicoli_e_immobili_ordine_opzioniProdotto_veicoliIntestati").change(function() {
        $('.reportPer').removeClass('hidden');
    });

    if ($("#report_veicoli_e_immobili_ordine_opzioniProdotto_veicoliIntestati").is(':checked')) {
        $('.reportPer').removeClass('hidden');
    };

    $("#report_veicoli_e_immobili_ordine_opzioniProdotto_immobiliIntestati").change(function() {
        $('.reportPer').removeClass('hidden');
    });

    if ($("#report_veicoli_e_immobili_ordine_opzioniProdotto_immobiliIntestati").is(':checked')) {
        $('.reportPer').removeClass('hidden');
    };

    $("#report_veicoli_e_immobili_ordine_datiProdotto_reportPer_0").change(function() {
        $('#altro1').removeClass('hidden');
        $('#altro0').addClass('hidden');
        $('#altro0').find('input:checkbox').prop('checked', false);
        $('#provinciaComune').find('span').text(' di residenza:');
        $('#indirizzo').find('span').text(' di residenza:');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parent().addClass('req');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parent().addClass('req');
        if ($(this).is(':checked')) {
            $('#reportImpresa').addClass('hidden');
            var count = 0;
            $('input:checkbox[id^="report_veicoli_e_immobili_ordine_opzioniProdotto_altro_"]:checked').each(function(){
                count++;
            });
            if (count === 0){
                $('#tempiConsegnaAccordion').addClass('hidden');
                $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
                $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
                $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
            }
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#report_veicoli_e_immobili_ordine_datiProdotto_reportPer_0").is(':checked')) {
        $('#altro1').removeClass('hidden');
        $('#altro0').addClass('hidden');
        $('#altro0').find('input:checkbox').prop('checked', false);
        $('#provinciaComune').find('span').text(' di residenza:');
        $('#indirizzo').find('span').text(' di residenza:');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parent().addClass('req');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parent().addClass('req');
        Tuttovisure.Ordine.aggiornaParziali();
    };

    $("#report_veicoli_e_immobili_ordine_datiProdotto_reportPer_1").change(function() {
        $('#altro0').removeClass('hidden');
        $('#altro1').addClass('hidden');
        $('#altro1').find('input:checkbox').prop('checked', false);
        $('#provinciaComune').find('span').text(':');
        $('#indirizzo').find('span').text(':');
        if ($(this).is(':checked')) {
            $('#reportPersona').addClass('hidden');
            var count = 0;
            $('input:checkbox[id^="report_veicoli_e_immobili_ordine_opzioniProdotto_altro_"]:checked').each(function(){
                count++;
            });
            if (count === 0){
                $('#tempiConsegnaAccordion').addClass('hidden');
                $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
                $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
                $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
            }
        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#report_veicoli_e_immobili_ordine_datiProdotto_reportPer_1").is(':checked')) {
        $('#altro0').removeClass('hidden');
        $('#altro1').addClass('hidden');
        $('#altro1').find('input:checkbox').prop('checked', false);
        $('#provinciaComune').find('span').text(':');
        $('#indirizzo').find('span').text(':');
        Tuttovisure.Ordine.aggiornaParziali();
    };

    $('#report_veicoli_e_immobili_ordine_opzioniProdotto_altro_0').change(function () {
        if (!$(this).is(':checked')) {
            $('#reportImpresa').addClass('hidden');
        } else {
            $('#reportImpresa').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="report_veicoli_e_immobili_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#report_veicoli_e_immobili_ordine_opzioniProdotto_altro_1').change(function () {
        if (!$(this).is(':checked')) {
            $('#reportPersona').addClass('hidden');
        } else {
            $('#reportPersona').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="report_veicoli_e_immobili_ordine_opzioniProdotto_altro_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').focusout('click out', function () {
        if($('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').val() !== "") {
            $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parent().removeClass('req');
            $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parents(".alert-form").removeClass("alert-form alert-danger-form").find(".alert-message").remove();
        }else{
            $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parent().addClass('req');
        }
    });

    if($('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').val() !== "") {
        $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parent().removeClass('req');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parents(".alert-form").removeClass("alert-form alert-danger-form").find(".alert-message").remove();
    }else{
        $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').parent().addClass('req');
    }

    $('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').focusout('click out', function () {
        if($('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').val() !== "") {
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parent().removeClass('req');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parents(".alert-form").removeClass("alert-form alert-danger-form").find(".alert-message").remove();
        }else{
            $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parent().addClass('req');
        }
    });

    if($('#report_veicoli_e_immobili_ordine_datiProdotto_codiceFiscaleAzienda').val() !== "") {
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parent().removeClass('req');
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parents(".alert-form").removeClass("alert-form alert-danger-form").find(".alert-message").remove();
    }else{
        $('#report_veicoli_e_immobili_ordine_datiProdotto_partitaIva').parent().addClass('req');
    }


    $("#report_veicoli_e_immobili_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#report_veicoli_e_immobili_ordine_datiProdotto_comune");
    });

    $('input[name="report_veicoli_e_immobili_ordine[datiProdotto][reportPer]"]').logicaOpzioniProdotto().refreshOpzioni();

    $("#report_veicoli_e_immobili_ordine_opzioniProdotto_altro_1").logicaOpzioniProdotto().refreshOpzioni();

    $("#report_veicoli_e_immobili_ordine_opzioniProdotto_altro_0").logicaOpzioniProdotto().refreshOpzioni();

});

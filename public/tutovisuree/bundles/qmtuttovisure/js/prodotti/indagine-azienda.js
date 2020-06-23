$(window).on('load', function () {
    if ($("#indagine_azienda_ordine_cliente_tipoCliente").length || $("#indagine_azienda_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#aggiungi'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#confronta'), {parziali: Tuttovisure.parziali});

    $('button[name="richiediBase"]').click(function () {
        $('#indagine_azienda_ordine_opzioniProdotto_scegli_0').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
    });

    $('button[name="richiediStandard"]').click(function () {
        $('#indagine_azienda_ordine_opzioniProdotto_scegli_1').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
    });

    $('button[name="richiediAnalitica"]').click(function () {
        $('#indagine_azienda_ordine_opzioniProdotto_scegli_2').trigger('click');
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
    });

    $("#indagine_azienda_ordine_opzioniProdotto_scegli_0").change(function () {
        console.log("cambiato");
        $('#VerificaVeicoliIntestati').addClass('hidden');
        var count = 0;
        $('input:checkbox[id^="indagine_azienda_ordine_opzioniProdotto_aggiungi_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });


    $('#indagine_azienda_ordine_opzioniProdotto_aggiungi_0').change(function () {
        if (!$(this).is(':checked')) {
            $('#VerificaVeicoliIntestati').addClass('hidden');
        } else {
            $('#VerificaVeicoliIntestati').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="indagine_azienda_ordine_opzioniProdotto_aggiungi_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });

    $('#indagine_azienda_ordine_opzioniProdotto_aggiungi_1').change(function () {
        if (!$(this).is(':checked')) {
            $('#monitoraggioImpresa').addClass('hidden');
        } else {
            $('#monitoraggioImpresa').removeClass('hidden');
            $('#tempiConsegnaAccordion').removeClass('hidden');
        }
        var count = 0;
        $('input:checkbox[id^="indagine_azienda_ordine_opzioniProdotto_aggiungi_"]:checked').each(function(){
            count++;
        });
        if (count === 0){
            $('#tempiConsegnaAccordion').addClass('hidden');
            $('#tempiConsegnaAccordion').next("ul").removeClass('showDetails');
            $("#tempiConsegnaAccordion").find("i").addClass("fa-plus-circle");
            $("#tempiConsegnaAccordion").find("i").removeClass("fa-minus-circle");
        }
    });


    $("input[name$='indagine_azienda_ordine[opzioniProdotto][scegli]']").logicaOpzioniProdotto({
        'prefix_form': 'indagine_azienda_ordine_',
        'valori': {
            'reportBase': {
                'mostra': [
                    'datiAzienda',
                    'ordine-urgenza',
                    'aggiungi',
                    'aggiungi1',
                ],
                'obbligatori': []
            },
            'reportStandard': {
                'mostra': [
                    'datiAzienda',
                    'ordine-urgenza',
                    'aggiungi',
                    'aggiungi0',
                    'aggiungi1',
                ],
                'obbligatori': []
            },
            'indagineAnalitica': {
                'mostra': [
                    'datiAzienda',
                    'ordine-urgenza',
                    'aggiungi',
                    'aggiungi0',
                    'aggiungi1',
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'datiAzienda',
            'ordine-urgenza',
            'aggiungi',
            'aggiungi0',
            'aggiungi1',
        ],
        'clean': []
    });

    $("input[name$='indagine_azienda_ordine[opzioniProdotto][scegli]']").logicaOpzioniProdotto().refreshOpzioni();

    $("#indagine_azienda_ordine_opzioniProdotto_aggiungi_1").logicaOpzioniProdotto().refreshOpzioni();


});


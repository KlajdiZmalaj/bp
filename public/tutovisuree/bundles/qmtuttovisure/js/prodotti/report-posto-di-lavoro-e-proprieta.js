$(window).on('load', function() {
    if ($("#report_posto_di_lavoro_e_proprieta_ordine_cliente_tipoCliente").length || $("#report_posto_di_lavoro_e_proprieta_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function mostraCampi() {
    $('#datiPersona').removeClass('hidden');
    $('#datiPersonaTitolo').removeClass('hidden');
    $('#ordine-urgenza').removeClass('hidden');
    $('#datiSms').removeClass('hidden');
    Tuttovisure.Ordine.aggiornaParziali();
}

$(document).ready(function(){
    rivets.bind($('#immobili-veicoli'), {parziali: Tuttovisure.parziali});

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

    $('#report_posto_di_lavoro_e_proprieta_ordine_opzioniProdotto_immobili').change(function () {
        mostraCampi();
    });

    $('#report_posto_di_lavoro_e_proprieta_ordine_opzioniProdotto_veicoli').change(function () {
        mostraCampi();
    });

    if ($('#report_posto_di_lavoro_e_proprieta_ordine_opzioniProdotto_immobili').is(':checked')) {
        mostraCampi();
    }

    if ($('#report_posto_di_lavoro_e_proprieta_ordine_opzioniProdotto_veicoli').is(':checked')) {
        mostraCampi();
    }

    $("#report_posto_di_lavoro_e_proprieta_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#report_posto_di_lavoro_e_proprieta_ordine_datiProdotto_comune");
    });

});

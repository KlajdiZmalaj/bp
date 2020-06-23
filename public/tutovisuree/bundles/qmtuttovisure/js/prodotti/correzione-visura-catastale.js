$(window).on('load', function() {
    if ($("#correzione_visura_catastale_ordine_cliente_tipoCliente").length || $("#correzione_visura_catastale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    $("#correzione_visura_castale_ordine_datiProdotto_tipoDiImmobile").prop('required', true);

    $('input[name="correzione_visura_catastale_ordine[datiProdotto][tipoDiImmobile]"]').change(function() {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#variServ').removeClass('hidden');
    });

    if($('input[name="correzione_visura_catastale_ordine[datiProdotto][tipoDiImmobile]"]').is(':checked')) {
        $('#datiImmobile').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#variServ').removeClass('hidden');
    }

    $("#correzione_visura_catastale_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#correzione_visura_catastale_ordine_datiProdotto_comune");
    });

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

});
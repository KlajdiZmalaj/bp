$(window).on('load', function () {
    if ($("#visura_marchi_brevetti_ordine_cliente_tipoCliente").length || $("#visura_marchi_brevetti_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function () {
    rivets.bind($('#variServ'), {parziali: Tuttovisure.parziali});

    $("input[name$='visura_marchi_brevetti_ordine[datiProdotto][datiRicerca]']").logicaOpzioniProdotto({
        'prefix_form': 'visura_marchi_brevetti_ordine_',
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersona',
                    'personaTitolo',
                    'provinciaComune',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            },
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'aziendaTitolo',
                    'provinciaComune',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            },
            'marchio': {
                'mostra': [
                    'marchio',
                    'ordine-urgenza'
                ],
                'obbligatori': []
            }
        },
        'reset': [
            'datiPersona',
            'personaTitolo',
            'datiAzienda',
            'aziendaTitolo',
            'provinciaComune',
            'marchio',
            'ordine-urgenza'
        ],
        'clean': []
    });


    $("#visura_marchi_brevetti_ordine_opzioniProdotto_visuraSu_1").change(function () {
        if ($('#visura_marchi_brevetti_ordine_opzioniProdotto_visuraSu_1:checked').length) {
            $('#ricerca2').addClass('hidden');
            $('#marchio').addClass('hidden');
            $('#marchio').find('input:text').val('');
            if ($('#visura_marchi_brevetti_ordine_datiProdotto_datiRicerca_2:checked').length) {
                $("input[name$='visura_marchi_brevetti_ordine[datiProdotto][datiRicerca]']").prop('checked', false);
            }
        } else {
            $('#ricerca2').removeClass('hidden');
        }
    });

    if ($('#visura_marchi_brevetti_ordine_opzioniProdotto_visuraSu_1:checked').length) {
        $('#ricerca2').addClass('hidden');
        $('#marchio').addClass('hidden');
        $('#marchio').find('input:text').val('');
        if ($('#visura_marchi_brevetti_ordine_datiProdotto_datiRicerca_2:checked').length) {
            $("input[name$='visura_marchi_brevetti_ordine[datiProdotto][datiRicerca]']").prop('checked', false);
        }
    } else {
        $('#ricerca2').removeClass('hidden');
    }

    $("#visura_marchi_brevetti_ordine_datiProdotto_provincia").change(function () {
        Tuttovisure.provinciaComune($(this), "#visura_marchi_brevetti_ordine_datiProdotto_comune");
    });

    $("input[name$='visura_marchi_brevetti_ordine[datiProdotto][datiRicerca]']").logicaOpzioniProdotto().refreshOpzioni();

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


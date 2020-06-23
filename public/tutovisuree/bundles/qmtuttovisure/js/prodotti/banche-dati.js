$(window).on('load', function() {
    if ($("#banche_dati_ordine_cliente_tipoCliente").length || $("#banche_dati_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#scegliVisura'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('input[name="banche_dati_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'banche_dati_ordine_',
            'valori': {
                'azienda': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'provinciaComune',
                        'ordine-urgenza',
                        'indirizzo',
                        'contatti'
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
                        'contatti'
                    ],
                    'obbligatori': [

                    ]
                }
            },
            'reset': [
                'personaTitolo',
                'aziendaTitolo',
                'datiAzienda',
                'datiPersona',
                'provinciaComune',
                'ordine-urgenza',
                'indirizzo',
                'contatti'
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

    $("input[name$='banche_dati_ordine[datiProdotto][visuraPer]']").change(function() {
        if ($(this).val() === 'persona') {
            $('#provinciaComune').find('span').text('di residenza:');
            $('#indirizzo').find('span').text('di residenza:');
        }
        if ($(this).val() === 'azienda') {
            $('#provinciaComune').find('span').text('sede legale:');
            $('#indirizzo').find('span').text('sede legale:');
        }
    });

    if ($("#banche_dati_ordine_datiProdotto_visuraPer_0").is(':checked')) {
        $('#provinciaComune').find('span').text('di residenza:');
        $('#indirizzo').find('span').text('di residenza:');
    }

    if ($("#banche_dati_ordine_datiProdotto_visuraPer_1").is(':checked')) {
        $('#provinciaComune').find('span').text('sede legale:');
        $('#indirizzo').find('span').text('sede legale:');
    }


    $("#banche_dati_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#banche_dati_ordine_datiProdotto_comune");
    });

    $('input[name="banche_dati_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

});


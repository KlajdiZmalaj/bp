$(window).on('load', function() {
    if ($("#ricerca_per_indirizzo_ordine_cliente_tipoCliente").length || $("#ricerca_per_indirizzo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#variServ'), {parziali: Tuttovisure.parziali});

    $('#altriServizi').find('input:checkbox').click(function() {
        $('#noSelection').addClass('hidden');
    });
    
    $('#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_1').logicaOpzioniProdotto(
      {
       'prefix_form': 'ricerca_per_indirizzo_ordine_',
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
        'clean': [
        ]
      }
    );

    $('#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_1').change(function() {
        if(!($(this).is(':checked'))) {
            $('#mandato').find('input:checkbox').prop('checked', false);
        }
    });
    
    $('#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_2').logicaOpzioniProdotto(
      {
        'prefix_form': 'ricerca_per_indirizzo_ordine_',
        'valori': {
            'visuraCatastale': {
                'mostra': [
                    'visuraCatastale'
                ],
                'obbligatori': [
                     'datiTipoDiImmobileVisura'
                ]
            }
        },
        'reset': [
            'visuraCatastale'
        ],
        'clean': [
        ]
      }
    );

    $('#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_2').change(function() {
        if(!($(this).is(':checked'))) {
            $('#visuraCatastale').find('input:radio').prop('checked', false);
        }
    });
    
    $('#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_3').logicaOpzioniProdotto(
      {
        'prefix_form': 'ricerca_per_indirizzo_ordine_',
        'valori': {
            'visuraIpocatastale': {
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

    $('#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_3').change(function() {
        if(!($(this).is(':checked'))) {
            $('#datiConservatorie').find('select').val(0);
        }
    });

    $('#datiImmobile').find('input:text').on('propertychange change keyup keypress input paste',function(){
        $('#variServ').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    });

    if ($('#datiImmobile').find('input:text').val() !== '') {
        $('#variServ').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    }


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

    $("#ricerca_per_indirizzo_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#ricerca_per_indirizzo_ordine_datiProdotto_comune");
    });
    
    
    $("#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_1").logicaOpzioniProdotto().refreshOpzioni();
    $("#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_2").logicaOpzioniProdotto().refreshOpzioni();
    $("#ricerca_per_indirizzo_ordine_opzioniProdotto_altro_3").logicaOpzioniProdotto().refreshOpzioni();
});
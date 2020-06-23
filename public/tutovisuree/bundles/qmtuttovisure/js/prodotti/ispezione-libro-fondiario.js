$(window).on('load', function() {
    if ($("#ispezione_libro_fondiario_ordine_cliente_tipoCliente").length || $("#ispezione_libro_fondiario_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#variServ'), {parziali: Tuttovisure.parziali});

    $('input[name="ispezione_libro_fondiario_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto(
        {
            'prefix_form': 'ispezione_libro_fondiario_ordine_',
            'valori': {
                'personaProprietaria': {
                    'mostra': [
                        'personaTitolo',
                        'datiPersona',
                        'ordine-urgenza',
                        'lingua',
                        'ricercaSu'
                    ],
                    'obbligatori': [
                        'ricercaSu'
                    ]
                },
                'aziendaIntestataria': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'ordine-urgenza',
                        'lingua',
                        'ricercaSu'
                    ],
                    'obbligatori': [
                        'ricercaSu'
                    ]
                },
                'particella': {
                    'mostra': [
                        'particellaTitolo',
                        'particella',
                        'ordine-urgenza',
                        'lingua',
                        'ricercaSu'
                    ],
                    'obbligatori': [
                        'ricercaSu'
                    ]
                },
                'partitaTavolare': {
                    'mostra': [
                        'partitaTitolo',
                        'partitaTavolare',
                        'variServ',
                        'altriServiziTitolo',
                        'ordine-urgenza',
                        'lingua',
                        'ricercaSu'
                    ],
                    'obbligatori': [
                        'ricercaSu'
                    ]
                }
            },
            'reset': [
                'aziendaTitolo',
                'personaTitolo',
                'particellaTitolo',
                'particella',
                'partitaTitolo',
                'partitaTavolare',
                'datiPersona',
                'datiAzienda',
                'ordine-urgenza',
                'lingua',
                'variServ',
                'altriServiziTitolo',
                'noSelection',
                'ricercaSu'
            ],
            'clean': [
            ]
        }
    );

    if (!$('#lingua').find('input:radio').is(':checked')) {
        $('#ispezione_libro_fondiario_ordine_datiProdotto_visuraInLingua_0').prop('checked', true);
    }

    $("input[name$='ispezione_libro_fondiario_ordine[datiProdotto][ricercaSu]']").change(function() {
        Tuttovisure.provinciaComune($(this), "#ispezione_libro_fondiario_ordine_datiProdotto_comune");
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

    $('input[name="ispezione_libro_fondiario_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto().refreshOpzioni();

});
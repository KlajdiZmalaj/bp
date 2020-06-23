$(window).on('load', function() {
    if ($("#servizio_cancellazione_protesti_ordine_cliente_tipoCliente").length || $("#servizio_cancellazione_protesti_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#tipoProtesto'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#ordine-urgenza'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('input[name="servizio_cancellazione_protesti_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
        {
            'valori': {
                'azienda': {
                    'mostra': [
                        'aziendaTitolo',
                        'datiAzienda',
                        'provinciaComune',
                        'ordine-urgenza',
                        'tipoProtestoTitolo',
                        'tipoProtesto',
                        'indicazioniAggiuntive',
                        'indirizzo',
                        'contatti',
                        'altroTitolo',
                        'altro0',
                        'altro1',
                        'altro2'
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
                        'tipoProtestoTitolo',
                        'tipoProtesto',
                        'indicazioniAggiuntive',
                        'indirizzo',
                        'contatti',
                        'altroTitolo',
                        'altro1',
                        'altro3'
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
                'tipoProtestoTitolo',
                'tipoProtesto',
                'indicazioniAggiuntive',
                'indirizzo',
                'contatti',
                'altroTitolo'
            ],
            'clean': [
            ]
        }
    );

    $("input[name$='servizio_cancellazione_protesti_ordine[datiProdotto][visuraPer]']").change(function() {
        if ($(this).val() === 'persona') {
            $('#provinciaComune').find('span').text('di residenza:');
            $('#indirizzo').find('span').text('di residenza:');
            $('#altro0').addClass('hidden');
            $('#altro0').find('input:checkbox').prop('checked',false);
            $('#altro2').addClass('hidden');
            $('#altro2').find('input:checkbox').prop('checked',false);
            $('#altro3').removeClass('hidden');
            Tuttovisure.Ordine.aggiornaParziali();
        }
        if ($(this).val() === 'azienda') {
            $('#provinciaComune').find('span').text('sede legale:');
            $('#indirizzo').find('span').text('sede legale:');
            $('#altro0').removeClass('hidden');
            $('#altro2').removeClass('hidden');
            $('#altro3').addClass('hidden');
            $('#altro3').find('input:checkbox').prop('checked',false);
            Tuttovisure.Ordine.aggiornaParziali();
        }
    });

    $("input[name$='servizio_cancellazione_protesti_ordine[opzioniProdotto][tipoProtesto]']").change(function() {
        if ($(this).val() === 'assegniCambialiOltreI12Mesi') {
            $('#numeroTitoli').removeClass('hidden');
            $('#consegnaCertificata').removeClass('hidden');
            $('#consegnaStandard').addClass('hidden');
        }
        if ($(this).val() === 'soloCambialiPagateEntro12Mesi') {
            $('#numeroTitoli').removeClass('hidden');
            $('#consegnaCertificata').addClass('hidden');
            $('#consegnaStandard').removeClass('hidden');
        }
    });

    if ($("#servizio_cancellazione_protesti_ordine_opzioniProdotto_tipoProtesto_0").is(':checked')){
        $('#consegnaCertificata').removeClass('hidden');
        $('#consegnaStandard').addClass('hidden');
    }
    else {
        $('#consegnaCertificata').addClass('hidden');
        $('#consegnaStandard').removeClass('hidden');
    }

        if ($("#servizio_cancellazione_protesti_ordine_opzioniProdotto_tipoProtesto_0").is(':checked') || $("#servizio_cancellazione_protesti_ordine_opzioniProdotto_tipoProtesto_1").is(':checked') ) {
        $('#numeroTitoli').removeClass('hidden');
    }
    else {
        $('#numeroTitoli').addClass('hidden');
    }

    if ($("#servizio_cancellazione_protesti_ordine_datiProdotto_visuraPer_0").is(':checked')) {
        $('#provinciaComune').find('span').text('di residenza:');
        $('#indirizzo').find('span').text('di residenza:');
        $('#altro0').find('input:checkbox').prop('checked',false);
        $('#altro0').addClass('hidden');
        $('#altro2').find('input:checkbox').prop('checked',false);
        $('#altro2').addClass('hidden');
        $('#altro3').removeClass('hidden');
        Tuttovisure.Ordine.aggiornaParziali();
    }

    if ($("#servizio_cancellazione_protesti_ordine_datiProdotto_visuraPer_1").is(':checked')) {
        $('#provinciaComune').find('span').text('sede legale:');
        $('#indirizzo').find('span').text('sede legale:');
        $('#altro0').removeClass('hidden');
        $('#altro2').removeClass('hidden');
        $('#altro3').find('input:checkbox').prop('checked', false);
        $('#altro3').addClass('hidden');
        Tuttovisure.Ordine.aggiornaParziali();
    }


    $("#servizio_cancellazione_protesti_ordine_opzioniProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#servizio_cancellazione_protesti_ordine_datiProdotto_comune");
    });
    if ($('#servizio_cancellazione_protesti_ordine_opzioniProdotto_provincia').val() !== '') {
        provinceComune('#servizio_cancellazione_protesti_ordine_opzioniProdotto_provincia', "#servizio_cancellazione_protesti_ordine_datiProdotto_comune");
    }

    $("#servizio_cancellazione_protesti_ordine_opzioniProdotto_provincia").change(function() {
        provinceComune('#servizio_cancellazione_protesti_ordine_opzioniProdotto_provincia', "#servizio_cancellazione_protesti_ordine_datiProdotto_comune");
    });


    $('input[name="servizio_cancellazione_protesti_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

    function provinceComune(tribunale, comune, message) {
        $(comune).prop('disabled', true);
        $.ajax({
            url: Routing.generate('qm_tuttovisure_tribunali_options', { tribunale : $(tribunale).val() }),
            dataType: "json",
            success: function(json) {
                if ($(tribunale).val() === '') {
                    $(comune).empty();
                    $(comune).trigger('change');
                    $(comune).prop('disabled', true);
                    $(comune).prop('required', false);
                    $(message).html('');
                } else {
                    $(comune).prop('disabled', false);
                    $(comune).prop('required', true);
                    $(comune).empty();
                    $(message).html('');
                    $(comune).append($('<option>').text('Seleziona il comune').prop('value', ""));
                    $.each(json, function(i, value) {
                        $(comune).append($('<option>').text(value.nome).prop('value', value.id));
                    });
                }

            },
            error: function(e) {
            }

        });
    }
});


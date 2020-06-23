$(window).on('load', function() {
    if ($("#pec_ordine_cliente_tipoCliente").length || $("#pec_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#confrontaPec'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    $('a[name="richiediStandard"]').click(function() {
        if ($('#pec_ordine_datiProdotto_durata_1:checked').length) {
            $('#pec_ordine_opzioniProdotto_scegli2Anni_0').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_2:checked').length){
             $('#pec_ordine_opzioniProdotto_scegli3Anni_0').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_3:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli4Anni_0').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_4:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli5Anni_0').trigger('click');
        } else {
            $('#pec_ordine_opzioniProdotto_scegli_0').trigger('click');
        }
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
    });

    $('a[name="richiediPro"]').click(function() {
        if ($('#pec_ordine_datiProdotto_durata_1:checked').length) {
            $('#pec_ordine_opzioniProdotto_scegli2Anni_1').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_2:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli3Anni_1').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_3:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli4Anni_1').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_4:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli5Anni_1').trigger('click');
        } else {
            $('#pec_ordine_opzioniProdotto_scegli_1').trigger('click');
        }
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
    });

    $('a[name="richiediPremium"]').click(function() {
        if ($('#pec_ordine_datiProdotto_durata_1:checked').length) {
            $('#pec_ordine_opzioniProdotto_scegli2Anni_2').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_2:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli3Anni_2').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_3:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli4Anni_2').trigger('click');
        } else if ($('#pec_ordine_datiProdotto_durata_4:checked').length){
            $('#pec_ordine_opzioniProdotto_scegli5Anni_2').trigger('click');
        } else {
            $('#pec_ordine_opzioniProdotto_scegli_2').trigger('click');
        }
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
    });

    $('#pec_ordine_datiProdotto_mailPec').on('propertychange change keyup keypress input paste', function () {
        $('#opzioniVarie').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#altro0').removeClass('hidden');
    });

    if($('#pec_ordine_datiProdotto_mailPec').val() !== '') {
        $('#opzioniVarie').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#altro0').removeClass('hidden');
    }

    if($('#pec_ordine_datiProdotto'))
    
    $('input[name="pec_ordine[datiProdotto][intestata]"]').logicaOpzioniProdotto(
      {
        'prefix_form': 'pec_ordine_',
        'valori': {
            'professionista': {
                'mostra': [
                    'professionistaTitolo',
                    'nomeProfessionista',
                    'cognomeProfessionista',
                    'datiAzienda',
                    'provinciaComune',
                    'piva',
                    'ordine-urgenza'
                ],
                'obbligatori': [

                ]
            },
            'azienda': {
                'mostra': [
                    'aziendaTitolo',
                    'ragioneSociale',
                    'datiAzienda',
                    'provinciaComune',
                    'piva',
                    'rappresentante',
                    'ordine-urgenza'
                ],
                'obbligatori': [

                ]
            },
            'aziendadacostituire': {
                'mostra': [
                    'aziendaTitolo',
                    'ragioneSociale',
                    'datiAzienda',
                    'provinciaComune',
                    'rappresentante',
                    'ordine-urgenza'
                ],
                 'obbligatori': [

                ]
            },
            'privato': {
                'mostra': [
                    'personaTitolo',
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza'
                ],
                 'obbligatori': [

                ]
            }
        },
        'reset': [
            'professionistaTitolo',
            'nomeProfessionista',
            'cognomeProfessionista',
            'ragioneSociale',
            'aziendaTitolo',
            'datiAzienda',
            'personaTitolo',
            'datiPersona',
            'provinciaComune',
            'rappresentante',
            'piva',
            'ordine-urgenza'
        ],
        'clean': [
        ]
      }
    );


    $("#pec_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#pec_ordine_datiProdotto_comune");
    });
    
    $('#scegli1Anno').find('input:radio').prop('required', true);
    var pec = null;

    if ($('#pec_ordine_opzioniProdotto_scegli2Anni_0:checked').length || $('#pec_ordine_opzioniProdotto_scegli_0:checked').length) {
        pec = '0';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli2Anni_1:checked').length || $('#pec_ordine_opzioniProdotto_scegli_1:checked').length) {
        pec = '1';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli2Anni_2:checked').length || $('#pec_ordine_opzioniProdotto_scegli_2:checked').length) {
        pec = '2';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli3Anni_0:checked').length || $('#pec_ordine_opzioniProdotto_scegli_0:checked').length) {
        pec = '0';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli3Anni_1:checked').length || $('#pec_ordine_opzioniProdotto_scegli_1:checked').length) {
        pec = '1';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli3Anni_2:checked').length || $('#pec_ordine_opzioniProdotto_scegli_2:checked').length) {
        pec = '2';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli4Anni_0:checked').length || $('#pec_ordine_opzioniProdotto_scegli_0:checked').length) {
        pec = '0';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli4Anni_1:checked').length || $('#pec_ordine_opzioniProdotto_scegli_1:checked').length) {
        pec = '1';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli4Anni_2:checked').length || $('#pec_ordine_opzioniProdotto_scegli_2:checked').length) {
        pec = '2';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli5Anni_0:checked').length || $('#pec_ordine_opzioniProdotto_scegli_0:checked').length) {
        pec = '0';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli5Anni_1:checked').length || $('#pec_ordine_opzioniProdotto_scegli_1:checked').length) {
        pec = '1';
    }

    if ($('#pec_ordine_opzioniProdotto_scegli5Anni_2:checked').length || $('#pec_ordine_opzioniProdotto_scegli_2:checked').length) {
        pec = '2';
    }
    
    $('input[name="pec_ordine[opzioniProdotto][scegli]"]').change(function() {
        var choice = $(this).val();

        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        if (choice == 'standard') {
            pec = '0';
        }
        if (choice == 'pro') {
            pec = '1';
        }
        if (choice == 'premium') {
            pec = '2';
        }
    });
    
    $('input[name="pec_ordine[opzioniProdotto][scegli2Anni]"]').change(function() {
        var choice = $(this).val();

        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        if (choice == 'standard2Anni') {
            pec = '0';
        }
        if (choice == 'pro2Anni') {
            pec = '1';
        }
        if (choice == 'premium2Anni') {
            pec = '2';
        }
    });

    $('input[name="pec_ordine[opzioniProdotto][scegli3Anni]"]').change(function() {
        var choice = $(this).val();

        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        if (choice == 'standard3Anni') {
            pec = '0';
        }
        if (choice == 'pro3Anni') {
            pec = '1';
        }
        if (choice == 'premium3Anni') {
            pec = '2';
        }
    });

    $('input[name="pec_ordine[opzioniProdotto][scegli4Anni]"]').change(function() {
        var choice = $(this).val();

        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        if (choice == 'standard4Anni') {
            pec = '0';
        }
        if (choice == 'pro4Anni') {
            pec = '1';
        }
        if (choice == 'premium4Anni') {
            pec = '2';
        }
    });

    $('input[name="pec_ordine[opzioniProdotto][scegli5Anni]"]').change(function() {
        var choice = $(this).val();

        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();

        if (choice == 'standard5Anni') {
            pec = '0';
        }
        if (choice == 'pro5Anni') {
            pec = '1';
        }
        if (choice == 'premium5Anni') {
            pec = '2';
        }

    });
    
    $('input[name="pec_ordine[datiProdotto][durata]"]').click(function() {
        var choice = $(this).val();
        
        if (choice == '1Anno') {
            if ($('#scegli1Anno').hasClass('hidden')) {

                $('#scegli2Anni').addClass('hidden');
                $('#scegli2Anni').find('input:radio').prop('required', false);
                $('#scegli2Anni').find('input:radio').prop('checked', false);
                $('#scegli3Anni').addClass('hidden');
                $('#scegli3Anni').find('input:radio').prop('required', false);
                $('#scegli3Anni').find('input:radio').prop('checked', false);
                $('#scegli4Anni').addClass('hidden');
                $('#scegli4Anni').find('input:radio').prop('required', false);
                $('#scegli4Anni').find('input:radio').prop('checked', false);
                $('#scegli5Anni').addClass('hidden');
                $('#scegli5Anni').find('input:radio').prop('required', false);
                $('#scegli5Anni').find('input:radio').prop('checked', false);

                $('#scegli1Anno').removeClass('hidden');
                $('#scegli1Anno').find('input:radio').prop('required', true);
                if (pec !== null) {
                    $('#pec_ordine_opzioniProdotto_scegli_' + pec).prop('checked', true);
                }
            }
        }
        if (choice == '2Anni') {
            if ($('#scegli2Anni').hasClass('hidden')) {

                $('#scegli1Anno').addClass('hidden');
                $('#scegli1Anno').find('input:radio').prop('required', false);
                $('#scegli1Anno').find('input:radio').prop('checked', false);
                $('#scegli3Anni').addClass('hidden');
                $('#scegli3Anni').find('input:radio').prop('required', false);
                $('#scegli3Anni').find('input:radio').prop('checked', false);
                $('#scegli4Anni').addClass('hidden');
                $('#scegli4Anni').find('input:radio').prop('required', false);
                $('#scegli4Anni').find('input:radio').prop('checked', false);
                $('#scegli5Anni').addClass('hidden');
                $('#scegli5Anni').find('input:radio').prop('required', false);
                $('#scegli5Anni').find('input:radio').prop('checked', false);

                $('#scegli2Anni').removeClass('hidden');
                $('#scegli2Anni').find('input:radio').prop('required', true);
                if (pec !== null) {
                    $('#pec_ordine_opzioniProdotto_scegli2Anni_' + pec).prop('checked', true);
                }
            }
        }
        if (choice == '3Anni') {
            if ($('#scegli3Anni').hasClass('hidden')) {

                $('#scegli1Anno').addClass('hidden');
                $('#scegli1Anno').find('input:radio').prop('required', false);
                $('#scegli1Anno').find('input:radio').prop('checked', false);
                $('#scegli2Anni').addClass('hidden');
                $('#scegli2Anni').find('input:radio').prop('required', false);
                $('#scegli2Anni').find('input:radio').prop('checked', false);
                $('#scegli4Anni').addClass('hidden');
                $('#scegli4Anni').find('input:radio').prop('required', false);
                $('#scegli4Anni').find('input:radio').prop('checked', false);
                $('#scegli5Anni').addClass('hidden');
                $('#scegli5Anni').find('input:radio').prop('required', false);
                $('#scegli5Anni').find('input:radio').prop('checked', false);

                $('#scegli3Anni').removeClass('hidden');
                $('#scegli3Anni').find('input:radio').prop('required', true);
                if (pec !== null) {
                    $('#pec_ordine_opzioniProdotto_scegli3Anni_' + pec).prop('checked', true);
                }
            }
        }
        if (choice == '4Anni') {
            if ($('#scegli4Anni').hasClass('hidden')) {

                $('#scegli1Anno').addClass('hidden');
                $('#scegli1Anno').find('input:radio').prop('required', false);
                $('#scegli1Anno').find('input:radio').prop('checked', false);
                $('#scegli2Anni').addClass('hidden');
                $('#scegli2Anni').find('input:radio').prop('required', false);
                $('#scegli2Anni').find('input:radio').prop('checked', false);
                $('#scegli3Anni').addClass('hidden');
                $('#scegli3Anni').find('input:radio').prop('required', false);
                $('#scegli3Anni').find('input:radio').prop('checked', false);
                $('#scegli5Anni').addClass('hidden');
                $('#scegli5Anni').find('input:radio').prop('required', false);
                $('#scegli5Anni').find('input:radio').prop('checked', false);

                $('#scegli4Anni').removeClass('hidden');
                $('#scegli4Anni').find('input:radio').prop('required', true);
                if (pec !== null) {
                    $('#pec_ordine_opzioniProdotto_scegli4Anni_' + pec).prop('checked', true);
                }
            }
        }
        if (choice == '5Anni') {
            if ($('#scegli5Anni').hasClass('hidden')) {

                $('#scegli1Anno').addClass('hidden');
                $('#scegli1Anno').find('input:radio').prop('required', false);
                $('#scegli1Anno').find('input:radio').prop('checked', false);
                $('#scegli2Anni').addClass('hidden');
                $('#scegli2Anni').find('input:radio').prop('required', false);
                $('#scegli2Anni').find('input:radio').prop('checked', false);
                $('#scegli3Anni').addClass('hidden');
                $('#scegli3Anni').find('input:radio').prop('required', false);
                $('#scegli3Anni').find('input:radio').prop('checked', false);
                $('#scegli4Anni').addClass('hidden');
                $('#scegli4Anni').find('input:radio').prop('required', false);
                $('#scegli4Anni').find('input:radio').prop('checked', false);

                $('#scegli5Anni').removeClass('hidden');
                $('#scegli5Anni').find('input:radio').prop('required', true);
                if (pec !== null) {
                    $('#pec_ordine_opzioniProdotto_scegli5Anni_' + pec).prop('checked', true);
                }
            }
        }
        Tuttovisure.Ordine.aggiornaParziali();
        
    });
    
    if ($('#pec_ordine_datiProdotto_durata_0:checked').length) {
        $('#scegli2Anni').addClass('hidden');
        $('#scegli2Anni').find('input:radio').prop('required', false);
        $('#scegli2Anni').find('input:radio').prop('checked', false);
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli3Anni').addClass('hidden');
        $('#scegli3Anni').find('input:radio').prop('required', false);
        $('#scegli3Anni').find('input:radio').prop('checked', false);
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli4Anni').addClass('hidden');
        $('#scegli4Anni').find('input:radio').prop('required', false);
        $('#scegli4Anni').find('input:radio').prop('checked', false);
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();
        $('#scegli5Anni').addClass('hidden');
        $('#scegli5Anni').find('input:radio').prop('required', false);
        $('#scegli5Anni').find('input:radio').prop('checked', false);
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        $('#scegli1Anno').removeClass('hidden');
        $('#scegli1Anno').find('input:radio').prop('required', true);
        if (pec !== null) {
            $('#pec_ordine_opzioniProdotto_scegli_' + pec).prop('checked', true);
        }
    } else if ($('#pec_ordine_datiProdotto_durata_1:checked').length) {
        $('#scegli1Anno').addClass('hidden');
        $('#scegli1Anno').find('input:radio').prop('required', false);
        $('#scegli1Anno').find('input:radio').prop('checked', false);
        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli3Anni').addClass('hidden');
        $('#scegli3Anni').find('input:radio').prop('required', false);
        $('#scegli3Anni').find('input:radio').prop('checked', false);
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli4Anni').addClass('hidden');
        $('#scegli4Anni').find('input:radio').prop('required', false);
        $('#scegli4Anni').find('input:radio').prop('checked', false);
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();
        $('#scegli5Anni').addClass('hidden');
        $('#scegli5Anni').find('input:radio').prop('required', false);
        $('#scegli5Anni').find('input:radio').prop('checked', false);
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        $('#scegli2Anni').removeClass('hidden');
        $('#scegli2Anni').find('input:radio').prop('required', true);
        if (pec !== null) {
            $('#pec_ordine_opzioniProdotto_scegli2Anni_' + pec).prop('checked', true);
        }
    } else if ($('#pec_ordine_datiProdotto_durata_2:checked').length) {
        $('#scegli1Anno').addClass('hidden');
        $('#scegli1Anno').find('input:radio').prop('required', false);
        $('#scegli1Anno').find('input:radio').prop('checked', false);
        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli2Anni').addClass('hidden');
        $('#scegli2Anni').find('input:radio').prop('required', false);
        $('#scegli2Anni').find('input:radio').prop('checked', false);
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli4Anni').addClass('hidden');
        $('#scegli4Anni').find('input:radio').prop('required', false);
        $('#scegli4Anni').find('input:radio').prop('checked', false);
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();
        $('#scegli5Anni').addClass('hidden');
        $('#scegli5Anni').find('input:radio').prop('required', false);
        $('#scegli5Anni').find('input:radio').prop('checked', false);
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        $('#scegli3Anni').removeClass('hidden');
        $('#scegli3Anni').find('input:radio').prop('required', true);
        if (pec !== null) {
            $('#pec_ordine_opzioniProdotto_scegli3Anni_' + pec).prop('checked', true);
        }
    } else if ($('#pec_ordine_datiProdotto_durata_3:checked').length) {
        $('#scegli1Anno').addClass('hidden');
        $('#scegli1Anno').find('input:radio').prop('required', false);
        $('#scegli1Anno').find('input:radio').prop('checked', false);
        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli2Anni').addClass('hidden');
        $('#scegli2Anni').find('input:radio').prop('required', false);
        $('#scegli2Anni').find('input:radio').prop('checked', false);
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli3Anni').addClass('hidden');
        $('#scegli3Anni').find('input:radio').prop('required', false);
        $('#scegli3Anni').find('input:radio').prop('checked', false);
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli5Anni').addClass('hidden');
        $('#scegli5Anni').find('input:radio').prop('required', false);
        $('#scegli5Anni').find('input:radio').prop('checked', false);
        $('#scegli5Anni').removeClass('alert-form');
        $('#scegli5Anni').removeClass('alert-danger-form');
        $('#scegli5Anni').find('.alert-message').remove();

        $('#scegli4Anni').removeClass('hidden');
        $('#scegli4Anni').find('input:radio').prop('required', true);
        if (pec !== null) {
            $('#pec_ordine_opzioniProdotto_scegli4Anni_' + pec).prop('checked', true);
        }
    } else if ($('#pec_ordine_datiProdotto_durata_4:checked').length) {
        $('#scegli1Anno').addClass('hidden');
        $('#scegli1Anno').find('input:radio').prop('required', false);
        $('#scegli1Anno').find('input:radio').prop('checked', false);
        $('#scegli1Anno').removeClass('alert-form');
        $('#scegli1Anno').removeClass('alert-danger-form');
        $('#scegli1Anno').find('.alert-message').remove();
        $('#scegli2Anni').addClass('hidden');
        $('#scegli2Anni').find('input:radio').prop('required', false);
        $('#scegli2Anni').find('input:radio').prop('checked', false);
        $('#scegli2Anni').removeClass('alert-form');
        $('#scegli2Anni').removeClass('alert-danger-form');
        $('#scegli2Anni').find('.alert-message').remove();
        $('#scegli3Anni').addClass('hidden');
        $('#scegli3Anni').find('input:radio').prop('required', false);
        $('#scegli3Anni').find('input:radio').prop('checked', false);
        $('#scegli3Anni').removeClass('alert-form');
        $('#scegli3Anni').removeClass('alert-danger-form');
        $('#scegli3Anni').find('.alert-message').remove();
        $('#scegli4Anni').addClass('hidden');
        $('#scegli4Anni').find('input:radio').prop('required', false);
        $('#scegli4Anni').find('input:radio').prop('checked', false);
        $('#scegli4Anni').removeClass('alert-form');
        $('#scegli4Anni').removeClass('alert-danger-form');
        $('#scegli4Anni').find('.alert-message').remove();

        $('#scegli5Anni').removeClass('hidden');
        $('#scegli5Anni').find('input:radio').prop('required', true);
        if (pec !== null) {
            $('#pec_ordine_opzioniProdotto_scegli5Anni_' + pec).prop('checked', true);
        }
    }else {
        $('#pec_ordine_datiProdotto_durata_0').prop('checked', true);
    }

    $('input[name="pec_ordine[datiProdotto][intestata]"]').logicaOpzioniProdotto().refreshOpzioni();

});

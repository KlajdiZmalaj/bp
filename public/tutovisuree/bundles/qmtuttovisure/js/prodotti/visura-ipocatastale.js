$(window).on('load', function() {
    if ($("#visura_ipocatastale_ordine_cliente_tipoCliente").length || $("#visura_ipocatastale_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#nonSo'), {parziali: Tuttovisure.parziali});
    
    $("input[name$='visura_ipocatastale_ordine[opzioniProdotto][visuraPer]']").logicaOpzioniProdotto( {
        'prefix_form': 'visura_ipocatastale_ordine_',
        'valori': {
            'immobile': {
                'mostra': [
                    'datiConservatorie',
                    'datiTipoDiImmobileVisura',
                    'datiImmobileTitolo',
                    'datiImmobile',
                    'datiProvinciaComune',
                    'altroTitolo',
                    'altro0',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza'
                ],
                'obbligatori': [
                    'datiConservatorie',
                    'datiTipoDiImmobileVisura'
                ]
            },
            'personaFisica': {
                'mostra': [
                    'datiConservatorie',
                    'datiPersona',
                    'altroTitolo',
                    'altro0',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza'
                ],
                 'obbligatori': [
                     'datiConservatorie'
                ]
            },
            'azienda': {
                'mostra': [
                    'datiConservatorie',
                    'datiAzienda',
                    'datiAziendaTitolo',
                    'altroTitolo',
                    'altro0',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza'
                ],
                 'obbligatori': [
                     'datiConservatorie'
                ]
            },
            'nota': {
                'mostra': [
                    'datiConservatorie',
                    'opzioniDatiNota',
                    'altroTitolo',
                    'altro0',
                    'ordine-urgenza',
                    'bloccoOrdineUrgenza'
                ],
                 'obbligatori': [
                     'datiConservatorie'
                ]
            }
        },
        'reset': [
            'datiConservatorie',
            'datiTipoDiImmobileVisura',
            'datiImmobileTitolo',
            'datiImmobile',
            'opzioniDatiNota',
            'datiProvinciaComune',
            'altroTitolo',
            'altro0',
            'ordine-urgenza',
            'bloccoOrdineUrgenza',
            'datiPersona',
            'datiAzienda',
            'datiAziendaTitolo'
        ],
        'clean': [

        ]
    });

    $("input[name$='visura_ipocatastale_ordine[opzioniProdotto][riferimentoNota]']").change(function() {
        if($(this).val() == 'immobileNota' ) {
            $('#datiPersona').addClass('hidden');
            $('#datiPersona').find('input').val('');
            $('#datiAzienda').addClass('hidden');
            $('#datiAzienda').find('input').val('');
            $('#datiAziendaTitolo').addClass('hidden');
        }
        if($(this).val() == 'personaFisicaNota' ) {
            $('#datiAzienda').addClass('hidden');
            $('#datiAzienda').find('input').val('');
            $('#datiAziendaTitolo').addClass('hidden');
            $('#datiProvinciaComune').addClass('hidden');
            $('#datiTipoDiImmobileVisura').addClass('hidden');
            $('#datiTipoDiImmobileVisura').find('input:radio').prop('checked', false);
            $('#datiTipoDiImmobileVisura').find('input:radio').prop('required', false);
            $('#datiImmobile').addClass('hidden');
            $('#datiImmobile').find('input').val('');
            $('#datiImmobileTitolo').addClass('hidden');
        }
        if($(this).val() == 'aziendaNota' ) {
            $('#datiPersona').addClass('hidden');
            $('#datiPersona').find('input').val('');
            $('#datiTipoDiImmobileVisura').addClass('hidden');
            $('#datiTipoDiImmobileVisura').find('input:radio').prop('checked', false);
            $('#datiTipoDiImmobileVisura').find('input:radio').prop('required', false);
            $('#datiImmobile').addClass('hidden');
            $('#datiImmobile').find('input').val('');
            $('#datiImmobileTitolo').addClass('hidden');
        }
        if($(this).val() == 'nonLoSoNota' ) {
            $('#datiPersona').addClass('hidden');
            $('#datiPersona').find('input').val('');
            $('#datiTipoDiImmobileVisura').addClass('hidden');
            $('#datiTipoDiImmobileVisura').find('input:radio').prop('checked', false);
            $('#datiTipoDiImmobileVisura').find('input:radio').prop('required', false);
            $('#datiImmobile').addClass('hidden');
            $('#datiImmobile').find('input').val('');
            $('#datiImmobileTitolo').addClass('hidden');
            $('#datiAzienda').addClass('hidden');
            $('#datiAzienda').find('input').val('');
            $('#datiAziendaTitolo').addClass('hidden');
        }
    });

    $("input[name$='visura_ipocatastale_ordine[opzioniProdotto][riferimentoNota]']").logicaOpzioniProdotto( {
        'prefix_form': 'visura_ipocatastale_ordine_',
        'valori': {
            'immobileNota': {
                'mostra': [
                    'datiTipoDiImmobileVisura',
                    'datiImmobileTitolo',
                    'datiImmobile',
                    'datiProvinciaComune'
                ],
                'obbligatori': [
                    'datiTipoDiImmobileVisura'
                ]
            },
            'personaFisicaNota': {
                'mostra': [
                    'datiPersona'
                ],
                 'obbligatori': [
                ]
            },
            'aziendaNota': {
                'mostra': [
                    'datiAzienda',
                    'datiAziendaTitolo',
                    'datiProvinciaComune'
                ],
                 'obbligatori': [

                ]
            },
            'nonLoSoNota': {
                'mostra': [

                ],
                 'obbligatori': [

                ]
            }
        },
        'reset': [
        ],
        'clean': [

        ]
    });
    
    
    $("#visura_ipocatastale_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#visura_ipocatastale_ordine_datiProdotto_comune");
    });

    if ($('#visura_ipocatastale_ordine_opzioniProdotto_visuraPer_3').is(':checked')) {
        $('#opzioniDatiNota').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#altro0').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#bloccoOrdineUrgenza').removeClass('hidden');
        $('#datiConservatorie').removeClass('hidden');
    } else {
        $("input[name$='visura_ipocatastale_ordine[opzioniProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();
    }

    $("input[name$='visura_ipocatastale_ordine[opzioniProdotto][riferimentoNota]']").logicaOpzioniProdotto().refreshOpzioni();

});
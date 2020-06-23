$(window).on('load', function() {
    if ($("#visura_protesti_uso_riabilitazione_ordine_cliente_tipoCliente").length || $("#visura_protesti_uso_riabilitazione_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});

    $("input[name$='visura_protesti_uso_riabilitazione_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto( {
        'valori': {
            'persona': {
                'mostra': [
                    'datiPersona',
                    'ordine-urgenza',
                    'opzioniSpedizione'
                ],
                 'obbligatori': [
                     'personaOpzioni'
                ]
            },
            'azienda': {
                'mostra': [
                    'datiAzienda',
                    'aziendaTitolo',
                    'ordine-urgenza',
                    'opzioniSpedizione'
                ],
                 'obbligatori': [
                     'aziendaOpzioni'
                ]
            }
        },
        'reset': [
            'datiPersona',
            'personaTitolo',      
            'datiAzienda',
            'aziendaTitolo',
            'ordine-urgenza',
            'opzioniSpedizione'
        ],
        'clean': [

        ]
    });
    
    $("input[name$='visura_protesti_uso_riabilitazione_ordine[datiProdotto][visuraPer]']").change(function() {
        $('#altro').addClass('hidden');
        $('#altroTitolo').addClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altro').find('input:checkbox').prop('checked', false);
        Tuttovisure.Ordine.aggiornaParziali();
    });
    
    $("input[name$='visura_protesti_uso_riabilitazione_ordine[datiProdotto][visuraPer]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='visura_protesti_uso_riabilitazione_ordine[spedizione][spedizione_nazionale]']").change(function () {
        if ($(this).val() == "internazionale") {
            $('.spedizione_internazionale').removeClass('hidden');
            $('.spedizione_internazionale').children('.form-control').removeClass('hidden');
            $('.spedizione_internazionale').find('input:radio').prop('required', true);
        } else {
            $('.spedizione_internazionale').addClass('hidden');
            $('.spedizione_internazionale').children('.form-control').addClass('hidden');
            $('.spedizione_internazionale').find('input:radio').prop('required', false);
            $('.spedizione_internazionale').find('select').val('');

        }
        Tuttovisure.Ordine.aggiornaParziali();
    });

    if ($("#visura_protesti_uso_riabilitazione_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
        $('.spedizione_internazionale').removeClass('hidden');
        $('.spedizione_internazionale').children('.form-control').removeClass('hidden');
        $('.spedizione_internazionale').find('input:radio').prop('required', true);
    } else {
        $('.spedizione_internazionale').addClass('hidden');
        $('.spedizione_internazionale').children('.form-control').addClass('hidden');
        $('.spedizione_internazionale').find('input:radio').prop('required', false);
        $('.spedizione_internazionale').find('select').val('');
    }

});


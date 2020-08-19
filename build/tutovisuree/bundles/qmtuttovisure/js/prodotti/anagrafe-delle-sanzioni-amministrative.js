$(window).on('load', function() {
    if ($("#anagrafe_delle_sanzioni_amministrative_ordine_cliente_tipoCliente").length || $("#anagrafe_delle_sanzioni_amministrative_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#visuraCamerale'), {parziali: Tuttovisure.parziali});

    $("#anagrafe_delle_sanzioni_amministrative_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#anagrafe_delle_sanzioni_amministrative_ordine_datiProdotto_comune");
    });

    $("input[name$='anagrafe_delle_sanzioni_amministrative_ordine[opzioniProdotto][scegliCertificato]']").logicaOpzioniProdotto( {
        'valori': {
            'certificatoAnagrafeDelleSanzioniAmministrative': {
                'mostra': [
                    'datiAzienda',
                    'provinciaComune',
                    'visuraCamerale',
                    'opzioniSpedizione',
                    'ordine-urgenza'
                ],
                'obbligatori': [
                    'opzioniSpedizione'
                ]
            },
            'visuraAnagrafeDelleSanzioniAmministrative': {
                'mostra': [
                    'datiAzienda',
                    'provinciaComune',
                    'visuraCamerale',
                    'opzioniSpedizione',
                    'ordine-urgenza'
                ],
                'obbligatori': [
                    'opzioniSpedizione'
                ]
            },
            'certificatoAnagrafeDeiCarichiPendentiDegliIllecitiAmministrativi': {
                'mostra': [
                    'datiAzienda',
                    'provinciaComune',
                    'visuraCamerale',
                    'opzioniSpedizione',
                    'ordine-urgenza'
                ],
                'obbligatori': [
                    'opzioniSpedizione'
                ]
            },
        },
        'reset': [
            'datiAzienda',
            'provinciaComune',
            'visuraCamerale',
            'opzioniSpedizione',
            'ordine-urgenza'
        ],
        'clean': [

        ]
    });


    $("input[name$='anagrafe_delle_sanzioni_amministrative_ordine[opzioniProdotto][scegliCertificato]']").logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='anagrafe_delle_sanzioni_amministrative_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#anagrafe_delle_sanzioni_amministrative_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


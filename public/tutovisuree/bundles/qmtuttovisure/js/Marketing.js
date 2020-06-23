$(document).ready(function () {

    if ($('#qm_tuttovisure_marketing_trovareNuoviClienti').is(':not(:checked)')) {
        $('#codiceAttivita').addClass('hidden');
        $('#ricercaSuTuttaItalia').addClass('hidden');
        $('#dimensioneAzienda').addClass('hidden');
        $('#ulterioriInformazioni').addClass('hidden');
        $('#nuovoMercato').addClass('hidden');
    }

    $('#qm_tuttovisure_marketing_trovareNuoviClienti').change(function () {
        if ($(this).is(':checked')) {
            $('#codiceAttivita').removeClass('hidden');
            $('#ricercaSuTuttaItalia').removeClass('hidden');
            $('#dimensioneAzienda').removeClass('hidden');
            $('#ulterioriInformazioni').removeClass('hidden');
            $('#nuovoMercato').removeClass('hidden');
            $('#box-vuoto').addClass('hidden');
        }else{
            $('#codiceAttivita').addClass('hidden');
            $('#ricercaSuTuttaItalia').addClass('hidden');
            $('#dimensioneAzienda').addClass('hidden');
            $('#ulterioriInformazioni').addClass('hidden');
            $('#nuovoMercato').addClass('hidden');
            $('#box-vuoto').removeClass('hidden');
        }
    });

    if ($('#qm_tuttovisure_marketing_portaFoglioClienti').is(':not(:checked)')) {
        $('#numeroClienti').addClass('hidden');
    }

    $('#qm_tuttovisure_marketing_portaFoglioClienti').change(function () {
        if ($(this).is(':checked')) {
            $('#numeroClienti').removeClass('hidden');
        }else{
            $('#numeroClienti').addClass('hidden');
        }
    })
});
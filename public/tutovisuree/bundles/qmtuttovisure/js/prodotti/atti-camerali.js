$(window).on('load', function() {
    if ($("#atti_camerali_ordine_cliente_tipoCliente").length || $("#atti_camerali_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#attoStipulato'), {parziali: Tuttovisure.parziali});

    $('#atti_camerali_ordine_datiProdotto_tipoDiAtto').change(function() {
        if ($('#atti_camerali_ordine_datiProdotto_tipoDiAtto').val() === "altro"){
            $('#specifica').removeClass('hidden');
        }
        else {
            $('#specifica').addClass('hidden');

        }
        if ($('#atti_camerali_ordine_opzioniProdotto_attoStipulato').is(':checked')){
            $('#dataStipulazioneContratto').addClass('hidden');
        }
        else {
            $('#dataStipulazioneContratto').removeClass('hidden');
        }
        $('#datiAzienda').removeClass('hidden');
        $('#attoStipulato').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#linkVisuraCamerale').removeClass('hidden');
        $('#altro0').removeClass('hidden');
    });

    if ($('#atti_camerali_ordine_datiProdotto_tipoDiAtto').val() !== "Seleziona")
    {
        if ($('#atti_camerali_ordine_datiProdotto_tipoDiAtto').val() === "altro") {
            $('#specifica').removeClass('hidden');
        }
        else {
            $('#specifica').addClass('hidden');
        }
        if ($('#atti_camerali_ordine_opzioniProdotto_attoStipulato').is(':checked')){
            $('#dataStipulazioneContratto').addClass('hidden');
        }
        else {
            $('#dataStipulazioneContratto').removeClass('hidden');
        }
        $('#datiAzienda').removeClass('hidden');
        $('#attoStipulato').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
        $('#altroTitolo').removeClass('hidden');
        $('#linkVisuraCamerale').removeClass('hidden');
        $('#altro0').removeClass('hidden');
    }

    $('#atti_camerali_ordine_opzioniProdotto_attoStipulato').change(function() {
        if ($('#atti_camerali_ordine_opzioniProdotto_attoStipulato').is(':checked')){
            $('#dataStipulazioneContratto').addClass('hidden');
        }
        else {
            $('#dataStipulazioneContratto').removeClass('hidden');
        }
    });

    if ($('#atti_camerali_ordine_opzioniProdotto_attoStipulato').is(':checked')){
        $('#dataStipulazioneContratto').addClass('hidden');
    }
    else {
        $('#dataStipulazioneContratto').removeClass('hidden');
    }
});
$(window).on('load', function () {
    if ($("#tipoCliente").length || $("#bonifico").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function provinciaComune(provincia, comune, message) {
    $(comune).prop('disabled', true);
    $.ajax({
        url: Routing.generate('qm_tuttovisure_comuni_options', {provincia: $(provincia).val()}),
        dataType: "json",
        success: function (json) {
            if ($(provincia).is('input:radio')) {
                if ($(this).find(':checked')) {
                    $(comune).prop('disabled', false);
                    $(comune).prop('required', true);
                    $(comune).empty();
                    $(message).html('');
                    $(comune).append($('<option>').text('Seleziona il comune').prop('value', ""));
                    $.each(json, function (i, value) {
                        $(comune).append($('<option>').text(value.nome).prop('value', value.id));
                    });
                } else {
                    $(comune).empty();
                    $(comune).trigger('change');
                    $(comune).prop('disabled', true);
                    $(comune).prop('required', false);
                    $(message).html('');
                }
            }
            if ($(provincia).is('select')) {
                if ($(provincia).val() === '') {
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
                    $.each(json, function (i, value) {
                        $(comune).append($('<option>').text(value.nome).prop('value', value.id));
                    });
                }
            }
        },
        error: function (e) {
            //alert($(provincia).val());
        }

    });
}

function personaFisica_step2() {
    $("#datiCliente").removeClass('hidden');
    $("#datiPersona").removeClass('hidden');
    $("#codiceFiscaleCliente").find('input:text').prop('required', true);
    $("#datiAzienda").addClass('hidden');
    $("#datiAzienda").find('input:text').prop('required', false);
    $("#datiAzienda").find('input:text').val('');
    $("#pIvaSettore").addClass('hidden');
    $("#pIvaSettore").find('input:text').prop('required', false);
    $("#pIvaSettore").find('input:text').val('');
    $("#pIvaSettore").find('select').val(0);
    $("#email").find('input:text').prop('required', true);

}

function azienda_step2() {
    $("#datiCliente").removeClass('hidden');
    $("#datiAzienda").removeClass('hidden');
    $("#partitaIva").find('input:text').prop('required', true);
    $("#datiPersona").addClass('hidden');
    $("#datiPersona").find('input:text').prop('required', false);
    $("#datiPersona").find('input:text').val('');
    $("#pIvaSettore").removeClass('hidden');
    $("#email").find('input:text').prop('required', true);

}

function professionista_step2() {
    $("#datiCliente").removeClass('hidden');
    $("#datiPersona").removeClass('hidden');
    $("#codiceFiscaleCliente").removeClass('hidden');
    $("#codiceFiscaleCliente").find('input:text').prop('required', true);
    $("#datiAzienda").addClass('hidden');
    $("#datiAzienda").find('input:text').prop('required', false);
    $("#datiAzienda").find('input:text').val('');
    $("#pIvaSettore").removeClass('hidden');
    $("#partitaIva").find('input:text').prop('required', true);
    $("#email").find('input:text').prop('required', true);


    // $("#iscrizione_clientebusiness_codiceFiscale").blur(function () {
    //     if ($(this).val() !== '') {
    //         $("#iscrizione_clientebusiness_partitaIva").prop("required", false);
    //         $('#partitaIva').find("div[class*='col-md-7']").removeClass('req');
    //         $('#partitaIva').removeClass('alert-form');
    //         $('#partitaIva').removeClass('alert-danger-form');
    //         $('#partitaIva').find('.alert-message').remove();
    //     } else {
    //         $("#iscrizione_clientebusiness_partitaIva").prop("required", true);
    //         $('#partitaIva').find("div[class*='col-md-7']").addClass('req');
    //     }
    // });
    //
    // if ($("#iscrizione_clientebusiness_codiceFiscale").val() !== '') {
    //     $("#iscrizione_clientebusiness_partitaIva").prop("required", false);
    //     $('#partitaIva').find("div[class*='col-md-7']").removeClass('req');
    //     $('#partitaIva').removeClass('alert-form');
    //     $('#partitaIva').removeClass('alert-danger-form');
    //     $('#partitaIva').find('.alert-message').remove();
    // } else {
    //     $("#iscrizione_clientebusiness_partitaIva").prop("required", true);
    //     $('#partitaIva').find("div[class*='col-md-7']").addClass('req');
    // }
    //
    // $("#iscrizione_clientebusiness_partitaIva").blur(function () {
    //     if ($(this).val() !== '') {
    //         $("#iscrizione_clientebusiness_codiceFiscale").prop("required", false);
    //         $('#codiceFiscaleCliente').find("div[class*='col-md-7']").removeClass('req');
    //         $('#codiceFiscaleCliente').removeClass('alert-form');
    //         $('#codiceFiscaleCliente').removeClass('alert-danger-form');
    //         $('#codiceFiscaleCliente').find('.alert-message').remove();
    //     } else {
    //         $("#iscrizione_clientebusiness_codiceFiscale").prop("required", true);
    //         $('#codiceFiscaleCliente').find("div[class*='col-md-7']").addClass('req');
    //     }
    // });
    //
    // if ($("#iscrizione_clientebusiness_partitaIva").val() !== '') {
    //     $("#iscrizione_clientebusiness_codiceFiscale").prop("required", false);
    //     $('#codiceFiscaleCliente').find("div[class*='col-md-7']").removeClass('req');
    //     $('#codiceFiscaleCliente').removeClass('alert-form');
    //     $('#codiceFiscaleCliente').removeClass('alert-danger-form');
    //     $('#codiceFiscaleCliente').find('.alert-message').remove();
    // } else {
    //     $("#iscrizione_clientebusiness_codiceFiscale").prop("required", true);
    //     $('#codiceFiscaleCliente').find("div[class*='col-md-7']").addClass('req');
    // }
}

$(document).ready(function () {
    $('.disabled').prop('disabled', true);
    $('#iscrizione_clientebusiness_comune').empty();
    $('#iscrizione_clientebusiness_provincia').val('');

    $("#iscrizione_clientebusiness_provincia").change(function () {
        provinciaComune($(this), "#iscrizione_clientebusiness_comune");
    });


    $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        autoSize: false,
        beforeLoad: function () {
            this.width = parseInt(this.element.data('fancybox-width'));
            this.height = parseInt(this.element.data('fancybox-height'));
            $('#pdf-iframe').attr('src', this.element.data('pdf'));
        }
    });

    $('#modRichiesta').click(function () {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        return false;
    });

    $('#modBar').click(function () {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop: topRichiesta}, 0);
        return false;
    });

    $('#topInfo').click(function () {
        var cosae = $('#cosae').offset().top;
        $('html, body').animate({scrollTop: parseInt(cosae - 100)}, 0);
        return false;
    });

    $('#mobileSubmit').click(function () {
        $("button[name$='formButtonAvanti']").click();
    });


    if ($("#iscrizione_clientebusiness_tipoCliente_0").prop('checked')) {
        personaFisica_step2();
    }

    if ($("#iscrizione_clientebusiness_tipoCliente_1").prop('checked')) {
        azienda_step2();
    }

    if ($("#iscrizione_clientebusiness_tipoCliente_2").prop('checked')) {
        professionista_step2();
    }

    $("input[name$='iscrizione_clientebusiness[tipoCliente]']").click(function () {
        var radio_value = $(this).val();
        $('#partitaIva').find("div[class*='col-md-7']").addClass('req');
        $('#codiceFiscaleCliente').find("div[class*='col-md-7']").addClass('req');
        if (radio_value == 'persona_fisica') {
            personaFisica_step2();
        }

        if (radio_value == 'azienda') {
            azienda_step2();
        }

        if (radio_value == 'professionista') {
            professionista_step2();
        }
    });
});

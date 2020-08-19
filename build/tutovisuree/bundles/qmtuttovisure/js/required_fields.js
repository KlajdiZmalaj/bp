function checkFields(e)
{

    var first = true;

    $(".req").each(function ()
    {
        var field = {};

        var emailRegex = /^(\s*[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z+-])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}\s*)$/;

        $(this).is(':visible') ? field.visible = true : field.visible = false;

        // if($('#' + $(this).attr('id') + '_codiceFiscale').val().length!==16)
        // {
        //     field.message = 'testset';
        // }

        if ($(this).find('input').length || $(this).find('textarea').length) {
            var inputType = $(this).find('input');
            var textareaType = $(this).find('textarea');

            if ($(inputType).is(':disabled')) {
                field.disabled = true;
            }

            if ($(this).attr('class').indexOf('email') >= 0) {
                field.type = 'email';
            }

            if ($(this).find('textarea').length) {
                $(textareaType).val() == '' ? field.message = 'Compila questo campo:' : field.compiled = true;
            }

            if ($(this).attr('id') == 'altriServizi') {
                !$(inputType).is(':checked') ? field.type = 'altriServizi' : field.compiled = true;
            } else {
                if ($(inputType).is(':radio')) {
                    !$(inputType).is(':checked') ? field.message = 'Seleziona una di queste opzioni:' : field.compiled = true;
                }

                if ($(inputType).is(':checkbox')) {
                    !$(inputType).is(':checked') ? field.message = 'Seleziona questa casella se intendi procedere:' : field.compiled = true;
                }

                if ($(inputType).is(':text')) {
                    $(inputType).val() == '' ? field.message = 'Compila questo campo:' : field.compiled = true;
                }

                if (field.type == 'email' && field.compiled == true && !emailRegex.test($(inputType).val())) {
                    field.message = 'Inserisci un indirizzo email valido:';
                    field.wrongEmail = true;
                }
            }
        } else {
            if ($(this).find('select').is(':disabled')) {
                field.disabled = true;
            }
            if ($(this).find('select')) {
                field.type = 'select';
            }

            $(this).find('select').val() == 0 || $(this).find('select').val() == '' ? field.message = "Seleziona un elemento nell'elenco:" : field.compiled = true;
        }

        $(this).closest("div[class*='row']").hasClass('alert-form') ? field.alert = true : field.alert = false;


        if (field.visible && (!field.compiled || (field.compiled && field.wrongEmail)) && !field.disabled) {
            if (first) {
                e.preventDefault();
                $('html, body').animate({scrollTop: $(this).closest("div[class*='row']").offset().top - 120}, 300);
                first = false;
            }

            if (field.type === 'altriServizi') {
                $('#noSelection').removeClass('hidden');
            } else {
                if (!field.alert) {
                    $(this).closest("div[class*='row']").addClass('alert-form');
                    $(this).closest("div[class*='row']").addClass('alert-danger-form');
                    $(this).closest("div[class*='row']").prepend("<span class='alert-message'>" + field.message + "</span>");
                }
            }
        } else {
            if (field.visible && field.type == 'select' && !field.disabled) {
                if ($(this).attr('id') == 'atti_camerali_ordine_datiProdotto_dataStipulazioneContratto') {
                    var day = $('#atti_camerali_ordine_datiProdotto_dataStipulazioneContratto_day');
                    var month = $('#atti_camerali_ordine_datiProdotto_dataStipulazioneContratto_month');
                    var year = $('#atti_camerali_ordine_datiProdotto_dataStipulazioneContratto_year');

                    if (day.val() == '' || month.val() == '' || year.val() == '') {
                        e.preventDefault();
                        $('html, body').animate({scrollTop: $(this).closest("div[class*='row']").offset().top}, 300);
                    }
                }
            }
        }

    });
}

function removeAlerts(field)
{
    $(field).find("div[class*='alert-form']").length ? $(field).find("div[class*='alert-form']").removeClass('alert-form') : $(field).closest("div[class*='alert-form']").removeClass('alert-form');

    $(field).find("div[class*='alert-danger-form']").length ? $(field).find("div[class*='alert-danger-form']").removeClass('alert-danger-form') : $(field).closest("div[class*='alert-danger-form']").removeClass('alert-danger-form');

    $(field).find("div[class*='row']").find('.alert-message').length ? $(field).find("div[class*='row']").find('.alert-message').remove() : $(field).closest("div[class*='row']").find('.alert-message').remove();

}

$(document).ready(function ()
{
    $("form").on('propertychange change keyup keypress input paste', function ()
    {
        $(".req").each(function ()
        {
            if ($(this).find('input').length || $(this).find('textarea').length) {
                var inputType = $(this).find('input');
                var textareaType = $(this).find('textarea');

                if ($(this).attr('id') == 'altriServizi') {
                    $(this).click(function ()
                    {
                        $(inputType).is(':checkbox') && $(inputType).is(':checked') ? $('#noSelection').addClass('hidden') : null;
                    });
                } else {
                    $(inputType).is(':radio') && $(inputType).is(':checked') ? removeAlerts(this) : null;
                    $(inputType).is(':checkbox') && $(inputType).is(':checked') ? removeAlerts(this) : null;
                    $(inputType).is(':text') && $(inputType).val() !== '' ? removeAlerts(this) : null;
                    $(textareaType).length && $(textareaType).val() !== '' ? removeAlerts(this) : null;
                }

                //removeAlerts(this);
            }

            if ($(this).is('select')) {
                //alert($(this).attr('id') + '  ' + $(this).val());
                var valore = $(this).val();
                if ($(this).val() != '') {
                    removeAlerts(this);
                }
            }

            if ($(this).attr('id') == 'atti_camerali_ordine_datiProdotto_dataStipulazioneContratto') {
                var day = $('#atti_camerali_ordine_datiProdotto_dataStipulazioneContratto_day');
                var month = $('#atti_camerali_ordine_datiProdotto_dataStipulazioneContratto_month');
                var year = $('#atti_camerali_ordine_datiProdotto_dataStipulazioneContratto_year');

                if (day.val() != '' && month.val() != '' && year.val() != '') {
                    removeAlerts(this);
                }
            }
        });
    });

    $('button[name="formButtonAvanti"], button[name="formButtonCompleta"], #contatti-invia, #contatto_veloce_invia').click(function (e)
    {
        checkFields(e);
    });
});

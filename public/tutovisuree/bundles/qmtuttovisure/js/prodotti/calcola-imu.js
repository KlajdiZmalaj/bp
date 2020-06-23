function calcolaImu() {
    var tipologiaImmobile = $('#calcolo_imu_tipologiaImmobile').val();
    var renditaCatastale = accounting.unformat($('#calcolo_imu_renditaCatastale').val());
    var aliquotaComunale = $('#calcolo_imu_aliquotaComunale').val();
    var quotaDiPossesso = $('#calcolo_imu_quotaDiPossesso').val();
    var mesiDiPossesso = $('#calcolo_imu_mesiDiPossesso').val();

    $.ajax({
        url: Routing.generate('calcoloimu_calcola', {
            tipologiaImmobile: tipologiaImmobile,
            renditaCatastale: renditaCatastale,
            aliquotaComunale: aliquotaComunale,
            quotaDiPossesso: quotaDiPossesso,
            mesiDiPossesso: mesiDiPossesso
        }),
        dataType: "json",
        beforeSend: function() {
            $('#risultato').html("<img src='/bundles/qmtuttovisure/img/ajax_loader_small.gif' />");
        },
        success: function (json) {
            $.each(json, function (i, value) {
                $('#calcolo_imu_totale').val(value);
                $("#risultato").find('span').remove();
                $("#risultato").find('img').remove();
                $("#risultato").append(accounting.formatMoney($('#calcolo_imu_totale').val()));

            });
        },
        error: function () {
            alert("Impossibile calcolare l'IMU!");
        }
    });
}


$(document).ready(function () {

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

    accounting.settings = {
        currency: {
            symbol: "€ ",
            format: "%s%v",
            decimal: ",",
            thousand: ".",
            precision: 2
        },
        number: {
            precision: 0,
            thousand: ".",
            decimal: ","
        }
    }

    $('#calcolo_imu_renditaCatastale').val(accounting.formatMoney(0));

    $('#calcolo_imu_renditaCatastale').donetyping(function () {
        var value = accounting.formatMoney($(this).val());
        $(this).val(value);
    });

    $('#calcolo_imu_aliquotaComunale').donetyping(function () {
        var value = parseFloat($(this).val().replace(/\s/g, "").replace(",", "."));
        $(this).val(value);
    });

    $('#calcolo_imu_calcola').click(function (e) {
        checkFields(e);
        if (!e.isDefaultPrevented()) {
            $("table[name$='prezzoBase']").addClass("hidden");
            $("table[name$='riepilogo']").removeClass("hidden");
            calcolaImu();
        }
    });

    $('#calcolo_imu_invia').click(function (e) {
        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!emailRegex.test($("input[id*='emailImu']").val())) {
            e.preventDefault();
            if (!$("input[id*='emailImu']").closest("td").hasClass('alert-form')) {
                $("input[id*='emailImu']").closest("td").addClass('alert-form');
                $("input[id*='emailImu']").closest("td").addClass('alert-danger-form');
                $("input[id*='emailImu']").closest("td").prepend("<span class='alert-message'>Inserisci un indirizzo email valido:</span>");
            }
        }
    });

    $('#calcolo_imu_emailImu').on('propertychange change keyup keypress input paste', function () {
        $("input[id*='emailImu']").closest("td").removeClass('alert-form');
        $("input[id*='emailImu']").closest("td").removeClass('alert-danger-form');
        $("input[id*='emailImu']").closest("td").find('.alert-message').remove();
    });

    $('#calcolo_imu_reset').click(function () {
        $("table[name$='prezzoBase']").removeClass("hidden");
        $("table[name$='riepilogo']").addClass("hidden");
        $("#risultato").find('span').html('');
        $("#risultato").find('img').remove();
        $('#calcolo_imu_renditaCatastale').val(accounting.formatMoney(0));
        $('#calcolo_imu_emailImu').val('');
        $('#calcolo_imu_tipologiaImmobile').val(0);
        $('#calcolo_imu_aliquotaComunale').val('');
        $('#calcolo_imu_quotaDiPossesso').val('100');
        $('#calcolo_imu_mesiDiPossesso').val(12);
        $('#calcolo_imu_totale').val('');
    });
});


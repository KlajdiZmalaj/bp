jQuery(function () {

    class ModaleWait
    {
        constructor()
        {
            this.pleaseWaitDiv = $('<div class="modal fade" id="privacy" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="privacy" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <h2><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Caricamento in corso...</h2> </div> </div> </div> </div>');
        }

        showPleaseWait()
        {
            this.pleaseWaitDiv.modal();
        }

        hidePleaseWait()
        {
            this.pleaseWaitDiv.modal('hide');
        }
    }

    function alertBoxSconto()
    {
        var boxId = "#codice-sconto-alert-box";
        var alertClass = "alert-form alert-danger-form";
        var alertMessaggeSelector = "#codice-sconto-alert-box .alert-message";
        $(boxId).addClass(alertClass);
        $(alertMessaggeSelector).removeClass("hidden");
    }

    function clearBoxScontoAlert()
    {
        var boxId = "#codice-sconto-alert-box";
        var alertClass = "alert-form alert-danger-form";
        var alertMessaggeSelector = "#codice-sconto-alert-box .alert-message";
        $(boxId).removeClass(alertClass);
        $(alertMessaggeSelector).addClass("hidden");
    }

    function hideBoxSconto()
    {
        $('#codice-sconto-alert-box-parent').addClass('hidden');
    }

    function updateRiepilogoStep()
    {
        const boxRiepiolgo = $('#riepilogo');
        if(!boxRiepiolgo.attr('pagaOrdineFlag')) {
            Tuttovisure.Ordine.bindRiepilogo();
            Tuttovisure.Ordine.aggiornaParziali();
        }
    }
    const pulsanteRiepilogo = $('#buttonRiepilogo');
    const pulsanteRiepilogoOrdineZero = $('#buttonRiepilogoOrdineZero');
    pulsanteRiepilogo.click(function (e) {
        e.preventDefault();
        const bonifico = $('#bonifico');
        bonifico.click();
    });
    pulsanteRiepilogoOrdineZero.click(function (e) {
        e.preventDefault();
        const bonifico = $('#bonifico');
        bonifico.click();
    });
    const scontoSubmit = $('#codice-sconto-submit');

    if (scontoSubmit.length) {
        Tuttovisure.Ordine.bindRiepilogo();
        Tuttovisure.Ordine.aggiornaParziali();
        const createScontoRoute = Routing.generate('qm_tuttovisure_sconto_create');
        scontoSubmit.click(function (e) {
            e.preventDefault();

            const params = {
                codice: $('[name=codice-sconto-input]').val().trim(),
                ordineId: $('[name=codice-sconto-ordine-id]').val()
            };

            const ajaxOptions = {
                url: createScontoRoute,
                data: params,
                type: 'POST',
                success: function (payload) {
                    if (false != payload.auto_attiva_ordine) {
                        const pulsanteBonifico = $('#bonifico');
                        const pulsanteSella = $('#cartaDiCredito');

                        pulsanteSella.addClass('hidden');
                        pulsanteBonifico.text('CONFERMA: concludi ordine ed usa il codice di sconto');
                    }
                    if (false != payload.success) {
                        clearBoxScontoAlert();
                        hideBoxSconto();
                        const modal = new ModaleWait();
                        modal.showPleaseWait();
                        updateRiepilogoStep();
                        location.reload();
                    }
                },

                error: function (e) {
                    console.log(e);
                    alertBoxSconto();
                }
            };

            $.ajax(createScontoRoute, ajaxOptions);
        });
    } else {
        clearBoxScontoAlert();
    }
    $(document).ajaxComplete(function () {
        if ($('#topRichiesta > span').hasClass('step3') && !$('#topRichiesta > span').hasClass('step3grey')) {
            var imponibile = $('#riepilogo > table > tbody > tr:nth-child(1) > td:nth-child(2)').html();
            var codiceDiSconto = $('#importoScontoDaCodice > td:nth-child(2)').html();
            var codiceDiScontoInverso = codiceDiSconto.replace(" - "," ");
            if (imponibile === codiceDiScontoInverso) {
                $('.alert-danger-form').addClass('hidden');
                $('#codiceScontoEccessoAdvisorOrdineZero').removeClass('hidden');
            }
        }
    });
});

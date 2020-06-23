$(window).on('load', function() {
    if ($("#certificato_chiusura_inchiesta_ordine_cliente_tipoCliente").length || $("#certificato_chiusura_inchiesta_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    if ($("#certificato_chiusura_inchiesta_ordine_opzioniProdotto_scegliTribunale").val() !== 'undefined' &&
        $("#certificato_chiusura_inchiesta_ordine_opzioniProdotto_scegliTribunale").val() !== '' && !$('#datiCliente').length && !$('#bonifico').length ) {
        $("#datiPersona").removeClass('hidden');
        $("#indirizzo").removeClass('hidden');
        $("#opzioniSpedizione").removeClass('hidden');
        $("#ordine-urgenza").removeClass('hidden');
        if ($("#certificato_chiusura_inchiesta_ordine_datiProdotto_estero").is(':checked')) {
            $("#nazione").find('select').prop('disabled', false);
            $("#provinciaComune").addClass('hidden');
            $("#indirizzo2").removeClass('hidden');
            $("#nazione").removeClass('hidden');
            $("#certificato_chiusura_inchiesta_ordine_datiProdotto_comune").prop('required', false);
        } else {
            $("#nazione").find('select').val(0);
            $("#nazione").find('select').prop('required', false);
            $("#nazione").find('select').prop('disabled', true);
            $("#indirizzo2").addClass('hidden');
            $("#provinciaComune").removeClass('hidden');
            tribunaleComune('#certificato_chiusura_inchiesta_ordine_opzioniProdotto_scegliTribunale', "#certificato_chiusura_inchiesta_ordine_datiProdotto_comune");
        }
    }

    $("#certificato_chiusura_inchiesta_ordine_opzioniProdotto_scegliTribunale").change(function() {
        $("#datiPersona").removeClass('hidden');
        $("#indirizzo").removeClass('hidden');
        $("#opzioniSpedizione").removeClass('hidden');
        $("#ordine-urgenza").removeClass('hidden');
        $("#estero").find('input:checkbox').prop('checked', false);
        $("#nazione").find('select').val(0);
        $("#nazione").find('select').prop('required', false);
        $("#nazione").find('select').prop('disabled', true);
        $("#indirizzo2").addClass('hidden');
        $("#provinciaComune").removeClass('hidden');
        if ($("#certificato_chiusura_inchiesta_ordine_datiProdotto_estero").is(':checked')) {
            $("#certificato_chiusura_inchiesta_ordine_datiProdotto_comune").prop('required', false);
        } else {
            tribunaleComune('#certificato_chiusura_inchiesta_ordine_opzioniProdotto_scegliTribunale', "#certificato_chiusura_inchiesta_ordine_datiProdotto_comune");
        }
    });

    $("#certificato_chiusura_inchiesta_ordine_datiProdotto_estero").change(function() {
        if(!$("#certificato_chiusura_inchiesta_ordine_datiProdotto_estero").is(':checked')) {
            tribunaleComune('#certificato_chiusura_inchiesta_ordine_opzioniProdotto_scegliTribunale', "#certificato_chiusura_inchiesta_ordine_datiProdotto_comune");
            $("#nazione").find('select').prop('required', false);
            $("#nazione").find('select').prop('disabled', true);
            $("#nazione").addClass('hidden');
            $("#indirizzo2").addClass('hidden');
            $("#provinciaComune").removeClass('hidden');
        } else {
            $("#nazione").find('select').val(0);
            $("#nazione").find('select').prop('disabled', false);
            $("#nazione").find('select').prop('required', false);
            $("#nazione").removeClass('hidden');
            $("#indirizzo2").removeClass('hidden');
            $("#provinciaComune").addClass('hidden');
            $("#certificato_chiusura_inchiesta_ordine_datiProdotto_comune").prop('required', false);
        }
    });

    function tribunaleComune(tribunale, comune, message) {
        $(comune).prop('disabled', true);
        $.ajax({
            url: Routing.generate('qm_tuttovisure_tribunali_options', { tribunale : $(tribunale).val() }),
            dataType: "json",
            success: function(json) {
                if ($(tribunale).val() === '') {
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
                    $.each(json, function(i, value) {
                        $(comune).append($('<option>').text(value.nome).prop('value', value.id));        
                    });
                }
                
            },
            error: function(e) {}

        });
    }

    $("input[name$='certificato_chiusura_inchiesta_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#certificato_chiusura_inchiesta_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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


$(window).on('load', function() {
    if ($("#visura_immobiliare_ordine_cliente_tipoCliente").length || $("#visura_immobiliare_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

function immobile(trigger) {
    switch(trigger) {
        case 'show':
            $('#tipoImmobile').removeClass('hidden');
            $('#tipoImmobile').find('input:radio').prop('required', true);
            $('#immobile').removeClass('hidden');
            $('#immobileTitolo').removeClass('hidden');
            $('#altriServiziTitolo').removeClass('hidden');
            $('#altriServizi0').removeClass('hidden');
            $('#altriServizi1').removeClass('hidden');
            $('#altriServiziHr0').removeClass('hidden');
            $('#altriServiziHr1').removeClass('hidden');
            $('#ordine-urgenza').removeClass('hidden');
            $('#tipoVisura').removeClass('hidden');
            $('#tipoRicerca').addClass('hidden');
            $('#tipoRicerca').find('input:radio').prop('checked', false);
            $('#datiConservatorie').removeClass('hidden');
            $('#tipoRicercaIpocat').addClass('hidden');
            $('#tipoRicercaIpocat').find('input:radio').prop('checked', false);
            if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_0').is(':checked')) {
                $('#tipoVisura').find('input:radio').prop('required', true);
            }
            if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_1').is(':checked')) {
                $('#datiConservatorie').find('select').prop('required', true);
            }
            $('#provinciale').addClass('hidden');
            $('#provinciale').find('select').val(0);
            $('#provinciale').find('select').prop('required', false);
            break;

        case 'hide':
            $('#tipoImmobile').addClass('hidden');
            $('#tipoImmobile').find('input:radio').prop('required', false);
            $('#tipoImmobile').find('input:radio').prop('checked', false);
            $('#immobile').addClass('hidden');
            $('#immobile').find('input:text').val('');
            $('#immobile').find('select').val(0);
            $('#immobileTitolo').addClass('hidden');
            //$('#altriServizi0').find('input:checkbox').prop('checked', false);
            $('#tipoVisura').addClass('hidden');
            $('#tipoRicerca').removeClass('hidden');
            $('#tipoVisura').find('input:radio').prop('required', false);
            $('#tipoVisura').find('input:radio').prop('checked', false);
            if ($('#visura_immobiliare_ordine_opzioniProdotto_ricercaIpocat_1:checked').length) {
                $('#datiConservatorie').removeClass('hidden');
                $('#datiConservatorie').find('select').prop('required', true);
            } else {
                $('#datiConservatorie').addClass('hidden');
                $('#datiConservatorie').find('select').prop('required', false);
            }
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function personaAzienda(trigger) {
    switch(trigger) {
        case 'show':
            $('#altriServiziTitolo').removeClass('hidden');
            $('#altriServizi0').removeClass('hidden');
            $('#altriServizi1').removeClass('hidden');
            $('#altriServizi2').addClass('hidden');
            $('#altriServizi2').find('input:checkbox').prop('checked', false);
            $('#altriServizi3').addClass('hidden');
            $('#altriServizi3').find('input:checkbox').prop('checked', false);
            $('#altriServiziHr0').removeClass('hidden');
            $('#altriServiziHr1').removeClass('hidden');
            $('#altriServiziHr2').addClass('hidden');
            $('#altriServiziHr3').addClass('hidden');
            $('#ordine-urgenza').removeClass('hidden');
            $('#tipoVisura').addClass('hidden');
            $('#tipoRicerca').removeClass('hidden');
            $('#tipoVisura').find('input:radio').prop('checked', false);
            if ($('#visura_immobiliare_ordine_opzioniProdotto_ricercaIpocat_1:checked').length) {
                $('#datiConservatorie').removeClass('hidden');
                $('#datiConservatorie').find('select').prop('required', true);
            }
            $('#tipoRicercaIpocat').removeClass('hidden');
            if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_0').is(':checked')) {
                $('#tipoRicerca').find('input:radio').prop('required', true);
            }
            if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_1').is(':checked')) {
                $('#tipoRicercaIpocat').find('input:radio').prop('required', true);
            }
            break;

        case 'hide':
            //$('#altriServizi0').find('input:checkbox').prop('checked', false);
            $('#tipoVisura').removeClass('hidden');
            $('#tipoRicerca').addClass('hidden');
            $('#tipoRicerca').find('input:radio').prop('required', false);
            $('#tipoRicerca').find('input:radio').prop('checked', false);
            $('#tipoRicercaIpocat').find('input:radio').prop('required', false);
            $('#tipoRicercaIpocat').removeClass('hidden');
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function personaProprietaria(trigger) {
    switch(trigger) {
        case 'show':
            $('#datiPersona').removeClass('hidden');
            $('#datiPersonaTitolo').removeClass('hidden');
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#mandato').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('required', false);
            $('#mandato').addClass('hidden');
            break;

        case 'hide':
            $('#datiPersona').addClass('hidden');
            $('#datiPersona').find('input:text').val('');
            $('#datiPersona').find('select').val(0);
            $('#datiPersonaTitolo').addClass('hidden');
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function aziendaIntestataria(trigger) {
    switch(trigger) {
        case 'show':
            $('#datiAzienda').removeClass('hidden');
            $('#datiAziendaTitolo').removeClass('hidden');
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            $('#mandato').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('required', false);
            $('#mandato').addClass('hidden');
            break;

        case 'hide':
            $('#datiAzienda').addClass('hidden');
            $('#datiAzienda').find('input:text').val('');
            $('#datiAzienda').find('select').val(0);
            $('#datiAziendaTitolo').addClass('hidden');
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function fabbricato(trigger) {
    switch(trigger) {
        case 'show':
            $('#altriServizi3').removeClass('hidden');
            $('#altriServiziHr3').removeClass('hidden');
            break;

        case 'hide':
            $('#altriServizi3').addClass('hidden');
            $('#altriServiziHr3').addClass('hidden');
            $('#altriServizi3').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('checked', false);
            $('#mandato').find('input:checkbox').prop('required', false);
            $('#mandato').addClass('hidden');

            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function terreno(trigger) {
    switch(trigger) {
        case 'show':
            $('#altriServizi2').removeClass('hidden');
            $('#altriServiziHr2').removeClass('hidden');
            $('#bloccoOrdineUrgenza').removeClass('hidden');
            break;

        case 'hide':
            $('#altriServizi2').addClass('hidden');
            $('#altriServiziHr2').addClass('hidden');
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function visuraCatastale(trigger) {
    switch(trigger) {
        case 'show':
            $('#visuraCatastale').removeClass('hidden');
            if ($("#visura_immobiliare_ordine_datiProdotto_visuraPer_0:checked").length) {
                $('#tipoVisura').find('input:radio').prop('required', true);
                $('#tipoRicerca').find('input:radio').prop('required', false);
            } else {
                $('#tipoVisura').find('input:radio').prop('required', false);
                $('#tipoRicerca').find('input:radio').prop('required', true);
            }
            break;

        case 'hide':
            $('#visuraCatastale').addClass('hidden');
            $('#visuraCatastale').find('input:radio').prop('checked', false);
            $('#tipoRicerca').find('input:radio').prop('required', false);
            $('#tipoVisura').find('input:radio').prop('required', false);
            $('#provinciale').addClass('hidden');
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function visuraIpocatastale(trigger) {
    switch(trigger) {
        case 'show':
            $('#visuraIpocatastale').removeClass('hidden');
            if ($("#visura_immobiliare_ordine_datiProdotto_visuraPer_0:checked").length) {
                $('#datiConservatorie').find('select').prop('required', true);
                $('#datiConservatorie').removeClass('hidden');
                $('#tipoRicercaIpocat').find('input:radio').prop('required', false);
                $('#tipoRicercaIpocat').addClass('hidden');
            } else {
                if (!$('#visura_immobiliare_ordine_opzioniProdotto_ricercaIpocat_1').is(':checked')) {
                    $('#datiConservatorie').find('select').prop('required', false);
                }
                $('#tipoRicercaIpocat').find('input:radio').prop('required', true);
                $('#tipoRicercaIpocat').removeClass('hidden');
            }
            break;

        case 'hide':
            $('#visuraIpocatastale').addClass('hidden');
            $('#visuraIpocatastale').find('input:radio').prop('checked', false);
            $('#tipoRicercaIpocat').find('input:radio').prop('required', false);
            $('#datiConservatorie').find('select').prop('required', false);
            $('#datiConservatorie').addClass('hidden');
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}

function planimetria(trigger) {
    switch(trigger) {
        case 'show':
            if ($('#visura_immobiliare_ordine_datiProdotto_visuraPer_0:checked').length) {
                $('#mandato').removeClass('hidden');
                $('#mandato').find('input:checkbox').prop('required', true);
            }
            break;

        case 'hide':
            if ($('#visura_immobiliare_ordine_datiProdotto_visuraPer_0:checked').length) {
                $('#mandato').addClass('hidden');
                $('#mandato').find('input:checkbox').prop('checked', false);
                $('#mandato').find('input:checkbox').prop('required', false);
            }
            break;
    }
    Tuttovisure.Ordine.aggiornaParziali();
}


$(document).ready(function(){
    rivets.bind($('#variServ'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#extra_riepilogo'), {parziali: Tuttovisure.parziali});
    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });

    if ($('#altriServizi').length) {
        $('#altriServizi').find('input[type=checkbox]').each(function () {
            $(this).click(function() {
                $('#noSelection').addClass('hidden');
                $('#noSelection').removeClass('alert-form');
            });
        });
    }

    $('button[name="formButtonAvanti"]').click(function(e) {
        var flag = false;

        if ($('#altriServizi').length) {
            $('#altriServizi').find('input[type=checkbox]').each(function () {
                if($(this).is(':checked')){
                    flag = true;
                    return;
                }
            });
        } else {
            flag = true;
        }

        if (flag == false) {
            e.preventDefault();
            $('#noSelection').removeClass('hidden');
            $('#noSelection').addClass('alert-form');
            var noSelection = $('#topRichiesta').offset().top;
            $('html, body').animate({scrollTop:noSelection}, 300);
            return false;
        }
    });

    $('button[name="formButtonCompleta"]').click(function(e) {
        var flag = false;

        if ($('#altriServizi').length) {
            $('#altriServizi').find('input[type=checkbox]').each(function () {
                if($(this).is(':checked')){
                    flag = true;
                    return;
                }
            });
        } else {
            flag = true;
        }

        if (flag == false) {
            e.preventDefault();
            $('#noSelection').removeClass('hidden');
            $('#noSelection').addClass('alert-form');
            var noSelection = $('#topRichiesta').offset().top;
            $('html, body').animate({scrollTop:noSelection}, 300);
            return false;
        }
    });


    $('input[name="visura_immobiliare_ordine[datiProdotto][visuraPer]"]').change(function() {
        if ($(this).val() == 'immobile') {
            personaAzienda('hide');
            immobile('show');
            personaProprietaria('hide');
            aziendaIntestataria('hide');
        }
        if ($(this).val() == 'personaProprietaria') {
            personaAzienda('show');
            immobile('hide');
            personaProprietaria('show');
            aziendaIntestataria('hide');
        }
        if ($(this).val() == 'aziendaIntestataria') {
            personaAzienda('show');
            immobile('hide');
            personaProprietaria('hide');
            aziendaIntestataria('show');
        }

    });

    if ($('#visura_immobiliare_ordine_datiProdotto_visuraPer_0:checked').length) {
        immobile('show');
        personaAzienda('hide');
        personaProprietaria('hide');
        aziendaIntestataria('hide');
    }

    if ($('#visura_immobiliare_ordine_datiProdotto_visuraPer_1:checked').length) {
        immobile('hide');
        personaAzienda('show');
        personaProprietaria('show');
        aziendaIntestataria('hide');
    }

    if ($('#visura_immobiliare_ordine_datiProdotto_visuraPer_2:checked').length) {
        immobile('hide');
        personaAzienda('show');
        personaProprietaria('hide');
        aziendaIntestataria('show');
    }

    $('input[name="visura_immobiliare_ordine[datiProdotto][tipoDiImmobile]"]').change(function() {
        if ($(this).val() == 'fabbricato') {
            fabbricato('show');
            terreno('hide');
        }
        if ($(this).val() == 'terreno') {
            terreno('show');
            fabbricato('hide');
        }
    });

    if ($('#visura_immobiliare_ordine_datiProdotto_tipoDiImmobile_0:checked').length) {
        fabbricato('show');
        terreno('hide');
    }

    if ($('#visura_immobiliare_ordine_datiProdotto_tipoDiImmobile_1:checked').length) {
        terreno('show');
        fabbricato('hide');
    }

    $('#visura_immobiliare_ordine_opzioniProdotto_altro_0').change(function() {
        if ($(this).is(':checked')) {
            visuraCatastale('show');
        } else {
            visuraCatastale('hide');
        }
    });

    if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_0').is(':checked')) {
        visuraCatastale('show');
    } else {
        visuraCatastale('hide');
    }

    $('input[name="visura_immobiliare_ordine[opzioniProdotto][ricerca]"]').change(function() {
        if ($(this).val() == 'provinciale') {
            $('#provinciale').removeClass('hidden');
            $('#provinciale').find('select').prop('required', true);
        }
        else {
            $('#provinciale').addClass('hidden');
            $('#provinciale').find('select').val(0);
            $('#provinciale').find('select').prop('required', false);
        }
    });

    if ($('#visura_immobiliare_ordine_opzioniProdotto_ricerca_1').is(':checked')) {
        $('#provinciale').removeClass('hidden');
        $('#provinciale').find('select').prop('required', true);
    }

    $('#visura_immobiliare_ordine_opzioniProdotto_altro_1').change(function() {
        if ($(this).is(':checked')) {
            visuraIpocatastale('show');
        } else {
            visuraIpocatastale('hide');
        }
    });

    if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_1').is(':checked')) {
        visuraIpocatastale('show');
    } else {
        visuraIpocatastale('hide');
    }

    $('input[name="visura_immobiliare_ordine[opzioniProdotto][ricercaIpocat]"]').change(function() {
        if ($(this).val() == 'provincialeIpocat') {
            $('#datiConservatorie').removeClass('hidden');
            $('#datiConservatorie').find('select').prop('required', true);
        }
        else {
            $('#datiConservatorie').addClass('hidden');
            $('#datiConservatorie').find('select').val(0);
            $('#datiConservatorie').find('select').prop('required', false);
        }
    });

    $('#visura_immobiliare_ordine_opzioniProdotto_altro_3').change(function() {
        if ($(this).is(':checked')) {
            planimetria('show');
        } else {
            planimetria('hide');
        }
    });

    if ($('#visura_immobiliare_ordine_opzioniProdotto_altro_3').is(':checked')) {
        planimetria('show');
    } else {
        planimetria('hide');
    }

    $("#visura_immobiliare_ordine_datiProdotto_provincia").change(function() {
        Tuttovisure.provinciaComune($(this), "#visura_immobiliare_ordine_datiProdotto_comune");
    });


});


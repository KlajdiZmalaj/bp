function filtraDatiParziali(data) {
    var flagUrgenza = $.grep(data.opzioni, function (e) {
        return e.nome == 'Urgenza';
    });

    $.each(data.opzioni, function (i, v) {
        if (v) {
            $("table[name$='prezzoBase']").addClass("hidden");
            $("table[name$='riepilogo']").removeClass("hidden");
            if (v.nome == "Gruppo nazioni 1") {
                flagUrgenza.length == 1 ? $('#tempiConsegna').html('entro 4 giorni lavorativi') : $('#tempiConsegna').html('entro 12 giorni lavorativi');
            }
            if (v.nome == "Gruppo nazioni 2") {
                flagUrgenza.length == 1 ? $('#tempiConsegna').html('entro 4 giorni lavorativi') : $('#tempiConsegna').html('entro 12 giorni lavorativi');
            }
            if (v.nome == "Gruppo nazioni 3") {
                flagUrgenza.length == 1 ? $('#tempiConsegna').html('entro 4 giorni lavorativi') : $('#tempiConsegna').html('entro 12 giorni lavorativi');
            }
            if (v.nome == "Gruppo nazioni 4") {
                flagUrgenza.length == 1 ? $('#tempiConsegna').html('entro 4 giorni lavorativi') : $('#tempiConsegna').html('entro 12 giorni lavorativi');
            }
            if (v.nome == "Gruppo nazioni 5") {
                flagUrgenza.length == 1 ? $('#tempiConsegna').html('entro 4 giorni lavorativi') : $('#tempiConsegna').html('entro 12 giorni lavorativi');
            }
            if (v.nome == "Gruppo nazioni 6") {
                flagUrgenza.length == 1 ? $('#tempiConsegna').html('entro 4 giorni lavorativi') : $('#tempiConsegna').html('entro 12 giorni lavorativi');
            }
            if (v.nome.substring(0, 15) == "Gruppo nazioni ") {
                $.each(data.datiProdotto, function (j, v) {
                    if ('nazione' == v.name && v.val) {
                        var strsplit = v.val.split('_');
                        var nome = strsplit[1];
                        nome = nome.charAt(0).toUpperCase() + nome.slice(1);

                        data.opzioni[i].testo = nome;
                    }
                });
            }
        }
    });
    return data;
}


$(window).on('load', function () {
    if ($("#indagini_azienda_estera_ordine_cliente_tipoCliente").length || $("#indagini_azienda_estera_ordine_tipoCheckOut").length) {
        setTimeout(function () {
            $('html, body').animate({scrollTop: $('#topRichiesta').offset().top}, 0);
        }, 0);
    }

});

$(document).ready(function () {
    var widgetUrgenza = $('#ordine-urgenza');
    var tempoConsegna = $('#tempiConsegna');
    var checkboxUrgenza = $('#indagini_azienda_estera_ordine_opzioniProdotto_urgenza');
    var selectNazione = $("#indagini_azienda_estera_ordine_datiProdotto_nazione");
    rivets.bind($('#altro'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#nazione'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#urgenzaAziendaEstera'), {parziali: Tuttovisure.parziali});
    rivets.bind($('#traduzione'), {parziali: Tuttovisure.parziali});

    selectNazione.change(function () {
        if ($(this).val() !== null) {
            $('#azienda').removeClass('hidden');
            widgetUrgenza.removeClass('hidden');
            Tuttovisure.Ordine.aggiornaParziali();
        }
    });

    if (selectNazione.val() !== '') {
        $('#azienda').removeClass('hidden');
        widgetUrgenza.removeClass('hidden');
    }
});


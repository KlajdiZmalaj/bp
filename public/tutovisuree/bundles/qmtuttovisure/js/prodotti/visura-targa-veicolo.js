$(window).on('load', function() {
    if ($("#visura_targa_veicolo_ordine_cliente_tipoCliente").length || $("#visura_targa_veicolo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#immatricolazione'), {parziali: Tuttovisure.parziali});
    
    if ($('#visura_targa_veicolo_ordine_datiProdotto_tipoDiVeicolo').val() !== "" ) {
        $("table[name$='prezzoBase']").addClass("hidden");
        $("table[name$='riepilogo']").removeClass("hidden");
    }
    
    
    $("#visura_targa_veicolo_ordine_opzioniProdotto_immatricolataPrimaDel1993").change(function() {
        if($('#bloccoOrdineUrgenza').length) {
            if($('#visura_targa_veicolo_ordine_opzioniProdotto_immatricolataPrimaDel1993:checked').length) {
                $('#bloccoOrdineUrgenza').addClass('hidden');
                $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
                Tuttovisure.Ordine.aggiornaParziali();
            } else {
                $('#bloccoOrdineUrgenza').removeClass('hidden');
            }
        }
    });
    
    if($('#bloccoOrdineUrgenza').length) {
        if($('#visura_targa_veicolo_ordine_opzioniProdotto_immatricolataPrimaDel1993:checked').length) {
            $('#bloccoOrdineUrgenza').addClass('hidden');
            $('#bloccoOrdineUrgenza').find('input:checkbox').prop('checked', false);
            Tuttovisure.Ordine.aggiornaParziali();
        } else {
            $('#bloccoOrdineUrgenza').removeClass('hidden');
        }
    }
   
});


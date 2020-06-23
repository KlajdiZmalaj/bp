$(window).on('load', function() {
    if ($("#copia_atto_notarile_ordine_cliente_tipoCliente").length || $("#copia_atto_notarile_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
  $('input[name="copia_atto_notarile_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
    {
      'prefix_form': 'copia_atto_notarile_ordine_',
      'valori': {
          'personaFisica': {
              'mostra': [
                  'personaFisicaTitolo',
                  'datiPersona',
              ]
          },
          'personaGiuridica': {
              'mostra': [
                    'personaGiuridicaTitolo',
                    'datiAzienda',
              ]
          },
          'immobile': {
              'mostra': [
                    'immobileTitolo',
                    'datiImmobile',
                  'tipoImmobile',
                  'provinciaComune'
              ],
              'obbligatori': [
                  'tipoImmobile'
              ]
          }
      },
      'reset': [
            'personaFisicaTitolo',
            'datiPersona',
            'personaGiuridicaTitolo',
            'datiAzienda',
            'immobileTitolo',
            'datiImmobile',
          'tipoImmobile',
          'provinciaComune'
      ]
    }
  );

    $('#copia_atto_notarile_ordine_datiProdotto_tipoDiAtto').change(function() {
        $('#datiAtto').removeClass('hidden');
        $('#opzioniSpedizione').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    });

    if($('#copia_atto_notarile_ordine_datiProdotto_tipoDiAtto').val() !== '') {
        $('#datiAtto').removeClass('hidden');
        $('#opzioniSpedizione').removeClass('hidden');
        $('#ordine-urgenza').removeClass('hidden');
    }

$("#copia_atto_notarile_ordine_datiProdotto_provincia").change(function() {
    Tuttovisure.provinciaComune($(this), "#copia_atto_notarile_ordine_datiProdotto_comune");
  });

  $('input[name="copia_atto_notarile_ordine[datiProdotto][visuraPer]"]').on('change', function() {
    $(this).logicaOpzioniProdotto().refreshOpzioni();
  });
  
  $('input[name="copia_atto_notarile_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

    $("input[name$='copia_atto_notarile_ordine[spedizione][spedizione_nazionale]']").change(function () {
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

    if ($("#copia_atto_notarile_ordine_spedizione_spedizione_nazionale_3").is(':checked')) {
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
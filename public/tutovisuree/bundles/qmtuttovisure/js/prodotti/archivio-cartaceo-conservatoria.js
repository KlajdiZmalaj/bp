$(window).on('load', function() {
    if ($("#archivio_cartaceo_conservatoria_ordine_cliente_tipoCliente").length || $("#archivio_cartaceo_conservatoria_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){
    rivets.bind($('#tipoRicerca'), {parziali: Tuttovisure.parziali});
  $('input[name="archivio_cartaceo_conservatoria_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto(
    {
      'prefix_form': 'archivio_cartaceo_conservatoria_ordine_',
      'valori': {
          'personaFisica': {
              'mostra': [
                  'datiConservatorie',
                  'personaFisicaTitolo',
                  'datiPersona',
                  'tipoRicerca',
                  'ordine-urgenza'
              ],
              'obbligatori': [
                  'datiConservatorie',
              ]
          },
          'azienda': {
              'mostra': [
                    'datiConservatorie',
                    'aziendaTitolo',
                    'datiAzienda',
                    'provinciaComune',
                    'tipoRicerca',
                    'ordine-urgenza'
              ],
              'obbligatori': [
                  'datiConservatorie',
              ]
          },
          'immobile': {
              'mostra': [
                    'datiConservatorie',
                    'immobileTitolo',
                    'tipoImmobile',
                    'provinciaComune',
                    'datiImmobile',
                    'tipoRicerca',
                    'ordine-urgenza'
              ],
              'obbligatori': [
                  'datiConservatorie',
                  'tipoImmobile'
              ]
          }
      },
      'reset': [
            'aziendaTitolo',
            'personaFisicaTitolo',
            'immobileTitolo',
            'datiPersona',
            'datiConservatorie',
            'datiAzienda',
            'tipoImmobile',
            'provinciaComune',
            'datiImmobile',
            'ordine-urgenza'
      ]
    }
  );

  $("#archivio_cartaceo_conservatoria_ordine_datiProdotto_provincia").change(function() {
    Tuttovisure.provinciaComune($(this), "#archivio_cartaceo_conservatoria_ordine_datiProdotto_comune");
  });

  $('input[name="archivio_cartaceo_conservatoria_ordine[opzioniProdotto][ricercaPer]"]').on('change', function() {
    $(this).logicaOpzioniProdotto().refreshOpzioni();
  });

  $('input[name="archivio_cartaceo_conservatoria_ordine[opzioniProdotto][ricercaPer]"]').logicaOpzioniProdotto().refreshOpzioni();
});
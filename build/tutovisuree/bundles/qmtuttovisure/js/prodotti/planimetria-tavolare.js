$(window).on('load', function() {
    if ($("#planimetria_tavolare_ordine_cliente_tipoCliente").length || $("#planimetria_tavolare_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});

$(document).ready(function(){

$('input[name="planimetria_tavolare_ordine[datiProdotto][tipoPartita]"]').logicaOpzioniProdotto(
    {
      'prefix_form': 'planimetria_tavolare_ordine_',
      'valori': {
          'partita': {
              'mostra': [
                  'partita',
                  'ricercaSu',
                  'statoStorico',
                  'ordine-urgenza'
              ],
              'obbligatori': [
                  'ricercaSu'
              ]
          },
          'p_ed_divisa': {
              'mostra': [
                  'p_ed_divisa',
                  'ricercaSu',
                  'statoStorico',
                  'ordine-urgenza'
              ],
              'obbligatori': [
                  'ricercaSu'
              ]
          },
          'documento': {
              'mostra': [
                  'documento',
                  'ricercaSu',
                  'statoStorico',
                  'ordine-urgenza'
              ],
              'obbligatori': [
                  'ricercaSu'
              ]
          }
      },
      'reset': [
          'partita',
          'p_ed_divisa',
          'documento',
          'ricercaSu',
          'statoStorico',
          'ordine-urgenza'
      ]
    }
  );

    $('input[name="planimetria_tavolare_ordine[datiProdotto][tipoPartita]"]').prop('required', true);

        $("input[name$='planimetria_tavolare_ordine[datiProdotto][ricercaSu]']").change(function() {
    Tuttovisure.provinciaComune($(this), "#planimetria_tavolare_ordine_datiProdotto_comune");
  });
  
  $('input[name="planimetria_tavolare_ordine[datiProdotto][tipoPartita]"]').on('change', function() {
    $(this).logicaOpzioniProdotto().refreshOpzioni();
  });
  
  $('input[name="planimetria_tavolare_ordine[datiProdotto][tipoPartita]"]').logicaOpzioniProdotto().refreshOpzioni();
});
(function($) {

  $.fn.codiceFiscale = function(options) {

    var onValid = function() {};
    var onInvalid = function() {};

    if(!options) {
      options = {};
    }

    if ($.isFunction(options.onValid)) {
      onValid = options.onValid;
    }

    if ($.isFunction(options.onInvalid)) {
      onInvalid = options.onInvalid;
    }

    var that = this;

    $.fn.codiceFiscale.calcola = function () {
      var dfd = $.Deferred();
      var paese = $('#' + $(that).data('paese-it')).is(':checked') ? $('#' + $(that).data('paese-it')).val() : $('#' + $(that).data('paese-es')).val();
      var nome = $('#' + $(that).data('nome')).val();
      var cognome = $('#' + $(that).data('cognome')).val();
      var sesso = $('#' + $(that).data('sesso-m')).is(':checked') ? $('#' + $(that).data('sesso-m')).val() : $('#' + $(that).data('sesso-f')).val();
      var dataDiNascita = $('#' + $(that).data('nascita-g')).val()
        + '/' + $('#' + $(that).data('nascita-m')).val()
        + '/' + $('#' + $(that).data('nascita-a')).val();
      var comune = (paese === 'italia') ? $('#' + $(that).data('comune')).val() :  $('#' + $(that).data('nazione')).val();

      var valid = paese
        && nome
        && cognome
        && sesso
        && $('#' + $(that).data('nascita-g')).val()
        && $('#' + $(that).data('nascita-m')).val()
        && $('#' + $(that).data('nascita-a')).val();
      if ('italia' === paese) {
        valid = valid && comune;
      }

      if (!valid) {
        return dfd.reject();
      } else {
        $.ajax({
          url: Routing.generate('qm_tuttovisure_calcola_codicefiscale', {
            paese : paese,
            nome : nome,
            cognome : cognome,
            sesso : sesso,
            dataDiNascita : dataDiNascita,
            comune : comune
          }),
          dataType: "json",
          success: function(json) {
            $.each(json, function(i, value) {
              dfd.resolveWith(that, [value]);
            });
          },
          error: function(e) {
            dfd.reject();
          }
        });
      }

      return dfd.promise();
    };

    $.fn.codiceFiscale.check = function(codicefiscale){
          var caratteri = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'W', 'X', 'Y', 'Z' ];
          var numeri = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          var valoriDispari = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18,
            20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];
          var somma = 0;
          var codiceControllo;

          //itera su tutte le lettere tranne il codice di controllo
          for (var i=0; i < codicefiscale.length - 1; i++) {
            var index = i + 1;
            var value = codicefiscale.charAt(i);

            $.each(caratteri, function(j, val) {
              if (value === val) {
                if (index % 2 === 0) {
                  somma += j;
                } else {
                  $.each(valoriDispari, function(k, vl) {
                    if (k === j) {
                      somma += vl;
                    }
                  });
                }
              }
            });

            $.each(numeri, function(j, val) {
              if (value === val) {
                if (index % 2 === 0) {
                  somma += j;
                } else {
                  $.each(valoriDispari, function(k, vl) {
                    if (k === j) {
                                      somma += vl;
                                  }
                              });
                          }
                      }
                  });
              }

              var numeroControllo = somma % 26;

              codiceControllo = caratteri[numeroControllo];
              return codiceControllo;
          }

    $.fn.codiceFiscale.valida = function () {
      var hideIfValid = [];
      if ($(that).data('nascondi-se-valido')) {
        hideIfValid = $(that).data('nascondi-se-valido').split(';');
      }

      var codicefiscale  = $(that).val();
      if ($(that).val() === '') {
        var valido = true;
      } else {
        if (!codicefiscale) {
          return false;
        }
      }

      var codiceControllo = this.check(codicefiscale);

      var valido = codicefiscale.substr(15, 15) === codiceControllo;

      if (valido) {
        onValid();
        if ($(that).val() !== '') {
        $.each(hideIfValid, function(key, value) {
          $('#' + value).closest('.row').addClass('hidden');
        });} else {
          $.each(hideIfValid, function(key, value) {
            $('#' + value).closest('.row').removeClass('hidden');
          });
        }
        $('#' + $(that).attr('id') + '_codiceFiscaleError').addClass('hidden');
      } else {
        onInvalid();

        $.each(hideIfValid, function(key, value) {
          $('#' + value).closest('.row').removeClass('hidden');
        });
        if($(that).val()) {
          $('#' + $(that).attr('id') + '_codiceFiscaleError').removeClass('hidden');
        }
      }

      if ($(that).val() === '') {
        $('#' + $(that).attr('id') + '_codiceFiscaleError').addClass('hidden');
      }

      return valido;
    };
  return this;
  };

}(jQuery));
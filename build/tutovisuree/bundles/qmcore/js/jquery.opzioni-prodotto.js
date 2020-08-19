(function($) {

  $.fn.logicaOpzioniProdotto = function(opzioni, option, val) {
      
    var that = this;
    
    that.prefix_form = "";
    that.valori = {};

    that.nascondiCampi = {};
    that.pulisciCampi = {};

    if (opzioni) {
      $(this).data(
        "opzioni", opzioni
      );
    }

    that.opzioni = $(this).data('opzioni');
    if (that.opzioni) {
      that.prefix_form = that.opzioni['prefix_form'];
      that.valori = that.opzioni['valori'] ? that.opzioni['valori'] : {};
      that.checkbox = $(this);
      
      that.nascondiCampi = that.opzioni['reset'] ? that.opzioni['reset'] : {};
      that.pulisciCampi = that.opzioni['clean'] ? that.opzioni['clean'] : {};
    }
    that.reset = function () {
     if (that.nascondiCampi) {
      $.each(that.nascondiCampi, function(index, nascondiCampo) {
        
        if ($('#' + nascondiCampo).length > 0) {
          $('#' + nascondiCampo).addClass('hidden');
          $('#' + nascondiCampo).find('input').prop('required', false);
          $('#' + nascondiCampo).find('select').prop('required', false);
        } else {
          $('#' + that.prefix_form + nascondiCampo).closest('.row').addClass('hidden');
        }
      }); 
    }
    };
    
    that.clean = function () {
      if (that.pulisciCampi) {
//        var provinciaComune = '';
        $.each(that.pulisciCampi, function(index, pulisciCampo) {
            
          if ($('#' + pulisciCampo).length > 0) {
//              if ($('#' + pulisciCampo).find('select[id*=rovincia]').not('visible') && 
//                    $('#' + pulisciCampo).find('select[id*=omune]').val() == '') {
//                    provinciaComune = $('#' + pulisciCampo).find('select[id*=rovincia]');
//                }
              $('#' + pulisciCampo).find(':checked').prop('checked', false);
              $('#' + pulisciCampo).find('input:not(:radio):not(:checkbox)').val('');
              $('#' + pulisciCampo).find('select').val('');
              
          } else {
              if ($('#' + that.prefix_form + pulisciCampo).find(':checked')) {
                $('#' + that.prefix_form + pulisciCampo).children().prop('checked', false);
              }
              $('#' + that.prefix_form + pulisciCampo).val('');
          }      
        });
//            if (provinciaComune !== '') {
//                provinciaComune.trigger('change');
//                provinciaComune = '';
//            } 
      }
    };

    function containsObject(obj, list) {
      if (!list) {
          return false;
      }
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }

      return false;
    }

    that.refreshOpzioni = function() {

      that.clean();
      that.reset();
      

      $.each(that.valori, function(valore, contents) {
        var mostraCampi = contents['mostra'];
        var campiObbligatori = contents['obbligatori'];
        $.each(mostraCampi, function(index, mostraCampo) {
          if (that.checkbox.filter(':checked').val() === valore ) { 
            $.each(that.nascondiCampi, function(index, svuotaCampo) {
              if(! containsObject(svuotaCampo, mostraCampi)) { 
                if ($('#' + svuotaCampo).length > 0) {
                    $('#' + svuotaCampo).find(':checked').prop('checked', false);
                    $('#' + svuotaCampo).find('input:not(:radio):not(:checkbox)').val('');
                    $('#' + svuotaCampo).find('select').val('');
                    $('#' + svuotaCampo).find('input').prop('required', false);
                    $('#' + svuotaCampo).find('select').prop('required', false);
                    if ($('#' + svuotaCampo).find('select[id*=omune]').not('disabled')) {
                        $('#' + svuotaCampo).find('select[id*=omune]').empty();
                        $('#' + svuotaCampo).find('select[id*=omune]').prop('required', false);
                        $('#' + svuotaCampo).find('select[id*=omune]').prop('disabled', true);
                    }
                } else {
                    if ($('#' + that.prefix_form + svuotaCampo).find(':checked')) {
                      $('#' + that.prefix_form + svuotaCampo).children().prop('checked', false);
                       $('#' + that.prefix_form + svuotaCampo).children().prop('required', false);
                    }
                    $('#' + that.prefix_form + svuotaCampo).val('');
                }
              } 
            });

            if ($('#' + mostraCampo).length > 0) {
              $('#' + mostraCampo).removeClass('hidden');
            } else {
              $('#' + that.prefix_form + mostraCampo).closest('.row').removeClass('hidden');
            }
          }
 
            if(that.checkbox.filter('input:checkbox:not(:checked)').val()===valore) { 
                $.each(that.nascondiCampi, function(index, svuotaCampo) {
                    if(! containsObject(svuotaCampo, mostraCampi)) { 
                        if ($('#' + svuotaCampo).length > 0) {
                          $('#' + svuotaCampo).removeClass('hidden');
                        } else {
                          $('#' + that.prefix_form + svuotaCampo).closest('.row').removeClass('hidden');
                        }
                    } 
                });       
            }
        });
        
        if (campiObbligatori) {
            $.each(campiObbligatori, function(index, campoObbligatorio) {
              if (that.checkbox.filter(':checked').val() === valore ) { 
                if ($('#' + campoObbligatorio).length > 0 && !$('#' + campoObbligatorio).hasClass('hidden')) {
                  $('#' + campoObbligatorio).find('input').prop('required', true);
                  $('#' + campoObbligatorio).find('select').prop('required', true);
                } else {
                  $('#' + that.prefix_form + campoObbligatorio).children().prop('required', true);
                }
              }
            });
        }
      });
    };

    return that;
  }
}(jQuery));
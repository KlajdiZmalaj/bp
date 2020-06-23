$(document).ready(function () {

  function validaCampi() {
    var valid = true;

    if (!$('#codicefiscale_nome').val()) {
      valid = false;
      $('#codicefiscale_nome').focus();
    } else if (!$('#codicefiscale_cognome').val()) {
      valid = false;
      $('#codicefiscale_cognome').focus();
    } else if (!$('#codicefiscale_DataDiNascita_day').val()) {
      valid = false;
      $('#codicefiscale_DataDiNascita_day').focus();
    } else if (!$('#codicefiscale_DataDiNascita_month').val()) {
      valid = false;
      $('#codicefiscale_DataDiNascita_month').focus();
    } else if (!$('#codicefiscale_DataDiNascita_year').val()) {
      valid = false;
      $('#codicefiscale_DataDiNascita_year').focus();
    }

    if ($('input[name="codicefiscale[paese]"]:checked').val() === 'italia') {
      if (!$('#codicefiscale_Comune').val()) {
        valid = false;
        $('#codicefiscale_Comune').focus();
      }
    } else {
      if (!$('#codicefiscale_Nazione').val()) {
        valid = false;
        $('#codicefiscale_Nazione').focus();
      }
    }
    return valid;
  }

  $('.calcolaCodiceFiscale').click(function() {
        $("[id$='_nome']").length ? $('#codicefiscale_nome').val($("[id$='_nome']").val()) : null ;
        $("[id$='_cognome']").length ? $('#codicefiscale_cognome').val($("[id$='_cognome']").val()) : null ;
        $("[id$='_day']").length ? $('#codicefiscale_DataDiNascita_day').val($("[id$='_day']").val()) : null ;
        $("[id$='_month']").length ? $('#codicefiscale_DataDiNascita_month').val($("[id$='_month']").val()) : null ;
        $("[id$='_year']").length ? $('#codicefiscale_DataDiNascita_year').val($("[id$='_year']").val()) : null ;
        $("[id$='_cliente_nome']").length ? $('#codicefiscale_nome').val($("[id$='cliente_nome']").val()) : null ;
        $("[id$='_cliente_cognome']").length ? $('#codicefiscale_cognome').val($("[id$='cliente_cognome']").val()) : null ;
//        if ($('#' + prodotto + '_ordine_datiProdotto_nome').length) {
//            $('#codicefiscale_nome').val($('#' + prodotto + '_ordine_datiProdotto_nome').val());
//            $('#codicefiscale_cognome').val($('#' + prodotto + '_ordine_datiProdotto_cognome').val());
//            $('#codicefiscale_DataDiNascita_day').val($('#' + prodotto + '_ordine_datiProdotto_dataDiNascita_day').val());
//            $('#codicefiscale_DataDiNascita_month').val($('#' + prodotto + '_ordine_datiProdotto_dataDiNascita_month').val());
//            $('#codicefiscale_DataDiNascita_year').val($('#' + prodotto + '_ordine_datiProdotto_dataDiNascita_year').val());
//        }
//        
//        if ($('#' + prodotto + '_ordine_cliente_nome').length) {
//            $('#codicefiscale_nome').val($('#' + prodotto + '_ordine_cliente_nome').val());
//            $('#codicefiscale_cognome').val($('#' + prodotto + '_ordine_cliente_cognome').val());
//        }
    });

  function provinciaComune(provincia, comune, message) {
    $(comune).prop('disabled', true);
    $.ajax({
      url: Routing.generate('qm_tuttovisure_comuni_options', { provincia : $(provincia).val() }),
      dataType: "json",
      success: function(json) {
        if ($(provincia).val() === '') {
          $(comune).empty();
          $(comune).trigger('change');
          $(comune).prop('disabled', true);
          $(message).html('');
        } else {
          $(comune).prop('disabled', false);
          $(comune).empty();
          $(message).html('');
          $(comune).append($('<option value="">').text('Seleziona il comune'));
          $.each(json, function(i, value) {
            $(comune).append($('<option>').text(value.nome).prop('value', value.id));
          });
        }
      },
      error: function(e) {
        alert($(provincia).val());
      }

    });
  }

  $('.codicefiscale').donetyping(function() {
    var codiceFiscale = $(this).val().replace(/\s/g, '').toUpperCase();
    $(this).val(codiceFiscale);
    $(this).codiceFiscale.valida();
  });


  $('input[name="codicefiscale[paese]"]').change( function() {
      if ($(this).val() === 'estero') {
        $('#codicefiscale_Nazione').closest('.row').removeClass('hidden');
        $('#codicefiscale_Comune').closest('.row').addClass('hidden');
        $('#codicefiscale_Provincia').closest('.row').addClass('hidden');
      } else {
        $('#codicefiscale_Nazione').closest('.row').addClass('hidden');
        $('#codicefiscale_Comune').closest('.row').removeClass('hidden');
        $('#codicefiscale_Provincia').closest('.row').removeClass('hidden');
      }
    }
  );

  $('#calcolaCodiceFiscaleButton').on('click', function(ev) {
    var formValid = validaCampi();
    if (!formValid) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      alert('Compilare tutti i campi');
      return false;
    }

    $('.codicefiscale').codiceFiscale.calcola().fail(function() {
      $(this).codiceFiscale.valida();
    }).then(function(codiceFiscale) {
      $(this).val(codiceFiscale);
      $(this).find("div[class*='alert-form']").length ? $(this).find("div[class*='alert-form']").removeClass('alert-form') : $(this).closest("div[class*='alert-form']").removeClass('alert-form');

      $(this).find("div[class*='alert-danger-form']").length ? $(this).find("div[class*='alert-danger-form']").removeClass('alert-danger-form') : $(this).closest("div[class*='alert-danger-form']").removeClass('alert-danger-form');

      $(this).find("div[class*='row']").find('.alert-message').length ? $(this).find("div[class*='row']").find('.alert-message').remove() : $(this).closest("div[class*='row']").find('.alert-message').remove();

      $(this).codiceFiscale.valida();
    });
  });

  $('#codicefiscale_Provincia').change(function() {
    Tuttovisure.provinciaComune($(this), '#codicefiscale_Comune');
  });


  $('.codicefiscale').codiceFiscale();

  $('.codicefiscale').codiceFiscale.valida();



  if ($('#codicefiscale_Provincia').val()) {
    Tuttovisure.provinciaComune($(this), '#codicefiscale_Comune');
  }
});
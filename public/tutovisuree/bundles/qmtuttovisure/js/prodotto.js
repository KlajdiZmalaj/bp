$(document).ready(function () {
  $("form").h5Validate();
  //   prodotto = $('#prodotto-form').attr('data-prodotto').replace(new RegExp('-', 'g'), '_')+'_ordine_';
  prodotto = "";

  if (!$("#conservatoria").length) {
    $(".disabled").prop("disabled", true);
  } else {
    $("#conservatoria_Comune").prop("disabled", true);
  }
  Tuttovisure.Ordine.bindChange(prodotto);

  Tuttovisure.Ordine.bindRiepilogo(prodotto);
  Tuttovisure.Ordine.bindFancyBox();

  Tuttovisure.Ordine.aggiornaParziali();

  Tuttovisure.Ordine.bindConservatoria(prodotto);
  Tuttovisure.Ordine.bindSms(prodotto);
  Tuttovisure.Ordine.bindProvinciaComune(prodotto);
  Tuttovisure.Ordine.bindSpedizione();

  if ($("#" + prodotto + "cliente_tipoCliente").length) {
    Tuttovisure.Ordine.step2(prodotto);
  }

  if ($("#" + prodotto + "tipoCheckOut").length) {
    Tuttovisure.Ordine.step3(prodotto);
  }

  $("#modRichiesta").click(function () {
    var topRichiesta = $("#topRichiesta").offset().top;
    $("html, body").animate({ scrollTop: topRichiesta }, 0);
    return false;
  });

  $("#modBar").click(function () {
    var topRichiesta = $("#topRichiesta").offset().top;
    $("html, body").animate({ scrollTop: topRichiesta }, 0);
    return false;
  });

  $("#topInfo").click(function () {
    var cosae = $("#cosae").offset().top;
    $("html, body").animate({ scrollTop: parseInt(cosae) }, 0);
    return false;
  });

  $("#mobileSubmit").click(function () {
    $("button[name$='formButtonAvanti']").click();
  });

  function updateOraUrgenza() {
    $(".oraUrgenza").html(
      moment().add(Tuttovisure.parziali.tempiUrgenza, "minute").format("H:mm")
    );
  }

  setInterval(updateOraUrgenza, 5000);

  $("#prodotto-form").submit(function () {
    if (Tuttovisure.ua.browser.name.toLowerCase().indexOf("safari") < 0) {
      var myApp;
      myApp =
        myApp ||
        (function () {
          var pleaseWaitDiv = $(
            ' <div class="modal fade" id="privacy" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="privacy" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <h2><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Caricamento in corso...</h2> </div> </div> </div> </div>'
          );
          return {
            showPleaseWait: function () {
              pleaseWaitDiv.modal();
            },
            hidePleaseWait: function () {
              pleaseWaitDiv.modal("hide");
            },
          };
        })();
      myApp.showPleaseWait();
    }
  });

  $("#tempiConsegnaAccordion").on("click", function () {
    $(this).next("ul").toggleClass("showDetails");
    $(this).find("i").toggleClass("fa-plus-circle fa-minus-circle");
  });

  var navbar = document.getElementById("sidebar_prodotto");
  var descrProd = document.getElementById("descrizione_prodotto");
  var descrProdHeight = descrProd.offsetHeight;
  var idPage = document.getElementById("page");
  var sticky = navbar.offsetTop - 60;

  var divScroll = document.getElementById("topRichiesta");

  function stickyTotal() {
    if (window.innerWidth <= 990 && idPage.className !== "pagamenti") {
      if (window.pageYOffset >= sticky) {
        $(".total-mobile").addClass("sticky");
        $(".sidebar .mobile").addClass("sticky");
      } else {
        $(".total-mobile").removeClass("sticky");
        $(".sidebar .mobile").removeClass("sticky");
      }
    } else if (window.innerWidth >= 1024 && idPage.className !== "pagamenti") {
      var formHeight = $("#stickyHeight").height();
      var start = divScroll.offsetTop + 220;
      var stop =
        divScroll.offsetTop + formHeight + descrProdHeight + faqHeight + 101;
      var contWidth = $("#stickyHeight").width();

      var riepilogoHeight = $("#riepilogoSticky #riepilogo").height();
      if (riepilogoHeight === 0) {
        riepilogoHeight = 69;
      }
      if (
        window.pageYOffset >= start &&
        window.pageYOffset <= stop - riepilogoHeight - 50
      ) {
        $("#riepilogoSticky div:first-child").addClass("fixed");
        $("#riepilogoSticky").addClass("fixed");
        $("#mobileSubmit").css("top", riepilogoHeight + 17);
        $("#btnUp")
          .css("right", (window.innerWidth - 1140) / 2)
          .show();
        $("#tempi-sticky")
          .addClass("fixed")
          .css({
            top: riepilogoHeight + 45,
            right: (window.innerWidth - contWidth + 2) / 2,
          });
      } else {
        $("#riepilogoSticky div:first-child").removeClass("fixed");
        $("#riepilogoSticky").removeClass("fixed");
        $("#tempi-sticky").removeClass("fixed").css({ top: 0, right: 0 });
        $("#btnUp").hide();
      }
    }
  }

  window.onscroll = function () {
    stickyTotal();
  };

  $(window).resize(function () {
    stickyTotal();
  });

  $("#stickyHeight").on("blur mousedown", "input,label", function () {
    setTimeout(stickyTotal, 650);
  });

  $("#btnUp").click(function (e) {
    var idPage = document.getElementById("page");
    var btnUP = idPage.offsetTop;

    e.preventDefault();
    $("html, body").animate({ scrollTop: btnUP }, "300");
  });

  $("label.urgenza-riepilogo,.fakeInput,#urg-riepilogo").mousedown(function (
    event
  ) {
    event.preventDefault();
  });

  $("#prodotto-form .widget > div")
    .has('input[type="radio"]')
    .parent()
    .closest("div.row")
    .addClass("radiob");
});

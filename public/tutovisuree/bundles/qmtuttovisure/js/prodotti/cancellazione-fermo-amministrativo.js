$(window).on('load', function() {
    if ($("#cancellazione_fermo_amministrativo_ordine_cliente_tipoCliente").length || $("#cancellazione_fermo_amministrativo_ordine_tipoCheckOut").length) {
        setTimeout (function () {
            $('html, body').animate({scrollTop:$('#topRichiesta').offset().top}, 0);
        }, 0);
    }
});


$(document).ready(function(){
    rivets.bind($('#certificato'), {parziali: Tuttovisure.parziali});
    $('#richiediOra').click(function() {
        var topRichiesta = $('#topRichiesta').offset().top;
        $('html, body').animate({scrollTop:topRichiesta}, 0);
        return false;
    });
    
    $('input[name="cancellazione_fermo_amministrativo_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto(
      {
        'prefix_form': 'cancellazione_fermo_amministrativo_ordine_',
        'valori': {
            'azienda': {
                'mostra': [
                    'aziendaTitolo',
                    'datiAzienda',
                    'provinciaComune',
                    'ordine-urgenza',
                    'ritiro',
                    'certificato',
                    'certificatoTitolo',
                    'datiVeicolo',
                    'veicoloTitolo'
                ],
                'obbligatori': [
                    'certificato'
                ]
            },
            'persona': {
                'mostra': [
                    'personaTitolo',
                    'datiPersona',
                    'provinciaComune',
                    'ordine-urgenza',
                    'ritiro',
                    'certificato',
                    'certificatoTitolo',
                    'datiVeicolo',
                    'veicoloTitolo'
                ],
                 'obbligatori': [
                     'certificato'
                ]
            }
        },
        'reset': [
            'personaTitolo',
            'aziendaTitolo',
            'datiAzienda',
            'datiPersona',
            'provinciaComune',
            'ordine-urgenza',
            'ritiro',
            'certificato',
            'certificatoTitolo',
            'datiVeicolo',
            'veicoloTitolo'
        ],
        'clean': [
        ]
      }
    );

    $('input[name="cancellazione_fermo_amministrativo_ordine[datiProdotto][haiCertificatoProprieta]"]').logicaOpzioniProdotto(
        {

            'valori': {
                'si': {
                    'mostra': [
                        'fermiCertificato'
                    ],
                    'obbligatori': [
                        'fermiCertificato'
                    ]
                },
                'no': {
                    'mostra': [
                        'fermiNoCertificato'
                    ],
                    'obbligatori': [
                        'fermiNoCertificato'
                    ]
                }
            },
            'reset': [
                'fermiCertificato',
                'fermiNoCertificato'
            ],
            'clean': [

            ]
        }
    );

    $("#cancellazione_fermo_amministrativo_ordine_datiProdotto_provinciaRitiro").val(0);
 

    $("#cancellazione_fermo_amministrativo_ordine_datiProdotto_provincia").change(function() {
      Tuttovisure.provinciaComune($(this), "#cancellazione_fermo_amministrativo_ordine_datiProdotto_comune");
    });
    
    $("#cancellazione_fermo_amministrativo_ordine_datiProdotto_provinciaRitiro").change(function() {
      Tuttovisure.provinciaComune($(this), "#cancellazione_fermo_amministrativo_ordine_datiProdotto_comuneRitiro");
    });
    
    $('input[name="cancellazione_fermo_amministrativo_ordine[datiProdotto][visuraPer]"]').logicaOpzioniProdotto().refreshOpzioni();

    $('input[name="cancellazione_fermo_amministrativo_ordine[datiProdotto][haiCertificatoProprieta]"]').logicaOpzioniProdotto().refreshOpzioni();

});


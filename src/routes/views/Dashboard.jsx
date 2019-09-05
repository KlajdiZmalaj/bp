import React from "react";

import { Header, Footer, Overview,Azioni } from "../../shared-components";
import { MainContent } from "../domains/Home";
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div class="container-fluid mobileNav-Content">
        <div class="row">
            <div class="col"></div>
        </div>
    </div>
   {/* overview */}
    <div class="container-fluid overview ">
      <Overview></Overview>
      <Azioni></Azioni>

        <div class="panels-container">
            <h1 class="max-width heading-tab">Aquista</h1>
            <div class="row no-gutters max-width">
                <div class="col-md-9 ">
                    {/* TAB HEAD 1 */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab1">
                        <i class="fas fa-dot-circle"></i>
                        <h4>Prodotti postali</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* TAB LISTS 1 */}
                    <div class="nav nav-tabs panel-content collapse" id="tab1">
                        <a data-toggle="tab" href="#service1">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>BOLLETTINI POSTALI</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service2">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>bollo auto</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service3">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>postepay</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                    </div>
                    {/* TAB HEAD 2 */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab2">
                        <i class="fas fa-dot-circle"></i>
                        <h4>ricariche telefoniche</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* TAB LISTS 2 */}
                    <div class="nav nav-tabs panel-content collapse" id="tab2">
                        <a data-toggle="tab" href="#service4">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>dirette</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service4">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>con codice pin</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>

                    </div>
                    {/* TAB HEAD 3 */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab3">
                        <i class="fas fa-dot-circle"></i>
                        <h4>ricariche telefoniche internazionali</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* TAB LISTS 3 */}
                    <div class="nav nav-tabs panel-content collapse" id="tab3">
                        <a data-toggle="tab" href="#service5">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>phone all</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service5">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>telecom</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service5">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>best card</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service5">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>on net</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service5">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>lebora</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service5">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>idt</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>

                    </div>
                   {/* TAB HEAD 4 */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab4">
                        <i class="fas fa-dot-circle"></i>
                        <h4>carte di credito</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* TAB LISTS 4 */}
                    <div class="nav nav-tabs panel-content collapse" id="tab4">
                        <a data-toggle="tab" href="#service6">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>ricarica bitkash</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service6">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>paysafe card</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service6">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>on shop</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                    </div>
                    {/* TAB HEAD 5 */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab5">
                        <i class="fas fa-dot-circle"></i>
                        <h4>ricariche scommesse sportive</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* <!--TAB LISTS 5--> */}
                    <div class="nav nav-tabs panel-content collapse" id="tab5">
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>BWIN GIOCO DIGITALE</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>POKER STARS</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>WILLIAM HILL</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>stanleybet</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>BET FLAG</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>STAR CASINO</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service7">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>LOTTOMATICA</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                    </div>
                    {/* <!--TAB HEAD 6--> */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab6">
                        <i class="fas fa-dot-circle"></i>
                        <h4>ricariche televisioni digitali</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* <!--TAB LISTS 6--> */}
                    <div class="nav nav-tabs panel-content collapse" id="tab6">
                        <a data-toggle="tab" href="#service8">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>BWIN GIOCO DIGITALE</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                        <a data-toggle="tab" href="#service8">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>POKER STARS</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                    </div>
                    {/* <!--TAB HEAD 7--> */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab7">
                        <i class="fas fa-dot-circle"></i>
                        <h4>gift card</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* <!--TAB LISTS 7--> */}
                    <div class="nav nav-tabs panel-content collapse" id="tab7">
                        <a data-toggle="tab" href="#service9">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>Amazon</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                    </div>
                    {/* <!--TAB HEAD 8--> */}
                    <div class="panel-tab" data-toggle="collapse" data-target="#tab8">
                        <i class="fas fa-dot-circle"></i>
                        <h4>crypto Valute</h4>
                        <img src="img/uparrow.svg" alt=""/>
                    </div>
                    {/* <!--TAB LISTS 8--> */}
                    <div class="nav nav-tabs panel-content collapse" id="tab8">
                        <a data-toggle="tab" href="#service10">
                            <div class="panel-item">
                                <i class="fas fa-dot-circle"></i>
                                <h4>crypto Valute</h4>
                                <img class="rightTriangle" src="img/rightTriangle.svg" alt=""/>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-md-3 tab-content">
                    {/* <!--first ITEMS  Bolletini postali services--> */}
                    <div id="service1" class="tab-pane fade in active panel-services">
                        <table class="bolletini bolletini1">
                            <tr>
                                <td>
                                    <img src="img/bill-dark.svg" alt=""/>
                                    <p>Bollettini Bianchi</p>
                                </td>
                                <td>
                                    <img src="img/bill-blue.svg" alt=""/>
                                    <p>Bollettini Premarcati</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/bill-orange.svg" alt=""/>
                                    <p>Bollettini RAV</p>
                                </td>
                                <td>
                                    <img src="img/bill-green.svg" alt=""/>
                                    <p>Bollettini <br/> MAV</p>
                                </td>
                            </tr>

                        </table>
                    </div>
                    {/* <!--first ITEMS bollo auto services--> */}
                    <div id="service2" class="tab-pane fade in  panel-services">
                        <table class="bolletini bolletini2">
                            <tr>
                                <td>
                                    <img src="img/Car.svg" alt=""/>
                                    <p>Bollo Auto</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!-- first ITEMS postepay services--> */}
                    <div id="service3" class="tab-pane fade in  panel-services">
                        <table class="bolletini bolletini3">
                            <tr>
                                <td>
                                    <img src="img/postpayimg.svg" alt=""/>
                                    <p>post pay</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--SECOND ITEMS (dirette services)--> */}
                    <div id="service4" class="tab-pane fade in  panel-services">
                        <table class="carriers">
                            <tr>
                                <td>
                                    <img src="img/TIM_logo_2016.svg" alt=""/>
                                    <p>tim</p>
                                </td>
                                <td>
                                    <img src="img/vodafone.svg" alt=""/>
                                    <p>vodafone</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/wind-logo-svg-vector.svg" alt=""/>
                                    <p>Bollettini rav</p>
                                </td>
                                <td>
                                    <img src="img/three-logo.svg" alt=""/>
                                    <p>tre</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/posteitalia.svg" alt=""/>
                                    <p>poste mobile</p>
                                </td>
                                <td>
                                    <img src="img/coop.svg" alt=""/>
                                    <p>coop voce</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--THIRD ITEMS (phone,telecom,onnet libra,idt services)--> */}
                    <div id="service5" class="tab-pane fade in  panel-services">
                        <table class="phoneall">
                            <tr>
                                <td>
                                    <p>new colombus</p>
                                    <h3>5<sup>€</sup></h3>
                                </td>
                                <td>
                                    <p>new colombus</p>
                                    <h3>12<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>easy africa</p>
                                    <h3>5<sup>€</sup></h3>
                                </td>
                                <td>
                                    <p>easy east europe</p>
                                    <h3>5<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>easy south africa</p>
                                    <h3>5<sup>€</sup></h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--4th ITEMS (credit cards services)--> */}
                    <div id="service6" class="tab-pane fade in  panel-services">
                        <table class=" phoneall cardeCredite">
                            <tr>
                                <td>
                                    <img src="img/paysafe.svg" alt=""/>
                                    <h3>10<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/paysafe.svg" alt=""/>
                                    <h3>25<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/paysafe.svg" alt=""/>
                                    <h3>50<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/paysafe.svg" alt=""/>
                                    <h3>100<sup>€</sup></h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--5th ITEMS (scommesso sprotive services)--> */}
                    <div id="service7" class="tab-pane fade in  panel-services">
                        <table class=" phoneall cardeCredite">
                            <tr>
                                <td>
                                    <img src="img/Stanleybet_logo_international.svg" alt=""/>
                                    <h3>5<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/Stanleybet_logo_international.svg" alt=""/>
                                    <h3>10<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/Stanleybet_logo_international.svg" alt=""/>
                                    <h3>25<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/Stanleybet_logo_international.svg" alt=""/>
                                    <h3>50<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/Stanleybet_logo_international.svg" alt=""/>
                                    <h3>100<sup>€</sup></h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--6th ITEMS (TVs services)--> */}
                    <div id="service8" class="tab-pane fade in  panel-services">
                        <table class=" phoneall cardeCredite">
                            <tr>
                                <td>
                                    <img src="img/Sky_Italia_-_Logo_2018.svg" alt=""/>
                                    <h3>15<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/Sky_Italia_-_Logo_2018.svg" alt=""/>
                                    <h3>25<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/Sky_Italia_-_Logo_2018.svg" alt=""/>
                                    <h3>50<sup>€</sup></h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--7th ITEMS (gift card services)--> */}
                    <div id="service9" class="tab-pane fade in  panel-services">
                        <table class=" phoneall giftCards">
                            <tr>
                                <td>
                                    <img src="img/Amazon_logo.svg" alt=""/>
                                    <h3>10<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/Amazon_logo.svg" alt=""/>
                                    <h3>25<sup>€</sup></h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/Amazon_logo.svg" alt=""/>
                                    <h3>50<sup>€</sup></h3>
                                </td>
                                <td>
                                    <img src="img/Amazon_logo.svg" alt=""/>
                                    <h3>100<sup>€</sup></h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* <!--8th ITEMS (crypto valute services)--> */}
                    <div id="service10" class="tab-pane fade in  panel-services">
                        <table class=" phoneall cryptoValute">
                            <tr>
                                <td>
                                    <img src="img/bitcoinorange.svg" alt=""/>
                                    <p>Bitcoin</p>
                                </td>
                                <td>
                                    <img src="img/bitcoingreen.svg" alt=""/>
                                    <p>Bitcoin cash</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/ethereum.svg" alt=""/>
                                    <p>etherum </p>
                                </td>
                                <td>
                                    <img src="img/riple.svg" alt=""/>
                                    <p>ripple</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/litecoin.svg" alt=""/>
                                    <p>litecoin </p>
                                </td>
                                <td>
                                    <img src="img/dashcoin.svg" alt=""/>
                                    <p>DASH <br/> DIGITAL CASH</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                   
                    <div class="cancelMobile">
                        <img src="img/cancelMob.svg" alt=""/>
                    </div>
                </div>
                {/* <!--rigth block where is no selection--> */}
                <div class="col-md-3 pl-3">
                    <div class="nothinSelected">
                        <img src="img/click.svg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
   
    </div>
    <Footer />
    {/* <!--Chat icon botm right corner--> */}
    <div class="chatSticky">
        <img src="img/chatSticky.svg" alt=""/>
    </div>
    {/* <!--Module for boletini bianchi--> */}
    <div class="modulePopUP modulePopUP1">
        <div class="module container-fluid max-width_modulePopUP">
            <div class="row">
                <div class="col-12 leftCol_Module">
                    <div class="row no-gutters">
                        <div class="col-12 col-lg-6">
                            <table class="_modulePopUP__table">
                                <tr>
                                    <td>
                                        <div><img src="img/bill-dark.svg" alt=""/>
                                            <p>Bollettini <br/> Bianchi</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            Servizio attivo tutti i giorni <br/>ferali dalle 8,30 alle 19,30
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-12 col-lg-6">
                            <table class="_modulePopUP__table2">
                                <tr>
                                    <td>
                                        <h3>esegui</h3>
                                        <img src="img/check-symbol.svg"/>
                                    </td>
                                    <td>
                                        <h3>esegui</h3>
                                        <p>pagemento <br/> diferito</p>
                                    </td>
                                    <td class="stampCup">
                                        <h3>stampa</h3>
                                        <p>pre <br/> scontrino</p>
                                    </td>
                                    <td class="CancelModule">
                                        <h3>anulla</h3>
                                        <img src="img/close.svg"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="row no-gutters _modulePopUP__body">
                        <div class="col-12 col-lg-9 ">
                            <h2>CONTI CORRENTI POSTALI - Ricevuta di Accredito</h2>
                        </div>
                        <div class="col-12 col-lg-3">
                            <img class="bacnoPosta" src="img/bancoposta.svg" alt=""/>
                        </div>
                        <div class="col-12 col-lg-7">
                            <div class="euroboll">
                                <img src="img/euro.svg" alt=""/> <span>sul C/C n.</span> <input type="text"/>
                            </div>
                        </div>
                        <div class="col-12 col-lg-5 mt-2 mt-lg-0">
                            <div class="euroboll">
                                <span>di Euro</span> <input type="text"/>
                            </div>
                        </div>

                        <div class="col-3 ">
                            <div class="euroboll">
                                <span>INTESTATO A</span>
                            </div>
                        </div>
                        <div class="col-9 ">
                            <div class="euroboll">
                                <input class="py-4 pl-2 mt-2" type="text"/>
                            </div>
                        </div>

                        <div class="col-3 ">
                            <div class="euroboll">
                                <span>CAUSALE</span>
                            </div>
                        </div>
                        <div class="col-9 ">
                            <div class="euroboll">
                                <input class="py-4 pl-2 mt-3" type="text"/>
                            </div>
                        </div>

                        <div class="col-3 ">
                            <div class="euroboll">
                                <span>ESEGUITO DA</span>
                            </div>
                        </div>
                        <div class="col-9 ">
                            <div class="euroboll">
                                <input class="py-1 pl-2 mt-3" type="text"/>
                            </div>
                        </div>

                        <div class="col-3 ">
                            <div class="euroboll">
                                <span>VIA-PIAZZA</span>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="euroboll">
                                <input class="py-1 pl-2 mt-3 mb-3" type="text"/>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="euroboll">
                                <input class="py-1 pl-2 mt-3 mb-3" type="text"/>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="euroboll">
                                <input class="py-1 pl-2 mt-3 mb-3" type="text"/>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="euroboll">
                                <span>CONDIZIONI</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="euroboll">
                                <div class="contitions-boll">
                                    <p>CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI POSTALI
                                        PROFILI NORMATIVI</p>
                                    <p>Il pagamento dei bollettini postali è un servizio di pagamento per il cui
                                        esercizio
                                        professionale è necessaria un'apposita autorizzazione rilasciata dalla Banca
                                        d'Italia.
                                        In
                                        particolare, l'articolo 114-sexies del Testo unico bancario (d.lgs. 385/1993)
                                        riserva la
                                        prestazione di servizi di pagamento alle banche, agli istituti di moneta
                                        elettronica, a
                                        Poste Italiane Spa e agli Istituti di Pagamento (c.d. “prestatori di servizi di
                                        pagamento”,
                                        PSP)</p>.
                                    <p>
                                        I soggetti che offrono alla clientela il servizio “Pagamento bollettini di
                                        conto
                                        corrente” devono operare o come prestatori di servizi di pagamento oppure sulla
                                        base di
                                        un
                                        contratto con un prestatore di servizi di pagamento autorizzato. Lo stesso vale
                                        anche
                                        nel
                                        caso di soggetti, diversi da Poste Italiane, abilitati all'offerta di servizi
                                        postali;
                                        la
                                        sola autorizzazione e/o la licenza rilasciata dal Ministero dello Sviluppo
                                        Economico per
                                        i
                                        servizi postali non abilita quindi tali soggetti allo svolgimento del servizio
                                        'Pagamento
                                        bollettini postali'.
                                    </p>
                                    <p>
                                        1. OGGETTO E DESCRIZIONE
                                        I servizi inclusi nella sezione vengono evasi in collaborazione con Mr.Pay Srl.
                                        Il
                                        cliente
                                        affiliato, una volta attivato l'account a lui riservato, per utilizzare il
                                        servizio di
                                        pagamento utenze dovrà seguire le istruzioni contenute nella pagina dedicata.
                                    </p>
                                    <p>La funzione
                                        “Prodotti Postali” permette ai Clienti Affiliati, di inviare a Mr.Pay Srl la
                                        richiesta
                                        di
                                        effettuare il pagamento di bollettini postali mediante addebito sul Borsellino
                                        Elettronico
                                        prepagato dell' importo del bollettino da pagare sommato ai relativi diritti
                                        postali e
                                        commissioni.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5 rightCol_Module">
                    <div class="row no-gutters">
                        <div class="_modulePopUP__cupon">
                            <div class="_modulePopUP__cupon--header">
                                <img src="img/print.svg" alt=""/>
                                <h3>Stampa dello scontrino</h3>
                            </div>
                            <div class="_modulePopUP__cupon--body">
                                <img src="img/logoGray.svg" alt=""/>
                                <h6>OTC srl</h6>
                                <span class="__cupon--body__address">Via Risorgimento n.50 - castel san pietro
                                    terme</span>
                                <span class="__cupon--body__phone">234234234</span>
                                <h4>SCONTRINO VERIFICA</h4>
                                <h3>Prodotto: Bollettini Bianchi</h3>
                            </div>
                            <div class="_modulePopUP__cupon--table">
                                <table>
                                    <tr>
                                        <td>CC:</td>
                                        <td>123123</td>
                                    </tr>
                                    <tr>
                                        <td>INTESTATARIO:</td>
                                        <td>mario rossi</td>
                                    </tr>
                                    <tr>
                                        <td>CAUSALE:</td>
                                        <td>MULTA COMUNE</td>
                                    </tr>
                                    <tr>
                                        <td>ESEGUITO DA:</td>
                                        <td>BPOINT</td>
                                    </tr>
                                    <tr>
                                        <td>INDIRIZZO:</td>
                                        <td>VIA RISORGIMENTO</td>
                                    </tr>
                                    <tr>
                                        <td>cap:</td>
                                        <td>70026</td>
                                    </tr>
                                    <tr>
                                        <td>localita:</td>
                                        <td>san pietro terme</td>
                                    </tr>
                                    <tr>
                                        <td>provincia:</td>
                                        <td>rn</td>
                                    </tr>
                                </table>
                                <table class="import-bottom">
                                    <tr>
                                        <td>IMPORTO: <br/>
                                            <span>
                                                €50
                                            </span>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-secondary"><img src="img/check-symbol.svg"/> <br/>
                                    Stampa</button>
                                <button type="button" class="btn btn-secondary"><img src="img/close.svg"/> <br/>
                                    Anulla</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--Module for boletini auto--> */}
    <div class="modulePopUP modulePopUP2">
        <div class="module container-fluid max-width_modulePopUP">
            <div class="row">
                <div class="col-12 leftCol_Module">
                    <div class="row no-gutters">
                        <div class="col-12 col-lg-6">
                            <table class="_modulePopUP__table">
                                <tr>
                                    <td>
                                        <div><img src="img/Car.svg" alt=""/>
                                            <p>Bollettini <br/> Auto</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            Servizio attivo tutti i giorni <br/>ferali dalle 8,30 alle 19,30
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-12 col-lg-6">
                            <table class="_modulePopUP__table2">
                                <tr>
                                    <td>
                                        <h3>esegui</h3>
                                        <img src="img/check-symbol.svg"/>
                                    </td>
                                    <td>
                                        <h3>esegui</h3>
                                        <p>pagemento <br/> diferito</p>
                                    </td>
                                    <td class="stampCup">
                                        <h3>stampa</h3>
                                        <p>pre <br/> scontrino</p>
                                    </td>
                                    <td class="CancelModule">
                                        <h3>anulla</h3>
                                        <img src="img/close.svg"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="row no-gutters _modulePopUP__body">
                        <div class="col-12 py-3">
                            <h2>PAGAMENTO ELETTRONICO BOLLO AUTOVEICOLI E MOTOVEICOLI</h2>
                        </div>
                        {/* <!--Module 2 Title ROW--> */}
                        <div class="col-12 titleModul2">
                            <h4>ESTREMI PAGAMENTO</h4>
                        </div>
                        <div class="col-2 d-none d-md-block">
                            <img src="img/verificaEstr.svg" class="pl-3"/>
                        </div>
                        <div class="col-6 col-md-5">
                            <div class="euroboll ">
                                <span>Conto Correte</span>
                            </div>
                            <div class="euroboll mt-2">
                                <span>Intestato A</span>
                            </div>
                        </div>
                        <div class="col-6 col-md-5">
                            <div class="euroboll">
                                <input type="text"/>
                            </div>
                            <div class="euroboll mt-2">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--Module 2 Title ROW--> */}
                        <div class="col-12 titleModul2">
                            <h4>DATI VEICOLO E INTESTATARIO</h4>
                        </div>
                        <div class="col-md-4">
                            <div class="euroboll ">
                                <span>TARGA</span>
                                <input type="text"/>
                            </div>
                        </div>
                        <div class="col-md-5 pl-2 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>INTESTATARIO</span>
                                <input type="text"/>
                            </div>
                        </div>
                        <div class="col-md-3 pl-2">
                            <div class="euroboll ">
                                <span>Tipo</span>
                                <select>
                                    <option>F</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                                <div class="helpModul2" data-toggle="tooltip" title="Select Car Type">?</div>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2">
                            <div class="euroboll ">
                                <span>CATEGORIA</span>
                                <input type="text"/>
                                <div class="helpModul2 py-0" data-toggle="tooltip" title="categoria">?</div>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>CODICE FISCALE</span>
                                <input type="text"/>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2">
                            <div class="euroboll ">
                                <span>INDIRIZZO</span>
                                <input type="text"/>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>PROVINCIA</span>
                                <input type="text"/>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2">
                            <div class="euroboll ">
                                <span>LOCALITA</span>
                                <input type="text"/>
                            </div>
                        </div>
                        <div class="col-md-6 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>CAP</span>
                                <input type="text" class="w-10"/>
                            </div>
                        </div>
                        {/* <!--Module 2 Title ROW--> */}
                        <div class="col-12 titleModul2">
                            <h4>DATI VEICOLO E INTESTATARIO</h4>
                        </div>
                        <div class="col-12 pl-4 undertitleMod">
                            <h6>IL VALORE DI IMPORTO VIENE CALCOLATO DALLA SOMMA DI TASSA + SANZIONI + INTERESSI</h6>
                        </div>
                        <div class="spacerMod"></div>
                        <div class="col-md-3">
                            <div class="euroboll ">
                                <span>IMPORTO</span>
                                <input type="text" style={{width: '30px'}} placeholder="0,00"/>
                            </div>
                        </div>
                        <div class="col-md-3 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>TASSA</span>
                                <input type="text" style={{width: '30px'}} placeholder="0,00"/>
                            </div>
                        </div>
                        <div class="col-md-3 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>SANZIONI</span>
                                <input type="text" style={{width: '30px'}} placeholder="0,00"/>
                            </div>
                        </div>
                        <div class="col-md-3 mt-2 mt-md-0">
                            <div class="euroboll ">
                                <span>INTERESSI</span>
                                <input type="text" style={{width: '30px'}} placeholder="0,00"/>
                            </div>
                        </div>
                        <div class="spacerMod"></div>
                        <div class="col-md-4">
                            <div class="euroboll ">
                                <span>RIDUZIONE</span>
                                <input type="text"   style={{width: '90px'}} />
                                <div class="helpModul2" data-toggle="tooltip" title="RIDUZIONE">?</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="euroboll ">
                                <span>RIDUZIONE</span>
                                <input type="text" style={{width: '40px'}} />

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="euroboll ">
                                <span>RIDUZIONE</span>
                                <input type="text"  style={{width: '50px'}} />
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <div class="euroboll">
                                <span>CONDIZIONI</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="euroboll">
                                <div class="contitions-boll">
                                    <p>CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI POSTALI
                                        PROFILI NORMATIVI</p>
                                    <p>Il pagamento dei bollettini postali è un servizio di pagamento per il cui
                                        esercizio
                                        professionale è necessaria un'apposita autorizzazione rilasciata dalla Banca
                                        d'Italia.
                                        In
                                        particolare, l'articolo 114-sexies del Testo unico bancario (d.lgs. 385/1993)
                                        riserva la
                                        prestazione di servizi di pagamento alle banche, agli istituti di moneta
                                        elettronica, a
                                        Poste Italiane Spa e agli Istituti di Pagamento (c.d. “prestatori di servizi di
                                        pagamento”,
                                        PSP)</p>.
                                    <p>
                                        I soggetti che offrono alla clientela il servizio “Pagamento bollettini di
                                        conto
                                        corrente” devono operare o come prestatori di servizi di pagamento oppure sulla
                                        base di
                                        un
                                        contratto con un prestatore di servizi di pagamento autorizzato. Lo stesso vale
                                        anche
                                        nel
                                        caso di soggetti, diversi da Poste Italiane, abilitati all'offerta di servizi
                                        postali;
                                        la
                                        sola autorizzazione e/o la licenza rilasciata dal Ministero dello Sviluppo
                                        Economico per
                                        i
                                        servizi postali non abilita quindi tali soggetti allo svolgimento del servizio
                                        'Pagamento
                                        bollettini postali'.
                                    </p>
                                    <p>
                                        1. OGGETTO E DESCRIZIONE
                                        I servizi inclusi nella sezione vengono evasi in collaborazione con Mr.Pay Srl.
                                        Il
                                        cliente
                                        affiliato, una volta attivato l'account a lui riservato, per utilizzare il
                                        servizio di
                                        pagamento utenze dovrà seguire le istruzioni contenute nella pagina dedicata.
                                    </p>
                                    <p>La funzione
                                        “Prodotti Postali” permette ai Clienti Affiliati, di inviare a Mr.Pay Srl la
                                        richiesta
                                        di
                                        effettuare il pagamento di bollettini postali mediante addebito sul Borsellino
                                        Elettronico
                                        prepagato dell' importo del bollettino da pagare sommato ai relativi diritti
                                        postali e
                                        commissioni.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5 rightCol_Module">
                    <div class="row no-gutters">
                        <div class="_modulePopUP__cupon">
                            <div class="_modulePopUP__cupon--header">
                                <img src="img/print.svg" alt=""/>
                                <h3>Stampa dello scontrino</h3>
                            </div>
                            <div class="_modulePopUP__cupon--body">
                                <img src="img/logoGray.svg" alt=""/>
                                <h6>OTC srl</h6>
                                <span class="__cupon--body__address">Via Risorgimento n.50 - castel san pietro
                                    terme</span>
                                <span class="__cupon--body__phone">234234234</span>

                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary"><img src="img/check-symbol.svg"/>
                                        <br/>
                                        Stampa</button>
                                    <button type="button" class="btn btn-secondary"><img src="img/close.svg"/> <br/>
                                        Anulla</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--Module for postepay--> */}
    <div class="modulePopUP modulePopUP3">
        <div class="module container-fluid max-width_modulePopUP">
            <div class="row">
                <div class="col-12 leftCol_Module">
                    <div class="row no-gutters">
                        <div class="col-12 col-lg-6">
                            <table class="_modulePopUP__table">
                                <tr>
                                    <td>
                                        <div><img src="img/postpayimg.svg" alt=""/>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            Servizio attivo tutti i giorni <br/>ferali dalle 8,30 alle 19,30
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-12 col-lg-6">
                            <table class="_modulePopUP__table2">
                                <tr>
                                    <td>
                                        <h3>esegui</h3>
                                        <img src="img/check-symbol.svg" alt=""/>
                                    </td>
                                    <td>
                                        <h3>esegui</h3>
                                        <p>pagemento <br/> diferito</p>
                                    </td>
                                    <td class="stampCup">
                                        <h3>stampa</h3>
                                        <p>pre <br/> scontrino</p>
                                    </td>
                                    <td class="CancelModule">
                                        <h3>anulla</h3>
                                        <img src="img/close.svg" alt="" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="row no-gutters _modulePopUP__body">
                        <div class="col-12 py-3">
                            <h2>RICARICA POSTEPAY</h2>
                        </div>

                        <div class="col-12 payThumb ">
                            <img src="img/postepayBlue.svg" class="img-fluid" alt=""/>
                            <p class="text-center">
                                Attenzione: a causa della normativa sull`antiriciclaggio, l`importo massimo ricaricabile
                                e di Euro 200+ commissioni.
                                Non e possibile effettuare, in una giornata, piu di due
                                ricariche verso la stessa carte Postepay.
                            </p>
                        </div>
                        {/* <!--module 3 1 row--> */}
                        <div class="col-5 ">
                            <div class="euroboll ">
                                <span class="pr-5">TARGA</span>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="euroboll ">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--module 3 1 row--> */}
                        <div class="col-5 pt-2">
                            <div class="euroboll ">
                                <span class="pr-5">IMPORTO</span>
                            </div>
                        </div>
                        <div class="col-7 pt-2">
                            <div class="euroboll ">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--module 3 1 row--> */}
                        <div class="col-5 pt-2">
                            <div class="euroboll ">
                                <span class="pr-5">INTESTATARIO</span>
                            </div>
                        </div>
                        <div class="col-7 pt-2">
                            <div class="euroboll ">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--module 3 1 row--> */}
                        <div class="col-5 pt-2">
                            <div class="euroboll ">
                                <span class="pr-5">COD FISC INTESTATARIO</span>
                            </div>
                        </div>
                        <div class="col-7 pt-2">
                            <div class="euroboll ">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--module 3 1 row--> */}
                        <div class="col-5 pt-2">
                            <div class="euroboll ">
                                <span class="pr-5">ORDINANTE</span>
                            </div>
                        </div>
                        <div class="col-7 pt-2">
                            <div class="euroboll ">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--module 3 1 row--> */}
                        <div class="col-5 pt-2">
                            <div class="euroboll ">
                                <span class="pr-5">COD FISC ORDINANTE</span>
                            </div>
                        </div>
                        <div class="col-7 pt-2">
                            <div class="euroboll ">
                                <input type="text"/>
                            </div>
                        </div>
                        {/* <!--module 3 1 row--> */}

                        <div class="col-12 mt-4">
                            <div class="euroboll">
                                <span>CONDIZIONI</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="euroboll">
                                <div class="contitions-boll">
                                    <p>CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI POSTALI
                                        PROFILI NORMATIVI</p>
                                    <p>Il pagamento dei bollettini postali è un servizio di pagamento per il cui
                                        esercizio
                                        professionale è necessaria un'apposita autorizzazione rilasciata dalla Banca
                                        d'Italia.
                                        In
                                        particolare, l'articolo 114-sexies del Testo unico bancario (d.lgs. 385/1993)
                                        riserva la
                                        prestazione di servizi di pagamento alle banche, agli istituti di moneta
                                        elettronica, a
                                        Poste Italiane Spa e agli Istituti di Pagamento (c.d. “prestatori di servizi di
                                        pagamento”,
                                        PSP)</p>.
                                    <p>
                                        I soggetti che offrono alla clientela il servizio “Pagamento bollettini di
                                        conto
                                        corrente” devono operare o come prestatori di servizi di pagamento oppure sulla
                                        base di
                                        un
                                        contratto con un prestatore di servizi di pagamento autorizzato. Lo stesso vale
                                        anche
                                        nel
                                        caso di soggetti, diversi da Poste Italiane, abilitati all'offerta di servizi
                                        postali;
                                        la
                                        sola autorizzazione e/o la licenza rilasciata dal Ministero dello Sviluppo
                                        Economico per
                                        i
                                        servizi postali non abilita quindi tali soggetti allo svolgimento del servizio
                                        'Pagamento
                                        bollettini postali'.
                                    </p>
                                    <p>
                                        1. OGGETTO E DESCRIZIONE
                                        I servizi inclusi nella sezione vengono evasi in collaborazione con Mr.Pay Srl.
                                        Il
                                        cliente
                                        affiliato, una volta attivato l'account a lui riservato, per utilizzare il
                                        servizio di
                                        pagamento utenze dovrà seguire le istruzioni contenute nella pagina dedicata.
                                    </p>
                                    <p>La funzione
                                        “Prodotti Postali” permette ai Clienti Affiliati, di inviare a Mr.Pay Srl la
                                        richiesta
                                        di
                                        effettuare il pagamento di bollettini postali mediante addebito sul Borsellino
                                        Elettronico
                                        prepagato dell' importo del bollettino da pagare sommato ai relativi diritti
                                        postali e
                                        commissioni.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5 rightCol_Module">
                    <div class="row no-gutters">
                        <div class="_modulePopUP__cupon">
                            <div class="_modulePopUP__cupon--header">
                                <img src="img/print.svg" alt=""/>
                                <h3>Stampa dello scontrino</h3>
                            </div>
                            <div class="_modulePopUP__cupon--body">
                                <img src="img/logoGray.svg" alt=""/>
                                <h6>OTC srl</h6>
                                <span class="__cupon--body__address">Via Risorgimento n.50 - castel san pietro
                                    terme</span>
                                <span class="__cupon--body__phone">234234234</span>

                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary"><img src="img/check-symbol.svg"/>
                                        <br/>
                                        Stampa</button>
                                    <button type="button" class="btn btn-secondary"><img src="img/close.svg"/> <br/>
                                        Anulla</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--Module for carriers (TIM)--> */}
    <div class="modulePopUP modulePopUP4">
        <div class="module container-fluid max-width_modulePopUP max-width_modulePopUP-carrier">
            <div class="row">
                <div class="col-12 leftCol_Module">
                    <div class="row">
                        <div class="col-2 p-0">
                            <table class="LeftSide-BTNs" data-aos="flip-left">
                                <tr>
                                    <td class="carrierLogo" colspan="3"><img src="img/TIM_logo_2016.svg" alt=""/></td>
                                </tr>
                                <tr>
                                    <td class="CarrierPrice">5 <sup>+1</sup></td>
                                    <td class="CurrencyTD ">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="CarrierPrice">9 <sup>+1</sup></td>
                                    <td class="CurrencyTD">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="CarrierPrice">15</td>
                                    <td class="CurrencyTD">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="CarrierPrice">20 </td>
                                    <td class="CurrencyTD">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>
                                <tr class="active">
                                    <td class="CarrierPrice">30</td>
                                    <td class="CurrencyTD">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="CarrierPrice">50 </td>
                                    <td class="CurrencyTD">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="CarrierPrice">100</td>
                                    <td class="CurrencyTD">
                                        <p class="Currency">Euro</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-10 ">
                            <div class="rightCarrierCOL" data-aos="flip-right">
                                <div class="row no-gutters">
                                    <h4>TIM <span class="changePrice">30</span> EURO</h4>
                                </div>
                                <div class="row no-gutters">
                                    <h5>INSERIRE IL NUMERO DI TELEFONO DA RICARICARE</h5>
                                </div>
                                <div class="row no-gutters">
                                    <input type="text" class="displayedVal text-center" placeholder="_ _ _ _ _ _ _ _ _ "
                                        disabled/>
                                </div>
                                <div class="row numpadCarrier">
                                    <div class="col-8">
                                        <table>
                                            <tr>
                                                <td id="num1">1</td>
                                                <td id="num2">2</td>
                                                <td id="num3">3</td>
                                            </tr>
                                            <tr>
                                                <td id="num4">4</td>
                                                <td id="num5">5</td>
                                                <td id="num6">6</td>
                                            </tr>
                                            <tr>
                                                <td id="num7">7</td>
                                                <td id="num8">8</td>
                                                <td id="num9">9</td>
                                            </tr>
                                            <tr>
                                                <td id="num0">0</td>
                                                <td id="numC">C</td>

                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-4" style={{'padding-right': '30px'}}>
                                        <table class="_modulePopUP__tableCarrier">
                                            <tr>
                                                <td>
                                                    <h3>esegui</h3>
                                                    <img src="img/check-symbol.svg" alt=""/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="stampCup">
                                                    <h3>stampa</h3>
                                                    <p>pre <br/> scontrino</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="CancelModule">
                                                    <h3>anulla</h3>
                                                    <img src="img/close.svg" alt=""/>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5 rightCol_Module">
                    <div class="row no-gutters">
                        <div class="_modulePopUP__cupon">
                            <div class="_modulePopUP__cupon--header">
                                <img src="img/print.svg" alt=""/>
                                <h3>Stampa dello scontrino</h3>
                            </div>
                            <div class="_modulePopUP__cupon--body ">
                                <img src="img/logoGray.svg" alt=""/>
                                <h6>OTC srl</h6>
                                <span class="__cupon--body__address">Via Risorgimento n.50 - castel san pietro
                                    terme</span>
                                <span class="__cupon--body__phone">234234234</span>
                                <h6>Scontrino Verifica</h6>
                                <h6>Prodotto: TIM <span class='changePrice'>30</span> EURO</h6>
                                <div class="col-12 _modulePopUP__cupon--table">
                                    <table>
                                        <tr>
                                            <td>Numero di telefono</td>
                                        </tr>
                                        <tr>
                                            <td class="phoneNum">239423242</td>
                                        </tr>
                                    </table>
                                    <table class="import-bottom">
                                        <tr>
                                            <td>Importo: <br/>€<span class="changePrice">30</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary"><img src="img/check-symbol.svg"/>
                                        <br/>
                                        Stampa</button>
                                    <button type="button" class="btn btn-secondary"><img src="img/close.svg"/> <br/>
                                        Anulla</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


   
      </div>
    );
  }
}

export default Dashboard;

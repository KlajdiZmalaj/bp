import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import { Azioni, Overview, Header } from "shared-components";
import images from "themes/images";
class Annunci extends React.Component {
  constructor(){
    super()
    this.state = {
      tabFilter: ''
    }
  }

  componentDidMount(){
    this.props.getAds()
    console.log('componentDidMount ', this.props.ads)
  }

  selectTab(payload){
    this.state.tabFilter = payload
    this.setState({})
  }

  render() {
    const {ads} = this.props;
    console.log("render ",this.state )
    return (
      <div>
        <Header></Header>
        <Overview></Overview>
        <div className="container-fluid overview ">
          <Azioni active="annunci"></Azioni>
          <div className="panels-container">
            <div className="sort-annunci max-width">
              <h1 className="heading-tab mr-auto">Annunci</h1>
              <ul className="m-0 p-0">
                <li onClick={()=> this.selectTab('')} className={`${this.state.tabFilter === ''} : "active" : ""`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Tutti
                  </span>
                </li>
                <li onClick={()=> this.selectTab('4')} className={`${this.state.tabFilter === '4'} : "active" : ""`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Privata
                  </span>
                </li>
                <li  onClick={()=> this.selectTab('3')} className={`${this.state.tabFilter === '3'} : "active" : ""`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Cancellazione prodotto
                  </span>
                </li>
                <li onClick={()=> this.selectTab('2')} className={`${this.state.tabFilter === '2'} : "active" : ""`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Informazione
                  </span>
                </li>
                <li  onClick={()=> this.selectTab('1')} className={`${this.state.tabFilter === '1'} : "active" : ""`}>
                  <span >
                    <i className="fas fa-dot-circle"></i>Nuovo prodotto
                  </span>
                </li>
              </ul>
            </div>
            <div className="row no-gutters max-width">

            {/* {ads.messages || [].filter(el = >)} */}

              <div className="col-md-12">
                <div
                  className="panel-tab"
                  data-toggle="collapse"
                  data-target="#tab1"
                >
                  <i className="fas fa-dot-circle"></i>
                  <h4>Lorem, ipsum.</h4>
                  <span className="date-pane">12/12/2000</span>
                  <img src={images.uparrow} alt="" />
                </div>

                <div
                  className="nav nav-tabs panel-content panel-content-annunci collapse"
                  id="tab1"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  quis nostrum pariatur.
                </div>

                <div
                  className="panel-tab"
                  data-toggle="collapse"
                  data-target="#tab2"
                >
                  <i className="fas fa-dot-circle"></i>
                  <h4>Lorem ipsum dolor sit amet consectetur.</h4>
                  <span className="date-pane">12/12/2000</span>
                  <img src={images.uparrow} alt="" />
                </div>

                <div
                  className="nav nav-tabs panel-content panel-content-annunci collapse"
                  id="tab2"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic,
                  sequi? Amet, placeat.
                </div>

                <div
                  className="panel-tab"
                  data-toggle="collapse"
                  data-target="#tab3"
                >
                  <i className="fas fa-dot-circle"></i>
                  <h4>Lorem ipsum dolor sit amet.</h4>
                  <span className="date-pane">12/12/2000</span>
                  <img src={images.uparrow} alt="" />
                </div>

                <div
                  className="nav nav-tabs panel-content panel-content-annunci collapse"
                  id="tab3"
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Voluptas commodi autem eos!
                </div>

                <div
                  className="panel-tab"
                  data-toggle="collapse"
                  data-target="#tab4"
                >
                  <i className="fas fa-dot-circle"></i>
                  <h4>Lorem ipsum dolor sit amet.</h4>
                  <span className="date-pane">12/12/2000</span>
                  <img src={images.uparrow} alt="" />
                </div>

                <div
                  className="nav nav-tabs panel-content panel-content-annunci collapse"
                  id="tab4"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae consectetur amet dolores!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ads: state.auth.ads
})

export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  Annunci
);

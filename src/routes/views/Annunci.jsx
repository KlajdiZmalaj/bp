import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import { Azioni, Overview, Header, Loader, Modal } from "shared-components";
import images from "themes/images";
class Annunci extends React.Component {
  constructor(){
    super()
    this.state = {
      tabFilter: '',
      expanded: [],
      modal: false
    }
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this)
  }

  hideModal(){
    this.state.modal = false
    this.setState({})
  }
  showModal(){
    this.state.modal = true
    this.setState({})
  }

  componentDidMount(){
    this.props.getAds()
  }

  selectTab(payload){
    this.state.tabFilter = payload
    this.setState({})
  }

  tabExpand(tab){
    if(this.state.expanded.includes(tab)){
      this.state.expanded = this.state.expanded.filter(el => el != tab)
      this.setState({})
    }else{
      this.state.expanded.push(tab)
       this.setState({})
    }
    console.log(this.state.expanded)
  }

  render() {
    const {ads, ads_loading} = this.props;
    let adsFiltered = this.state.tabFilter === "" ? ads : ads.filter(m => m.importance === this.state.tabFilter);
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
                <li onClick={()=> this.selectTab('')} className={`${this.state.tabFilter === '' ?  "active" : "" }`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Tutti
                  </span>
                </li>
                <li onClick={()=> this.selectTab('4')} className={`${this.state.tabFilter === '4' ? "active" : ""}`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Privata
                  </span>
                </li>
                <li  onClick={()=> this.selectTab('3')} className={`${this.state.tabFilter === '3' ? "active" : ""}`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Cancellazione prodotto
                  </span>
                </li>
                <li onClick={()=> this.selectTab('2')} className={`${this.state.tabFilter === '2' ? "active" : ""}`}>
                  <span>
                    <i className="fas fa-dot-circle"></i>Informazione
                  </span>
                </li>
                <li  onClick={()=> this.selectTab('1')} className={`${this.state.tabFilter === '1' ? "active" : ""}`}>
                  <span >
                    <i className="fas fa-dot-circle"></i>Nuovo prodotto
                  </span>
                </li>
              </ul>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                {ads_loading ?  <Loader /> : 
                adsFiltered.length === 0 ? <div>Nessuna annunci per questa scheda</div> : null}
                {adsFiltered.map(m => <div key={m.id}> 
                    <div onClick={()=>this.tabExpand(m.id)}
                      className="panel-tab"
                      aria-expanded={`${this.state.expanded.find(tab => tab === m.id) != null ? "true" : "false"}`}
                    >
                      <i id={
                        m.importance === "1" ? "new":
                        m.importance === "2" ? "info":
                        m.importance === "3" ? "canceled":
                        m.importance === "4" ? "private": ""
                      } className="fas fa-dot-circle"></i>
                      <h4>{m.title}</h4>
                    <span className="date-pane">{m.updated_at}</span>
                      <img src={images.uparrow} alt="" />
                    </div>
                    <div
                      className={`nav nav-tabs panel-content panel-content-annunci collapse ${this.state.expanded.find(tab => tab === m.id) != null ? "show" : ""}`}
                    >
                      {m.text}
                    </div>
                  </div>
                ) }

              </div>
              <button onClick={this.showModal}>Show Modal</button>
                   
              {this.state.modal && <Modal show={this.state.modal}>
                  <AddAds hideModal={this.hideModal} />
                </Modal>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AddAds extends React.Component {
  render(){
    return <form className="addAds">
      <input type="text" />
      <textarea>
      </textarea>
      <button>Crea</button><button onClick={this.props.hideModal}>Annulla</button>
    </form>
  }
}


const mapStateToProps = state => ({
  ads: state.auth.ads,
  ads_loading:  state.auth.ads_loading
})

export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  Annunci
);

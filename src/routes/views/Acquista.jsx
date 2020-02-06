import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import { Overview, Azioni, Header } from "shared-components";
import images from "../../themes/images";


class Acquista extends React.Component {
    constructor(){
        super()
        this.state = {
            tabFilter: '',
            expanded: [],
            subServiceActive: null
        }
        this.tabExpand = this.tabExpand.bind(this)
        this.subTabSelected = this.subTabSelected.bind(this)
    }
  componentDidMount() {
    this.props.getServices();
  }


  tabExpand(tab){
    if(this.state.expanded.includes(tab)){
      this.state.expanded = this.state.expanded.filter(el => el != tab)
      this.setState({})
    }else{
      this.state.expanded.push(tab)
       this.setState({})
    }
  }

  subTabSelected = tab => {
    this.state.subServiceActive = tab;
    this.setState({})
  }
  render() {
    const { services } = this.props;
    return (
      <div>
        <Header></Header>
        <Overview></Overview>
        <div className="container-fluid mobileNav-Content">
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
        {/* overview */}
        <div className="container-fluid overview ">
          <Azioni active="dashboard"></Azioni>

          <div className="panels-container">
            <h1 className="max-width heading-tab">Aquista</h1>
            <div className="row no-gutters max-width">
                <div className="col-md-9 ">
                    {console.log('SERVICES ', services)}
                    {services && Object.entries(services).map(s => {
                        console.log("s",s)
                        const shortName = s[0];
                        const {name} = s[1];
                        s = s[1]
                        console.log('S splicet',s)
                        console.log('S shortName',shortName)
                        console.log('S shortName',shortName)
                            return (
                                <Services
                                    key={shortName}
                                    shortName={shortName}
                                    name={name}
                                    subServices = {s}
                                    state={this.state}
                                    tabExpand = {this.tabExpand}
                                    subTabSelected={this.subTabSelected}
                                />
                            )
                        })}
                </div>
                <div className="col-md-3 pl-3">
                    <div className="nothinSelected">
                        <img src={images.click} alt="" />
                    </div>
                </div>
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img  src={images.chat} alt="" />
        </div>

      </div>
    );
  }
}

const Services = (props) => <>
    <div className="panel-tab" 
        onClick={()=>props.tabExpand(props.shortName)}
    >
        <i className="fas fa-dot-circle"></i>
            <h4>{props.name}</h4>
        <img src="img/uparrow.svg" alt="" className="rotateARR2" />
    </div>
    <div className={`nav nav-tabs panel-content collapse ${props.state.expanded.find(tab => tab === props.shortName) != null ? "show" : ""}`} >
        {/* {props.subServices[0].map(subService =><div 
            onClick={() => props.subTabSelected(subService.service_id)} key={subService.service_id} 
            className={`panel-item ${props.state.subServiceActive === subService.service_id ? "clickedItem": ""}`}>
                <i className="fas fa-dot-circle"></i>
                <h4>{subService.name}</h4>
                <img className="rightTriangle" src={images.rightTriangle} alt=""/>
            </div>
        )} */}
    </div>
</>;


const mapsStateToProps = state => ({
  services: state.auth.services,
  accountInfo: state.auth.accountInfo
});

export default connect(mapsStateToProps, AuthActions)(
    Acquista
);

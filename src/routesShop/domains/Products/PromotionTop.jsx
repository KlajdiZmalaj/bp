import React, { Component } from "react";

class PromotionTop extends Component {
  render() {
    return (
      <div className="promotionTop maxWidth paddingBottom">
        <div className="promo1">
          <div className="title">
            Free shipping <div className="title__descr">on order €30</div>
          </div>
          <div className="code">
            <div>
              Code:FreeShip30 <i className="fal fa-long-arrow-right"></i>
            </div>
          </div>
        </div>
        <div className="promo2">
          <div className="title">
            Extra 20% off <div className="title__descr">on order €150</div>
          </div>
          <div>
            <div className="code">
              Code:extra20 <i className="fal fa-long-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PromotionTop;

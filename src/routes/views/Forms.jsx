import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
export class Forms extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div
          style={{
            height: `calc(100vh - 340px)`,
          }}
        >
          <iframe
            src={`http://${window.location.host}/tutovisuree/conservatoria/visura-ipocatastale.htm`}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default Forms;

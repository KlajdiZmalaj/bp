import React from "react";

import { Header, Footer } from "../../shared-components";
import { MainContent } from "../domains/Home";
class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainContent></MainContent>
        <Footer />
      </div>
    );
  }
}

export default Home;

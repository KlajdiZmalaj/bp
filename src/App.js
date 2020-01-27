import React from "react";
import { Provider } from "react-redux";

import configureStore from "./redux-store/store";
import rootSaga from "./redux-store/sagas";
import {
  Header,
  Footer,
  Overview,
  Azioni,
  ModulePopUp
} from "./shared-components";

import Root from "./Root";

const store = configureStore();
store.runSaga(rootSaga);

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Header />
          {/* <Overview /> */}
          <Root />
          <Footer />
          <ModulePopUp></ModulePopUp>
        </Provider>
      </div>
    );
  }
}

export default App;

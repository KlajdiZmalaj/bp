import React from "react";
import { Provider } from "react-redux";

import configureStore from "./redux-store/store";
import rootSaga from "./redux-store/sagas";
import { Footer, ModulePopUp } from "./shared-components";
import images from "themes/images";
import Root from "./Root";

const store = configureStore();
store.runSaga(rootSaga);

class App extends React.Component {
  componentDidMount() {
    let link =
      document.querySelector('link[rel="shortcut icon"]') ||
      document.querySelector('link[rel="icon"]');

    if (!link) {
      link = document.createElement("link");
      link.id = "favicon";
      link.rel = "shortcut icon";
      document.head.appendChild(link);
    }
    link.href = images.customFav;
  }
  render() {
    return (
      <Provider store={store}>
        {/* <Header /> */}
        {/* <Overview /> */}
        <Root />
        <Footer />
        <ModulePopUp></ModulePopUp>
        <input id="write" />
      </Provider>
    );
  }
}

export default App;

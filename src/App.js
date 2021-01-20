import React from "react";
import { Provider } from "react-redux";
import { Font, Footer } from "./shared-components";
import images from "themes/images";
import Root from "./Root";
import { store } from "redux-store/store";
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
        <Font />
        <Root />
        <Footer />

        <input id="write" />
      </Provider>
    );
  }
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import { Font, Footer } from "./shared-components";
import images from "themes/images";
import Root from "./Root";
import { store } from "redux-store/store";
// import { db } from "config";
// import { t } from "shared-components/CatchErrors/CatchErrors";
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

      var link2 = document.createElement("link");
      link2.id = "favicon";
      link2.rel = "apple-touch-icon";
      document.head.appendChild(link2);
      link2.href = images.customFav;
    }
    link.href = images.customFav;

    // db.collection("bpoint")
    //   .doc("1")
    //   .onSnapshot(function (doc) {
    //     console.log("data: ", doc.data());
    //     if (doc.data()?.test === "db") {
    //       t();
    //     }
    //   });
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

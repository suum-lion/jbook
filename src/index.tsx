import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RouterContainer from "./components/router-container";
import { makeServer } from "./mock/server";
import { store } from "./state";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: process.env.NODE_ENV });
}

const App = () => {
  return (
    <Provider store={store}>
      <RouterContainer />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

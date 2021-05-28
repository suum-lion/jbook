import { createBrowserHistory } from "history";
import { PropsWithChildren } from "react";
import { Route, Router, Switch } from "react-router";
import Editor from "../../pages/Editor";

const customHistory = createBrowserHistory();

const RouterContainer = ({
  children
}: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/:hash">
          <Editor />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterContainer;

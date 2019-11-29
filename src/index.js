import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

import { Provider } from "mobx-react";

import ExampleStore from "./stores/_ExampleStore";

//? window.store for debugging, remove in prod
let store = window.store = {
    ExampleStore
};

const Root = (
    <Provider store={ store }>
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
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

import ListStore from "./stores/ListStore";

//? window.store for debugging, remove in prod
let store = window.store = {
    ListStore
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
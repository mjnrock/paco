import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Components from "./components/package";

@inject("store")
@observer
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };
    }

    componentDidMount() {
        setTimeout(() => this.forceUpdate(), 1000);
    }

    render() {
        const { MainStore } = this.props.store;

        return (
            <div
                className="container"
            >
                <Components.ListContainer>
                    <Components.ListGroup title="Cleaning">
                        <Components.List title="Kitchen">
                            <Components.ListItem value="Clean stove" />
                            <Components.ListItem value="Wipe counters" />
                        </Components.List>

                        <Components.List title="Bathroom">
                            <Components.ListItem value="Clean toilet" />
                            <Components.ListItem value="Empty trash" />
                            <Components.ListItem value="Do a task that has a longer amount of text" />
                        </Components.List>
                    </Components.ListGroup>
                    
                    <Components.ListGroup title="Baking">
                        <Components.ListGroup title="Lunch">
                            <Components.List title="Chicken">
                                <Components.ListItem value="Prep" />
                                <Components.ListItem value="Bake" />
                            </Components.List>
                            
                            <Components.List title="Potatoes">
                                <Components.ListItem value="Prep" />
                                <Components.ListItem value="Bake" />
                            </Components.List>

                            <Components.List title="Carrots">
                                <Components.ListItem value="Prep" />
                                <Components.ListItem value="Bake" />
                            </Components.List>
                        </Components.ListGroup>

                        <Components.ListGroup title="Drinks">
                            <Components.ListGroup title="Non-Alcoholic">
                                <Components.List title="Soda">
                                    <Components.ListItem value="Coke" />
                                    <Components.ListItem value="Sprite" />
                                </Components.List>
                            </Components.ListGroup>

                            <Components.ListGroup title="Alcoholic">
                                <Components.List title="Beer">
                                    <Components.ListItem value="Bud Light" />
                                </Components.List>

                                <Components.List title="Wine">
                                    <Components.ListItem value="Red" />
                                    <Components.ListItem value="White" />
                                </Components.List>
                            </Components.ListGroup>
                        </Components.ListGroup>
                    </Components.ListGroup>
                </Components.ListContainer>
                
                <div>
                    <span className="b">Last Command:&nbsp;</span>
                    <span>{ MainStore.command }</span>
                </div>
                <input
                    id="task-input"
                    className="mt2 form-control"
                    type="text"
                    value={ this.state.value }
                    onChange={ (e) => {
                        this.setState({
                            value: e.target.value
                        });
                    }}
                    onKeyPress={ (e) => {
                        if(e.which === 13 && this.state.value.length > 0) {
                            MainStore.addItem(this.state.value);
                            this.setState({
                                value: ""
                            });
                        }
                    }}
                    autoFocus
                />
                <button
                    className="mt2 btn btn-outline-primary form-control"
                    onClick={ (e) => {
                        if(this.state.value.length > 0) {
                            MainStore.addItem(this.state.value);
                            this.setState({
                                value: ""
                            });
                        }
                    }}
                >
                    Add Item
                </button>
                <ul
                    className="mt4 list-group"
                >
                    { MainStore.getItems().map(v => (
                        <li
                            className="list-group-item"
                            key={ v.key }
                        >
                            <span>{ v.value }</span>

                            <button
                                className="btn btn-danger float-right"
                                uuid={ v.key }
                                onClick={ (e) => {
                                    //!ANCHOR This function is not triggering an update for some reason?
                                    MainStore.removeItem(e.target.getAttribute("uuid"));

                                    //  This can be removed if above is fixed
                                    this.forceUpdate();
                                }}
                            >X</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
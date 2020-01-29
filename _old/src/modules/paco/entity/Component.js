import { observable } from "mobx";

import SubComponent from "./SubComponent";

export default class Component {
    @observable Data;

    constructor() {
        this.Data = new SubComponent();
    }
};
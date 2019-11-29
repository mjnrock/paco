import { observable } from "mobx";

import Component from "./Component";

export default class Entity {
    @observable Cat;

    constructor() {
        this.Cat = new Component("Fishes");
    }
};
import { reaction, action, observable } from "mobx";

import Entity from "./../modules/paco/entity/Entity";
import Component from "./../modules/paco/entity/Component";
import SubComponent from "./../modules/paco/entity/SubComponent";


class ExampleStore {
    @observable height = 50;
    @observable width = 50;

    constructor() {
        this.entity = new Entity();

        // observe(this.entity.Cat.Data.Rando, event => console.log(event));

        // reaction(
        //     () => this.entity.Cat.Data.Rando,
        //     (data, reaction) => console.log(data, reaction)
        // )
    }

    @action
    rand = () => {
        this.height = +(Math.random() * 500);
        this.width = +(Math.random() * 500);
    }

    @action
    doAThing = () => {
        // this.entity.Cat = new Component();
        this.entity.Cat.Data.Rando = Math.random() * 564894;
    };
}

export default new ExampleStore();

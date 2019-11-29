import { reaction, action, observable } from "mobx";

import Entity from "./../modules/paco/entity/Entity";
import Component from "./../modules/paco/entity/Component";
import SubComponent from "./../modules/paco/entity/SubComponent";


class ExampleStore {
    constructor() {
        this.entity = new Entity();

        // observe(this.entity.Cat.Data.Rando, event => console.log(event));

        // reaction(
        //     () => this.entity.Cat.Data.Rando,
        //     (data, reaction) => console.log(data, reaction)
        // )
    }

    @action
    doAThing = () => {
        // this.entity.Cat = new Component();
        // this.entity.Cat.Data.Rando = Math.random() * 564894;

        // console.log(this);
        this.prop("cat", Math.random());
        // this.on("cat", () => console.log(1));
        console.log(this.UUID, this.state);

        // console.log(this.entity);
    };
}

export default new ExampleStore();

import { reaction, action, observable } from "mobx";
import { GenerateUUID } from "../lib/helper";

import Entity from "./../modules/paco/entity/Entity";
import Component from "./../modules/paco/entity/Component";
import SubComponent from "./../modules/paco/entity/SubComponent";

function mixin(behavior, sharedBehavior = {}) {
    const instanceKeys = Reflect.ownKeys(behavior);
    const sharedKeys = Reflect.ownKeys(sharedBehavior);
    const typeTag = Symbol("isa");

    function _mixin(clazz) {
        for(let property of instanceKeys) {
            Object.defineProperty(clazz.prototype, property, { value: behavior[ property ]});
        }

        Object.defineProperty(clazz.prototype, typeTag, { value: true });

        return clazz;
    }

    for(let property of sharedKeys) {
        Object.defineProperty(_mixin, property, {
            value: sharedBehavior[ property ],
            enumerable: sharedBehavior.propertyIsEnumerable(property)
        });
    }

    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: (i) => !!i[ typeTag ]
    });

    return _mixin;
}

const Farter = mixin({
    _state: {
        farts: 0
    },
    fart() {
        ++this._state.farts;

        console.log(this._state.farts);

        return this;
    }
});

@Farter
class ExampleStore {
    constructor() {
        this.entity = new Entity();

        // observe(this.entity.Cat.Data.Rando, event => console.log(event));

        reaction(
            () => this.entity.Cat.Data.Rando,
            (data, reaction) => console.log(data, reaction)
        )
    }

    doAThing = () => {
        // this.entity.Cat = new Component();
        this.entity.Cat.Data.Rando = Math.random() * 564894;

        this.fart();

        // console.log(this.entity);
    };
}

export default new ExampleStore();

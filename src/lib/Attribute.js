import ClassDecorators from "./classDecorators";

export default class Attribute extends ClassDecorators.Events(ClassDecorators.State(ClassDecorators.DecoratorBase)) {
    constructor(value) {
        super();
        
        this.prop("value", value);

        return this;
    }

    Value(value) {
        if(value === null || value === void 0) {
            return this.prop("value");
        }

        return this.prop("value", value);
    }
};
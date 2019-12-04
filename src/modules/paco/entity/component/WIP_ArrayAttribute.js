//!ANCHOR This needs to be converted from implicit number attribute to proper ArrayAttribute

import Attribute from "../../../../lib/Attribute";
import Decorators from "../../../../lib/decorators";

export default class ArrayAttribute extends Attribute {
    constructor(values = [], min = null, max = null) {
        super(values);
        
        let _this = Decorators.State({});

        _this.prop("min", min);
        _this.prop("max", max);

        return Decorators.Merge(this, _this);
    }

    init(values = [], min = null, max = null) {
        this.prop("value", values);
        this.setMin(min);
        this.setMax(max);
        
        return this;
    }

    push(value) {
        let val = this.value();

        val.push(value);

        return this.prop("value", val);
    }
    pop() {
        let val = this.value();

        val.pop();

        return this.prop("value", val);
    }

    splice(s, l) {
        let val = this.value();

        val.splice(s, l);
        
        return this.value(val);
    }
    map(fn, useAsSet = false) {
        let val = this.value();

        if(useAsSet) {
            let val2 = val.map(fn);

            return this.prop("value", val2);
        }

        return val.map(fn);
    }
    filter(fn, useAsSet = false) {
        let val = this.value();

        if(useAsSet) {
            let val2 = val.filter(fn);

            return this.prop("value", val2);
        }

        return val.filter(fn);
    }
    forEach(fn, useAsSet = false) {
        let val = this.value();

        if(useAsSet) {
            let val2 = val.forEach(fn);

            return this.prop("value", val2);
        }

        return val.forEach(fn);
    }

    add(index, value) {
        return this.value(index, this.prop("value")[ index ] + value);
    }
    subtract(index, value) {
        return this.value(index, this.prop("value")[ index ] - value);
    }
    multiply(index, value) {
        return this.value(index, this.prop("value")[ index ] * value);
    }
    divide(index, value) {
        return this.value(index, this.prop("value")[ index ] / value);
    }

    // toPercent() {
    //     return this.toRate() * 100;
    // }
    // toRate() {
    //     let value = this.prop("value"),
    //         min = this.prop("min"),
    //         max = this.prop("max");

    //     return (value - min) / (max - min);
    // }
    
    // isEmpty() {
    //     return this.prop("value") === this.prop("min");
    // }
    // isFull() {
    //     return this.prop("value") === this.prop("max");
    // }

    value(index, value) {
            if(arguments.length === 1) {
                return this.prop("value")[ index ];
            } else if(arguments.length === 2) {
                if(value !== void 0) {
                    return this.change(index, value, this.prop("value"));
                }
            }

        return this.prop("value");
    }
    inc(index, value = 1) {
        let oldValue = this.prop("value")[ index ],
            newValue = oldValue + value;

        return this.change(index, newValue, oldValue);
    }
    dec(index, value = 1) {
        let oldValue = this.prop("value")[ index ],
            newValue = oldValue - value;            

        return this.change(index, newValue, oldValue);
    }

    change(index, newValue, oldValue) {
        let min = this.prop("min"),
            max = this.prop("max");

        if((min !== null && min !== void 0) && newValue <= min) {
            newValue = min;

            this.call("attribute:min", index, newValue, oldValue);
        }
        if((max !== null && max !== void 0) && newValue >= max) {
            newValue = max;
            
            this.call("attribute:max", index, newValue, oldValue);
        }
        if(newValue === 0) {
            this.call("attribute:zero", index, newValue, oldValue);
        }

        this.prop("value")[ index ] = newValue;
        this.call("attribute:change", index, newValue, oldValue);

        return this;
    }

    setMin(value) {
        if(value !== null && value !== void 0) {
            this.prop("min", value);
        }

        return this;
    }
    setMax(value) {
        if(value !== null && value !== void 0) {
            this.prop("max", value);
        }

        return this;
    }
};
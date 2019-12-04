import Attribute from "./Attribute";

export default class Condition {
    //? [ Function, Expected this.args.length, Supported types ]
    static EnumType = {
        EQUALS: [ "Equals", 1, [ "string", "number", "boolean" ] ],
        NOT_EQUALS: [ "NotEquals", 1, [ "string", "number", "boolean" ] ],
        BETWEEN: [ "Between", 2, [ "number" ] ],
        IN: [ "In", null, [ "any" ] ],
        NOT_IN: [ "NotIn", null, [ "any" ] ],
        GT: [ "GT", 1, [ "number" ] ],
        GTE: [ "GTE", 1, [ "number" ] ],
        LT: [ "LT", 1, [ "number" ] ],
        LTE: [ "LTE", 1, [ "number" ] ],
        CONTAINS: [ "Contains", 1, [ "any" ] ],
        NOT_CONTAINS: [ "NotContains", 1, [ "any" ] ],
        MATCH: [ "Match", 1, [ "string", "number", "boolean" ] ],
        UUID: [ "UUID", 1, [ "string" ] ],
    };

    constructor(type, ...args) {
        //  Use Condition.EnumTypes.[ ... ] as @type argument
        this.type = type;
        //  Variable amount of arguments, specified by Condition.EnumTypes.[ ... ][ 1 ]
        this.args = args;

        //  The result of the last .Run() or the initial condition
        this.result = false;
        //  Optionally use .Assign() to store an <Attribute> association locally
        this.attribute = null;

        return this;
    }

    IsAssigned() {
        return this.attribute instanceof Attribute;
    }

    Assign(attribute) {
        this.attribute = attribute;

        return this;
    }
    Unassign() {
        this.attribute = null;

        return this;
    }

    Run(attribute) {
        if((attribute === void 0 || attribute === null) && (this.attribute === null || this.attribute === void 0)) {
            throw new Error("[Incorrect Condition Setup]: Both @attribute and @this.attribute are either `null` or `undefined`");
        }

        let [ name, len, types ] = this.type,
            fn = this[ name ].bind(this);

        if(typeof fn === "function") {
            if(len === null || (this.args.length === len)) {
                if(this.attribute instanceof Attribute) {
                    this.result = fn(this.attribute);
                } else {
                    this.result = fn(attribute);
                }

                return this.result;
            }
        }

        throw new Error("[Incorrect Condition Setup]: Please use <Condition.EnumTypes.[ ... ]> as the @type argument.");
    }

    Equals(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            if(typeof value === "string" || value instanceof String) {
                return value === var1;
            } else if(typeof value === "number") {
                return value === var1;
            } else if(typeof value === "boolean") {
                return !!value === !!var1;
            }
        }

        return false;
    }
    NotEquals(attribute) {
        return !this.Equals(attribute);
    }

    Between(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1, var2 ] = this.args,
                value = attribute.Value();

            if(typeof value === "number") {
                return value >= var1 && value <= var2;
            }
        }

        return false;
    }

    In(attribute) {
        if(attribute instanceof Attribute) {
            let value = attribute.Value();

            if(Array.isArray(this.args)) {
                return this.args.includes(value);
            }
        }

        return false;
    }
    NotIn(attribute) {
        return !this.In(attribute);
    }

    GT(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            if(typeof value === "number") {
                return value > var1;
            }
        }

        return false;
    }
    GTE(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            if(typeof value === "number") {
                return value >= var1;
            }
        }

        return false;
    }

    LT(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            if(typeof value === "number") {
                return value < var1;
            }
        }

        return false;
    }
    LTE(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            if(typeof value === "number") {
                return value <= var1;
            }
        }

        return false;
    }

    Contains(attribute) {
        if(attribute instanceof Attribute) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            if(Array.isArray(value)) {
                return value.includes(var1);
            }
        }

        return false;
    }
    NotContains(attribute) {
        return !this.Contains(attribute);
    }

    Match(attribute) {
        if(attribute instanceof Attribute) {
            let [ exp, flags ] = this.args,
                regex = new RegExp(exp, flags),
                value = attribute.Value();

            return regex.test(value);
        }

        return false;
    }

    UUID(attribute) {
        if(attribute instanceof Attribute && attribute.UUID) {
            let [ var1 ] = this.args,
                value = attribute.Value();

            return value.UUID === var1;
        }

        return false;
    }
};
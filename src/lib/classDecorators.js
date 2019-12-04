import { GenerateUUID } from "./helper";

//? This is the important base function for inheritence
//? e.g.  export default class Attribute extends ClassDecorators.Events(ClassDecorators.State(ClassDecorators.DecoratorBase)) {}
class DecoratorBase {};

const Events = (Events) => class extends Events {
    constructor() {
        super();

        this._events = {
            "error": (target, ...args) => args,
            "prop-change": (target, ...args) => args
        };

        this._listeners = {};
    }

    hasEvent(name) {
        return typeof this._events[ name ] === "function";
    }

    on(event, callback) {
        if(typeof callback !== "function") {
            callback = (...args) => [ ...args ];
        }
        
        this._events[ event ] = callback;

        return this;
    }
    off(event) {
        delete this._events[ event ];

        return this;
    }

    call(event, ...args) {
        let fn = this._events[ event ];

        if(typeof fn === "function") {
            let result = fn(this, ...args),
                _this = this;

            (async function() {
                for(let i in _this._listeners[ event ]) {
                    let listener = _this._listeners[ event ][ i ];

                    if(typeof listener === "function") {
                        listener(result, [ event, _this]);
                    } else {
                        _this.call("error", `Listener<${ event }> has no method`);
                    }
                }
            })();

            return result;
        }

        throw new Error(`"${ event }" has no method.`);
    }
    
    /**
     * Attach a listener to an event
     * a.listen("error", ([ message ], [ event, target ]) => {
     *    console.log(event)
     *    console.log(message)
     *    console.log(target)
     * });
     * @param {string} event 
     * @param {fn} callback 
     */
    listen(event, callback) {
        if(!Array.isArray(this._listeners[ event ])) {
            this._listeners[ event ] = [];
        }

        this._listeners[ event ].push(callback);

        return this;
    }
    unlisten(event, target) {
        throw new Error("This method has not been setup yet.  Implement a search system, maybe use UUIDs?");
    }

    /**
     * Attach a listener to watch a state property
     * 
     * Example:
     * a.watch([ "cat", "dog" ], (key, value) => {
     *     console.log(key, value)
     * });
     * @param {string|Array} prop 
     * @param {fn} callback 
     */
    watch(prop, callback) {
        if(Array.isArray(prop)) {
            prop.forEach(p => {
                this.listen("prop-change", ([ key, value ], [ event, target ]) => {
                    if(p === key && typeof callback === "function") {
                        callback(key, value, target);
                    }
                });
            });

            return this;
        }
        
        this.listen("prop-change", ([ key, value ], [ event, target ]) => {
            if(prop === key && typeof callback === "function") {
                callback(key, value, target);
            }
        });
        
        return this;
    }
    unwatch(prop) {
        throw new Error("This method has not been setup yet.  Implement a search system, maybe use UUIDs?");
    }
}

const State = (State) => class extends State {
    constructor() {
        super();
        
        this._state = {};
    }

    setState(state = {}) {
        this._state = state;

        return this;
    }
    getState() {
        return this;
    }

    setProp(prop, value) {
        let oldValue = this._state[ prop ];

        this._state[ prop ] = value;

        if(Object.keys(this._listeners).length) {
            this.call("prop-change", prop, value, oldValue);
        }

        return this;
    }
    getProp(prop) {
        return this._state[ prop ];
    }
    /**
     * Acts as a getter/setter for this.state[ @prop ] = @value
     * @param {string} prop 
     * @param {any} ?value
     */
    prop(prop, value) {
        if(value === void 0) {
            return this.getProp(prop);
        }
        
        return this.setProp(prop, value);
    }
};

const Provenance = (Provenance) => class extends Provenance {
    constructor() {
        super();

        this.UUID = GenerateUUID();
        this._meta = {};
    }

    setMeta(meta = {}) {
        this._meta = meta;

        return this;
    }
    getMeta() {
        return this._meta;
    }
    meta(prop, value) {
        if(value === void 0) {
            return this.getMeta(prop);
        }
        
        return this.setMeta(prop, value);
    }
};

const Behavior = (Behavior) => class extends Behavior {
    constructor() {
        super();
        
        this._actions = {};
    }

    getAction() {
        return this._actions;
    }
    setActions(actions = {}) {
        this._actions = actions;

        return this;
    }

    learn(name, action) {
        this._actions[ name ] = action;

        return this;
    }
    unlearn(name) {
        delete this._actions[ name ];

        return this;
    }

    do(name, ...args) {
        let action = this._actions[ name ];

        if(typeof action === "function") {
            return action(...args);
        }

        throw new Error("Action has no method");
    }
};

const Progeny = (Progeny) => class extends Progeny {
    constructor() {
        super();
        
        this._children = {};
        this._parent = null;
    }

    birth(child) {
        this._children.push(child);

        return this;
    }
    abort(index) {
        this._children.splice(index, 1);

        return this;
    }

    getChild(index) {
        return this._children[ index ];
    }
    setChild(index, child) {
        this._children[ index ] = child;

        return this;
    }

    getParent() {
        return this._parent;
    }
    setParent(value) {
        this._parent = value;

        return this;
    }

    child(index, child) {
        if(child === void 0) {
            return this.getChild(index);
        }
        
        return this.setChild(index, child);
    }
    parent(value) {
        if(value === void 0) {
            return this.getParent();
        }
        
        return this.setParent(value);
    }
};


const Group = (Group) => class extends Group {
    constructor() {
        super();
        
        this._groupArchetype = null;
        this._group = null;
        this._groupMap = {
            "send": null,
            "receive": null,
            "broadcast": null
        };
    }

    groupMap(prop, fn) {
        if(prop in this._groupMap && typeof fn === "function") {
            this._groupMap[ prop ] = fn;
        }

        return this;
    }

    getGroup() {
        return this._group;
    }
    setGroup(group) {
        if(this._group instanceof this._groupArchetype) {
            this._group = group;
        }
    }

    getGroupArchetype() {
        return this._groupArchetype;
    }
    setGroupArchetype(groupArchetype) {
        this._groupArchetype = groupArchetype;

        return this;
    }

    send(to, msg) {
        if(this._group instanceof this._groupArchetype && typeof this._groupMap[ "send" ] === "function") {
            return this._groupMap[ "send" ](to, msg);
        }

        return false;
    }
    receive(msg) {
        if(this._group instanceof this._groupArchetype && typeof this._groupMap[ "receive" ] === "function") {
            let response = this._groupMap[ "receive" ](msg);

            return response;
        }

        return false;
    }

    broadcast(msg) {
        if(this._group instanceof this._groupArchetype && typeof this._groupMap[ "broadcast" ] === "function") {
            return this._groupMap[ "broadcast" ](msg);
        }

        return false;
    }

    join(group) {
        return this.setGroup(group);
    }
    leave() {
        this.setGroup(null);
    }
};

export default {    
    DecoratorBase,
    Provenance,
    Events,
    State,
    Behavior,
    Progeny,
    Group
}
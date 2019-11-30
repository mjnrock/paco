import { GenerateUUID } from "./helper";

export function Provenance(target) {
    return Object.assign(target, {
        UUID: GenerateUUID(),
        meta: {},

        setMeta(meta = {}) {
            this.meta = meta;

            return this;
        },
        getMeta() {
            console.log(this.meta);

            return this;
        },

        setProp(prop, value) {
            this.meta[ prop ] = value;

            return this;
        },
        getProp(prop) {
            return this.meta[ prop ];
        },
        prop(prop, value) {
            console.log(this);
            if(value === void 0) {
                return this.getProp(prop);
            }
            
            return this.setProp(prop, value);
        }
    });
};

export function State(target) {
    return Object.assign(target, {
        state: {},
        events: {
            "error": (target, ...args) => args,
            "prop-change": (target, ...args) => args
        },
        listeners: {},

        setState(state = {}) {
            this.state = state;

            return this;
        },
        getState() {
            console.log(this.state);

            return this;
        },

        setProp(prop, value) {
            this.state[ prop ] = value;

            if(Object.keys(this.listeners).length) {
                this.call("prop-change", prop, value);
            }

            return this;
        },
        getProp(prop) {
            return this.state[ prop ];
        },
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
        },
        
        on(event, callback) {
            this.events[ event ] = callback;

            return this;
        },
        off(event) {
            delete this.events[ event ];

            return this;
        },

        call(event, ...args) {
            let fn = this.events[ event ];

            if(typeof fn === "function") {
                let result = fn(this, ...args),
                    _this = this;

                (async function() {
                    for(let i in _this.listeners[ event ]) {
                        let listener = _this.listeners[ event ][ i ];

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
        },
        
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
            if(!Array.isArray(this.listeners[ event ])) {
                this.listeners[ event ] = [];
            }

            this.listeners[ event ].push(callback);

            return this;
        },
        unlisten(event, target) {
            throw new Error("This method has not been setup yet.  Implement a search system, maybe use UUIDs?");
        },

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
        },
        unwatch(prop) {
            throw new Error("This method has not been setup yet.  Implement a search system, maybe use UUIDs?");
        }
    });
}

export function ApplyAll(target) {
    return State(Provenance(target));
}

export default {    
    Provenance,
    State,

    ApplyAll
}
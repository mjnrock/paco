import { GenerateUUID } from "./helper";

export function UUID(target) {
    return Object.assign(target, {
        UUID: GenerateUUID()
    });
};

export function State(target) {
    return Object.assign(target, {
        state: {},

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

            return this;
        },
        getProp(prop) {
            return this.state[ prop ];
        },
        prop(prop, value) {
            console.log(this);
            if(value === void 0) {
                return this.getProp(prop);
            }
            
            return this.setProp(prop, value);
        }
    });
}

export function Events(target) {
    return Object.assign(target, {
        events: {},
        listeners: {},

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
                let result = fn(this, ...args);

                (async function() {
                    for(let i in this.listeners[ event ]) {
                        let listener = this.listeners[ event ][ i ];

                        listener.listen(event, result);
                    }
                })();

                return result;
            }

            throw new Error(`"${ event }" has no method.`);
        },

        subscribe(event, target) {
            if(!Array.isArray(this.listeners[ event ])) {
                this.listeners[ event ] = [];
            }

            this.listeners[ event ].push(target);

            return this;
        },
        unsubscribe(event, target) {
            throw new Error("This method has not been setup yet.  Implement a search system, maybe use UUIDs?");
        }
    });
}

export default {    
    UUID,
    State,
    Events
}
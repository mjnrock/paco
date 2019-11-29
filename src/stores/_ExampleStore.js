import { action, observable } from "mobx";
import { GenerateUUID } from "../lib/helper";

import IDBKeyValStore from "./IDBKeyValStore";

class MainStore extends IDBKeyValStore {
    @observable command = "";
    @observable items = {};

    constructor() {
        super("MainStore");

        //? Store["items"], this[ "items" ], defaultValue?
        this.pull("items", "items", {});
    }
    
    @action
    addItem = (item) => {
        let uuid = GenerateUUID();

        this.items[ uuid ] = item;
        //? Store["items"], this[ "items" ]
        this.push("items", "items");

        return uuid;
    };

    @action
    removeItem = (uuid) => {
        delete this.items[ uuid ];
        this.push("items", "items");
    };

    getItems = () => {
        return Object.keys(this.items).map(v => {
            return {
                key: v,
                value: this.items[ v ],
            }
        });
    };
}

export default new MainStore();

import * as IDBKeyVal from "idb-keyval";
// import * as IDB from "idb";  //* Only needed if a more complex IndexedDB setup is needed, kept here for reference

export default class IDBKeyValStore {
    constructor(name) {
        this._store = new IDBKeyVal.Store("example-db", name);
    }

    ClearStore = () => {
        IDBKeyVal.clear(this._store);  //? Clear idbMainStore store
    }

    PullFromStore(key, param, df = null) {
        IDBKeyVal.get(key, this._store).then(_item => {
            if(typeof _item === "number") {
                return _item;
            } else if(typeof _item === "boolean") {
                return _item;
            } else {
                try {
                    this[ param ] = JSON.parse(_item);
                } catch(e) {
                    this[ param ] = df;
                }
            }
        });
    }
    PushToStore(key, param) {
        IDBKeyVal.set(key, JSON.stringify(this[ param ]), this._store);
    }
}
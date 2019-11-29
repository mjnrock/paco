import { GenerateUUID } from "../lib/helper";
import ListItem from "./ListItem";

export default class List {        
    constructor(title, items = {}, options = {}) {
        this.Title = title;

        this.Items = items;        
        this.Options = {
            visible: typeof options.visible === "boolean" ? options.visible : true
        };

        this.UUID = GenerateUUID();
    }

    AddItem(...input) {
        if(input instanceof ListItem) {
            this.Items[ input.UUID ] = input;

            return this;
        } else {
            let listItem = new ListItem(...input);

            this.Items[ listItem.UUID ] = listItem;

            return listItem;
        }
    }
    RemoveItem(uuid) {
        delete this.Items[ uuid ];

        return this;
    }

    Serialize(stringify = true) {
        let items = Object.values(this.Items).map(v => v.Serialize()),
            obj = {
            title: this.Title,
            items: items,
            options: this.Options,
            uuid: this.UUID
        };

        if(stringify) {
            return JSON.stringify(obj);
        }

        return obj;
    }
    Deserialize(json) {
        let obj = json;
        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        this.Title = obj.title;

        this.Items = [];
        let items = obj.items;
        for(let i in items) {
            let item = items[ i ],
                uuid = item.uuid || GenerateUUID();

            this.Items[ uuid ] = item;
        }
        this.Options = obj.options || {};
        this.UUID = obj.uuid || GenerateUUID();

        return this;
    }

    static Deserialize(json) {
        return (new List()).Deserialize(json);
    }
};
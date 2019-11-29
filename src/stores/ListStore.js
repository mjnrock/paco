import { action, observable } from "mobx";

import IDBKeyValStore from "./IDBKeyValStore";
import List from "./List";

class ListStore extends IDBKeyValStore {
    @observable lists = {};

    @action
    AddList(title) {
        let list = new List(title);

        this.lists[ list.UUID ] = list;

        return list;
    }

    @action
    AddListItem(listUUID, ...listItemArgs) {
        let listItem = this.lists[ listUUID ].AddItem(...listItemArgs);

        return listItem;
    }
}

export default new ListStore();

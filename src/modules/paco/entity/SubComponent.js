import { observable } from "mobx";

export default class SubComponent {
    @observable Fish;
    @observable Cats;
    @observable Rando;

    constructor() {
        this.Fish = "yes";
        this.Cats = "also yes";
        this.Rando = Math.random() * 100;
    }
};

import { observable, action } from "mobx";

export default class ViewStateStore {
    @observable dialog = false;

    @action
    toggleDialog = () => {
        this.dialog = !this.dialog;
        console.log(this.dialog);
    }
}
import { observable, action } from "mobx";
// import axios from 'axios';

export default class ExcelStore {
    @observable json;
    
    @action
    addJson = json => {
        this.json = json
    }
}
import { observable, action } from "mobx";
import axios from 'axios';

export default class ExcelStore {
    @observable json;
    @observable msg;
    @observable success = false;
    @observable loading = false;

    @action
    addJson = json => this.json = json;

    @action
    enterExcel = () => {
        this.loading = true;
        axios.post('http://localhost:4000/api/student/excel', this.json)
            .then(res => {
                this.success = res.data.success;
                this.msg = '엑셀 등록이 완료되었습니다.';
                this.loading = false;
            })
            .catch(e => {
                this.success = false;
                this.msg = '실패 하였습니다.';
                this.loading = false;
            })
    }
}
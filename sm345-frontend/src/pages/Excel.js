import React from 'react';
import XLSX from 'xlsx';
import { observer, inject } from 'mobx-react';

import { Component } from 'react'

@inject('excelStore')
@observer
export default class Excel extends Component {

    handleChange = event => {
        if(event.target.files) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onload = (e) => {
                let data = e.target.result;
                let workbook = XLSX.read(data, {type: 'binary'});
                let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                let jsonData = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
                jsonData.shift()
                this.props.excelStore.addJson(jsonData)
            }
            reader.readAsBinaryString(file);
        }
    }  

    handleClick = () => {
        this.props.excelStore.enterExcel()
    }

    render() {
        const { json, success, msg, loading } = this.props.excelStore;

        const View = ({data}) => {
            return (
                <ul>
                    {data.map((e, i) => {
                        return <li key={i}> {e} </li>
                    })}
                </ul>
            )
        };

        return (
            <div className="page">
                <h1>Excel~</h1>
                <input 
                    type="file" 
                    name="excel"
                    onChange={this.handleChange}
                />
                <div> 
                    {json ? <View data={json} /> : ''}
                </div>

                <button onClick={this.handleClick}>
                    click
                </button>

                {success}
                {msg}
                {loading}
                 {/* ? msg : msg} */}
            </div>
        )
    }
}
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
                console.log(jsonData)
                // this.setState({json: jsonData});
                this.props.excelStore.addJson(jsonData)
            }
            reader.readAsBinaryString(file);
        }
    }  

    render() {
        const { json } = this.props.excelStore;

        const View = ({data}) => {
            return (
                <ul>
                    {data.map(e => {
                        return <li> {e} </li>
                    })}
                </ul>
            )
        };

        return (
            <div>
                <h1>Excel~</h1>
                <input 
                    type="file" 
                    name="excel"
                    onChange={this.handleChange}
                    value=""
                />
                <div> 
                    {json ? <View data={json} /> : ''}
                </div>
            </div>
        )
    }
}
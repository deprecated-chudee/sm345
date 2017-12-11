import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('studentStore')
@observer
export default class Student extends Component {
    render() {
        let { students } = this.props.studentStore;
        return (
            <div className="page">
                <ul>
                    { students.map(student => {
                        return <li> {student.name}, {student.phone}, {student.email}, {student.major} </li>
                    })}
                </ul>
            </div>
        )
    }
}
import React, { Component } from 'react';

import C3Chart from 'react-c3js';
import 'c3/c3.css';

class DonutChart extends Component {

    render() {
        const data = {
            columns: [
                ['Result Genration', 12],
                ['Online Exam', 30],
                ['Offline Exam', 20]
            ],
            type: "donut",
        };

        const donut = {
            title: "Total Exam Held",
            width: 30,
            label: { show: !1 }
        };

        const color = {
            pattern: ['#f0f1f4', '#7a6fbe', '#28bbe3']
        };

        const size = {
            height: 300
        };

        return (
            <React.Fragment>
                <C3Chart data={data} donut={donut} color={color} size={size} dir="ltr" />
            </React.Fragment>
        );
    }
}

export default DonutChart;
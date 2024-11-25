import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class MonthlyEarnings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ['#ccc', '#7a6fbe', 'rgb(40, 187, 227)'],
                chart: {
                    toolbar: {
                        show: !1,
                    },
                },
                dataLabels: {
                    enabled: !1
                },
                stroke: {
                    curve: 'smooth',
                    width: 0.1,
                },
                grid: {
                    borderColor: '#f8f8fa',
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                    axisBorder: {
                        show: !1
                    },
                    axisTicks: {
                        show: !1
                    }
                },
                legend: {
                    show: !1
                },
            },
            series: [
                {
                    name: 'Series A',
                    data: [0, 150, 60, 180, 90, 75, 30]
                },
                {
                    name: 'Series B',
                    data: [0, 45, 150, 36, 60, 240, 30]
                },
                {
                    name: 'Series C',
                    data: [0, 15, 195, 21, 360, 120, 30]
                }
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                < Card >
                    <CardBody>
                        <h4 className="card-title mb-4">Student Registerd</h4>



                        <Row className="text-center mt-4">
                            <Col xs="4">
                                <h5 className="font-size-20">{this.props.data?.totalStudents}</h5>
                                <p className="text-muted">Old Student</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">{this.props.data?.totalStudents}</h5>
                                <p className="text-muted">Attempt Exam</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">--</h5>
                                <p className="text-muted">Last Month Registered</p>
                            </Col>
                        </Row>

                        <div id="morris-area-example" className="morris-charts morris-charts-height" dir="ltr">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="300" />
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment >
        );
    }
}

export default MonthlyEarnings;
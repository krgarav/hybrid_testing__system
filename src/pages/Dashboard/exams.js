import React from "react"
import { Card, CardBody, Row, CardTitle, Button } from "reactstrap"
import DonutChart from '../AllCharts/DonutChart';

const Exams = props => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Exam Name</CardTitle>

                    <Row className="text-center mt-4">
                        <div className="col-12">
                            <h5 className="font-size-20">Date and time</h5>
                        </div>

                    </Row>
                    <div dir="ltr">
                        <Button type="button" color="success" className="waves-effect waves-light">Import</Button>
                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default Exams

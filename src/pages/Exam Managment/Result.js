import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Button, CardText, CardHeader, CardFooter, } from "reactstrap"
import { Modal } from "react-bootstrap";
import { format } from 'date-fns';

import { connect } from "react-redux";
import Select from "react-select"
//Import Action to copy breadcrumb items from local state to redux state
import { fetchQuestionPaper, setBreadcrumbItems } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import TimeAgo from "HelperComponent/TimeAgo";
import { useNavigate } from "react-router-dom";
import { deleteQuestionPaper, getResult, getResultDetails, sendResult } from "helpers/questionPaper_helper";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import { getAllMainExamPapers } from "helpers/center_helper";
import { MDBDataTable } from "mdbreact";

const Result = (props) => {
    document.title = "Question Bank | Result";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [selectedQuestionPaper, setSelectedQuestionPaper] = useState(null);
    const [allExams, setAllExams] = useState([]);
    const [loader, setLoader] = useState(false);
    const [exam, setExam] = useState(null);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [result, setResult] = useState([]);
    const [student, setStudent] = useState(null);
    const [examDetails, setExamDetails] = useState([]);



    const breadcrumbItems = [
        { title: "Exam Managment", link: "#" },
        { title: "Exam Result", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        props.setBreadcrumbItems('Result', breadcrumbItems)
    })

    const fetchAllExams = async () => {
        try {
            const result = await getAllMainExamPapers();
            if (result?.success) {
                console.log(result)
                setAllExams(result?.result);
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchAllExams();
    }, []);







    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!exam) {
            setSpanDisplay("inline")
        }
        else {
            try {


                setLoader(true);
                const data = await getResult(exam.id);
                console.log("data ---> ", data);
                setLoader(false);
                if (data?.success) {
                    setResult(data?.result);
                }
                else {
                    toast.error(data?.message);
                }
            } catch (error) {
                setLoader(false);
                toast.error(error?.response?.data?.message);
            }

        }

    };

    const sendExamResult = async () => {
        if (!exam) {
            setSpanDisplay("inline")
        }
        else {
            try {

                setLoader(true);
                const data = await sendResult(exam.id);
                setLoader(false);
                if (data?.success) {
                    toast.success(data?.message);
                }
                else {
                    toast.error(data?.message);
                }
            } catch (error) {
                setLoader(false);
                toast.error(error?.response?.data?.message);
            }

        }
    }
    const handleExamChange = selectedOption => {
        setExam(selectedOption)
    }

    const data = {
        columns: [
            {
                label: "Serial No.",
                field: "serialNo",
                sort: "asc",
                width: 50,
            },
            {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 100,
            },
            {
                label: "Maximum Marks",
                field: "totalMarks",
                sort: "asc",
                width: 150,
            },
            {
                label: "Marks Obtained",
                field: "obtainMarks",
                sort: "asc",
                width: 200,
            },
        ],
        rows: result,
        rows: result?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row),
        }))
    }

    const handleRowClick = async (row) => {

        try {
            setStudent(row);
            setLoader(true);
            const data = await getResultDetails(row)
            console.log(data);
            setLoader(false)
            if (data?.success) {

                setModalShow(true)
                setExamDetails(data?.result)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.message);
        }


    }
    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}


            <Row>
                <Col>
                    <Card>
                        <CardBody className="col-xl-6 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                            <CardTitle className="h4">Get Result</CardTitle>
                            <form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Select Exam
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={exam}
                                            onChange={(handleExamChange)}
                                            options={allExams}
                                            getOptionLabel={option => option.examName}
                                            getOptionValue={option => option.id.toString()}
                                            classNamePrefix="select2-selection"
                                        />
                                        {!exam && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>




                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Get Result</button>
                                        <button type="button" className="btn btn-primary w-md ms-2" onClick={sendExamResult}>Send Result to Students</button>
                                    </div>
                                </Row>
                            </form>
                            <div className="mt-5">
                                {result?.length > 0 &&
                                    <>
                                        <h1 className="text-center black">Students Result</h1>
                                        <MDBDataTable className="table-row-hover" responsive bordered data={data} style={{ cursor: 'pointer' }} noBottomColumns />
                                    </>
                                }
                            </div>

                        </CardBody>
                    </Card>
                </Col>

            </Row>


            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        {/* <h4>Exam Details</h4> */}
                        Name: {student?.name} <br />
                        Exam: {student?.examName} <br />
                        Marks: {student?.obtainMarks} <br />

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <div className="" style={{ height: "70vh", overflowY: "scroll" }}>
                        {examDetails.map((d, i) => (
                            <>
                                <h4>Qno. {i + 1} {d.question}</h4>
                                <h6>{d.optionA}</h6>
                                <h6>{d.optionB}</h6>
                                <h6>{d.optionC}</h6>
                                <h6>{d.optionD}</h6>
                                <h6>Correct Answer: {d.correctAnswer}</h6>
                                <h6>Selected Answer: {d.selectedAnswer}</h6>

                            </>
                        ))}
                    </div>




                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">Close</Button>{" "}
                    {/* <Button onClick={() => setModalShow(false)}>Close</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={handleDelete}>Delete</Button> */}
                </Modal.Footer>
            </Modal>


        </React.Fragment >
    )
}

export default connect(null, { setBreadcrumbItems })(Result);
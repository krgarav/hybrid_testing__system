import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, CardText, CardHeader, CardFooter, } from "reactstrap"
import { Modal } from "react-bootstrap";
import { format } from 'date-fns';

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { fetchLanguage, fetchQuestionPaper, setBreadcrumbItems } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import TimeAgo from "HelperComponent/TimeAgo";
import { useNavigate } from "react-router-dom";
import { deleteQuestionPaper } from "helpers/questionPaper_helper";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import { DOWNLOAD_QUESTION_PAPER_WITH_ANSWER, DOWNLOAD_QUESTION_PAPER_WITHOUT_ANSWER } from "helpers/url_helper";
import axios from "axios";

const AllQuestionPapers = (props) => {
    document.title = "Question Bank | All Questions";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questionPapers = useSelector(state => state.questionPapersReducer.questionPapers)
    const result = useSelector(state => state.questionPapersReducer)
    const [modalShow, setModalShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedQuestionPaper, setSelectedQuestionPaper] = useState(null);
    const [loader2, setLoader2] = useState(true);
    const [downloadModal, setDownloadModal] = useState(false);
    const [paper, setPaper] = useState(null);

    const breadcrumbItems = [
        { title: "Question Papers", link: "#" },
        { title: "All Questions Papers", link: "#" },
    ]

    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        props.setBreadcrumbItems('All Questions Papers', breadcrumbItems)
    })



    useEffect(() => {
        if (questionPapers?.length == 0) {
            dispatch(fetchQuestionPaper());
        }

    }, []);


    useEffect(() => {
        setLoader2(true);
        dispatch(fetchQuestionPaper());

    }, []);

    useEffect(() => {
        if (questionPapers?.success == true) {

            setLoader2(false);
        }
    }, [questionPapers]);




    const handleCardClick = (data) => {
        navigate(`/exam-details/${data.id}`);
    };

    const handleDeleteClick = async (data) => {
        console.log(data)
        setSelectedQuestionPaper(data);
        setModalShow(true);

    }


    const handleRemove = async () => {

        // const result = await deleteQuestionPaper({ Id });
        setModalShow(false)
        // fetchQuestion();f

    }

    const deletePaper = async () => {
        let Id = selectedQuestionPaper.id;
        // console.log()
        setLoader(true);
        const result = await deleteQuestionPaper(Id);
        console.log(result);
        if (result?.success) {
            setModalShow(false);
            toast.success(result.message);
            setLoader(false);
            dispatch(fetchQuestionPaper());
        }
        else {
            setLoader(false);
            toast.error(result?.message);
        }
    }

    const downloadPaperWithAnswer = async (data) => {
        try {
            setLoader(true);
            const response = await axios.get(DOWNLOAD_QUESTION_PAPER_WITH_ANSWER + paper?.id, {
                responseType: 'blob', // Important to set the response type to blob
            });
            setLoader(false);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${paper?.examName || 'download'}PaperWithAnswer.docx`; // Replace with the desired file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download file:', error);
        }
    };
    const downloadPaperWithoutAnswer = async (data) => {
        try {
            setLoader(true)
            const response = await axios.get(DOWNLOAD_QUESTION_PAPER_WITHOUT_ANSWER + paper?.id, {
                responseType: 'blob', // Important to set the response type to blob
            });
            setLoader(false);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${paper?.examName || 'download'}PaperWithoutAnswer.docx`; // Replace with the desired file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download file:', error);
        }
    };

    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}
            {loader2 ? (
                <Loader />
            ) : ("")}
            <Row>
                {questionPapers?.result?.map((data, i) => (
                    <>
                        <Col lg={3} key={i}>
                            <Card>
                                {/* <CardHeader>UPSC</CardHeader> */}
                                <CardBody className="mt-0 pt-0">
                                    <div className="d-flex justify-content-between">
                                        <CardTitle className="h4 mt-3">{data.examName}</CardTitle>
                                        <div className="d-flex">

                                            <button type='button' className="text-info" onClick={() => { setDownloadModal(true); setPaper(data) }} style={{ fontSize: "2rem", background: "none", border: "none", fontWeight: "bolder", }}> <i className="mdi mdi-download"></i></button>
                                            <button type='button' className="text-primary" onClick={() => handleCardClick(data)} style={{ fontSize: "2rem", background: "none", border: "none", fontWeight: "bolder", }}> <i className="mdi mdi-book-edit-outline "></i></button>
                                            <button type='button' className="text-danger" onClick={() => handleDeleteClick(data)} style={{ fontSize: "2rem", background: "none", border: "none", fontWeight: "bolder", }}> <i className="mdi mdi-delete "></i></button>
                                        </div>
                                    </div>

                                    <CardText>
                                        Total Questions: {data.totalQuestions}
                                        <br />
                                        Total Marks: {data.totalMarks}
                                        <br />

                                    </CardText>
                                </CardBody>
                                <CardFooter className="text-muted">
                                    <TimeAgo receivedDate={data.entryAt} />
                                </CardFooter>
                            </Card>
                        </Col>
                    </>

                ))}

            </Row>

            <Modal
                show={downloadModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <h4>
                        Download Question Paper.
                    </h4>

                    <div className="d-flex justify-content-center mt-5">
                        <button type="button" className="btn btn-secondary me-3" onClick={downloadPaperWithAnswer}>With Answer</button>
                        <button type="button" className="btn btn-secondary me-3" onClick={downloadPaperWithoutAnswer}>Without Answer</button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setDownloadModal(false)} className="waves-effect waves-light">Close</Button>{" "}
                </Modal.Footer>
            </Modal>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <h4>
                        Are you sure want to delete this question paper.
                    </h4>


                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">No</Button>{" "}
                    <Button type="button" color="danger" onClick={deletePaper} className="waves-effect waves-light">Yes</Button>{" "}

                </Modal.Footer>
            </Modal>


        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(AllQuestionPapers);
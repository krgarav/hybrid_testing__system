import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { deleteClass, fetchClass, setBreadcrumbItems, setSuccessFalseClass, updateClass } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loader from "components/Loader/Loader";

const AllClasses = (props) => {
    document.title = "Question Bank | All Classes";
    const [modalShow, setModalShow] = useState(false);
    const [className, setClassName] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [classCode, setClassCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [id, setId] = useState({});
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const result = useSelector(state => state.classesReducer)
    const [loader2, setLoader2] = useState(true);

    const breadcrumbItems = [
        { title: "Class", link: "#" },
        { title: "All Classes", link: "#" },
    ]
    useEffect(() => {
        props.setBreadcrumbItems('All Classes', breadcrumbItems);
    })
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        setLoader2(true);
        dispatch(fetchClass());

    }, []);

    useEffect(() => {
        if (result?.classes?.success == true) {
            setLoader2(false);
        };
    }, [result?.classes]);


    const [page, setPage] = useState(1);
    const data = {
        columns: [
            {
                label: "Serial No.",
                field: "serialNo",
                sort: "asc",
                width: 50,
            },
            {
                label: "Code",
                field: "classCode",
                sort: "asc",
                width: 100,
            },
            {
                label: "Name",
                field: "className",
                sort: "asc",
                width: 150,
            },
            {
                label: "Description",
                field: "classDescription",
                sort: "asc",
                width: 200,
            },
        ],
        rows: result?.classes?.result,
        rows: result?.classes?.result?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row)
        }))
    }

    const handleRowClick = (row) => {

        console.log(id, className, classDescription);
        setModalShow(true);
        setId(row.id);
        setClassName(row.className);
        setClassDescription(row.classDescription);
        setClassCode(row.classCode);
    }

    const handleUpdate = () => {
        console.log(id, className, classDescription);
        if (!className || !classDescription || !classCode) {
            setSpanDisplay("inline")

        }
        else {
            setLoader(true);
            dispatch(updateClass({ id, className, classDescription }));
        }
    }
    const handleDelete = () => {

        setLoader(true);
        dispatch(deleteClass(id));
    }


    useEffect(() => {
        setLoader(false);
        if (result.success == true) {
            setModalShow(false);
            setDeleteModalShow(false)
            dispatch(setSuccessFalseClass());
        }
    }, [result.success]);

    return (
        <React.Fragment>

            {loader2 ? (
                <>
                    dsds
                    < Loader />
                </>
            ) : ("")}
            {loader ? (
                <>
                    < Loader />
                </>
            ) : ("")}

            <Row>
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">All Classes </CardTitle>
                            <MDBDataTable
                                className="table-row-hover"
                                responsive
                                bordered
                                data={data}
                                style={{ cursor: 'pointer' }}
                                noBottomColumns
                                paging={{ page, onPageChange: setPage }}
                            />
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
                        Edit Class
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Class
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter new Class"
                                value={className}
                                maxLength="50"
                                onChange={(e) => setClassName(e.target.value)} />
                            {!className && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Class Description
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter New Description"
                                value={classDescription}
                                maxLength="50"
                                onChange={(e) => setClassDescription(e.target.value)} />
                            {!classDescription && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Class Code
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Class Code"
                                value={classCode}
                                maxLength="50"
                                onChange={(e) => setClassCode(e.target.value)}
                                readOnly />
                        </div>
                    </Row>




                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="success" onClick={handleUpdate} className="waves-effect waves-light">Update</Button>{" "}
                    <Button type="button" color="danger" onClick={() => { setDeleteModalShow(true); setModalShow(false) }} className="waves-effect waves-light">Delete</Button>{" "}
                    {/* <Button onClick={() => setModalShow(false)}>Close</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={handleDelete}>Delete</Button> */}
                </Modal.Footer>
            </Modal>

            <Modal
                show={deleteModalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <h4>
                        Are you sure want to remove this class.
                    </h4>


                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => { setDeleteModalShow(false); setModalShow(true) }} className="waves-effect waves-light">No</Button>{" "}
                    <Button type="button" color="danger" onClick={handleDelete} className="waves-effect waves-light">Yes</Button>{" "}

                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(AllClasses);
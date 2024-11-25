import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";
import Select from "react-select"

//Import Action to copy breadcrumb items from local state to redux state
import { deleteCourse, fetchClass, fetchCourse, setBreadcrumbItems, setSuccessFalseCourse, updateCourse } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loader from "components/Loader/Loader";

const AllCourses = (props) => {
    document.title = "Question Bank | All Courses";
    const [modalShow, setModalShow] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [id, setId] = useState({});
    const [classs, setClasss] = useState(null);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(true);
    const result = useSelector(state => state.coursesReducer)
    const classes = useSelector(state => state.classesReducer)


    const breadcrumbItems = [
        { title: "Course", link: "#" },
        { title: "All Courses", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('All Courses', breadcrumbItems)
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
        dispatch(fetchCourse());
        dispatch(fetchClass());

    }, []);

    useEffect(() => {
        if (result?.courses?.success == true) {
            setLoader2(false);
        };
    }, [result?.courses]);




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
                field: "courseCode",
                sort: "asc",
                width: 100,
            },
            {
                label: "Name",
                field: "courseName",
                sort: "asc",
                width: 150,
            },
            {
                label: "Description",
                field: "courseDescription",
                sort: "asc",
                width: 200,
            },
        ],
        rows: result?.courses?.result,
        rows: result?.courses?.result?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row)
        }))
    }

    const handleRowClick = (row) => {

        setModalShow(true);

        setId(row.id);
        setCourseName(row.courseName);
        setCourseDescription(row.courseDescription);
        setCourseCode(row.courseCode);
        classes.classes.result.map((r) => {
            console.log(r.id)
            console.log(row)
            if (r.id === row.classId) {

                setClasss(r);
                console.log("from row click ---> ", r)
            }
        })
    }

    const handleUpdate = () => {
        let classId = classs?.id
        if (!courseName || !courseDescription || !courseCode || !classId) {
            setSpanDisplay("inline")

        }
        else {
            setLoader(true);
            dispatch(updateCourse({ id, classId, courseName, courseDescription, }))

        }

    }

    useEffect(() => {
        setLoader(false);
        if (result.success == true) {
            setModalShow(false);
            setDeleteModalShow(false)
            dispatch(setSuccessFalseCourse());
        }
    }, [result.success]);
    const handleDelete = () => {

        setLoader(true);
        dispatch(deleteCourse(id));
    }
    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        console.log(selectedOption);
    };
    return (
        <React.Fragment>


            {loader2 ? (
                <Loader />
            ) : ("")}
            {loader ? (
                <Loader />
            ) : ("")}
            <Row>
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">All Courses </CardTitle>
                            <MDBDataTable className="table-row-hover" responsive bordered data={data} style={{ cursor: 'pointer' }} noBottomColumns />
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
                        Edit Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Class Name
                        </label>
                        <div className="col-md-10">
                            <Select
                                Select
                                value={classs}
                                onChange={handleSelectClass}
                                options={classes?.classes?.result}
                                getOptionLabel={option => option.className + " (" + option.classCode + ")"}
                                getOptionValue={option => option.id.toString()} // Convert to string if classId is a number
                                classNamePrefix="select2-selection"
                            />
                            {!classs && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Course
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter new Course"
                                maxLength="50"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)} />
                            {!courseName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Course Description
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter New Description"
                                maxLength="50"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)} />
                            {!courseDescription && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Course Code
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Course Code"
                                maxLength="50"
                                value={courseCode}
                                // onChange={(e) => setCourseCode(e.target.value)}
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
                        Are you sure want to remove this course.
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

export default connect(null, { setBreadcrumbItems })(AllCourses);
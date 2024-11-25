import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";
import Select from "react-select"

//Import Action to copy breadcrumb items from local state to redux state
import { deleteSection, fetchClass, fetchCourse, fetchSection, setBreadcrumbItems, setSuccessFalseSection, updateSection } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import coursesReducer from "store/course/reducer";
import sectionsReducer from "store/section/reducer";
import Loader from "components/Loader/Loader";

const AllSections = (props) => {
    document.title = "Question Bank | All Sections";
    const [modalShow, setModalShow] = useState(false);
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const [sectionCode, setSectionCode] = useState("");
    const [id, setId] = useState({});
    const [classs, setClasss] = useState(null);
    const [course, setCourse] = useState(null);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const courses = useSelector(state => state.coursesReducer)
    const sections = useSelector(state => state.sectionsReducer);

    const [loader2, setLoader2] = useState(true);

    const breadcrumbItems = [
        { title: "Section", link: "#" },
        { title: "All Sections", link: "#" },
    ]
    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        props.setBreadcrumbItems('All Sections', breadcrumbItems)


    })




    useEffect(() => {
        setLoader2(true);
        dispatch(fetchCourse());
        dispatch(fetchSection());

    }, []);

    useEffect(() => {
        if (sections?.sections?.success == true) {
            setLoader2(false);
        }
    }, [sections?.sections]);


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
                field: "sectionCode",
                sort: "asc",
                width: 100,
            },
            {
                label: "Name",
                field: "sectionName",
                sort: "asc",
                width: 150,
            },
            {
                label: "Description",
                field: "sectionDescription",
                sort: "asc",
                width: 200,
            },
        ],
        rows: sections?.sections?.result,
        rows: sections?.sections?.result?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row)
        }))
    }

    const handleRowClick = (row) => {

        setModalShow(true);

        setId(row.id);
        setSectionName(row.sectionName);
        setSectionDescription(row.sectionDescription);
        setSectionCode(row.sectionCode);
        console.log(courses)
        courses?.courses?.result.map((r) => {
            console.log(r.id)
            console.log(row.courseId);
            if (r.id === row.courseId) {
                console.log(r);
                setCourse(r);
            }
        })
    }

    const handleUpdate = () => {
        let courseId = course?.id;
        if (!sectionName || !sectionDescription || !sectionCode || !courseId) {
            setSpanDisplay("inline")

        }
        else {
            setLoader(true);
            dispatch(updateSection({ id, courseId, sectionName, sectionDescription, }))
        }

    };

    useEffect(() => {
        setLoader(false);
        if (sections.success == true) {
            setModalShow(false);
            setModalShow(false);
            setDeleteModalShow(false)
            dispatch(setSuccessFalseSection());
        }
    }, [sections.success]);

    const handleDelete = () => {

        setLoader(true);
        dispatch(deleteSection(id));
    };

    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        console.log(selectedOption);
    };

    const handleSelectCourse = selectedOption => {
        setCourse(selectedOption);
        console.log(selectedOption);
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
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">All Sections </CardTitle>
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
                        Edit Section
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Section Name
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={course}
                                onChange={handleSelectCourse}
                                options={courses?.courses?.result}
                                getOptionLabel={option => option.courseName + " (" + option.courseCode + ")"}
                                getOptionValue={option => option.id.toString()} // Convert to string if classId is a number
                                classNamePrefix="select2-selection"
                            />
                            {!course && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Section
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter new Section"
                                maxLength="50"
                                value={sectionName}
                                onChange={(e) => setSectionName(e.target.value)} />
                            {!sectionName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Section Description
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter New Description"
                                maxLength="50"
                                value={sectionDescription}
                                onChange={(e) => setSectionDescription(e.target.value)} />
                            {!sectionDescription && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Section Code
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Section Code"
                                maxLength="50"
                                value={sectionCode}
                                // onChange={(e) => setSectionCode(e.target.value)} 
                                readOnly />
                        </div>
                    </Row>




                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="success" onClick={handleUpdate} className="waves-effect waves-light">Update</Button>{" "}
                    <Button type="button" color="danger" onClick={() => { setDeleteModalShow(true); setModalShow(false) }} className="waves-effect waves-light">Delete</Button>{" "}
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
                        Are you sure want to remove this section.
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

export default connect(null, { setBreadcrumbItems })(AllSections);
import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form,
    Label
} from "reactstrap"

import Select from "react-select"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
// import { addClass, updateClass } from './actions';

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { addClass, fetchClass } from "store/class/action";
import { useSelector } from "react-redux";
import classesReducer from '../../store/class/reducer';
import { addCourse, setSuccessFalseCourse } from "store/course/action";
import Loader from "components/Loader/Loader";
import { useNavigate } from "react-router-dom";


const CreateCourse = (props) => {
    document.title = "Question Bank | Create Course";



    const breadcrumbItems = [
        { title: "Course", link: "#" },
        { title: "Create Course", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Create Course', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [classs, setClasss] = useState(null);
    const [selectedclasss, setSelectedClasss] = useState(null);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [another, setAnother] = useState(false);
    const navigate = useNavigate();
    const classes = useSelector(state => state.classesReducer);
    const result = useSelector(state => state.coursesReducer);

    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        if (classes?.classes?.length == 0) {
            dispatch(fetchClass());
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let classId = classs?.id
        if (!courseName || !courseDescription || !courseCode || !classId) {
            setSpanDisplay("inline")

        }
        else {
            setLoader(true);
            dispatch(addCourse({ courseName, courseDescription, courseCode, classId, classs }));
        }
    };


    useEffect(() => {
        setLoader(false);
        if (result.success == true) {
            if (!another) {
                navigate("/all-courses");
            }
            setAnother(false);
            setCourseCode("");
            setCourseName("");
            setClasss(null);
            setSelectedClasss(null);
            setCourseDescription("");
            dispatch(setSuccessFalseCourse());
        }
    }, [result.success]);

    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        setSelectedClasss(selectedOption);
        console.log(selectedOption);
    };


    const checkResult = () => {

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
                            <CardTitle className="h4">Create Course</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Class Name
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={selectedclasss}
                                            onChange={handleSelectClass}
                                            options={classes?.classes?.result}
                                            getOptionLabel={option => option?.className + " (" + option?.classCode + ")"}
                                            getOptionValue={option => option?.id?.toString()} // Convert to string if classId is a number
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
                                        Course Name
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
                                            onChange={(e) => setCourseCode(e.target.value)} />
                                        {!courseCode && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Create</button>
                                        <button type="submit" className="btn btn-primary w-md ms-2 me-2" onClick={() => setAnother(true)}>Create and add more</button>
                                    </div>
                                </Row>
                            </form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(CreateCourse);
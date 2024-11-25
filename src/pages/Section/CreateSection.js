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
import { fetchCourse, setBreadcrumbItems } from "../../store/actions";
import { addClass, fetchClass } from "store/class/action";
import { useSelector } from "react-redux";
import classesReducer from '../../store/class/reducer';
import { addSection, setSuccessFalseSection } from "store/section/action";
import Loader from "components/Loader/Loader";
import { useNavigate } from "react-router-dom";


const CreateSection = (props) => {
    document.title = "Question Bank | Create Section";



    const breadcrumbItems = [
        { title: "Section", link: "#" },
        { title: "Create Section", link: "#" },
    ]
    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        props.setBreadcrumbItems('Create Section', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [course, setCourse] = useState(null);
    const [selectedclasss, setSelectedClasss] = useState(null);
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const [sectionCode, setSectionCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [loader, setLoader] = useState(false);
    const [another, setAnother] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.coursesReducer)
    const result = useSelector(state => state.sectionsReducer)


    useEffect(() => {
        if (courses?.courses?.length == 0) {
            dispatch(fetchCourse());
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        let courseId = course?.id;
        if (!sectionName || !sectionDescription || !sectionCode || !courseId) {
            setSpanDisplay("inline")

        }
        else {
            setLoader(true);
            dispatch(addSection({ sectionName, sectionDescription, sectionCode, courseId }));
        }

    };



    useEffect(() => {
        setLoader(false);
        if (result.success == true) {
            if (!another) {
                navigate("/all-sections");
            }
            setAnother(false);
            setSectionCode("");
            setSectionName("");
            setCourse(null);
            setSectionDescription("");
            dispatch(setSuccessFalseSection());
        }
    }, [result.success]);


    const handleSelectCourse = selectedOption => {
        setCourse(selectedOption);
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
                            <CardTitle className="h4">Create Section</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Course Name
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
                                        Section Name
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
                                            onChange={(e) => setSectionCode(e.target.value)} />
                                        {!sectionCode && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Submit</button>
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

export default connect(null, { setBreadcrumbItems })(CreateSection);
import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form
} from "reactstrap"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
// import { addClass, updateClass } from './actions';

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { addClass, setSuccessFalseClass } from "store/class/action";
import { useSelector } from "react-redux";
import classesReducer from '../../store/class/reducer';
import axios from "axios";
import { toast } from "react-toastify";
import { success } from "toastr";
import Loader from "components/Loader/Loader";
import { useNavigate } from "react-router-dom";


const CreateClass = (props) => {
    document.title = "Question Bank | Create Class";




    const breadcrumbItems = [
        { title: "Class", link: "#" },
        { title: "Create Class", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])
    useEffect(() => {
        props.setBreadcrumbItems('Create Class', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    // const [className, setClassName] = useState("");
    const [className, setClassName] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [classCode, setClassCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [another, setAnother] = useState(false);
    const result = useSelector(state => state.classesReducer)
    const navigate = useNavigate();

    function isValidName(name) {
        const specialCharRegex = /[^a-zA-Z0-9 ]/; // Regular expression to check for special characters
        if (specialCharRegex.test(name)) {
            toast.error("Class name should not contain any special characters");
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(className)
        if (!className || !classDescription || !classCode) {
            setSpanDisplay("inline")

        }
        else {
            if (isValidName(className)) {
                setLoader(true);
                dispatch(addClass({ className, classDescription, classCode }));


            }
        }
    };


    useEffect(() => {
        setLoader(false);
        if (result.success == true) {
            if (!another) {
                navigate("/all-classes");
            }
            setAnother(false);
            setClassCode("");
            setClassName("");
            setClassDescription("");
            dispatch(setSuccessFalseClass());
        }
    }, [result.success]);



    const checkResult = () => {

    }

    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}
            <Row >
                <Col>
                    <Card>
                        <CardBody className="col-lg-10 col-sm-12 col-xs-12">
                            <CardTitle className="h4">Create Class</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Class Name
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
                                            maxLength="50"
                                            value={classDescription}
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
                                            maxLength="50"
                                            value={classCode}
                                            onChange={(e) => setClassCode(e.target.value)} />
                                        {!classCode && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md me-2">Create</button>
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

export default connect(null, { setBreadcrumbItems })(CreateClass);
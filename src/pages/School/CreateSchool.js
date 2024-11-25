import React, { useEffect, useState } from "react"

import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import Select from "react-select"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { addSchool, setSuccessFalseSchool } from "store/school/action";
import { useSelector } from "react-redux";
import schoolesReducer from '../../store/school/reducer';
import axios from "axios";
import { toast } from "react-toastify";
import { ExamCenters, SchoolTypes, fetchSchoolTypes } from "helpers/school_helper";
import Loader from "components/Loader/Loader";


const CreateSchool = (props) => {
    document.title = "Question Bank | Create School";



    const breadcrumbItems = [
        { title: "School", link: "#" },
        { title: "Create School", link: "#" },
    ]
    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])
    useEffect(() => {
        props.setBreadcrumbItems('Create School', breadcrumbItems)
    })

    const [schoolName, setSchoolName] = useState("");
    const [schoolCode, setSchoolCode] = useState("");
    const [center, setCenter] = useState({ id: 1, name: "Yes", value: true });
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [administration, setAdministration] = useState("");
    const [zone, setZone] = useState("");
    const [woreda, setWoreda] = useState("");
    const [kebele, setKebele] = useState("");
    const [schoolType, setSchoolType] = useState("");
    const [sittingCapacity, setSittingCapacity] = useState("");
    const [schoolTypes, setSchoolTypes] = useState([]);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [loader, setLoader] = useState(false);
    const result = useSelector(state => state.schoolReducer);
    const dispatch = useDispatch();



    useEffect(() => {
        fetchAllSchoolTypes();
    }, [])


    const fetchAllSchoolTypes = async () => {
        console.log("hello")
        const result = await fetchSchoolTypes();
        console.log(result);
        setSchoolTypes(result?.result);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!schoolName || !schoolCode || !address || !administration || !schoolType || !center || !zone || !woreda || !town || !city || !kebele || !sittingCapacity) {
            setSpanDisplay("inline")

        }
        else {
            let regionCityAdministration = administration
            let schoolTypeOwnership = schoolType.id;
            let examCenter = center.value
            setLoader(true);
            dispatch(addSchool({ schoolName, schoolCode, address, regionCityAdministration, zone, woreda, town, city, kebele, schoolTypeOwnership, examCenter, sittingCapacity }));
        }
    };

    useEffect(() => {
        if (result.success == true) {
            setSchoolName("");
            setSchoolCode("");
            setAddress("");
            setAdministration("");
            setSchoolType("")
            setCenter(null)
            setWoreda("")
            setZone("")
            setTown("")
            setCity("")
            setKebele("")
            setSittingCapacity("")
            dispatch(setSuccessFalseSchool());
        }
        setLoader(false);
    }, [result.success]);
    const handleSelectCenter = selectedOption => {
        setCenter(selectedOption);
    };

    const handleSelectSchoolType = selectedOption => {
        setSchoolType(selectedOption)
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
                            <CardTitle className="h4">Create School</CardTitle>
                            <form onSubmit={handleSubmit}>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        School Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter New School"
                                            value={schoolName}
                                            onChange={(e) => setSchoolName(e.target.value)} />
                                        {!schoolName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        School Code
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter School Code"
                                            value={schoolCode}
                                            onChange={(e) => setSchoolCode(e.target.value)} />
                                        {!schoolCode && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Sitting Capacity
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number"
                                            className='form-control'
                                            placeholder="Enter Sitting Capacity"
                                            value={sittingCapacity}
                                            onChange={(e) => setSittingCapacity(e.target.value)} />
                                        {!sittingCapacity && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Exam Center
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={center}
                                            onChange={handleSelectCenter}
                                            options={ExamCenters}
                                            getOptionLabel={option => option.name}
                                            getOptionValue={option => option.id.toString()}
                                            classNamePrefix="select2-selection"
                                        />
                                        {!center && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        School Type/Ownership
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={schoolType}
                                            onChange={handleSelectSchoolType}
                                            options={schoolTypes}
                                            getOptionLabel={option => option.schoolTypeName}
                                            getOptionValue={option => option.id.toString()}
                                            classNamePrefix="select2-selection"
                                        />
                                        {!schoolType && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Address
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter City Name"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)} />
                                        {!address && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        City
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter City Name"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)} />
                                        {!city && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Town
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Town Name"
                                            value={town}
                                            onChange={(e) => setTown(e.target.value)} />
                                        {!town && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Administration
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Administration Name"
                                            value={administration}
                                            onChange={(e) => setAdministration(e.target.value)} />
                                        {!administration && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Zone
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Zone Name"
                                            value={zone}
                                            onChange={(e) => setZone(e.target.value)} />
                                        {!zone && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Woreda
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Woreda Name"
                                            value={woreda}
                                            onChange={(e) => setWoreda(e.target.value)} />
                                        {!woreda && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Kebele
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Kebele Name"
                                            value={kebele}
                                            onChange={(e) => setKebele(e.target.value)} />
                                        {!kebele && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>


                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Submit</button>
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

export default connect(null, { setBreadcrumbItems })(CreateSchool);
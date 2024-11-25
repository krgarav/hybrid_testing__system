import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";
import Select from "react-select";

//Import Action to copy breadcrumb items from local state to redux state
import { deleteSchool, fetchSchool, setBreadcrumbItems, setSuccessFalseSchool, updateSchool } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ExamCenters, fetchSchoolTypes } from "helpers/school_helper";
import Loader from "components/Loader/Loader";

const AllSchool = (props) => {
    document.title = "Question Bank | All School";
    const [modalShow, setModalShow] = useState(false);
    const [schoolName, setSchoolName] = useState("");
    const [schoolCode, setSchoolCode] = useState("");
    const [center, setCenter] = useState(null);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [administration, setAdministration] = useState("");
    const [zone, setZone] = useState("");
    const [woreda, setWoreda] = useState("");
    const [kebele, setKebele] = useState("");
    const [schoolType, setSchoolType] = useState("");
    const [schoolTypes, setSchoolTypes] = useState([]);
    const [sittingCapacity, setSittingCapacity] = useState("");
    const [id, setId] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const result = useSelector(state => state.schoolReducer)
    const [loader2, setLoader2] = useState(true);
    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        fetchAllSchoolTypes();
    }, [])


    const fetchAllSchoolTypes = async () => {
        console.log("hello")
        const result = await fetchSchoolTypes();
        console.log(result);
        setSchoolTypes(result?.result);
    }

    const breadcrumbItems = [
        { title: "School", link: "#" },
        { title: "All School", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('All School', breadcrumbItems);
    })

    useEffect(() => {
        setLoader2(true);
        dispatch(fetchSchool());

    }, []);

    useEffect(() => {
        if (result?.school?.success == true) {
            setLoader2(false);
        }
    }, [result?.school]);


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
                field: "schoolCode",
                sort: "asc",
                width: 100,
            },
            {
                label: "Name",
                field: "schoolName",
                sort: "asc",
                width: 150,
            },
            {
                label: "School Type Name",
                field: "schoolTypeName",
                sort: "asc",
                width: 200,
            },
        ],
        rows: result?.school?.result,
        rows: result?.school?.result?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row)
        }))
    }

    const handleRowClick = (row) => {
        console.log(row);
        setModalShow(true);
        setId(row.id);
        setSchoolName(row.schoolName);
        setSchoolCode(row.schoolCode);
        setAddress(row.address);
        setCity(row.city);
        setTown(row.town);
        setAdministration(row.regionCityAdministration);
        setZone(row.zone);
        setWoreda(row.woreda);
        setKebele(row.kebele);
        setSittingCapacity(row.sittingCapacity);


        if (row.examCenter) {
            setCenter({ id: 1, name: "Yes", value: true })
        }
        else {
            setCenter({ id: 0, name: "NO", value: false })

        }

        schoolTypes.map(d => {
            if (d.id === row.schoolTypeOwnership) {
                setSchoolType(d);
            }
        })
    }

    const handleUpdate = () => {
        //     dispatch(updateSchool({}))
        if (!schoolName || !schoolCode || !address || !administration || !schoolType || !center || !zone || !woreda || !town || !city || !kebele || !sittingCapacity) {
            setSpanDisplay("inline")

        }
        else {
            let regionCityAdministration = administration
            let schoolTypeOwnership = schoolType.id;
            let examCenter = center.value
            setLoader(true);
            dispatch(updateSchool({ id, schoolName, schoolCode, address, regionCityAdministration, zone, woreda, town, city, kebele, schoolTypeOwnership, examCenter, sittingCapacity }));

        }
    }

    useEffect(() => {
        if (result.success == true) {
            setModalShow(false);
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
                            <CardTitle className="h4">All School </CardTitle>
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
                        Edit School
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



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
                                onChange={(e) => setSchoolCode(e.target.value)} readOnly />
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







                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="success" onClick={handleUpdate} className="waves-effect waves-light">Update</Button>{" "}
                    {/* <Button type="button" color="danger" onClick={handleDelete} className="waves-effect waves-light">Delete</Button>{" "} */}
                    {/* <Button onClick={() => setModalShow(false)}>Close</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={handleDelete}>Delete</Button> */}
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(AllSchool);
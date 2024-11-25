import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";
import Select from "react-select"

//Import Action to copy breadcrumb items from local state to redux state
import { deleteUser, fetchClass, fetchCourse, fetchUser, setBreadcrumbItems, setSuccessFalseUser, updateUser } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import coursesReducer from "store/course/reducer";
import usersReducer from "store/user/reducer";
import { getUserType } from "helpers/user_helper";
import Loader from "components/Loader/Loader";

const AllUsers = (props) => {
    document.title = "Question Bank | All Users";
    const [modalShow, setModalShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [grandFatherName, setGrandFatherName] = useState("");
    const [otp, setOtp] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [position, setPosition] = useState("");
    const [verify, setVerify] = useState(false);
    const [otpFeildDisplay, setOtpFeildDisplay] = useState(false);
    const [otpButtonDisplay, setOtpButtonDisplay] = useState(true);
    const [allUserTypes, setAllUserTypes] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [classAccess, setClassAccess] = useState(false);
    const [courseAccess, setCourseAccess] = useState(false);
    const [sectionAccess, setSectionAccess] = useState(false);
    const [subSectionAccess, setSubSectionAccess] = useState(false);
    const [difficultyAccess, setDifficultyAccess] = useState(false);
    const [questionAccess, setQuestionAccess] = useState(false);
    const [questionBulkAccess, setQuestionBulkAccess] = useState(false);
    const [questionPaperAccess, setQuestionPaperAccess] = useState(false);
    const [userManagementAccess, setUserManagementAccess] = useState(false);
    const [schoolManagementAccess, setSchoolManagementAccess] = useState(false);
    const [examCenterManagementAccess, setExamCenterManagementAccess] = useState(false);
    const [studentManagementAccess, setStudentManagementAccess] = useState(false);
    const [languageAccess, setLanguageAccess] = useState(false);
    const [qbWorkflowAccess, setQbWorkFlowAccess] = useState(false);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [loader, setLoader] = useState(false);
    const [id, setId] = useState({});
    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.users);
    const user = useSelector(state => state.userReducer);
    const [loader2, setLoader2] = useState(true);

    const breadcrumbItems = [
        { title: "User", link: "#" },
        { title: "All Users", link: "#" },
    ]


    useEffect(() => {
        props.setBreadcrumbItems('All Users', breadcrumbItems)


    })

    useEffect(() => {           /* For closing the sidebar if opened */
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        if (users?.length == 0) {
            dispatch(fetchUser());
        }

    })

    useEffect(() => {
        setLoader2(true);
        dispatch(fetchUser());

    }, []);

    useEffect(() => {
        if (users?.success == true) {
            setLoader2(false);
        }
    }, [users]);

    useEffect(() => {
        fetchUserTypes();
    }, [])

    const fetchUserTypes = async () => {
        try {

            const result = await getUserType();
            setAllUserTypes(result?.result);
        } catch (error) {

        }
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
                label: "Email",
                field: "email",
                sort: "asc",
                width: 150,
            },
            {
                label: "Phone Number",
                field: "phoneNumber",
                sort: "asc",
                width: 200,
            },
        ],
        rows: users?.result,
        rows: users?.result?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row)
        }))
    }

    const handleRowClick = (row) => {

        setModalShow(true);
        console.log(row);
        setId(row.aspId);
        setEmail(row.email);
        setFatherName(row.fatherName);
        setGrandFatherName(row.grandFatherName);
        setName(row.name);
        setPhoneNumber(row.phoneNumber);
        setPosition(row.position);
        allUserTypes.map(d => {
            if (d.typeName === row.userType) {
                setType(d);
            }
        })
        setClassAccess(row.classAccess);
        setCourseAccess(row.courseAccess);
        setSectionAccess(row.sectionAccess);
        setSubSectionAccess(row.subsectionAccess);
        setDifficultyAccess(row.difficultyAccess);
        setQuestionAccess(row.questionAccess);
        setQuestionBulkAccess(row.questionBulkAccess);
        setQuestionPaperAccess(row.questionPaperAccess);
        setUserManagementAccess(row.userManagementAccess);
        setSchoolManagementAccess(row.schoolManagementAccess);
        setExamCenterManagementAccess(row.examCenterManagementAccess);
        setSchoolManagementAccess(row.studentManagementAccess);
        setLanguageAccess(row.languageAccess);


    }

    const handleUpdate = () => {
        if (!name || !email || !phoneNumber || !fatherName || !grandFatherName || !position || !type) {
            setSpanDisplay("inline")

        }
        else {
            let userType = type.typeName
            setLoader(true);
            dispatch(updateUser({ id, position, userType, classAccess, courseAccess, sectionAccess, subSectionAccess, difficultyAccess, languageAccess, questionAccess, questionBulkAccess, questionPaperAccess, userManagementAccess, schoolManagementAccess, examCenterManagementAccess, studentManagementAccess, qbWorkflowAccess }))

        }
    };

    useEffect(() => {
        if (user.success == true) {
            setModalShow(false);
            dispatch(setSuccessFalseUser());
        }
        setLoader(false);
    }, [user.success]);

    const handleDelete = () => {
        // setModalShow(false);
        // dispatch(deleteUser(id));
    };

    const handleSelectType = selectedValue => {
        // console.log(selectedValue);
        setType(selectedValue);
    }

    const handleClassRights = (e) => {
        console.log("click", classAccess);
        classAccess === false ? setClassAccess(true) : setClassAccess(false)
    }
    const handleCourseRights = (e) => { courseAccess === false ? setCourseAccess(true) : setCourseAccess(false) }
    const handleSectionRights = (e) => { sectionAccess === false ? setSectionAccess(true) : setSectionAccess(false) }
    const handleSubSectionRights = (e) => {
        subSectionAccess === false ? setSubSectionAccess(true) : setSubSectionAccess(false)
    }
    const handleDifficultyRights = (e) => { difficultyAccess === false ? setDifficultyAccess(true) : setDifficultyAccess(false) }
    const handleQuestionRights = (e) => { questionAccess === false ? setQuestionAccess(true) : setQuestionAccess(false) }
    const handleQuestionBulkRights = (e) => {

        console.log("click", questionBulkAccess);
        questionBulkAccess === false ? setQuestionBulkAccess(true) : setQuestionBulkAccess(false)
    }
    const handleQuestionPaperRights = (e) => { questionPaperAccess === false ? setQuestionPaperAccess(true) : setQuestionPaperAccess(false) }
    const handleUserManagementRights = (e) => { userManagementAccess === false ? setUserManagementAccess(true) : setUserManagementAccess(false) }
    const handleSchoolManagementRights = (e) => { schoolManagementAccess === false ? setSchoolManagementAccess(true) : setSchoolManagementAccess(false) }
    const handleExamCenterManagementRights = (e) => { examCenterManagementAccess === false ? setExamCenterManagementAccess(true) : setExamCenterManagementAccess(false) }
    const handleStudentManagementRights = (e) => { studentManagementAccess === false ? setStudentManagementAccess(true) : setStudentManagementAccess(false) }
    const handleLanguageRights = (e) => { languageAccess === false ? setLanguageAccess(true) : setLanguageAccess(false) }
    const handleQbWorkflowRights = (e) => { qbWorkflowAccess === false ? setQbWorkFlowAccess(true) : setQbWorkFlowAccess(false) }


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
                            <CardTitle className="h4">All Users </CardTitle>
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
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Name
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter User Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} readOnly />
                            {!name && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Email
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Email Id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} readOnly />
                            {!email && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Phone Number
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} readOnly />
                            {!phoneNumber && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Father Name
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Father Name"
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)} readOnly />
                            {!fatherName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Grand Father Name
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Grand Father Name"
                                value={grandFatherName}
                                onChange={(e) => setGrandFatherName(e.target.value)} readOnly />
                            {!grandFatherName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Position
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)} />
                            {!position && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            User Type
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={type}
                                onChange={handleSelectType}
                                options={allUserTypes}
                                getOptionLabel={option => option.typeName}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                            />
                            {!type && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>

                    <div className="d-flex flex-wrap">
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="class_access" className="col-md-6 col-form-label">
                                Class Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="class_access"
                                    name="class_access"
                                    value={1}
                                    onChange={handleClassRights}
                                    checked={classAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>

                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="class_access" className="col-md-6 col-form-label">
                                Course Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="course_access"
                                    name="course_access"
                                    value={1}
                                    onChange={handleCourseRights}
                                    checked={courseAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>

                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="section_access" className="col-md-6 col-form-label">
                                Section Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="section_access"
                                    name="section_access"
                                    value={1}
                                    onChange={handleSectionRights}
                                    checked={sectionAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="subSection_access" className="col-md-6 col-form-label">
                                Sub Section Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="subSection_access"
                                    name="subSection_access"
                                    value={1}
                                    onChange={handleSubSectionRights}
                                    checked={subSectionAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="difficulty_access" className="col-md-6 col-form-label">
                                Difficulty Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="difficulty_access"
                                    name="difficulty_access"
                                    value={1}
                                    onChange={handleDifficultyRights}
                                    checked={difficultyAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="language_access" className="col-md-6 col-form-label">
                                Language Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="language_access"
                                    name="language_access"
                                    value={1}
                                    onChange={handleLanguageRights}
                                    checked={languageAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="question_access" className="col-md-6 col-form-label">
                                Question Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="question_access"
                                    name="question_access"
                                    value={1}
                                    onChange={handleQuestionRights}
                                    checked={questionAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="bulk_question_access" className="col-md-6 col-form-label">
                                Bulk Question Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="bulk_question_access"
                                    name="bulk_question_access"
                                    value={1}
                                    onChange={handleQuestionBulkRights}
                                    checked={questionBulkAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="question_paper_access" className="col-md-6 col-form-label">
                                Question Paper Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="question_paper_access"
                                    name="question_paper_access"
                                    value={1}
                                    onChange={handleQuestionPaperRights}
                                    checked={questionPaperAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="user_Management_access" className="col-md-6 col-form-label">
                                User Management Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="user_Management_access"
                                    name="user_Management_access"
                                    value={1}
                                    onChange={handleUserManagementRights}
                                    checked={userManagementAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="school_Management_access" className="col-md-6 col-form-label">
                                School Management Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="school_Management_access"
                                    name="school_Management_access"
                                    value={1}
                                    onChange={handleSchoolManagementRights}
                                    checked={schoolManagementAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="exam_center_Management_access" className="col-md-6 col-form-label">
                                Exam Center Management Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="exam_center_Management_access"
                                    name="exam_center_Management_access"
                                    value={1}
                                    onChange={handleExamCenterManagementRights}
                                    checked={examCenterManagementAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="student_Management_access" className="col-md-6 col-form-label">
                                Student Management Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="student_Management_access"
                                    name="student_Management_access"
                                    value={1}
                                    onChange={handleStudentManagementRights}
                                    checked={studentManagementAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                        <div className="mb-3 col-md-4 col-12 d-flex align-items-center">
                            <label htmlFor="student_Management_access" className="col-md-6 col-form-label">
                                QB Workflow Access
                            </label>
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="student_Management_access"
                                    name="student_Management_access"
                                    value={1}
                                    onChange={handleQbWorkflowRights}
                                    checked={qbWorkflowAccess ? 'checked' : ''}
                                />
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="success" onClick={handleUpdate} className="waves-effect waves-light">Update</Button>{" "}
                    {/* <Button type="button" color="danger" onClick={handleDelete} className="waves-effect waves-light">Delete</Button>{" "} */}
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(AllUsers);
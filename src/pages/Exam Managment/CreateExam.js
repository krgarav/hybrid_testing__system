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
import { addExam, fetchDifficulty, fetchQuestionPaper, setBreadcrumbItems } from "../../store/actions";
import { useSelector } from "react-redux";


import { useAuth } from "context/authContext";
import { fetchAllCoursesByClass } from "helpers/course_helper";
import { fetchAllSectionsByCourse } from "helpers/section_helper";
import { fetchAllSubSectionsBySection } from "helpers/subSection_helper";
import { createExam } from "helpers/question_helper";
import { result } from "lodash";
import Flatpickr from "react-flatpickr"
import { toast } from "react-toastify";
import { ExamTypes, createMainExamPaper } from "helpers/questionPaper_helper";
import { getAllMainExamPapers } from "helpers/center_helper";
import Loader from "components/Loader/Loader";
import ReactSwitch from "react-switch";

const CreateExam = (props) => {
    document.title = "Exam Managment | Create Exam";

    const breadcrumbItems = [
        { title: "Exam Managment", link: "#" },
        { title: "Create Exam", link: "#" },
    ]

    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])
    useEffect(() => {
        props.setBreadcrumbItems('Create Exam', breadcrumbItems)
    })
    const [totalSets, setTotalSets] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [shiftTimeFrom, setShiftTimeFrom] = useState([]);
    const [shiftTimeTo, setShiftTimeTo] = useState([]);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [examDate, setExamDate] = useState(null);
    const [paper, setPaper] = useState(null);
    const [examType, setExamType] = useState("")
    const [totalShifts, setTotalShifts] = useState("");
    const [shiftData, setShiftData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [aiProctoring, setAiProctoring] = useState(false);
    const [liveProctoring, setLiveProctoring] = useState(false);
    const [warningCounts, setWarningCounts] = useState(null);
    // const [allExams, setAllExams] = useState([]);
    const allExams = useSelector(state => state.questionPapersReducer.questionPapers?.result)






    useEffect(() => {
        if (!allExams) {
            dispatch(fetchQuestionPaper());
        }

    },);
    const [auth, setAuth] = useAuth();

    const dispatch = useDispatch();






    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(showResult)
        if (!paper || !totalSets || !examType || !shiftData || !totalShifts) {
            setSpanDisplay("inline")

        }
        else {
            let paperId = paper.id;
            let onlineExam = (examType.id === 1 || examType.id === 2) ? true : false;
            let offlineExam = (examType.id === 0 || examType.id === 2) ? true : false;



            try {
                setLoader(true);
                const result = await createMainExamPaper({ paperId, totalSets, onlineExam, offlineExam, shiftData, showResult, aiProctoring, liveProctoring, warningCounts });
                if (result?.success) {
                    setLoader(false);
                    toast.success(result?.message);
                    setPaper(null);
                    setTotalSets("");
                    setExamType("");
                    setTotalShifts("");
                    setShiftData([]);
                }
                else {
                    setLoader(false);
                    toast.error(result?.message);
                }
            } catch (error) {
                setLoader(false);
                console.log(error);
            }


        }
    };












    const handleDateChange = (date) => {
        setExamDate(date[0]); // Assuming single date selection
    };


    const handleSelectQuestionPaper = selectedOption => {
        setPaper(selectedOption);
    };

    const handleSelectExamType = selectedOption => {
        setExamType(selectedOption);
    };



    // Function to update shift data
    const handleShiftChange = (index, key, value) => {
        const updatedShifts = [...shiftData];
        updatedShifts[index] = {
            ...updatedShifts[index],
            [key]: value
        };
        setShiftData(updatedShifts);
    };

    // Function to handle input change for shift start and end times
    const handleTimeChange = (index, key, event) => {
        const bool = handleDateTimeChange(event);
        if (bool) {
            handleShiftChange(index, key, event.target.value);
        }

    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [minDateTime, setMinDateTime] = useState(getCurrentDateTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinDateTime(getCurrentDateTime());
        }, 1000); // Update minDateTime every second

        return () => clearInterval(interval);
    }, []);

    const handleDateTimeChange = (index, key, e) => {
        const selectedDateTime = e.target.value;
        const now = new Date();
        const selectedDate = new Date(selectedDateTime);

        if (selectedDate < now) {
            toast.error('Cannot select a past date and time.');
            handleShiftChange(index, key, '');
            return false;
        } else {
            handleShiftChange(index, key, e.target.value);
        }
    };

    const handleAiSwitchChange = (checked) => {
        setAiProctoring(checked); // `checked` is true or false based on the switch state
    };
    const handleLiveSwitchChange = (checked) => {
        setLiveProctoring(checked); // `checked` is true or false based on the switch state
    };
    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}
            <Row>
                <Col>
                    <Card>
                        <CardBody className="col-xl-6 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                            <CardTitle className="h4">Create Exam</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Select Question Paper
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={paper}
                                            onChange={handleSelectQuestionPaper}
                                            options={allExams}
                                            getOptionLabel={option => option.examName}
                                            getOptionValue={option => option.id.toString()} // Convert to string if classId is a number
                                            classNamePrefix="select2-selection"
                                        />
                                        {!paper && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Total Sets
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number"
                                            className='form-control'
                                            placeholder="Enter Total No. Sets"
                                            value={totalSets}
                                            onChange={(e) => setTotalSets(e.target.value)} />
                                        {!totalSets && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Exam Type
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={examType}
                                            onChange={handleSelectExamType}
                                            options={ExamTypes}
                                            getOptionLabel={option => option.name}
                                            getOptionValue={option => option.id.toString()} // Convert to string if classId is a number
                                            classNamePrefix="select2-selection"
                                        />
                                        {!examType && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Ai Proctoring
                                    </label>
                                    <div className="col-md-10">
                                        <ReactSwitch
                                            checked={aiProctoring}
                                            onChange={handleAiSwitchChange}
                                            onColor="#00d084" // Customize the color as needed
                                            offColor="#888"
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                        />
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Live Proctoring
                                    </label>
                                    <div className="col-md-10">
                                        <ReactSwitch
                                            checked={liveProctoring}
                                            onChange={handleLiveSwitchChange}
                                            onColor="#00d084" // Customize the color as needed
                                            offColor="#888"
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                        />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Enter Total Warnings
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number"
                                            className='form-control'
                                            placeholder="Enter Total Warnings"
                                            value={warningCounts}
                                            onChange={(e) => setWarningCounts(e.target.value)} />
                                        {!warningCounts && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Enter Total Shifts
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number"
                                            className='form-control'
                                            placeholder="Enter Total Shifts"
                                            value={totalShifts}
                                            onChange={(e) => setTotalShifts(e.target.value)} />
                                        {!totalShifts && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                {Array.from({ length: totalShifts }, (_, index) => (
                                    <Row key={index} className="mb-3">
                                        <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                                            Shift {index + 1}
                                        </label>
                                        <div className="col-md-10">
                                            <Row className="mb-3">
                                                <label htmlFor="example-text-input" className="col-md-1 col-form-label">
                                                    From
                                                </label>
                                                <div className="col-md-5">
                                                    <input
                                                        className="form-control"
                                                        type="datetime-local"
                                                        value={shiftData[index]?.start || ''}
                                                        onChange={(e) => handleDateTimeChange(index, 'start', e)}
                                                        min={minDateTime}
                                                    />
                                                    {!shiftData[index]?.start && (
                                                        <span style={{ color: "red", display: spanDisplay }}>This field is required</span>
                                                    )}
                                                </div>
                                                <label htmlFor="example-text-input" className="col-md-1 col-form-label">
                                                    To
                                                </label>
                                                <div className="col-md-5">
                                                    <input
                                                        className="form-control"
                                                        type="datetime-local"
                                                        value={shiftData[index]?.end || ''}
                                                        onChange={(e) => handleDateTimeChange(index, 'end', e)}
                                                        min={minDateTime}
                                                    />
                                                    {!shiftData[index]?.end && (
                                                        <span style={{ color: "red", display: spanDisplay }}>This field is required</span>
                                                    )}
                                                </div>
                                            </Row>
                                        </div>
                                    </Row>
                                ))}

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-4 col-form-label"
                                    >
                                        Show Result After Submission
                                    </label>
                                    <div className="col-md-8">
                                        <input type="checkbox"
                                            className='mt-2'
                                            onChange={(e) => setShowResult(!showResult)} />
                                        {!examType && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
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

export default connect(null, { setBreadcrumbItems })(CreateExam);
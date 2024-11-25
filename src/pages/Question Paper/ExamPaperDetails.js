import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"
import { Modal } from "react-bootstrap";
import Select from "react-select"

import { connect } from "react-redux";
import '../../css/questionPaper.css'

//Import Action to copy breadcrumb items from local state to redux state
import { fetchClass, fetchDifficulty, fetchLanguage, fetchQuestionPaper, setBreadcrumbItems } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import TimeAgo from "HelperComponent/TimeAgo";
import { useLocation, useParams } from "react-router-dom";
import { addQuestionToPaper, deleteQuestionFromPaper, fetchAllQuestionOfPaper, fetchFilterQuestions, updateQuestionPaper } from "helpers/questionPaper_helper";
import { MDBDataTable } from "mdbreact";
import { fetchAllCoursesByClass } from "helpers/course_helper";
import { fetchAllSectionsByCourse } from "helpers/section_helper";
import { fetchAllSubSectionsBySection } from "helpers/subSection_helper";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";

const ExamPaperDetails = (props) => {
    document.title = "Question Bank | All Questions";

    const dispatch = useDispatch();
    const params = useParams();
    const [selectedRow, setSelectedRow] = useState(null);
    const [questionPaper, setQuestionPaper] = useState(null);
    const [filterQuestions, setFilterQuestions] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalForFetchQuestions, setModalForFetchQuestions] = useState(false);
    const [modalForAddQuestion, setModalForAddQuestion] = useState(false);
    const [classs, setClasss] = useState(null);
    const [selectedDifficultys, setSelectedDifficultys] = useState(null);
    const [course, setCourse] = useState(null);
    const [section, setSection] = useState(null);
    const [subSection, setSubSection] = useState(null);
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState(null);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [language, setLanguage] = useState(null);
    const [loader, setLoader] = useState(false);
    const languages = useSelector(state => state.languagesReducer);
    const [loader2, setLoader2] = useState(true);
    const typesOptions = [
        { id: 1, name: "short" },
        { id: 2, name: "mcq" },
        { id: 3, name: "true false" },
        { id: 4, name: "essay" },
    ]




    const breadcrumbItems = [
        { title: "Question Papers", link: "#" },
        { title: "All Questions Papers", link: "#" },
        { title: "Question Paper", link: "#" },
    ]

    const classes = useSelector(state => state.classesReducer)
    const difficultys = useSelector(state => state.difficultysReducer)

    useEffect(() => {
        if (languages?.languages?.length == 0) {
            dispatch(fetchLanguage());
        }

    })
    useEffect(() => {
        if (classes?.classes?.length == 0) {
            dispatch(fetchClass());
        }

    })
    useEffect(() => {
        if (difficultys?.difficultys?.length == 0) {
            dispatch(fetchDifficulty());
        }

    })
    const fetchCourses = async () => {
        if (classs) {
            let id = classs.id;

            let result = await fetchAllCoursesByClass(id);
            setCourses(result);
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [classs]);

    const fetchSections = async () => {
        if (course) {
            let id = course.id;
            let a = [];
            course.map(d => {
                a.push(d.id);
            })

            let result = await fetchAllSectionsByCourse(a);
            setSections(result);
        }
    }
    useEffect(() => {
        fetchSections();
    }, [course]);

    const fetchSubSections = async () => {
        if (section) {
            // let id = section.id;
            let a = [];
            section.map(d => {
                a.push(d.id);
            })

            let result = await fetchAllSubSectionsBySection(a);
            setSubSections(result);
        }
    }
    useEffect(() => {
        fetchSubSections();
    }, [section]);

    useEffect(() => {
        fetchQuestion();
        props.setBreadcrumbItems('All Questions Papers', breadcrumbItems)
    }, [])

    const fetchQuestion = async () => {
        try {
            setLoader2(true);
            const qp = await fetchAllQuestionOfPaper(params.id);
            setQuestionPaper(qp);
        } catch (error) {
            toast.error("something went wrong");
        } finally {
            setLoader2(false);
        }

    }



    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        setCourses([]);
        setSections([]);
        setCourse(null);
        setSection(null);
    };

    // function handleSelectCourse(selectedMulti) {
    //     setCourse(selectedMulti)
    //   }
    const handleSelectCourse = selectedOption => {
        setCourse(selectedOption);
        setSections([]);
        setSubSections([]);
        setSection(null);
        setSubSection(null);
    };

    const handleSelectSection = selectedOption => {
        setSection(selectedOption);
        setSubSections([]);
        setSubSection(null);
    };
    const handleSelectSubSection = selectedOption => {
        setSubSection(selectedOption);
    };
    const handleSelectDifficulty = selectedOption => {
        setSelectedDifficultys(selectedOption);
    };
    const handleSelectTypes = selectedOption => {
        setSelectedTypes(selectedOption);
    };






    const [marks, setMarks] = useState([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);



    const data = {
        columns: [
            {
                label: "Serial No.",
                field: "serialNo",
                sort: "asc",
                width: 50,
            },
            {
                label: "Type",
                field: "type",
                sort: "asc",
                width: 100,
            },
            {
                label: "Question",
                field: "description",
                sort: "asc",
                width: 150,
            },
            {
                label: "Answer",
                field: "answer",
                sort: "asc",
                width: 200,
            },
            // New column for delete button
            {
                label: "Marks",
                field: "mark",
                width: 100,
                btn: true, // Indicate that the content should be treated as a button
            },
            {
                label: "Actions",
                field: "actions",
                width: 100,
                btn: true, // Indicate that the content should be treated as a button
            },
        ],
        rows: questionPaper?.map((row, index) => ({
            ...row,
            serialNo: index + 1,
            mark: (
                <>
                    <input
                        type="number"
                        style={{ width: "2rem" }}
                        value={row.questionMarks}
                        onChange={(e) => handleInputChange(e, row.questionId)} // Pass the row's id to the handler
                    />
                </>
            ),
            actions: (
                <Button color="danger" onClick={() => handleRemoveClick(row)}>
                    Remove
                </Button>
            ),
        })),
    };
    const handleInputChange = (e, id) => {
        const newValue = e.target.value; // Get the new value from the input

        // Update the questionPaper array
        setQuestionPaper(prevQuestionPaper => {
            return prevQuestionPaper.map(prevRow => {
                if (prevRow.questionId === id) {
                    return { ...prevRow, questionMarks: newValue };
                }
                return prevRow;
            });
        });
    };


    const FilterQuestionData = {
        columns: [
            {
                label: "Serial No.",
                field: "serialNo",
                sort: "asc",
                width: 50,
            },
            {
                label: "Type",
                field: "type",
                sort: "asc",
                width: 100,
            },
            {
                label: "Question",
                field: "description",
                sort: "asc",
                width: 150,
            },
            {
                label: "Answer",
                field: "answer",
                sort: "asc",
                width: 200,
            },
            // New column for delete button
            {
                label: "Actions",
                field: "actions",
                width: 100,
                btn: true, // Indicate that the content should be treated as a button
            },
        ],
        rows: filterQuestions?.map((row, index) => ({
            ...row,
            serialNo: index + 1,
            actions: (
                <Button color="success" onClick={() => handleAddClick(row)}>
                    Add
                </Button>
            ),
        })),
    };


    const handleRemoveClick = async (row) => {
        setSelectedRow(row);
        setModalShow(true);

    }
    const handleAddClick = async (row) => {
        let paperId = params.id;
        let questionId = row.id;
        try {
            setLoader(true);
            const result = await addQuestionToPaper({ paperId, questionId });
            setLoader(false);
            toast.success(result.message);
            fetchQuestion();
        } catch (error) {
            toast.error("something went wrong");
        }




    }
    const handleRemove = async () => {
        let paperId = selectedRow.paperId;
        let questionId = selectedRow.questionId;
        try {
            setLoader(true);
            const result = await deleteQuestionFromPaper({ paperId, questionId });
            setLoader(false);
            toast.success(result.message);
            setModalShow(false)
            fetchQuestion();

        } catch (error) {
            toast.error("something went wrong");
        }

    }

    const handleFetch = async () => {

        if (!classs || !courses || !sections || !subSections || !selectedDifficultys || !language || !selectedTypes) {
            setSpanDisplay("inline")

        }
        else {
            let courseIds = [];
            course.forEach((course) => {
                courseIds.push(course.id)
            })
            let sectionIds = [];
            section.forEach((section) => {
                sectionIds.push(section.id)
            })
            let subSectionIds = [];
            subSection.forEach((subSection) => {
                subSectionIds.push(subSection.id);
            })
            let difficultyIds = [];
            selectedDifficultys.forEach((difficulty) => {
                difficultyIds.push(difficulty.id);
            })
            let types = [];
            selectedTypes.forEach((type) => {
                types.push(type.name);
            })
            let classId = classs.id;
            try {
                setModalForFetchQuestions(true);
                let languageId = language.id;
                setLoader(true);
                const result = await fetchFilterQuestions({ classId, courseIds, sectionIds, subSectionIds, difficultyIds, languageId, types });
                setFilterQuestions(result.result);
                setLoader(false);
            } catch (error) {
                toast.error("something went wrong");
            }

        }
    }

    const handleUpdateMarks = async () => {
        try {
            let paperId = questionPaper[0].paperId;
            let questionId = [];
            let questionMarks = [];

            questionPaper?.map((d, i) => {
                // console.log(i)
                questionId.push(d.questionId);
                questionMarks.push(d.questionMarks);
            })
            console.log(paperId)
            console.log(questionId)
            console.log(questionMarks)
            // let {data} = await axios.post("")
            setLoader(true);
            let result = await updateQuestionPaper({ paperId, questionId, questionMarks })
            if (result?.success) {
                setLoader(false);
                toast.success(result?.message);
            }
            else {
                setLoader(false);
                toast.error(result?.message)
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
            toast.error("Something went wrong");
        }
    }


    const handleSelectLanguage = selectedOption => {
        setLanguage(selectedOption);
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
                            <div className="d-flex justify-content-between">
                                <CardTitle className="h4">All Questions</CardTitle>
                                <div className="">
                                    <Button type="button" color="warning" className="waves-effect waves-light mb-2 me-3" onClick={handleUpdateMarks}>Update Marks</Button>
                                    <Button type="button" color="info" className="waves-effect waves-light mb-2" onClick={() => setModalForAddQuestion(true)}>Add Question</Button>
                                </div>
                            </div>
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
                <Modal.Body>

                    <h4>
                        Are you sure want to remove this question from the paper.
                    </h4>


                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">No</Button>{" "}
                    <Button type="button" color="danger" onClick={handleRemove} className="waves-effect waves-light">Yes</Button>{" "}

                </Modal.Footer>
            </Modal>

            <Modal
                show={modalForAddQuestion}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Question in Paper
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
                    {courses && <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Course Name
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={course}
                                isMulti={true}
                                onChange={handleSelectCourse}
                                options={courses?.result}
                                getOptionLabel={option => option.courseName + " (" + option.courseCode + ")"}
                                getOptionValue={option => option.id.toString()} // Convert to string if classId is a number
                                classNamePrefix="select2-selection"
                            />
                            {!course && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                        </div>

                    </Row>}

                    {sections && <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Section Name
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={section}
                                isMulti={true}
                                onChange={handleSelectSection}
                                options={sections?.result}
                                getOptionLabel={option => option.sectionName + " (" + option.sectionCode + ")"}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                            />
                            {!section && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>}

                    {subSections && <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Sub Section Name
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={subSection}
                                isMulti={true}
                                onChange={handleSelectSubSection}
                                options={subSections?.result}
                                getOptionLabel={option => option.subSectionName + " (" + option.subSectionCode + ")"}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                            />
                            {!subSection && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>}
                    {difficultys && <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Difficulties
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={selectedDifficultys}
                                isMulti={true}
                                onChange={handleSelectDifficulty}
                                options={difficultys?.difficultys?.result}
                                getOptionLabel={option => option.difficultyName}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                            />
                            {!selectedDifficultys && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>}
                    {languages && <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Language Name
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={language}
                                onChange={handleSelectLanguage}
                                options={languages?.languages?.result}
                                getOptionLabel={option => option.languageName}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                            />
                            {!language && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>}

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Types
                        </label>
                        <div className="col-md-10">
                            <Select

                                value={selectedTypes}
                                isMulti={true}
                                onChange={handleSelectTypes}
                                options={typesOptions}
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                            />
                            {!selectedTypes && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>




                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalForAddQuestion(false)} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="danger" onClick={handleFetch} className="waves-effect waves-light">Fetch Question</Button>{" "}

                </Modal.Footer>
            </Modal>



            <Modal
                show={modalForFetchQuestions}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">

                        <div className="d-flex justify-content-between">

                            <Button type="button" color="primary" onClick={() => setModalForFetchQuestions(false)} className="waves-effect waves-light align-self-end"><i className="ion ion-md-close-circle-outline" style={{ fontSize: "1.5rem" }}></i></Button>{" "}

                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody >
                                    <div className="d-flex flex-wrap mb-3">
                                        <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{classs?.className}</div>
                                        {course?.map((cour) => (
                                            <>
                                                <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{cour?.courseName}</div>
                                            </>
                                        ))}
                                        {section?.map((sect) => (
                                            <>
                                                <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{sect?.sectionName}</div>
                                            </>
                                        ))}
                                        {subSection?.map((subSect) => (
                                            <>
                                                <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{subSect?.subSectionName}</div>
                                            </>
                                        ))}
                                        {selectedDifficultys?.map((diff) => (
                                            <>
                                                <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{diff?.difficultyName}</div>
                                            </>
                                        ))}
                                        {selectedTypes?.map((typ) => (
                                            <>
                                                <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{typ?.name}</div>
                                            </>
                                        ))}
                                        <div className="" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: ".3rem 1.5rem", fontSize: "1rem", fontWeight: "500", background: "#575050", color: "white" }}>{language?.languageName}</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <CardTitle className="h4">All Questions</CardTitle>
                                    </div>
                                    <MDBDataTable className="table-row-hover" responsive bordered data={FilterQuestionData} style={{ cursor: 'pointer' }} noBottomColumns />

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(ExamPaperDetails);








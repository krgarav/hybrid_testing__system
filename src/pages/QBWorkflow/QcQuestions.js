import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form,
    Button
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { fetchClass, fetchDifficulty, fetchLanguage, fetchUser, setBreadcrumbItems, setSuccessFalseQuestion } from "../../store/actions";
import Loader from "components/Loader/Loader";
import Tree from 'react-d3-tree';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createWorkflowTree, fetchAllWorkflowTree, fetchQuestionForQc, getChild, returnQuestion, updateWorkflowTree } from "helpers/workflow_helper";
import { toast } from "react-toastify";
import Select from "react-select"
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { deleteQuestion, fetchSingleQuestion, updateQuestion } from "helpers/question_helper";
import { IMAGE_FETCH } from "helpers/url_helper";
import { fetchAllCoursesByClass } from "helpers/course_helper";
import { fetchAllSectionsByCourse } from "helpers/section_helper";
import { fetchAllSubSectionsBySection } from "helpers/subSection_helper";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';



const QcQuestions = (props) => {
    document.title = "Question Bank | Workflow";




    const breadcrumbItems = [
        { title: "Workflow", link: "#" },
        { title: "QC Questions", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])
    useEffect(() => {
        props.setBreadcrumbItems('QC Questions', breadcrumbItems)
    })
    const dispatch = useDispatch();


    const [loader, setLoader] = useState(false);
    const [questions, setQuestions] = useState([]);
    const { userId } = useParams();

    const [questionId1, setQuestionId1] = useState(null);
    const [questionId2, setQuestionId2] = useState(null);
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");
    const [code, setCode] = useState("");
    const [id, setId] = useState({});
    const [classs, setClasss] = useState(null);
    const [type, setType] = useState('short');
    const [difficulty, setDifficulty] = useState(null);
    const [language1, setLanguage1] = useState(null);
    const [language2, setLanguage2] = useState(null);
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [course, setCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [section, setSection] = useState(null);
    const [sections, setSections] = useState([]);
    const [subSection, setSubSection] = useState(null);
    const [subSections, setSubSections] = useState([]);
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [options1, setOptions1] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [oldImages1, setOldImages1] = useState([]);
    const [oldImages2, setOldImages2] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editOptionText1, setEditOptionText1] = useState("Edit Options");
    const [optionsEditDisplay1, setOptionsEditDisplay1] = useState("none");
    const [editOptionText2, setEditOptionText2] = useState("Edit Options");
    const [optionsEditDisplay2, setOptionsEditDisplay2] = useState("none");
    const [iterator, setIterator] = useState(0);
    const [comment, setComment] = useState("");
    const [biligual, setBiligual] = useState(false);
    const [returnModal, setReturnModal] = useState(false);
    const classes = useSelector(state => state.classesReducer);
    const difficultys = useSelector(state => state.difficultysReducer);
    const languages = useSelector(state => state.languagesReducer);

    useEffect(() => {
        dispatch(fetchClass());
        dispatch(fetchDifficulty());
        dispatch(fetchLanguage());

    }, []);




    const fetchCourses = async () => {
        if (classs) {
            let id = classs.id;

            let result = await fetchAllCoursesByClass(id);
            setCourses(result);
            // courses = result;
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [classs]);

    const fetchSections = async () => {
        if (course) {
            let id = course.id;

            let result = await fetchAllSectionsByCourse([id]);
            setSections(result);
            // sections = result;
        }
    }
    useEffect(() => {
        fetchSections();
    }, [course]);

    const fetchSubSections = async () => {
        if (section) {
            let id = section.id;

            let result = await fetchAllSubSectionsBySection([id]);
            setSubSections(result);
            // subSection = result;
        }
    }
    useEffect(() => {
        fetchSubSections();
    }, [section]);



    const getQuestionForQc = async () => {
        try {
            setLoader(true);
            const data = await fetchQuestionForQc(userId);
            if (data?.success) {
                setQuestions(data?.result);
                handleFirstIterator(data?.result);

            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getQuestionForQc();
    }, []);







    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        setCourses([]);
        setSections([]);
        setCourse(null);
        setSection(null);
    };

    const handleSelectCourse = selectedOption => {
        setCourse(selectedOption);
        setSections([]);
        // sections = [];
        setSubSections([]);
        // subSections = [];
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
        setDifficulty(selectedOption);
    };

    const handleSelectLanguage = selectedOption => {
        setLanguage1(selectedOption);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
        setAnswer1("");
    };

    const addOption = () => {
        setOptions1([...options1, option1]);
        setOption1("");
    }
    const addOption2 = () => {
        setOptions2([...options2, option2]);
        setOption2("");
    }
    const handleSetOptionsClick = () => {
        if (optionsEditDisplay1 == "none") {
            setOptionsEditDisplay1("inline-block");
            setEditOptionText1("Done");
        }
        else {
            setOptionsEditDisplay1("none");
            setEditOptionText1("Edit Options");
        }
    }
    const handleSetOptionsClick2 = () => {
        if (optionsEditDisplay2 == "none") {
            setOptionsEditDisplay2("inline-block");
            setEditOptionText2("Done");
        }
        else {
            setOptionsEditDisplay2("none");
            setEditOptionText2("Edit Options");
        }
    }
    const removeOption = (index) => {
        const newOptions = [...options1];
        newOptions.splice(index, 1);
        setOptions1(newOptions);
    };

    const removeOption2 = (index) => {
        const newOptions = [...options2];
        newOptions.splice(index, 1);
        setOptions2(newOptions);
    };

    const handleFirstIterator = (questions) => {
        setClasss(questions?.[iterator]?.class);
        setCourse(questions?.[iterator]?.course);
        setSection(questions?.[iterator]?.section);
        setSubSection(questions?.[iterator]?.subSection);
        setDifficulty(questions?.[iterator]?.difficulty);
        setType(questions?.[iterator]?.type);


        const bilingualQuestions = questions?.[iterator]?.bilingualQuestions || [];
        const hasSecondQuestion = bilingualQuestions.length > 1;

        // Function to set bilingual question data
        const setBilingualData = (index, setAnswer, setDescription, setLanguage, setQuestionId, setOptions) => {
            if (bilingualQuestions[index]) {
                setQuestionId(bilingualQuestions[index].id)
                setAnswer(bilingualQuestions[index].answer);
                setDescription(bilingualQuestions[index].description);
                setLanguage(bilingualQuestions[index].language?.[0]);
                setOptions(bilingualQuestions[index].options);

            }
        };

        // Set data for the first and second bilingual questions
        setBilingualData(0, setAnswer1, setDescription1, setLanguage1, setQuestionId1, setOptions1);

        if (hasSecondQuestion) {
            setBilingualData(1, setAnswer2, setDescription2, setLanguage2, setQuestionId2, setOptions2);
            setBiligual(true);
        } else {
            setBiligual(false);
        }



        // Function to generate image HTML
        const generateImagesHTML = (index) => {
            return bilingualQuestions[index]?.imagePath?.map(url =>
                `<img class="e-rte-image" src="${IMAGE_FETCH + url}" style="height: 20px; width: 10px;" alt="Descriptive Text"/>`
            ).join('') || '';
        };

        // Set the images for the first and second bilingual questions
        setOldImages1(generateImagesHTML(0));
        setOldImages2(hasSecondQuestion ? generateImagesHTML(1) : '');


    }
    const handleIteratorChagne = (iterator) => {

        setClasss(questions?.[iterator]?.class);
        setCourse(questions?.[iterator]?.course);
        setSection(questions?.[iterator]?.section);
        setSubSection(questions?.[iterator]?.subSection);
        setDifficulty(questions?.[iterator]?.difficulty);
        setType(questions?.[iterator]?.type);

        const bilingualQuestions = questions?.[iterator]?.bilingualQuestions || [];
        const hasSecondQuestion = bilingualQuestions.length > 1;

        const setBilingualData = (index, setAnswer, setDescription, setLanguage, setQuestionId, setOptions) => {
            if (bilingualQuestions[index]) {
                setQuestionId(bilingualQuestions[index].id)
                setAnswer(bilingualQuestions[index].answer);
                setDescription(bilingualQuestions[index].description);
                setLanguage(bilingualQuestions[index].language[0]);
                setOptions(bilingualQuestions[index].options);

            }
        };

        // Set data for the first and second bilingual questions
        setBilingualData(0, setAnswer1, setDescription1, setLanguage1, setQuestionId1, setOptions1);

        if (hasSecondQuestion) {
            setBilingualData(1, setAnswer2, setDescription2, setLanguage2, setQuestionId2, setOptions2);
            setBiligual(true);
        } else {
            setBiligual(false);
        }





        const generateImagesHTML = (index) => {
            return bilingualQuestions[index]?.imagePath?.map(url =>
                `<img class="e-rte-image" src="${IMAGE_FETCH + url}" style="height: 20px; width: 10px;" alt="Descriptive Text"/>`
            ).join('') || '';
        };

        // Set the images for the first and second bilingual questions
        setOldImages1(generateImagesHTML(0));
        setOldImages2(hasSecondQuestion ? generateImagesHTML(1) : '');

    }

    function removeSpecificDivs(htmlString) {
        // Parse the HTML string into a new DOM document
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // Selectors for the divs to remove based on class and id
        const selectorsToRemove = [
            'div.e-rte-content#defaultRTErte-view',
            'div.e-content.e-lib.e-keyboard#defaultRTE_rte-edit-view'
        ];

        // Iterate over selectors and remove the matching elements
        selectorsToRemove.forEach(selector => {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(element => {
                // Instead of removing the element, we replace it with its content
                while (element.firstChild) {
                    element.parentNode.insertBefore(element.firstChild, element);
                }
                element.parentNode.removeChild(element);
            });
        });

        // Serialize the updated DOM back to a string
        // Inner HTML of the body will contain the expected output
        return doc.body.innerHTML;
    }


    const removeImgTag = (htmlContent) => {
        // Create a temporary element to parse the HTML string
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlContent;

        // Find all image elements
        const imageElements = tempElement.querySelectorAll('img');

        // Remove each image element
        imageElements.forEach(imageElement => {
            imageElement.parentNode.removeChild(imageElement);
        });

        // Return the modified HTML
        return tempElement.innerHTML;
    };



    const fetchImageFile = async (obj) => {

        const tempDiv = obj?.getContent();
        const objectElements = tempDiv.querySelectorAll('.e-rte-image');

        if (objectElements.length > 0) {
            try {
                const filesPromises = Array.from(objectElements).map(async (objectElement) => {
                    const imageUrl = objectElement.getAttribute('src');
                    const name = objectElement.getAttribute('alt') || 'unnamed';

                    const response = await fetch(imageUrl);
                    const blob = await response.blob();

                    return new File([blob], `image_${name}.png`, { type: 'image/png' });
                });

                return await Promise.all(filesPromises);
            } catch (error) {
                console.error('Error fetching images:', error);
                return [];
            }
        } else {
            console.log('No img element found within .e-rte-image');
            return [];
        }
    };

    const handleAccept = async () => {

        try {


            const rteValue = rteObj1.getContent();
            const res1 = rteObj1.getContent();
            let desc1 = res1.outerHTML;
            desc1 = removeSpecificDivs(desc1);
            let tempElement1 = document.createElement('div');
            tempElement1.innerHTML = res1.outerHTML;
            let textContent1 = tempElement1.textContent || tempElement1.innerText;


            let rteValue2, desc2, textContent2;

            if (biligual) {
                rteValue2 = rteObj2.getContent();
                const res2 = rteObj2.getContent();
                desc2 = res2.outerHTML;
                desc2 = removeSpecificDivs(desc2);
                let tempElement2 = document.createElement('div');
                tempElement2.innerHTML = res2.outerHTML;
                textContent2 = tempElement2.textContent || tempElement2.innerText;
            }
            if (!classs || !course || !section || !subSection || !desc1 || !difficulty || !language1 || !type || !answer1) {
                setSpanDisplay("inline")

            }
            else {

                const formData = new FormData();
                const fetchedImageFiles1 = await fetchImageFile(rteObj1);
                let fetchedImageFiles2;

                if (biligual) {
                    fetchedImageFiles2 = await fetchImageFile(rteObj2);
                }

                const bilingualData = [
                    {
                        "id": questionId1,
                        "contentText": textContent1,
                        "description": desc1,
                        "answer": answer1,
                        "languageName": language1.languageName,
                        "languageId": language1.id,
                        "options": options1,
                    }
                ];

                if (biligual) {
                    bilingualData.push({
                        id: questionId2,
                        "contentText": textContent2,
                        "description": desc2,
                        "answer": answer2,
                        "languageName": language2.languageName,
                        "languageId": language2.id,
                        "options": options2,
                    });
                }

                fetchedImageFiles1.forEach((image) => {
                    formData.append('Image1', image);
                });

                if (biligual) {
                    fetchedImageFiles2.forEach((image) => {
                        formData.append('Image2', image);
                    });
                }
                formData.append('Bilingual', JSON.stringify(bilingualData));
                formData.append('Id', questions?.[iterator]?.id);
                formData.append('ClassId', classs.id);
                formData.append('CourseId', course.id);
                formData.append('SectionId', section.id);
                formData.append('SubSectionId', subSection.id);
                formData.append('DifficultyId', difficulty.id);
                formData.append('Type', type);
                formData.append('qc', 1);

                setLoader(true);
                const data = await updateQuestion(formData);
                if (data?.success) {
                    setModalShow(false);
                    setDeleteModalShow(false);
                    toast.success(data?.message);
                } else {
                    toast.error(data?.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "something went wrong");
        } finally {
            getQuestionForQc();
            setLoader(false);
        }
    }


    useEffect(() => {
        if (questions.success == true) {
            setModalShow(false);
            setDeleteModalShow(false);
            // dispatch(setSuccessFalseQuestion());
        }
        setLoader(false);
        getQuestionForQc();
    }, [questions.success]);


    const handleReject = async () => {
        try {
            setLoader(true);
            const result = await deleteQuestion(questions?.[iterator]?.id);
            if (result?.success) {
                getQuestionForQc();
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "something went wrong");
        } finally {
            setLoader(false);
        }
    }



    const handleReturn = async () => {
        try {
            if (!comment) {
                setSpanDisplay(true);
            } else {
                setLoader(true);
                const data = await returnQuestion({ questionId: questions?.[iterator]?.id, Comment: comment });
                if (data?.success) {
                    toast.success(data?.message);
                    setComment("");
                    getQuestionForQc();

                } else {
                    toast.error(data?.message);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoader(false);
            setReturnModal(false);
            getQuestionForQc();
        }
    }




    // ***** code for rich text editor textarea ****************


    const toolbarSettings = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', '|', 'Undo', 'Redo']
    };
    const quickToolbarSettings = {
        image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'],
        link: ['Open', 'Edit', 'UnLink']
    };

    let rteObj1;
    let rteObj2;
    // set the value to Rich Text Editor
    // let template = `<div style="display:block;"><p style="margin-right:10px">${description} ${oldImages}</p></div>`;
    let template1 = description1 + oldImages1;
    let template2 = description2 + oldImages2;
    // let template = description;


    // Rich Text Editor items list
    let items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', '|', 'Undo', 'Redo'
    ];

    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}

            <Row >
                <Col>
                    <Card>
                        <CardBody className="col-lg-10 col-sm-12 col-xs-12 " >

                            {/* <div id="MBDTableDiv" >
                                <MDBDataTable className="table-row-hover" responsive bordered data={data} style={{ cursor: 'pointer' }} noBottomColumns />

                            </div> */}
                            {questions?.length > 0 ?
                                <>


                                    <div className=""><h1>{iterator + 1} of {questions?.length}</h1></div>
                                    <div className="container d-flex align-items-center justify-content-between">
                                        <button className="btn btn-primary me-2" onClick={() => { setIterator(iterator - 1); handleIteratorChagne(iterator - 1) }} disabled={iterator === 0} >
                                            <i className="bi bi-arrow-left"></i>
                                        </button>

                                        <div className="" style={{ overflowX: "visible" }}>
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
                                                    Difficulty Name
                                                </label>
                                                <div className="col-md-10">
                                                    <Select

                                                        value={difficulty}
                                                        onChange={handleSelectDifficulty}
                                                        options={difficultys?.difficultys?.result}
                                                        getOptionLabel={option => option.difficultyName}
                                                        getOptionValue={option => option.id.toString()}
                                                        classNamePrefix="select2-selection"
                                                    />
                                                    {!difficulty && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                </div>

                                            </Row>}


                                            <Row className="mb-3">
                                                <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                                                    Question Type
                                                </label>
                                                <div className="col-md-10">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="type"
                                                            id="type2"
                                                            value="short"
                                                            checked={type === 'short'}
                                                            onChange={handleTypeChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                                            Short
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="type"
                                                            id="type1"
                                                            value="mcq"
                                                            checked={type === 'mcq'}
                                                            onChange={handleTypeChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                                            MCQ
                                                        </label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="type"
                                                            id="type3"
                                                            value="true false"
                                                            checked={type === 'true false'}
                                                            onChange={handleTypeChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                                            True False
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="type"
                                                            id="type4"
                                                            value="essay"
                                                            checked={type === 'essay'}
                                                            onChange={handleTypeChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                                            Essay
                                                        </label>
                                                    </div>
                                                </div>
                                            </Row>

                                            {languages && <Row className="mb-3" >
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Language Name
                                                </label>
                                                <div className="col-md-10">
                                                    <Select

                                                        value={language1}
                                                        onChange={handleSelectLanguage}
                                                        options={languages?.languages?.result}
                                                        getOptionLabel={option => option.languageName}
                                                        getOptionValue={option => option.id.toString()}
                                                        classNamePrefix="select2-selection"
                                                        menuPortalTarget={document.body}  // Ensure the dropdown is rendered in the body
                                                        styles={{
                                                            menuPortal: (base) => ({
                                                                ...base,
                                                                zIndex: 9999,  // Set a high z-index to appear above other elements
                                                            }),
                                                        }}

                                                    />
                                                    {!language1 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                </div>

                                            </Row>}
                                            <Row className="mb-3" >
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Question Description
                                                </label>
                                                <div className="col-md-10">
                                                    <div className="card">
                                                        <RichTextEditorComponent id="defaultRTE" ref={(scope) => { rteObj1 = scope; }} valueTemplate={template1} toolbarSettings={toolbarSettings}>
                                                            <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
                                                        </RichTextEditorComponent>
                                                        {/* {!rteObj.getContent() && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>} */}
                                                    </div>
                                                </div>
                                            </Row>
                                            {type === "short" && <Row className="mb-3" >
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Answer
                                                </label>
                                                <div className="col-md-10">
                                                    <input type="text"
                                                        className='form-control'
                                                        placeholder="Enter Answer"
                                                        value={answer1}
                                                        onChange={(e) => setAnswer1(e.target.value)} />
                                                    {!answer1 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                </div>
                                            </Row>}
                                            {type === "mcq" &&
                                                <>

                                                    <Row className="mb-3" >
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="col-md-2 col-form-label"
                                                        >
                                                            {/* Answer */}
                                                        </label>
                                                        <div className="col-md-10">
                                                            <input type="text"
                                                                className='form-control col-md-4 mb-2'
                                                                onChange={(e) => { setOption1(e.target.value) }}
                                                                placeholder="write a option"
                                                                value={option1} />

                                                            <button type="button" className="btn btn-primary w-md me-2 " onClick={addOption}>Add Option</button>
                                                            <button type='button' className="btn btn-primary me-2" onClick={handleSetOptionsClick} >{editOptionText1}</button>
                                                        </div>
                                                    </Row>
                                                    <Row className="mb-3" >
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="col-md-2 col-form-label"
                                                        >
                                                            Select Answer
                                                        </label>
                                                        <div className="col-md-10">

                                                            {options1.map((o, i) => (
                                                                <React.Fragment key={i}>
                                                                    <div className="form-check mb-3">
                                                                        <input
                                                                            className="form-check-input mt-1"
                                                                            type="radio"
                                                                            name="options"
                                                                            id={i}
                                                                            value={o}
                                                                            checked={answer1 === o}
                                                                            onClick={(e) => { setAnswer1(e.target.value); }}
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor="exampleRadios1"
                                                                        >
                                                                            {o}
                                                                        </label>
                                                                        <button
                                                                            type='button'
                                                                            className="text-danger"
                                                                            onClick={() => removeOption(i)}
                                                                            style={{ fontSize: "1rem", background: "none", border: "none", fontWeight: "bolder", display: `${optionsEditDisplay1}` }}
                                                                        >
                                                                            <i className="mdi mdi-delete "></i>
                                                                        </button>
                                                                    </div>
                                                                </React.Fragment>
                                                            ))}

                                                            {!answer1 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                        </div>
                                                    </Row>
                                                </>
                                            }
                                            {type === "true false" && <Row className="mb-3" >
                                                <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                                                    Answer
                                                </label>
                                                <div className="col-md-10">
                                                    <div className="">
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="answer"
                                                                id="answer1"
                                                                value="true"
                                                                checked={answer1 === 'true'}
                                                                onChange={(e) => setAnswer1(e.target.value)}
                                                            />
                                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                                True
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="answer"
                                                                id="answer2"
                                                                value="false"
                                                                checked={answer1 === 'false'}
                                                                onChange={(e) => setAnswer1(e.target.value)}
                                                            />
                                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                                false
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {!answer1 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                </div>
                                            </Row>}

                                            {biligual && <div>
                                                <Row className="mb-3" >
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="col-md-2 col-form-label"
                                                    >
                                                        Language Name
                                                    </label>
                                                    <div className="col-md-10">
                                                        <Select

                                                            value={language2}
                                                            onChange={(selectedLanguage) => setLanguage2(selectedLanguage)}
                                                            options={languages?.languages?.result}
                                                            getOptionLabel={option => option.languageName}
                                                            getOptionValue={option => option.id.toString()}
                                                            classNamePrefix="select2-selection"
                                                            menuPortalTarget={document.body}  // Ensure the dropdown is rendered in the body
                                                            styles={{
                                                                menuPortal: (base) => ({
                                                                    ...base,
                                                                    zIndex: 9999,  // Set a high z-index to appear above other elements
                                                                }),
                                                            }}

                                                        />
                                                        {!language2 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>

                                                </Row>
                                                <Row className="mb-3" >
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="col-md-2 col-form-label"
                                                    >
                                                        Question Description
                                                    </label>
                                                    <div className="col-md-10">
                                                        <div className="card">
                                                            <RichTextEditorComponent id="defaultRTE" ref={(scope) => { rteObj2 = scope; }} valueTemplate={template2} toolbarSettings={toolbarSettings}>
                                                                <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
                                                            </RichTextEditorComponent>
                                                            {/* {!rteObj.getContent() && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>} */}
                                                        </div>
                                                    </div>
                                                </Row>
                                                {type === "short" && <Row className="mb-3" >
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="col-md-2 col-form-label"
                                                    >
                                                        Answer
                                                    </label>
                                                    <div className="col-md-10">
                                                        <input type="text"
                                                            className='form-control'
                                                            placeholder="Enter Answer"
                                                            value={answer2}
                                                            onChange={(e) => setAnswer2(e.target.value)} />
                                                        {!answer2 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>
                                                </Row>}
                                                {type === "mcq" &&
                                                    <>

                                                        <Row className="mb-3" >
                                                            <label
                                                                htmlFor="example-text-input"
                                                                className="col-md-2 col-form-label"
                                                            >
                                                                {/* Answer */}
                                                            </label>
                                                            <div className="col-md-10">
                                                                <input type="text"
                                                                    className='form-control col-md-4 mb-2'
                                                                    onChange={(e) => { setOption2(e.target.value) }}
                                                                    placeholder="write a option"
                                                                    value={option2} />

                                                                <button type="button" className="btn btn-primary w-md me-2 " onClick={addOption2}>Add Option</button>
                                                                <button type='button' className="btn btn-primary me-2" onClick={handleSetOptionsClick2} >{editOptionText2}</button>
                                                            </div>
                                                        </Row>
                                                        <Row className="mb-3" >
                                                            <label
                                                                htmlFor="example-text-input"
                                                                className="col-md-2 col-form-label"
                                                            >
                                                                Select Answer
                                                            </label>
                                                            <div className="col-md-10">
                                                                {options2.map((o, i) => (
                                                                    <>

                                                                        <div className="form-check mb-3">
                                                                            <input
                                                                                className="form-check-input mt-1"
                                                                                type="radio"
                                                                                name="options"
                                                                                id={i}
                                                                                value={o}
                                                                                checked={answer2 === o}
                                                                                onClick={(e) => { setAnswer2(e.target.value); }}
                                                                            />
                                                                            <label
                                                                                className="form-check-label"
                                                                                htmlFor="exampleRadios1"
                                                                            >
                                                                                {o}
                                                                            </label>
                                                                            <button type='button' className="text-danger" onClick={() => removeOption2(i)} style={{ fontSize: "1rem", background: "none", border: "none", fontWeight: "bolder", display: `${optionsEditDisplay2}` }}> <i className="mdi mdi-delete "></i></button>

                                                                        </div>

                                                                    </>
                                                                ))}
                                                                {!answer2 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                            </div>
                                                        </Row>
                                                    </>
                                                }
                                                {type === "true false" && <Row className="mb-3" >
                                                    <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                                                        Answer
                                                    </label>
                                                    <div className="col-md-10">
                                                        <div className="">
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="answer"
                                                                    id="answer1"
                                                                    value="true"
                                                                    checked={answer2 === 'true'}
                                                                    onChange={(e) => setAnswer2(e.target.value)}
                                                                />
                                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                                    True
                                                                </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="answer"
                                                                    id="answer2"
                                                                    value="false"
                                                                    checked={answer2 === 'false'}
                                                                    onChange={(e) => setAnswer2(e.target.value)}
                                                                />
                                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                                    false
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {!answer2 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>
                                                </Row>}
                                            </div>}
                                            {!biligual &&
                                                <Row className="mb-3">
                                                    <div className="mt-4 d-flex justify-content-between">
                                                        <button type="button" className="text-info" style={{ fontSize: "2rem", background: "none", border: "none", fontWeight: "bolder", }} onClick={() => setBiligual(true)}><i className="mdi mdi-plus"></i></button>
                                                    </div>
                                                </Row>
                                            }
                                        </div>

                                        <button className="btn btn-primary ms-2" onClick={() => { setIterator(iterator + 1); handleIteratorChagne(iterator + 1) }} disabled={iterator === questions.length - 1} >
                                            <i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center">

                                        <button className="btn btn-success me-2" onClick={handleAccept}  >
                                            Accept
                                        </button>
                                        <button className="btn btn-warning me-2" onClick={() => setReturnModal(true)} >
                                            Return
                                        </button>
                                        <button className="btn btn-danger me-2" onClick={handleReject}  >
                                            Reject
                                        </button>
                                    </div>
                                </> :
                                <>
                                    <h1 className="text-center">No Questions is available for Qc</h1>
                                </>
                            }

                        </CardBody>
                    </Card>
                </Col>
            </Row>




            <Modal
                show={returnModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Comment
                        </label>
                        <div className="col-md-10">
                            <input type="text"
                                className='form-control'
                                placeholder="Enter Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                            {!comment && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>
                    </Row>


                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setReturnModal(false)} className="waves-effect waves-light">close</Button>{" "}
                    <Button type="button" color="success" onClick={handleReturn} className="waves-effect waves-light">Return</Button>{" "}


                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(QcQuestions);

// krutrim ai
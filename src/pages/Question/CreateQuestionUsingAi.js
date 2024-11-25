import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form,
    Label,
    Button
} from "reactstrap"
import { Modal } from "react-bootstrap";
import Select from "react-select"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
// import { addClass, updateClass } from './actions';

//Import Action to copy breadcrumb items from local state to redux state
import { fetchDifficulty, fetchLanguage, setBreadcrumbItems } from "../../store/actions";
import { addClass, fetchClass } from "store/class/action";
import { useSelector } from "react-redux";
import { addQuestion, setSuccessFalseQuestion } from "store/question/action";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';


import { Editor } from 'primereact/editor';
import { useAuth } from "context/authContext";
import { fetchAllCoursesByClass } from "helpers/course_helper";
import { fetchAllSectionsByCourse } from "helpers/section_helper";
import { fetchAllSubSectionsBySection } from "helpers/subSection_helper";
import { useWindowSize } from 'react-use';
import Loader from "components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import { MdAddTask } from "react-icons/md";
import ProgressBar from 'react-bootstrap/ProgressBar';

const CreateQuestionUsingAi = (props) => {

    const { width } = useWindowSize();
    document.title = "Question Bank | Genrate Question Using Ai";



    const breadcrumbItems = [
        { title: "Question", link: "#" },
        { title: "Genrate Question Using Ai", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Genrate Question Using Ai', breadcrumbItems)
    })

    const [classs, setClasss] = useState(null);
    const [type, setType] = useState('short');
    const [course, setCourse] = useState(null);
    const [section, setSection] = useState(null);
    const [subSection, setSubSection] = useState(null);
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [difficulty, setDifficulty] = useState(null);
    const [language, setLanguage] = useState(null);
    const [language2, setLanguage2] = useState(null);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [auth, setAuth] = useAuth();
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [another, setAnother] = useState(false);
    const [aiQuestions, setAiQuestions] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [secondModalShow, setSecondModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [answer, setAnswer] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [option, setOption] = useState("");
    const [option2, setOption2] = useState("");
    const [description, setDescription] = useState("");
    const [description2, setDescription2] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classesReducer)
    const difficultys = useSelector(state => state.difficultysReducer)
    const languages = useSelector(state => state.languagesReducer);
    const result = useSelector(state => state.questionsReducer);
    const [editOptionText, setEditOptionText] = useState("Edit Options");
    const [editOptionText2, setEditOptionText2] = useState("Edit Options");
    const [optionsEditDisplay, setOptionsEditDisplay] = useState("none");
    const [optionsEditDisplay2, setOptionsEditDisplay2] = useState("none");
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [fromTable, setFromTable] = useState("")
    const [rowIndex, setRowIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [bilingual, setBilingual] = useState(false);
    useEffect(() => {
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
    useEffect(() => {
        if (difficultys?.difficultys?.length == 0) {
            dispatch(fetchDifficulty());
        }

    })
    useEffect(() => {
        if (languages?.languages?.length == 0) {
            dispatch(fetchLanguage());
        }

    })
    const fetchCourses = async () => {
        if (classs) {

            try {
                setLoader2(true);
                let id = classs.id;
                let result = await fetchAllCoursesByClass(id);
                setCourses(result);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong");
            } finally {
                setLoader2(false);
            }


        }
    }
    useEffect(() => {
        fetchCourses();
    }, [classs]);

    const fetchSections = async () => {
        if (course) {
            try {
                setLoader2(true);
                let id = course.id;
                let result = await fetchAllSectionsByCourse([id]);
                setSections(result);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong");
            } finally {
                setLoader2(false);
            }

        }
    }
    useEffect(() => {
        fetchSections();
    }, [course]);

    const fetchSubSections = async () => {
        if (section) {

            try {
                setLoader2(true);
                let id = section.id;
                let result = await fetchAllSubSectionsBySection([id]);
                setSubSections(result);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong");
            } finally {
                setLoader2(false);
            }

        }
    }
    useEffect(() => {
        fetchSubSections();
    }, [section]);





    const handleSubmit = async (e) => {
        e.preventDefault();

        const progressInterval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 95) {
                    clearInterval(progressInterval);
                }
                return Math.min(oldProgress + 5, 75);
            });
        }, 100);
        try {



            if (!classs || !course || !section || !subSection || !difficulty || !language || !type) {
                setSpanDisplay("inline")

            }
            else {

                let className = classs.className;
                let courseName = course.courseName;
                let sectionName = section.sectionName;
                let subSectionName = subSection.subSectionName;
                let difficultyName = difficulty.difficultyName;
                let languageName = language.languageName;
                setLoader(true);
                setProgress(0);
                const { data } = await axios.post(
                    "https://hts-python.is10live.com/generateQuestionsUsingAi",
                    // "http://192.168.1.7:5000/generateQuestionsUsingAi",
                    { className, courseName, sectionName, subSectionName, difficultyName, languageName, languageName1: language2?.languageName, type },
                );
                clearInterval(progressInterval);
                setProgress(100);
                setLoader(false);

                if (data?.success) {

                    setAiQuestions(data?.result);
                    toast.success(data?.message);
                    setModalShow(true);
                }
                else {
                    toast.error(data?.message);
                }
                // 



            }
        } catch (error) {
            setLoader(false);
            toast.error("something went wrong");
            console.log(error);
        }
    };

    useEffect(() => {
        if (result.success == true) {

            // setAnother(false);
            // setClasss(null);
            // setCourse(null);
            // setSection(null);
            // setSubSection(null);
            // setDifficulty(null);
            // setLanguage(null);
            // setType("short");
            dispatch(setSuccessFalseQuestion());
        }
        setLoader(false);
    }, [result.success]);


    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        setCourses([]);
        setSections([]);
        setCourse(null);
        setSection(null);
        setSubSections([]);
        setSubSection(null);
    };

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

    const handleSelectLanguage = selectedOption => {
        setLanguage(selectedOption);
    };

    const handleSelectDifficulty = selectedOption => {
        setDifficulty(selectedOption);
    };





    const handleTypeChange = (event) => {
        console.log("jfkdjfkdjfk")
        setType(event.target.value);
    };


    const removeQuestionAtIndex = (index) => {
        setAiQuestions(prevQuestions => {
            if (index < 0 || index >= prevQuestions.length) {
                console.error('Index out of bounds');
                return prevQuestions;
            }
            return [...prevQuestions.slice(0, index), ...prevQuestions.slice(index + 1)];
        });
    };


    const columns = [
        {
            label: "Actions",
            field: "actions",
            width: 100,
            btn: true, // Indicate that the content should be treated as a button
        },
        {
            label: "Serial No.",
            field: "serialNo",
            sort: "asc",
            width: 50,
        },
        {
            label: "Question Primary",
            field: "descriptionPrimary",
            sort: "asc",
            width: 100,
        },
        ...(bilingual ? [{
            label: "Question Secondary",
            field: "descriptionSecondary",
            sort: "asc",
            width: 100,
        }] : []),
        ...(type === 'mcq' ? [ // Conditionally add options columns if type is 'mcq'
            {
                label: "Option Primary1",
                field: "optionPrimary1",
                sort: "asc",
                width: 100,
            },
            ...(bilingual ? [{
                label: "Option Secondary1",
                field: "optionSecondary1",
                sort: "asc",
                width: 100,
            }] : []),
            {
                label: "Option Primary2",
                field: "optionPrimary2",
                sort: "asc",
                width: 100,
            },
            ...(bilingual ? [{
                label: "Option Secondary2",
                field: "optionSecondary2",
                sort: "asc",
                width: 100,
            }] : []),
            {
                label: "Option Primary3",
                field: "optionPrimary3",
                sort: "asc",
                width: 100,
            },
            ...(bilingual ? [{
                label: "Option Secondary3",
                field: "optionSecondary3",
                sort: "asc",
                width: 100,
            }] : []),
            {
                label: "Option Primary4",
                field: "optionPrimary4",
                sort: "asc",
                width: 100,
            },
            ...(bilingual ? [{
                label: "Option Secondary4",
                field: "optionSecondary4",
                sort: "asc",
                width: 100,
            }] : [])
        ] : []),
        ...(type !== "essay" ? [
            {
                label: "Answer Primary",
                field: "answerPrimary",
                sort: "asc",
                width: 100,
            },
            ...(bilingual ? [{
                label: "Answer Secondary",
                field: "answerSecondary",
                sort: "asc",
                width: 100,
            }] : [])
        ] : []),
    ];


    // Example data rows
    // Replace with your actual data rows
    // const rows = aiQuestions?.map((row, index) => {
    //     // Check if bilingual is true
    //     const isBilingual = bilingual === true;

    //     // Create a combined description, answer, and options fields
    //     const descriptionCombined = `${row.description1 || ''} ${row.description || ''}`.trim();
    //     const answerCombined = `${row.answer1 || ''} ${row.answer || ''}`.trim();
    //     const optionsCombined = (row.options1 || row.options) ? (row.options1 || []).concat(row.options || []) : [];

    //     return {
    //         ...row,
    //         serialNo: `${index + 1}`, // Single row numbering
    //         descriptionPrimary: row.description, // English description
    //         descriptionSecondary: isBilingual ? row.description1 : '', // Hindi description if bilingual
    //         ...(type === 'mcq' ? { // Conditionally spread options if type is 'mcq'
    //             optionPrimary1: row.options[0],
    //             optionSecondary1: isBilingual ? row.options1[0] : '', // Only show if bilingual
    //             optionPrimary2: row.options[1],
    //             optionSecondary2: isBilingual ? row.options1[1] : '', // Only show if bilingual
    //             optionPrimary3: row.options[2],
    //             optionSecondary3: isBilingual ? row.options1[2] : '', // Only show if bilingual
    //             optionPrimary4: row.options[3],
    //             optionSecondary4: isBilingual ? row.options1[3] : '', // Only show if bilingual
    //         } : {}),
    //         answerPrimary: row.answer, // English answer
    //         answerSecondary: isBilingual ? row.answer1 : '', // Hindi answer if bilingual
    //         actions: (
    //             <div className="d-flex">
    //                 <i style={{ color: "green", fontSize: "1.5rem", cursor: "pointer" }}
    //                     onClick={(e) => {
    //                         e.stopPropagation(); // Stop event bubbling to parent elements
    //                         setDescription(descriptionCombined); // Set combined description
    //                         setOptions(optionsCombined); // Set combined options
    //                         setAnswer(answerCombined); // Set combined answer
    //                         setModalShow(false);

    //                         handleAddQuestionToQb2(row);
    //                         removeQuestionAtIndex(index);
    //                     }}
    //                 >
    //                     <MdAddTask />
    //                 </i>
    //             </div>
    //         ),
    //     };
    // });



    const rows = aiQuestions?.map((row, index) => {
        // Check if bilingual is true
        const isBilingual = bilingual === true;
    
        // Create a combined description, answer, and options fields
        const descriptionCombined = `${row.description1 || ''} ${row.description || ''}`.trim();
        const answerCombined = `${row.answer1 || ''} ${row.answer || ''}`.trim();
        const optionsCombined = (row.options1 || row.options) ? (row.options1 || []).concat(row.options || []) : [];
    
        return {
            ...row,
            serialNo: `${index + 1}`, // Single row numbering
            descriptionPrimary: row.description, // English description
            descriptionSecondary: isBilingual ? row.description1 : '', // Hindi description if bilingual
            ...(type === 'mcq' ? { // Conditionally spread options if type is 'mcq'
                optionPrimary1: row.options?.[0] || '', // Check if options exist and use fallback
                optionSecondary1: isBilingual ? row.options1?.[0] || '' : '', // Only show if bilingual
                optionPrimary2: row.options?.[1] || '',
                optionSecondary2: isBilingual ? row.options1?.[1] || '' : '',
                optionPrimary3: row.options?.[2] || '',
                optionSecondary3: isBilingual ? row.options1?.[2] || '' : '',
                optionPrimary4: row.options?.[3] || '',
                optionSecondary4: isBilingual ? row.options1?.[3] || '' : '',
            } : {}),
            answerPrimary: row.answer, // English answer
            answerSecondary: isBilingual ? row.answer1 : '', // Hindi answer if bilingual
            actions: (
                <div className="d-flex">
                    <i style={{ color: "green", fontSize: "1.5rem", cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation(); // Stop event bubbling to parent elements
                            setDescription(descriptionCombined); // Set combined description
                            setOptions(optionsCombined); // Set combined options
                            setAnswer(answerCombined); // Set combined answer
                            setModalShow(false);
    
                            handleAddQuestionToQb2(row);
                            removeQuestionAtIndex(index);
                        }}
                    >
                        <MdAddTask />
                    </i>
                </div>
            ),
        };
    });
    



    const data = {
        columns,
        rows,
    };






    const handleCellClick = (event) => {
        const columnIndex = event.target.cellIndex;
        const columnField = columns[columnIndex]?.field;
        if (columnField !== 'actions') {
            const rowIndex = event.target.parentNode.rowIndex - 1; // Adjust for header row
            setRowIndex(rowIndex);
            const clickedRow = rows[rowIndex];

            console.log("rowIndex", rowIndex);
            console.log("clickedRow", clickedRow);

            // Check if English data is available, otherwise fall back to Hindi
            if (clickedRow.englishDescription) {
                setDescription(clickedRow.englishDescription);
                setOptions(clickedRow.englishOptions);
                setAnswer(clickedRow.englishAnswer);
            } else if (clickedRow.hindiDescription) {
                setDescription(clickedRow.hindiDescription);
                setOptions(clickedRow.hindiOptions);
                setAnswer(clickedRow.hindiAnswer);
            }

            handleRowClick(clickedRow);
        }
    };



    const handleRowClick = (row) => {

        console.log(row);


        setDescription(row?.description);
        setOptions(row?.options);
        setAnswer(row?.answer);
        if (bilingual) {
            setDescription2(row?.description1);
            setOptions2(row?.options1);
            setAnswer2(row?.answer1);
        }
        setSecondModalShow(true)
        setModalShow(false);

    }

    const addOption = () => {
        setOptions([...options, option]);
        setOption("");
    }

    const addOption2 = () => {
        setOptions2([...options2, option2]);
        setOption2("");
    }
    const handleSetOptionsClick = () => {
        if (optionsEditDisplay == "none") {
            setOptionsEditDisplay("inline-block");
            setEditOptionText("Done");
        }
        else {
            setOptionsEditDisplay("none");
            setEditOptionText("Edit Options");
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
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const removeOption2 = (index) => {
        const newOptions = [...options2];
        newOptions.splice(index, 1);
        setOptions2(newOptions);
    };


    const handleAdd = () => {
        toast.success("Question added successfully in the QB");

    }


    // for add question in the qb 

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

        // Find the image element
        const imageElement = tempElement.querySelector('img');

        // Check if the image element exists
        if (imageElement) {
            // Remove the image element
            imageElement.parentNode.removeChild(imageElement);
            // console.log("dsdsd", tempElement.innerHTML)
            // Update the HTML content state
            // setHtmlContent(tempElement.innerHTML);
        }
        console.log(tempElement.innerHTML);
        return tempElement.innerHTML;
    };

    const handleAddQuestionToQb2 = async (row) => {
        // console.log("hello")
        try {

            setModalShow(true);
            const bilingualData = [
                {
                    "contentText": row.description,
                    "description": row.description,
                    "answer": row.answer,
                    "languageName": language.languageName,
                    "languageId": language.id,
                    "options": row.options,
                }
            ];

            if (bilingual) {
                bilingualData.push({
                    "contentText": row.description1,
                    "description": row.description1,
                    "answer": row.answer1,
                    "languageName": language2.languageName,
                    "languageId": language2.id,
                    "options": row.options1,
                });
            }

            console.log("bilingualData", bilingualData);

            // const fetchedImageFiles = await fetchImageFile();
            const formData = new FormData();

            formData.append('Bilingual', JSON.stringify(bilingualData));
            formData.append('ClassId', classs.id);
            formData.append('CourseId', course.id);
            formData.append('SectionId', section.id);
            formData.append('SubSectionId', subSection.id);
            formData.append('DifficultyId', difficulty.id);
            formData.append('Type', type);

            setLoader(true);
            dispatch(addQuestion(formData));
            setLoader(false);

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    };

    const handleAddQuestionToQb = async (e) => {
        e.preventDefault();
        removeQuestionAtIndex(rowIndex);
        const rteValue = rteObj.getContent();
        const res = rteObj.getContent();
        let desc = res.outerHTML;
        desc = removeSpecificDivs(desc);
        let tempElement = document.createElement('div');
        tempElement.innerHTML = res.outerHTML;
        let textContent = tempElement.textContent || tempElement.innerText;

        if (!classs || !course || !section || !subSection || !desc || !difficulty || !language || !type || !answer) {
            setSpanDisplay("inline")

        }
        else {

            console.log(classs);
            console.log(course);
            console.log(section);
            console.log(subSection);
            console.log(difficulty);
            console.log(type);
            console.log(language);
            console.log(description);
            console.log(options);
            console.log(answer);

            // const fetchedImageFiles = await fetchImageFile();
            const formData = new FormData();
            // fetchedImageFiles.forEach((image) => {
            //     formData.append('Image', image);
            // });
            options?.forEach((option) => {
                formData.append("Options", option);
            });
            formData.append('ClassId', classs.id);
            formData.append('CourseId', course.id);
            formData.append('SectionId', section.id);
            formData.append('SubSectionId', subSection.id);
            formData.append('Description', removeImgTag(desc));
            formData.append('ContentText', textContent);
            formData.append('DifficultyId', difficulty.id);
            formData.append('languageId', language.id);
            formData.append('Type', type);
            formData.append('Answer', answer);

            setLoader(true);
            dispatch(addQuestion(formData));
            setLoader(false);
            setSecondModalShow(false)
            setModalShow(true)
        }
    };




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

    let rteObj;
    let rteObj2;

    let template = description;
    let template2 = description2;
    // let template = description;


    // Rich Text Editor items list
    let items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', '|', 'Undo', 'Redo'
    ];
    return (
        <React.Fragment>
            {loader2 ? (
                <Loader />

            ) : ("")
            }
            {loader ? (
                // <Loader />
                <>
                    fdfdfdf
                    < div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 10050 }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: "25%", height: "6em", border: "", backgroundColor: "white", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            <ProgressBar now={progress} label={`${progress}%`} style={{ width: '70%', height: "2rem", fontSize: "1.5rem" }} />
                        </div>
                    </div>
                </>
            ) : ("")
            }

            <Row>
                <Col>
                    <Card>
                        <CardBody style={{ width: width <= 781 && "100vw" }}  >
                            <CardTitle className="h4">Genrate Question Using Ai</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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

                                {courses && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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

                                {sections && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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

                                {subSections && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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

                                {difficultys && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                {languages && <Row className="mb-3" style={{ width: "85%", }}>
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Primary Language Name
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
                                {bilingual && languages && <Row className="mb-3" style={{ width: "85%", }}>
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Secondary Language Name
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={language2}
                                            onChange={(selectedOption) => { setLanguage2(selectedOption) }}
                                            options={languages?.languages?.result}
                                            getOptionLabel={option => option.languageName}
                                            getOptionValue={option => option.id.toString()}
                                            classNamePrefix="select2-selection"
                                        />
                                        {!language2 && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>

                                </Row>}

                                {!bilingual &&
                                    <Row className="mb-3">
                                        <div className="mt-4 d-flex justify-content-between">
                                            <button type="button" className="text-info" style={{ fontSize: "2rem", background: "none", border: "none", fontWeight: "bolder", }} onClick={() => setBilingual(true)}><i className="mdi mdi-plus"></i></button>
                                        </div>
                                    </Row>
                                }



                                <Row className="mb-3" style={{ width: window.innerWidth <= 998 ? '95%' : '85%' }}>
                                    <label htmlFor="question-type" className="col-md-2 col-form-label">
                                        Question Type
                                    </label>
                                    <div className="col-md-10">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="type-short"
                                                value="short"
                                                checked={type === 'short'}
                                                onClick={handleTypeChange}
                                            />
                                            <label className="form-check-label" htmlFor="type-short">
                                                Short
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline mb-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="type-mcq"
                                                value="mcq"
                                                checked={type === 'mcq'}
                                                onClick={handleTypeChange}
                                            />
                                            <label className="form-check-label" htmlFor="type-mcq">
                                                MCQ
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="type-true-false"
                                                value="true false"
                                                checked={type === 'true false'}
                                                onClick={handleTypeChange}
                                            />
                                            <label className="form-check-label" htmlFor="type-true-false">
                                                True False
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="type-essay"
                                                value="essay"
                                                checked={type === 'essay'}
                                                onClick={handleTypeChange}
                                            />
                                            <label className="form-check-label" htmlFor="type-essay">
                                                Essay
                                            </label>
                                        </div>
                                    </div>
                                </Row>





                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Get Question</button>
                                    </div>
                                </Row>
                            </form>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Modal for list the question in the table  */}
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="custom-modal"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ai Genrated Questions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "80vh", overflowY: "scroll", maxWidth: "70vw" }}>
                    <div id="MBDTableDiv" >
                        <div >
                            <MDBDataTable
                                className="table-row-hover"
                                responsive
                                bordered
                                data={data}
                                style={{ cursor: 'pointer' }}
                                noBottomColumns
                                onClick={handleCellClick}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setModalShow(false)} className="waves-effect waves-light">Close</Button>{" "}

                </Modal.Footer>
            </Modal>

            {/* Modal for the view seprate question  */}
            <Modal
                show={secondModalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Question
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="" style={{ height: "80vh", overflowY: "scroll", overflowX: "hidden" }}>
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

                        <Row className="mb-3">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                            >
                                Question Description
                            </label>
                            <div className="col-md-10">
                                <div className="card">
                                    <RichTextEditorComponent id="defaultRTE" ref={(scope) => { rteObj = scope; }} valueTemplate={template} toolbarSettings={toolbarSettings}>
                                        <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
                                    </RichTextEditorComponent>

                                </div>
                            </div>
                        </Row>
                        {type === "short" && <Row className="mb-3">
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
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)} />
                                {!answer && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                            </div>
                        </Row>}
                        {type === "mcq" &&
                            <>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        {/* Answer */}
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control col-md-4 mb-2'
                                            onChange={(e) => { setOption(e.target.value) }}
                                            placeholder="write a option"
                                            value={option} />

                                        <button type="button" className="btn btn-primary w-md me-2 " onClick={addOption}>Add Option</button>
                                        <button type='button' className="btn btn-primary me-2" onClick={handleSetOptionsClick} >{editOptionText}</button>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Select Answer
                                    </label>
                                    <div className="col-md-10">
                                        {options?.map((o, i) => (
                                            <>
                                                <div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input mt-1"
                                                        type="radio"
                                                        name="options"
                                                        id={i}
                                                        value={o}
                                                        checked={answer === o}
                                                        onChange={(e) => setAnswer(e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="exampleRadios1"
                                                    >
                                                        {o}
                                                    </label>
                                                    <button type='button' className="text-danger" onClick={() => removeOption(i)} style={{ fontSize: "1rem", background: "none", border: "none", fontWeight: "bolder", display: `${optionsEditDisplay}` }}> <i className="mdi mdi-delete "></i></button>

                                                </div>
                                            </>
                                        ))}
                                        {!answer && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                            </>
                        }
                        {type === "true false" && <Row className="mb-3">
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
                                            checked={answer.toLowerCase() === 'true'}
                                            onChange={(e) => setAnswer(e.target.value)}
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
                                            checked={answer.toLowerCase() === 'false'}
                                            onChange={(e) => setAnswer(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                            False
                                        </label>
                                    </div>
                                </div>
                                {!answer && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                            </div>
                        </Row>}

                        {bilingual && <div>
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

                                    <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                    <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Select Answer
                                        </label>
                                        <div className="col-md-10">
                                            {options2.map((o, i) => (
                                                <>
                                                    {/* <p>{o}</p> */}
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input mt-1"
                                                            type="radio"
                                                            name="options"
                                                            id={i}
                                                            value={o}
                                                            checked={answer2 === o}
                                                            onChange={(e) => setAnswer2(e.target.value)}
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
                        {!bilingual &&
                            <Row className="mb-3">
                                <div className="mt-4 d-flex justify-content-between">
                                    <button type="button" className="text-info" style={{ fontSize: "2rem", background: "none", border: "none", fontWeight: "bolder", }} onClick={() => setBilingual(true)}><i className="mdi mdi-plus"></i></button>
                                </div>
                            </Row>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => { setSecondModalShow(false); setModalShow(true) }} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="success" onClick={handleAddQuestionToQb} className="waves-effect waves-light">Add to the Bank</Button>{" "}
                    {/* <Button type="button" color="danger" onClick={() => { setDeleteModalShow(true); setModalShow(false) }} className="waves-effect waves-light">Delete</Button>{" "} */}

                </Modal.Footer>
            </Modal>

            {/* Modal for confirmation before delete  */}
            <Modal
                show={deleteModalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <h4>
                        Are you sure want to remove this question.
                    </h4>


                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => { setDeleteModalShow(false); setModalShow(true) }} className="waves-effect waves-light">No</Button>{" "}
                    <Button type="button" color="danger" className="waves-effect waves-light">Yes</Button>{" "}

                </Modal.Footer>
            </Modal>

        </React.Fragment >
    )
}

export default connect(null, { setBreadcrumbItems })(CreateQuestionUsingAi);
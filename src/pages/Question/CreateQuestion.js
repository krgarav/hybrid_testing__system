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
import { fetchDifficulty, fetchLanguage, setBreadcrumbItems } from "../../store/actions";
import { addClass, fetchClass } from "store/class/action";
import { useSelector } from "react-redux";
import classesReducer from '../../store/class/reducer';
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
import { toast } from "react-toastify";

const CreateQuestion = (props) => {

    const { width } = useWindowSize();
    document.title = "Question Bank | Create Question";



    const breadcrumbItems = [
        { title: "Question", link: "#" },
        { title: "Create Question", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Create Question', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [classs, setClasss] = useState(null);
    const [selectedclasss, setSelectedClasss] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('short');
    const [course, setCourse] = useState(null);
    const [section, setSection] = useState(null);
    const [subSection, setSubSection] = useState(null);
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [answer, setAnswer] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [difficulty, setDifficulty] = useState(null);
    const [language, setLanguage] = useState(null);
    const [language2, setLanguage2] = useState(null);
    const [text, setText] = useState("");
    const [option, setOption] = useState("");
    const [option2, setOption2] = useState("");
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [editOptionText, setEditOptionText] = useState("Edit Options");
    const [editOptionText2, setEditOptionText2] = useState("Edit Options");
    const [optionsEditDisplay, setOptionsEditDisplay] = useState("none");
    const [optionsEditDisplay2, setOptionsEditDisplay2] = useState("none");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [auth, setAuth] = useAuth();
    const [loader, setLoader] = useState(false);
    const [another, setAnother] = useState(false);
    const [biligual, setBiligual] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classesReducer)
    const difficultys = useSelector(state => state.difficultysReducer)
    const languages = useSelector(state => state.languagesReducer);
    const result = useSelector(state => state.questionsReducer);

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
                setLoader(true);
                let id = classs.id;
                let result = await fetchAllCoursesByClass(id);
                setCourses(result);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong");
            } finally {
                setLoader(false);
            }


        }
    }
    useEffect(() => {
        fetchCourses();
    }, [classs]);

    const fetchSections = async () => {
        if (course) {
            try {
                setLoader(true);
                let id = course.id;
                let result = await fetchAllSectionsByCourse([id]);
                setSections(result);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong");
            } finally {
                setLoader(false);
            }

        }
    }
    useEffect(() => {
        fetchSections();
    }, [course]);

    const fetchSubSections = async () => {
        if (section) {
            try {
                setLoader(true);
                let id = section.id;
                let result = await fetchAllSubSectionsBySection([id]);
                setSubSections(result);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "something went wrong");
            } finally {
                setLoader(false);
            }

        }
    }
    useEffect(() => {
        fetchSubSections();
    }, [section]);


    const fetchImageFile = async (obj) => {

        const tempDiv = obj.getContent();
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("hello")
        const rteValue = rteObj.getContent();
        const res1 = rteObj.getContent();
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
        if (!classs || !course || !section || !subSection || !desc1 || !difficulty || !language || !type || !answer) {
            setSpanDisplay("inline")

        }
        else {

            const fetchedImageFiles1 = await fetchImageFile(rteObj);
            let fetchedImageFiles2;

            if (biligual) {
                fetchedImageFiles2 = await fetchImageFile(rteObj2);
            }

            const bilingualData = [
                {
                    "contentText": textContent1,
                    "description": desc1,
                    "answer": answer,
                    "languageName": language.languageName,
                    "languageId": language.id,
                    "options": options,
                }
            ];

            if (biligual) {
                bilingualData.push({
                    "contentText": textContent2,
                    "description": desc2,
                    "answer": answer2,
                    "languageName": language2.languageName,
                    "languageId": language2.id,
                    "options": options2,
                });
            }

            const formData = new FormData();
            fetchedImageFiles1.forEach((image) => {
                formData.append('Image1', image);
            });

            if (biligual) {
                fetchedImageFiles2.forEach((image) => {
                    formData.append('Image2', image);
                });
            }

            formData.append('Bilingual', JSON.stringify(bilingualData));
            formData.append('ClassId', classs.id);
            formData.append('Class', JSON.stringify(classs))
            formData.append('CourseId', course.id);
            formData.append('Course', JSON.stringify(course));
            formData.append('SectionId', section.id);
            formData.append('Section', JSON.stringify(section));
            formData.append('SubSectionId', subSection.id);
            formData.append('SubSection', JSON.stringify(subSection));

            formData.append('DifficultyId', difficulty.id);
            formData.append('Difficulty', JSON.stringify(difficulty));
            formData.append('Type', type);

            setLoader(true);
            dispatch(addQuestion(formData));



        }
    };

    useEffect(() => {
        if (result.success == true) {
            if (!another) {
                navigate("/all-questions");
            }
            setAnother(false);
            setClasss(null);
            setCourse(null);
            setSection(null);
            setSubSection(null);
            setDifficulty(null);
            setLanguage(null);
            setType("short");
            setAnswer("")
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
    const handleSelectDifficulty = selectedOption => {
        setDifficulty(selectedOption);
    };
    const handleSelectLanguage = selectedOption => {
        setLanguage(selectedOption);
    };




    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };


    const handleTypeChange = (event) => {
        setType(event.target.value);
        setAnswer("");
    };


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
    // set the value to Rich Text Editor
    // let template = `<div style="display:block;"><p style="margin-right:10px"></p></div>`;
    let template = "";

    // Rich Text Editor items list
    let items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', '|', 'Undo', 'Redo'
    ];


    const htmlString = '<div class="e-rte-content" id="defaultRTErte-view" style="height: auto; margin-top: 0px; border-bottom: none;"><div class="e-content e-lib e-keyboard" id="defaultRTE_rte-edit-view" contenteditable="true" tabindex="0"><div style="display:block;"><p> </p><p style="margin-right: 10px; text-align: center;"><span style="font-size: 14pt;"><span style="font-family: &quot;Times New Roman&quot;, Times, serif;"><strong><span style="text-decoration: underline;"><span style="text-decoration: line-through;">dfkfdlfkdlkfdlfkdkfjdkf</span></span> fkdjfkdfjkdjfkdjfkoeiroeiroeiorieorioeiroeivm,cvmc,vmc,vmc,mv,cmv,c</strong></span></span></p><p style="margin-right:10px"> </p><ul><li style="margin-right:10px"><span style="font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, &quot;sans-serif&quot;, -apple-system, BlinkMacSystemFont; background-color: unset; text-align: inherit;">dfkfdlfkdlkfdlfkdkfjdkf fkdjfkdfjkdjfkdjfkoeiroeiroeiorieorioeiroeivm,cvmc,vmc,vmc,mv,cmv,ewewew</span></li></ul><span style="font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, &quot;sans-serif&quot;, -apple-system, BlinkMacSystemFont;">dfkfdlfkdlkfdlfkdkfjdkf fkdjfkdfjkdjfkdjfkoeiroeiroeiorieorioeiroeivm,cvmc,vmc,vmc,mv,cmv</span></div><ul><li style="display:block;"><span style="font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, &quot;sans-serif&quot;, -apple-system, BlinkMacSystemFont;">dfkfdlfkdlkfdlfkdkfjdkf fkdjfkdfjkdjfkdjfkoeiroeiroeiorieorioeiroeivm,cvmc,vmc,vmc,mv,cmv,c klklk</span><p style="margin-right: 10px; cursor: auto;"><img src="blob:http://localhost:3000/5a96c08a-fe90-4ee0-9d74-83bb7376a00e" class="e-rte-image e-imginline" alt="Screenshot (648).png" width="126" height="auto" style="min-width: 20px; min-height: 0px;">  </p><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"><ul><li><span style="font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, &quot;sans-serif&quot;, -apple-system, BlinkMacSystemFont;">dfkfdlfkdlkfdlfkdkfjdkf fkdjfkdfjkdjfkdjfkoeiroeiroeiorieorioeiroeivm,cvmc,vmc,vmc,mv,cmv,c</span><span style="font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, &quot;sans-serif&quot;, -apple-system, BlinkMacSystemFont; background-color: unset; text-align: inherit;"> </span></li></ul></li></ul></li></ul></li></ul></div></div>';

    const htmlContent = { __html: htmlString };

    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}
            <Row>
                <Col>
                    <Card>
                        <CardBody style={{ width: width <= 781 && "100vw" }}  >
                            <CardTitle className="h4">Create Question</CardTitle>
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


                                <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                                onClick={handleTypeChange}
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
                                                onClick={handleTypeChange}
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
                                                onClick={handleTypeChange}
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
                                                onClick={handleTypeChange}
                                            />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                Essay
                                            </label>
                                        </div>
                                    </div>
                                </Row>

                                {languages && <Row className="mb-3" style={{ width: "85%", }}>
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
                                            menuPortalTarget={document.body}  // Ensure the dropdown is rendered in the body
                                            styles={{
                                                menuPortal: (base) => ({
                                                    ...base,
                                                    zIndex: 9999,  // Set a high z-index to appear above other elements
                                                }),
                                            }}

                                        />
                                        {!language && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>

                                </Row>}
                                <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                            {/* {!rteObj.getContent() && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>} */}
                                        </div>
                                    </div>
                                </Row>
                                {type === "short" && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                                    onChange={(e) => { setOption(e.target.value) }}
                                                    placeholder="write a option"
                                                    value={option} />

                                                <button type="button" className="btn btn-primary w-md me-2 " onClick={addOption}>Add Option</button>
                                                <button type='button' className="btn btn-primary me-2" onClick={handleSetOptionsClick} >{editOptionText}</button>
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
                                                {options.map((o, i) => (
                                                    <>
                                                        {/* <p>{o}</p> */}
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
                                {type === "true false" && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                                    checked={answer === 'true'}
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
                                                    checked={answer === 'false'}
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    false
                                                </label>
                                            </div>
                                        </div>
                                        {!answer && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>}

                                {biligual && <div>
                                    <Row className="mb-3" style={{ width: "85%", }}>
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
                                    <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Question Description
                                        </label>
                                        <div className="col-md-10">
                                            <div className="card">
                                                <RichTextEditorComponent id="defaultRTE" ref={(scope) => { rteObj2 = scope; }} valueTemplate={template} toolbarSettings={toolbarSettings}>
                                                    <Inject services={[HtmlEditor, Toolbar, Link, Image, QuickToolbar]} />
                                                </RichTextEditorComponent>
                                                {/* {!rteObj.getContent() && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>} */}
                                            </div>
                                        </div>
                                    </Row>
                                    {type === "short" && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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
                                    {type === "true false" && <Row className="mb-3" style={{ width: width <= 998 ? "95%" : "85%" }}>
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

                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Create</button>
                                        <button type="submit" className="btn btn-primary w-md ms-2 me-2" onClick={() => setAnother(true)}>Create and add more</button>
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



        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(CreateQuestion);
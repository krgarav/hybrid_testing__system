import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Label, Form, Alert, Input, FormFeedback } from 'reactstrap';
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-dark.png";
import ios from "../../assets/images/ios.png";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from 'components/Common/withRouter';

// actions
import { addUser, fetchLanguage, loginUser, socialLogin } from "../../store/actions";
import { toast } from 'react-toastify';
import { fetchOtp, registerStudent, verifyOtp } from 'helpers/user_helper';
import Select from "react-select"
import axios from 'axios';
import { getAllMainExamPapers, getMainExamPapersByLanguage } from 'helpers/center_helper';

const Login = props => {
    document.title = "Student Register| Register for the exam";

    const dispatch = useDispatch();




    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [grandFatherName, setGrandFatherName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [position, setPosition] = useState("");
    const [verify, setVerify] = useState(false);
    const [otpFeildDisplay, setOtpFeildDisplay] = useState(false);
    const [otpButtonDisplay, setOtpButtonDisplay] = useState(true);
    const [allUserTypes, setAllUserTypes] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [allExams, setAllExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [language, setLanguage] = useState(null);
    const navigate = useNavigate();

    const languages = useSelector(state => state.languagesReducer);
    useEffect(() => {
        if (languages?.languages?.length == 0) {
            dispatch(fetchLanguage());
        }

    })

    const sendOtp = async () => {
        setOtpFeildDisplay(true);
        if (!email) {
            toast.error("Enter email id");
        }
        else {
            const result = await fetchOtp({ email });
            if (result.success) {
                toast.success(result.message);
            }
            else {
                toast.error(result.message);
            }
        }
    }

    const handleOtpChange = async (e) => {
        setOtp(e.target.value);
        let otp = e.target.value;
        let emailId = email;
        // for testing i do it ***************************
        // setVerify(true);
        // setOtpButtonDisplay(false);
        // setIsReadOnly(true)
        // for testing i do it *******************************
        const result = await verifyOtp({ otp, emailId });
        if (result.success) {
            toast.success(result.message);
            setVerify(true);
            setOtpButtonDisplay(false);
            setIsReadOnly(true)
        }
        else {
            // toast.error(result.message);
        }
    }



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("submit")
    //     if (!name || !email || !phoneNumber || !fatherName || !grandFatherName || !language || !selectedExam || !password || !confirmPassword) {
    //         setSpanDisplay("inline")

    //     }
    //     else {
    //         if (password !== confirmPassword) {
    //             toast.error("Pasword and confirm password did not match");
    //         }
    //         else {
    //             let mainExamId = selectedExam.id;
    //             let languageId = language.id;
    //             const result = await registerStudent({ name, email, phoneNumber, fatherName, grandFatherName, languageId, mainExamId, password, confirmPassword })
    //             if (result?.success) {
    //                 toast.success(result?.message);

    //             }
    //             else {
    //                 toast.error(result?.message);
    //             }
    //         }
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        if (!name || !email || !phoneNumber || !fatherName || !grandFatherName || !language || !selectedExam || !password || !confirmPassword) {
            setSpanDisplay("inline");
        }
        else {
            if (password !== confirmPassword) {
                toast.error("Pasword and confirm password did not match");
            }
            else if (password?.length < 8) {
                toast.error("Password must contain at least 8 letters or numbers");
            }
            else if (!/^\d{10}$|^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber)) {
                toast.error("Invalid phone number format");
            }
            else {
                let mainExamId = selectedExam.id;
                let languageId = language.id;
                const result = await registerStudent({ name, email, phoneNumber, fatherName, grandFatherName, languageId, mainExamId, password, confirmPassword })
                if (result?.success) {
                    toast.success(result?.message);
                    navigate("/student-login")
                }
                else {
                    toast.error(result?.message);
                }
            }
        }
    };



    const handleSelectType = selectedValue => {
        // console.log(selectedValue);
        setType(selectedValue);
    }

    const fetchAllExams = async (id) => {
        try {
            const result = await getMainExamPapersByLanguage(id);
            if (result?.success) {
                setAllExams(result?.result);
            }
            else {
                console.log(result?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }



    const handleSelectExam = selectedOption => {
        setSelectedExam(selectedOption);
    };
    const handleSelectLanguage = selectedOption => {
        setLanguage(selectedOption);
        fetchAllExams(selectedOption.id);
    };




    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <CardBody className="pt-0">

                                    <h3 className="text-center mt-5 mb-4">
                                        <Link to="/" className="d-block auth-logo">
                                            <img src={ios} alt="" height="30" className="auth-logo-dark" />
                                            {/* <img src={logoLight} alt="" height="30" className="auth-logo-light" /> */}
                                        </Link>
                                    </h3>

                                    <div className="p-3">
                                        <h4 className="text-muted font-size-18 mb-1 text-center">Welcome </h4>
                                        <p className="text-muted text-center">Register for the Exam.</p>
                                        <form onSubmit={handleSubmit}>

                                            {!verify &&
                                                <>
                                                    <div className="mb-3">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="Enter email"
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        {!name && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>
                                                    <div className="mb-3">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Enter email"
                                                            type="text"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        {!email && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>


                                                    {otpButtonDisplay && <Row className="mb-3">
                                                        <div className="mt-4">
                                                            <button type="button" className="btn btn-primary w-md" onClick={sendOtp}>Send Otp</button>
                                                        </div>
                                                    </Row>}


                                                    {otpFeildDisplay &&
                                                        <>
                                                            <div className="mb-3">

                                                                <Label htmlFor="otp">Otp</Label>
                                                                <Input
                                                                    name="otp"
                                                                    className="form-control"
                                                                    placeholder="Enter otp"
                                                                    type="text"
                                                                    value={otp}
                                                                    onChange={handleOtpChange}
                                                                    readOnly={isReadOnly}
                                                                />
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            }
                                            {verify &&
                                                <>

                                                    <div className="mb-3">

                                                        <Label htmlFor="language">Language</Label>
                                                        <Select

                                                            value={language}
                                                            onChange={handleSelectLanguage}
                                                            options={languages?.languages?.result}
                                                            getOptionLabel={option => option.languageName}
                                                            getOptionValue={option => option.id.toString()}
                                                            classNamePrefix="select2-selection"
                                                            placeholder="Select an language"
                                                        />

                                                        {!language && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>
                                                    <div className="mb-3">

                                                        <Label htmlFor="language">Exam</Label>
                                                        <Select

                                                            value={selectedExam}
                                                            onChange={handleSelectExam}
                                                            options={allExams}
                                                            getOptionLabel={option => option.examName}
                                                            getOptionValue={option => option.id.toString()}
                                                            classNamePrefix="select2-selection"
                                                            placeholder="Select an exam"
                                                        />

                                                        {!selectedExam && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>
                                                    <div className="mb-3">

                                                        <Label htmlFor="number">Phone Number</Label>
                                                        <Input
                                                            name="number"
                                                            className="form-control"
                                                            placeholder="Enter Phone Number"
                                                            type="number"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                        />
                                                        {!phoneNumber && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>

                                                    <div className="mb-3">

                                                        <Label htmlFor="fatherName">Father Name</Label>
                                                        <Input
                                                            name="fatherName"
                                                            className="form-control"
                                                            placeholder="Enter Father Name"
                                                            type="text"
                                                            value={fatherName}
                                                            onChange={(e) => setFatherName(e.target.value)}
                                                        />
                                                        {!fatherName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>

                                                    <div className="mb-3">

                                                        <Label htmlFor="grandFatherName">Grand Father Name</Label>
                                                        <Input
                                                            name="grandFatherName"
                                                            className="form-control"
                                                            placeholder="Enter Grand Father Name"
                                                            type="text"
                                                            value={grandFatherName}
                                                            onChange={(e) => setGrandFatherName(e.target.value)} />
                                                        {!grandFatherName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>

                                                    <div className="mb-3">

                                                        <Label htmlFor="password">Password</Label>
                                                        <Input
                                                            name="password"
                                                            className="form-control"
                                                            placeholder="Enter Password"
                                                            type="text"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)} />
                                                        {!password && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>

                                                    <div className="mb-3">

                                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                                        <Input
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            placeholder="Enter Confirm Password"
                                                            type="text"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                                        {!confirmPassword && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                                    </div>

                                                    <Row className="mb-3">
                                                        <div className="mt-4">
                                                            <button type="submit" className="btn btn-primary w-md">Submit</button>
                                                        </div>
                                                    </Row>
                                                </>}
                                        </form>

                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                {/* <p>Don't have an account ? <Link to="/register" className="text-primary"> Signup Now </Link></p> */}
                                © {new Date().getFullYear()} IOS <span className="d-none d-sm-inline-block"> - Created By OMR India Outsources.</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >

        </React.Fragment >
    )
}

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
};


// <Form
// className="form-horizontal mt-4"
// onSubmit={(e) => {
//   e.preventDefault();
//   validation.handleSubmit();
//   return false;
// }}
// >
// {error ? <Alert color="danger">{error}</Alert> : null}
// <div className="mb-3">
//   <Label htmlFor="email">Email</Label>
//   <Input
//     name="email"
//     className="form-control"
//     placeholder="Enter email"
//     type="email"
//     onChange={validation.handleChange}
//     onBlur={validation.handleBlur}
//     value={validation.values.email || ""}
//     invalid={
//       validation.touched.email && validation.errors.email ? true : false
//     }
//   />
//   {validation.touched.email && validation.errors.email ? (
//     <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
//   ) : null}
// </div>
// <div className="mb-3">
//   <Label htmlFor="userpassword">Password</Label>
//   <Input
//     name="password"
//     value={validation.values.password || ""}
//     type="password"
//     placeholder="Enter Password"
//     onChange={validation.handleChange}
//     onBlur={validation.handleBlur}
//     invalid={
//       validation.touched.password && validation.errors.password ? true : false
//     }
//   />
//   {validation.touched.password && validation.errors.password ? (
//     <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//   ) : null}
// </div>
// <Row className="mb-3 mt-4">
//   <div className="col-6">
//     <div className="form-check">
//       <input type="checkbox" className="form-check-input" id="customControlInline" />
//       <label className="form-check-label" htmlFor="customControlInline">Remember me
//       </label>
//     </div>
//   </div>
//   <div className="col-6 text-end">
//     <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
//   </div>
// </Row>
// <Row className="form-group mb-0">
//   <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
// <div className="col-12 mt-4 d-flex justify-content-center">
//     <Link
//       to="#"
//       className="social-list-item bg-danger text-white border-danger"
//       onClick={e => {
//         e.preventDefault();
//         socialResponse("google");
//       }}
//     >
//       <i className="mdi mdi-google" />
//     </Link>
//   </div>
// </Row>
// </Form> 

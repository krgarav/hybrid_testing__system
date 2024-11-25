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
import { CreateOrganization } from 'helpers/organization_helper';

const RegisterOrganization = props => {
    document.title = "Organization Register| Register for the HTS application";

    const dispatch = useDispatch();




    const [orgName, setOrgName] = useState("");
    const [orgCode, setOrgCode] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [logo, setLogo] = useState("");
    const [otp, setOtp] = useState("");
    const [verify, setVerify] = useState(false);
    const [otpFeildDisplay, setOtpFeildDisplay] = useState(false);
    const [otpButtonDisplay, setOtpButtonDisplay] = useState(true);
    const [allUserTypes, setAllUserTypes] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [allExams, setAllExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [language, setLanguage] = useState(null);
    const [sentOtp, setSentOtp] = useState(false);
    const [emailReadOnly, setEmailReadOnly] = useState(false);
    const navigate = useNavigate();

    const languages = useSelector(state => state.languagesReducer);
    useEffect(() => {
        if (languages?.languages?.length == 0) {
            dispatch(fetchLanguage());
        }

    })










    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        if (!username || !email || !phoneNumber || !password || !confirmPassword) {
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
                const result = await CreateOrganization({ username, email, phoneNumber, password, confirmPassword })
                if (result?.success) {
                    toast.success(result?.message);
                    navigate("/login")
                }
                else {
                    toast.error(result?.message);
                }
            }
        }
    };

    const sendOtp = async () => {
        setSentOtp(true);
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
            setEmailReadOnly(true);
        }
        else {
            console.log()
            if (otp.length >= 6) {
                toast.error(result.message);
            }
        }
    }









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
                                        </Link>
                                    </h3>

                                    <div className="p-3">
                                        <h4 className="text-muted font-size-18 mb-1 text-center">Welcome </h4>
                                        <p className="text-muted text-center">Register with our application</p>
                                        <form onSubmit={handleSubmit}>

                                            <div className="mb-3">

                                                <Label htmlFor="number">Username</Label>
                                                <Input
                                                    name="number"
                                                    className="form-control"
                                                    placeholder="Enter Username"
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                {!username && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
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
                                                    readOnly={emailReadOnly}
                                                />
                                                {!email && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
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
                                            {sentOtp &&
                                                !verify &&
                                                < div className="mb-3">


                                                    <Label htmlFor="confirmPassword">Enter Otp</Label>
                                                    <Input
                                                        name="otp"
                                                        className="form-control"
                                                        placeholder="Enter Otp"
                                                        type="text"
                                                        value={otp}
                                                        onChange={handleOtpChange} />
                                                </div>
                                            }

                                            <Row className="mb-3">
                                                <div className="mt-4">
                                                    {!verify ?
                                                        <button type="button" className="btn btn-primary w-md" onClick={sendOtp}>Send Otp</button>
                                                        :
                                                        <button type="submit" className="btn btn-primary w-md">Submit</button>
                                                    }
                                                </div>
                                            </Row>

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

export default withRouter(RegisterOrganization);

RegisterOrganization.propTypes = {
    history: PropTypes.object,
};



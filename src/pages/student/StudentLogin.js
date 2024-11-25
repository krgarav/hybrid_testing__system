import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Label, Form, Alert, Input, FormFeedback } from 'reactstrap';
import ios from "../../assets/images/ios.png";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Formik validation
import withRouter from 'components/Common/withRouter';
import { loginStudent } from 'store/actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from 'context/authContext';
import { url_online } from 'helpers/url_helper';
import Loader from 'components/Loader/Loader';



const StudentLogin = props => {
    document.title = "Login | Student";
    // const auth 

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const { data } = await axios.post(url_online + "/StudentLogin", { email, password });
            setLoader(false);
            console.log(" fdkjfkdjfkdjfkdj", data);
            if (data?.success) {
                localStorage.setItem("student", JSON.stringify(data));
                // setStudent(data);
                toast.success(data.message);
                navigate("/proctring-setup")
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.message || "something went wrong");
            console.log(error?.response?.data);
        }

    }

    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}
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
                                        <h4 className="text-muted font-size-18 mb-1 text-center">Welcome, login for start test</h4>
                                        {/* <p className="text-muted text-center">Sign in to continue to IOS.</p> */}
                                        <Form
                                            className="form-horizontal mt-4"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-3">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email || ""}

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <Label htmlFor="userpassword">Password</Label>
                                                <Input
                                                    name="password"
                                                    value={password || ""}
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />

                                            </div>
                                            <Row className="mb-3 mt-4">
                                                <div className="col-6">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="customControlInline" />
                                                        <label className="form-check-label" htmlFor="customControlInline">Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                                                </div>
                                            </Row>
                                            <Row className="form-group mb-0">
                                                {/* <Link to="/login" className="text-muted"><i className="mdi mdi-lock"></i> Admin Login</Link> */}
                                            </Row>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                © {new Date().getFullYear()} IOS <span className="d-none d-sm-inline-block"> - Created By OMR India Outsources.</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    )
}

export default withRouter(StudentLogin);

StudentLogin.propTypes = {
    history: PropTypes.object,
};

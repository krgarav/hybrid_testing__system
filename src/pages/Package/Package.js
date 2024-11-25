import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Card,
    CardBody,

} from "reactstrap";

import withRouter from "components/Common/withRouter";


import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import { initiateCheckoutPayment } from "helpers/payment_helper";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BronzePlan } from "components/Package/BronzePlan";
import gold from "../../assets/images/golden.png"
import bronze from "../../assets/images/bronze.png"
import silver from "../../assets/images/silver.png"
import { GoldPlan } from "components/Package/GoldPackage";
import { SilverPlan } from "components/Package/SilverPackage";
import { Modal } from "react-bootstrap";
import Select from "react-select";

const stripePromise = loadStripe('pk_test_51Py89eP54OU5rCubDXmgEnqHwnbaW3zvdU9klN8JosgaBuek5hIIzimaQ7RiKOo9ZhFJzm9U4V0EjPXz2Eb72TVz001fnu5hzj');
const Package = () => {

    //meta title
    document.title = "Packages | IOS - HTS";


    const [loader, setLoader] = useState(false);

    const pack = JSON.parse(localStorage.getItem("authUser"))?.packageName;






    const [secondModal, setSecondModal] = useState(false);
    const [firstModal, setFirstModal] = useState(false)
    const [months, setMonths] = useState(null);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [packageType, setPackageType] = useState("");
    const [currentPack, setCurrentPackage] = useState(null);


    useEffect(() => {
        let a = JSON.parse(localStorage.getItem("authUser"))?.packageName;


        if (a.length <= 0) {
            setFirstModal(true);
        }
        setCurrentPackage(a);
    }, []);

    const monthsData = [
        { id: 1, name: "1 Month" },
        { id: 3, name: "3 Month" },
        { id: 6, name: "6 Month" },
        { id: 12, name: "12 Month" },
    ]



    const makePayment = async () => {
        try {
            const currency = "inr"
            setLoader(true)
            let d = null;
            console.log(packageType)
            console.log(packageType == "silver")

            if (packageType == 'gold') {


                d = {
                    amount: 250,
                    currency,
                    items: packageType,
                    quantity: months.id
                }
            }
            else if (packageType == "bronze") {
                d = {
                    amount: 25,
                    currency,
                    items: packageType,
                    quantity: months.id
                }
            }
            else if (packageType == "silver") {
                console.log("packageType")
                d = {
                    amount: 0,
                    currency,
                    items: packageType,
                    quantity: months.id
                }
            }
            console.log(d)
            // this function call backend post api 
            const data = await initiateCheckoutPayment(d);
            if (data?.sessionUrl) {
                // Redirect the user to Stripe Checkout
                window.location.href = data.sessionUrl;
            } else {
                toast.error("Failed to retrieve the payment URL.");
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred while making the payment.")
        } finally {
            setLoader(false);
        }
    }


    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}
            <div className="page-content p-0">
                <Container fluid>



                    <h4 className="card-title mb-4">Packages</h4>

                    <Card>
                        <CardBody>
                            <Row style={{ height: "" }}>
                                <h1>My Package</h1>
                                <div className="">
                                    {
                                        pack == "bronze" &&
                                        <>
                                            <div className="m-5 " style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem ", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                                                <img src={bronze} alt="" height="30" />
                                                <h4 className="text-center">Bronze</h4>
                                                <div className="d-flex mt-4">
                                                    <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$50.00</p>
                                                    <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                                                </div>
                                                <div className="d-flex align-items-end">
                                                    <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                                                    <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>25.00</h1>
                                                    <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                                                </div>

                                                <div className="d-flex justify-content-center mt-3" >

                                                    {/* <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => makePayment("bronze")}>Choose Plan</button> */}

                                                </div>

                                                <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                                                <div className="mt-4">
                                                    <ul>
                                                        <li>Create Your Own Class, Course, Section, Subcection</li>
                                                        <li>Define Your Own Difficulty</li>
                                                        <li>Define Your Own Language</li>
                                                        <li>Import Question Using Excel</li>
                                                        <li>Genrate Question Paper</li>
                                                        <li>Download Question Paper in Docx</li>
                                                        <li>Question Bank Size of Maximum 3000</li>
                                                        <li>Genration of Question Bank Using Ai, Extra Charges Per Prompt ($0.08)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        pack == "silver" &&
                                        <>
                                            <div className="m-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                                                <img src={silver} alt="" height="30" />
                                                <h4 className="text-center">Silver</h4>
                                                <div className="d-flex mt-4">
                                                    <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$100.00</p>
                                                    <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>100%off</p>
                                                </div>
                                                <div className="d-flex align-items-end">
                                                    <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                                                    <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>0.00</h1>
                                                    <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                                                </div>
                                                <div className="d-flex justify-content-center mt-3" >

                                                    {/* <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => makePayment("sliver")}>Choose Plan</button> */}

                                                </div>
                                                <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                                                <div className="mt-4">
                                                    <ul>
                                                        <li>Feature Including Bronze Pack</li>
                                                        <li>Genrate Exam Online</li>
                                                        <li>Import Candidate Data</li>
                                                        <li>Candidate Register and Do Assesment</li>
                                                        <li>Start / Stop Examination</li>
                                                        <li>Result Genration</li>
                                                        <li>Maximum Assesment Limit 500</li>
                                                        <li>Data Analytics Using Ai, Extra Charges ($20)</li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </>
                                    }
                                    {
                                        pack == "gold" &&
                                        <>
                                            <div className="m-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                                                <img src={gold} alt="" height="30" />
                                                <h4 className="text-center">Gold</h4>
                                                <div className="d-flex mt-4">
                                                    <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$500.00</p>
                                                    <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                                                </div>
                                                <div className="d-flex align-items-end">
                                                    <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                                                    <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>250.00</h1>
                                                    <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                                                </div>
                                                <div className="d-flex justify-content-center mt-3" >

                                                    {/* <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => makePayment("gold")}>Choose Plan</button> */}

                                                </div>
                                                <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                                                <div className="mt-4">
                                                    <ul>
                                                        <li>All Feature of the Bronze and Silver Package.</li>
                                                        <li>Ai Based Proctoring Tool for the Remote Examination, Per Assesment Extra Charges ($0.25)</li>

                                                    </ul>
                                                </div>

                                            </div>
                                        </>
                                    }
                                </div>
                            </Row>
                            <Row>
                                <h1>All Packages</h1>

                                <div className="d-flex mt-3 justify-content-center flex-wrap gap-3">

                                    <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem ", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                                        <img src={bronze} alt="" height="30" />
                                        <h4 className="text-center">Bronze</h4>
                                        <div className="d-flex mt-4">
                                            <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$50.00</p>
                                            <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                                        </div>
                                        <div className="d-flex align-items-end">
                                            <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                                            <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>25.00</h1>
                                            <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                                        </div>

                                        <div className="d-flex justify-content-center mt-3" >

                                            <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("bronze"); setSecondModal(true); }}>Choose Plan</button>

                                        </div>

                                        <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                                        <div className="mt-4">
                                            <ul>
                                                <li>Create Your Own Class, Course, Section, Subcection</li>
                                                <li>Define Your Own Difficulty</li>
                                                <li>Define Your Own Language</li>
                                                <li>Import Question Using Excel</li>
                                                <li>Genrate Question Paper</li>
                                                <li>Download Question Paper in Docx</li>
                                                <li>Question Bank Size of Maximum 3000</li>
                                                <li>Genration of Question Bank Using Ai, Extra Charges Per Prompt ($0.08)</li>
                                            </ul>
                                        </div>
                                    </div>



                                    <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                                        <img src={silver} alt="" height="30" />
                                        <h4 className="text-center">Silver</h4>
                                        <div className="d-flex mt-4">
                                            <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$100.00</p>
                                            <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>100%off</p>
                                        </div>
                                        <div className="d-flex align-items-end">
                                            <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                                            <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>0.00</h1>
                                            <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                                        </div>
                                        <div className="d-flex justify-content-center mt-3" >

                                            <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("silver"); setSecondModal(true); }}>Choose Plan</button>

                                        </div>
                                        <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                                        <div className="mt-4">
                                            <ul>
                                                <li>Feature Including Bronze Pack</li>
                                                <li>Genrate Exam Online</li>
                                                <li>Import Candidate Data</li>
                                                <li>Candidate Register and Do Assesment</li>
                                                <li>Start / Stop Examination</li>
                                                <li>Result Genration</li>
                                                <li>Maximum Assesment Limit 500</li>
                                                <li>Data Analytics Using Ai, Extra Charges ($20)</li>
                                            </ul>
                                        </div>

                                    </div>




                                    <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                                        <img src={gold} alt="" height="30" />
                                        <h4 className="text-center">Gold</h4>
                                        <div className="d-flex mt-4">
                                            <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$500.00</p>
                                            <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                                        </div>
                                        <div className="d-flex align-items-end">
                                            <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                                            <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>250.00</h1>
                                            <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                                        </div>
                                        <div className="d-flex justify-content-center mt-3" >

                                            <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("gold"); setSecondModal(true); }}>Choose Plan</button>

                                        </div>
                                        <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                                        <div className="mt-4">
                                            <ul>
                                                <li>All Feature of the Bronze and Silver Package.</li>
                                                <li>Ai Based Proctoring Tool for the Remote Examination, Per Assesment Extra Charges ($0.25)</li>

                                            </ul>
                                        </div>

                                    </div>
                                </div>



                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>

            <Modal
                show={secondModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Customize Duration
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Card>
                        <CardBody>

                            <Row>

                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Select Duration
                                </label>
                                <div className="col-md-10">
                                    <Select

                                        value={months}
                                        onChange={(s) => setMonths(s)}
                                        options={monthsData}
                                        getOptionLabel={option => option?.name}
                                        getOptionValue={option => option?.id?.toString()} // Convert to string if classId is a number
                                        classNamePrefix="select2-selection"
                                    />

                                    {!months && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                </div>


                            </Row>

                            <Row >

                            </Row>

                            <Row className="mb-3">
                                <div className="mt-4 ">
                                    <button type="button" className="btn btn-warning w-md me-2" onClick={() => setSecondModal(false)}>Close</button>
                                    <button type="button" className="btn btn-primary w-md" onClick={() => makePayment()}>Buy Now</button>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>




                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default withRouter(Package);



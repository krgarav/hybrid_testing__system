import React, { useState } from 'react';
import Modal from 'react-modal';
import { Card, CardBody, Row } from 'reactstrap';
import gold from "../../assets/images/golden.png"
import bronze from "../../assets/images/bronze.png"
import silver from "../../assets/images/silver.png"

// Set the app element for accessibility (important for screen readers)
Modal.setAppElement('#root');

export function CustomModal({ isOpen, onRequestClose, setPackageType, setSecondModal, setFirstModal }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    width: '1400px',   // Set custom width here
                    maxHeight: '800px',   // Set custom height here
                    margin: 'auto',     // Center the modal
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)', // Center vertically and horizontally
                    overflowY: 'scroll',
                    borderRadius: '10px',
                },
            }}
        >
            <Card>
                <CardBody>

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

                                    <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("bronze"); setSecondModal(true); setFirstModal(false) }}>Choose Plan</button>

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

                                    <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("silver"); setSecondModal(true); setFirstModal(false) }}>Choose Plan</button>

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

                                    <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("gold"); setSecondModal(true); setFirstModal(false) }}>Choose Plan</button>

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
        </Modal>
    );
}
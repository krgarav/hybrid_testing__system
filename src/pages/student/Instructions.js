import React, { useEffect, useState } from 'react'
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import classes from "./instruction.module.css";
const Instructions = () => {


    const [aiProctoring, setAiProctoring] = useState(false);
    const [liveProctoring, setLiveProctoring] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const student = localStorage.getItem("student");
        if (!student) {
            navigate("/student-login")
        }
    })

    useEffect(() => {
        let a = JSON.parse(localStorage.getItem("student"))?.examSet[0];
        setAiProctoring(a?.[0].aiProctoring);
        setLiveProctoring(a?.[0].liveProctoring);
    }, []);

    const startTestHandler = async () => {
        // Assuming aiProctoring and liveProctoring are defined and hold boolean values
        if (aiProctoring || liveProctoring) {
            try {
                // Check if the camera is accessible
                await navigator.mediaDevices.getUserMedia({ video: true });
                // If we reach this point, the camera is connected
                navigate("/test");
            } catch (error) {
                // Handle the case where the camera is not accessible
                alert("Camera is not connected. Please connect your camera to proceed.");
            }
        } else {
            // Navigate directly if proctoring options are not both enabled
            navigate("/test");
        }
    };




    return (
        <>

            <div className={`container border h-100 animate__animated animate__fadeInRight mt-4 bg-white mb-4 ${classes["instruction-container"]} `}    >
                <div className="row">
                    <div className="col d-flex justify-content-center mt-4">
                        <div className="fw-bolder">
                            <MdOutlineIntegrationInstructions
                                style={{ height: "30px", width: "30px" }}
                            ></MdOutlineIntegrationInstructions>
                        </div>
                        <div className="mx-3 fw-bolder ">
                            <p style={{ height: "30px" }}>Instructions</p>
                        </div>
                    </div>
                </div>
                <hr className="feautrette-divider"></hr>
                <div className="container border " style={{ fontSize: "1rem", overflow: "scroll", maxHeight: "80vh" }}>
                    1. Ensure your computer or device meets the technical requirements. <br />
                    2. Test your internet connection for stability and speed.<br />
                    3. Verify that your webcam and microphone are working.<br />
                    4. Choose a quiet, well-lit space free from distractions.<br />
                    5. Do not switch window or use any shortcut keys otherwise test will be auto submited and you will be Disqualified.<br />
                    6. Inform others in your household about your test to avoid interruptions.<br />
                    7. Have necessary materials ready.<br />
                    8. Pay attention to the time limits and pacing guidelines.<br />
                    9. Follow the instructions for submitting your test.<br />
                    10. Log out from the testing platform and close all browser windows.<br />
                </div>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-outline-info m-2 fw-bolder"
                        onClick={startTestHandler}
                    >
                        Start test
                    </button>
                </div>
            </div>
        </>
    )
}

export default Instructions
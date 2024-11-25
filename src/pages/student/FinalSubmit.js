import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TestSubmitted = () => {
  const navigate = useNavigate();
  let params = useParams();
  let submit = params.submit;
  let visit = params.visit;
  let unAttempt = params.unAttempt;

  const handleClick = () => {
    console.log("hello forks")
    // navigate("/student-login");
  }


  return (
    <div className="score-container">
      <div className="title">Submission Successful</div>
      <div className="message">Thank you for completing the paper.</div>
      <div className="summary">
        <div className="summary-item submitted text-success">
          {/* <span className="greenTick"></span> */}
          <i className="fas fa-check-circle"></i> {submit} Questions
          Submitted
        </div>
        <div className="summary-item skipped text-warning">
          {/* <span className="yellowTick"></span> */}
          <i className="fas fa-exclamation-circle"></i> {visit} Questions
          Seen
        </div>
        <div className="summary-item attempted text-danger">
          {/* <span className="redTick"></span>{" "} */}
          <i className="fas fa-times-circle"></i> {unAttempt} Questions Unattempted
        </div>
      </div>
      <button className="button" onClick={handleClick}>Finish</button>
    </div>
  );
};

export default TestSubmitted;

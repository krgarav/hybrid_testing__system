import React from "react"
import "./VerifyLoader.css"
const VerifyLoader = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"></div>
      <div className="loader">
        <p>Photo</p>
        <div className="words">
          <span className="word">Analyzing</span>
          <span className="word">Checking</span>
          <span className="word">Processing</span>
          <span className="word">Evaluating</span>
          <span className="word">Finalizing</span>
        </div>
      </div>
      <p>Please Wait...</p>
    </div>
  )
}

export default VerifyLoader

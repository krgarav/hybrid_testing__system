import React, { useState, useEffect } from "react"
import Webcam from "react-webcam"
import { ReactMic } from "react-mic" // Import the ReactMic component
import axios from "axios" // For making API requests
import "./ProctringSetup.css"
import VerifyLoader from "components/VerifyingLoader/VerifyLoader"

const ProctoringSetup = () => {
  const [cameraPermission, setCameraPermission] = useState(null)
  const [microphonePermission, setMicrophonePermission] = useState(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false)
  const [recording, setRecording] = useState(false) // To track whether microphone is recording or not
  const [audioLevels, setAudioLevels] = useState(0) // To track the audio levels
  const [photo, setPhoto] = useState(null) // To store the captured photo
  const [isCameraLoading, setIsCameraLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  // Check Permissions
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Checking Camera permission
        const cameraPermissionStatus = await navigator.permissions.query({
          name: "camera",
        })
        setCameraPermission(cameraPermissionStatus.state === "granted")

        // Checking Microphone permission
        const microphonePermissionStatus = await navigator.permissions.query({
          name: "microphone",
        })
        setMicrophonePermission(microphonePermissionStatus.state === "granted")

        // Alternatively, attempt to access media devices to see if permission is granted
        if (navigator.mediaDevices.getUserMedia) {
          try {
            // Attempt to get user media (camera)
            await navigator.mediaDevices.getUserMedia({ video: true })
            setCameraPermission(true)
          } catch (err) {
            setCameraPermission(false)
          }

          try {
            // Attempt to get user media (microphone)
            await navigator.mediaDevices.getUserMedia({ audio: true })
            setMicrophonePermission(true)
          } catch (err) {
            setMicrophonePermission(false)
          }
        }
      } catch (error) {
        console.error("Error checking permissions:", error)
      }
    }

    checkPermissions()
  }, [])

  // Handle camera click to take photo
  const handleCameraClick = () => {
    const imageSrc = webcamRef.current.getScreenshot() // Get screenshot from webcam
    setPhoto(imageSrc) // Set the photo state with the image data
  }
  // Convert base64 to File object
  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  // Send photo to an API
  const handleSubmit = async () => {
    try {
      setIsVerifying(true)
      // Convert the base64 photo to a File object
      const photoFile = base64ToFile(photo, "captured_image.jpg")

      // Create FormData and append the File
      const formData = new FormData()
      formData.append("imageFile", photoFile)
      const response = await axios.post(
        "http://192.168.1.59:5000/uploadImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      console.log("Photo sent successfully:", response.data)
      setIsVerifying(false)
    } catch (error) {
      console.error("Error sending photo:", error)
    } finally {
      setIsVerifying(false) // Reset verification state
    }
  }
  const handleRetake = () => {
    setPhoto("")
    setIsCameraLoading(true)
  }
  // Handle microphone toggle
  const handleMicrophoneToggle = () => {
    setIsMicrophoneOn(!isMicrophoneOn)
    setRecording(!recording) // Start/stop microphone recording
  }

  // Handle Audio Data - Use this function to process audio levels
  const handleAudioData = data => {
    const level = data.level // Get audio level (between 0 and 1)
    setAudioLevels(level)
    console.log("Audio Level:", level) // You can process the audio levels further if needed
  }
  const handleUserMedia = () => {
    setIsCameraLoading(false) // Stop the loader once the camera is ready
  }

  const handleCameraError = error => {
    console.error("Webcam error:", error)
    setIsCameraLoading(false) // Stop the loader even if there’s an error
  }
  const webcamRef = React.useRef(null) // Reference to the webcam component

  return (
    <>
      {!isVerifying && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Black semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // Ensure it's above all other elements
          }}
          aria-hidden="true" // Accessibility: hides content from screen readers
        >
          <div
            style={{
              backgroundColor: "white", // White background for the loader box
              width: "30%", // 50% width
              height: "50%", // 50% height
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Slight shadow for elevation
              borderRadius: "8px", // Optional: rounded corners for the loader box
            }}
          >
            <VerifyLoader />
          </div>
        </div>
      )}
      <div className="proctoring-setup">
        <h1>Proctoring Setup</h1>

        {/* Camera Setup */}
        <div className="setup-section">
          <h2>Camera Setup</h2>
          {cameraPermission !== null ? (
            <>
              {!photo && (
                <div className="webcam-container">
                  <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    videoConstraints={{ facingMode: "user" }}
                    ref={webcamRef} // Reference the webcam component
                    onUserMedia={handleUserMedia} // Called when the stream is ready
                    onUserMediaError={handleCameraError} // Handle errors
                  />

                  {isCameraLoading && (
                    <div
                      className="loader"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "500px", // Match this with the expected Webcam height
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Dim background
                      }}
                    >
                      <div className="spinner-grow" role="status"></div>
                      <span>Loading Camera...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Display the captured photo */}
              {photo && (
                <div className="photo-preview">
                  <img src={photo} alt="Captured_img" />
                </div>
              )}
              <div className="d-flex gap-3 justify-center">
                {!photo && (
                  <button onClick={handleCameraClick}>{"Take Photo"}</button>
                )}
                {photo && <button onClick={handleRetake}>{"Retake"}</button>}
                {photo && (
                  <button onClick={handleSubmit}>{"Submit Photo"}</button>
                )}
              </div>
            </>
          ) : (
            <p>Please grant permission to access your camera.</p>
          )}
        </div>

        {/* Microphone Setup */}
        {/* <div className="setup-section">
        <h2>Microphone Setup</h2>
        {microphonePermission !== null ? (
          <>
            <button onClick={handleMicrophoneToggle}>
              {isMicrophoneOn ? "Turn Off Microphone" : "Turn On Microphone"}
            </button>

            {isMicrophoneOn && (
              <>
                <ReactMic
                  record={recording}
                  className="sound-wave"
                  onStop={() => console.log("Recording stopped")}
                  onData={handleAudioData} // Process the audio data to track levels
                  visualSetting="bar" // Use bar visualization for audio levels
                  audioBitsPerSecond={128000} // Audio quality
                  width={500} // Width of the waveform
                  height={100} // Height of the waveform
                  backgroundColor="black" // Background color of the waveform
                  strokeColor="black" // Color of the waveform stroke
                />

                <div className="audio-levels">
                  <div
                    className="audio-bar"
                    style={{
                      height: `${audioLevels * 100}%`,
                      backgroundColor: "green",
                    }}
                  ></div>
                  <div
                    className="audio-bar"
                    style={{
                      height: `${(1 - audioLevels) * 100}%`,
                      backgroundColor: "red",
                    }}
                  ></div>
                </div>
              </>
            )}
          </>
        ) : (
          <p>Please grant permission to access your microphone.</p>
        )}
      </div> */}

        {/* Browser Compatibility Check */}
        <div className="setup-section">
          <h2>Browser Compatibility Check</h2>
          <p>
            Make sure you're using a compatible browser that supports camera,
            microphone, and screen sharing.
          </p>
        </div>

        {/* Confirm Setup Button */}
        <button className="submit-btn">Confirm Setup</button>
      </div>
    </>
  )
}

export default ProctoringSetup

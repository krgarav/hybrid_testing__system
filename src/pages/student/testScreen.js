import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { questionSliceAction } from "store/test/test"
import { MdTimer } from "react-icons/md"
import Timer from "./timer"
import { PiFastForwardCircleBold } from "react-icons/pi"
import { BsXCircleFill } from "react-icons/bs"
import { FaClipboardQuestion } from "react-icons/fa6"
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5"
import QuestionSelector from "./questionSelector"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { Modal } from "react-bootstrap"
import ios from "../../assets/images/ios.png"
import { useAuth } from "context/authContext"
import { APP_ID, IMAGE_FETCH } from "helpers/url_helper"
import { toast } from "react-toastify"
import axios from "axios"
import { saveExamAnswers } from "helpers/test_helper"
import { success } from "toastr"
import io from "socket.io-client"
import classes from "./testscreen.module.css"
import AgoraRTC from "agora-rtc-sdk-ng"
import AgoraRTM from "agora-rtm-sdk"
import Loader from "components/Loader/Loader"
import "../../css/testScreen.css"
import DraggableVideo from "components/DraggableVideo"



const TestScreen = () => {
  const fullScreenRef = useRef(null)

  const [nextVisible, setNextVisible] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [question, setQuestion] = useState([])
  const [student] = useAuth()
  const [mediaStream, setMediaStream] = useState(null)
  const [recorder, setRecorder] = useState(null)
  const [timeFinish, setTimeFinish] = useState(false)
  const [loader, setLoader] = useState(false)
  const [aiProctoring, setAiProctoring] = useState(false)
  const [liveProctoring, setLiveProctoring] = useState(false)
  const [warningCounts, setWarningCounts] = useState(0)
  const socket = useRef(null)
  let isAlertShown = false
  const logo = JSON.parse(localStorage.getItem("student"))?.orgLogo
  useEffect(() => {
    console.log("logo", logo)
  }, [])

  useEffect(() => {
    const student = localStorage.getItem("student")
    if (!student) {
      navigate("/student-login")
    }
  })

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("student"))?.examSet[0]
    setAiProctoring(a?.[0].aiProctoring)
    setLiveProctoring(a?.[0].liveProctoring)
    setWarningCounts(a?.[0].warningCounts)
    setQuestion(a)
  }, [])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [submit, setSubmit] = useState({})
  const [answers, setAnswers] = useState({})
  const [visited, setVisited] = useState({ [currentQuestionIndex]: true })
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [modalShow, setModalShow] = useState(false)
  const [startTime, setStartTime] = useState(Date.now()) // To track when the question started
  const [timeSpent, setTimeSpent] = useState([]) // To store time spent on each question
  const [warningCount1, setWarningCount1] = useState(0)
  const [warningCount2, setWarningCount2] = useState(0)
  const [warningCount3, setWarningCount3] = useState(0)
  // const [warningCount, setWarningCount] = useState(1);

  const submitQuestion = ans => {
    const endTime = Date.now()
    const timeTaken = (endTime - startTime) / 1000 // Calculate time taken in seconds for the current question

    // Store the time spent for the current question
    setTimeSpent(prevTimes => {
      const updatedTimes = [...prevTimes]

      // Check if time for the current question index already exists
      if (updatedTimes[currentQuestionIndex]) {
        updatedTimes[currentQuestionIndex] += timeTaken // Add time to existing time
      } else {
        updatedTimes[currentQuestionIndex] = timeTaken // Store time if it doesn't exist
      }

      return updatedTimes
    })

    console.log(answers)
    ans.userAnswer = answer
    setAnswers({ ...answers, [currentQuestionIndex]: ans })
    setSubmit({ ...submit, [currentQuestionIndex]: true })
    setVisited({ ...visited, [currentQuestionIndex + 1]: true })
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setAnswer(
      answers[currentQuestionIndex + 1]?.userAnswer
        ? answers[currentQuestionIndex + 1]?.userAnswer
        : "",
    )
    setNextVisible(false)

    setStartTime(Date.now())
  }

  const submitLastQuestion = ans => {
    const endTime = Date.now()
    const timeTaken = (endTime - startTime) / 1000 // Calculate time taken in seconds for the current question

    // Store the time spent for the current question
    setTimeSpent(prevTimes => {
      const updatedTimes = [...prevTimes]

      // Check if time for the current question index already exists
      if (updatedTimes[currentQuestionIndex]) {
        updatedTimes[currentQuestionIndex] += timeTaken // Add time to existing time
      } else {
        updatedTimes[currentQuestionIndex] = timeTaken // Store time if it doesn't exist
      }

      return updatedTimes
    })

    ans.userAnswer = answer
    setAnswers({ ...answers, [currentQuestionIndex]: ans })
    setSubmit({ ...submit, [currentQuestionIndex]: true })

    setStartTime(Date.now())
  }
  const handleSkipQuestion = () => {
    const endTime = Date.now()
    const timeTaken = (endTime - startTime) / 1000 // Calculate time taken in seconds for the current question

    // Store the time spent for the current question
    setTimeSpent(prevTimes => {
      const updatedTimes = [...prevTimes]

      // Check if time for the current question index already exists
      if (updatedTimes[currentQuestionIndex]) {
        updatedTimes[currentQuestionIndex] += timeTaken // Add time to existing time
      } else {
        updatedTimes[currentQuestionIndex] = timeTaken // Store time if it doesn't exist
      }

      return updatedTimes
    })

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setVisited({ ...visited, [currentQuestionIndex + 1]: true })
    // setAnswer("")
    setAnswer(
      answers[currentQuestionIndex + 1]?.userAnswer
        ? answers[currentQuestionIndex + 1]?.userAnswer
        : "",
    )
    setNextVisible(false)

    setStartTime(Date.now())
  }

  const jumpQuestion = index => {
    const endTime = Date.now()
    const timeTaken = (endTime - startTime) / 1000 // Calculate time taken in seconds for the current question

    // Store the time spent for the current question
    setTimeSpent(prevTimes => {
      const updatedTimes = [...prevTimes]

      // Check if time for the current question index already exists
      if (updatedTimes[currentQuestionIndex]) {
        updatedTimes[currentQuestionIndex] += timeTaken // Add time to existing time
      } else {
        updatedTimes[currentQuestionIndex] = timeTaken // Store time if it doesn't exist
      }

      return updatedTimes
    })

    setCurrentQuestionIndex(index)
    setVisited({ ...visited, [index]: true })
    setAnswer(answers[index]?.userAnswer ? answers[index]?.userAnswer : "")
    setNextVisible(false)

    setStartTime(Date.now())
  }

  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionChange = option => {
    setSelectedOption(option)
    setNextVisible(true)
  }

  const handleAnswerChange = selectedAnswer => {
    setAnswer(selectedAnswer)
    setNextVisible(true)
  }

  const onFinalSubmitHandler = () => {
    setModalShow(true)
    // navigate("/finalsubmit");
  }

  const submigNavigate = async () => {
    console.log(answers)
    let questionId = []
    let paperId
    let answer = []

    let student = JSON.parse(localStorage.getItem("student"))
    let studentId = student?.studentId
    paperId = student?.examSet[0][0].paperId

    Object.values(answers).forEach(d => {
      questionId.push(d.questionId)
      answer.push(d.userAnswer)
    })

    setModalShow(false)
    let a = Object.keys(answers).length
    let v = Object.keys(visited).length
    let s = Object.keys(submit).length
    let ua = question?.length - v
    setLoader(true)
    let result = await saveExamAnswers({
      paperId,
      questionId,
      answer,
      studentId,
    })
    setLoader(false)
    if (result?.success) {
      toast.success(result.message)
      localStorage.removeItem("student")
      navigate(`/finalsubmit/${s}/${v}/${ua}`)
    }
  }

  const handleKeyDown = event => {
    if (event.key == "Q") {
      toast("alert")
    }
    // Check for F12, Alt, or Tab keys
    if (event.key === "F12" || event.key === "Alt" || event.key === "Tab") {
      event.preventDefault() // Prevent default behavior
      event.stopPropagation() // Stop propagation
    }

    // Additionally, check if Alt and Tab are pressed together
    if (event.altKey && event.key === "Tab") {
      event.preventDefault() // Prevent Alt + Tab
      event.stopPropagation()
    }
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (!isAlertShown) {
        if (warningCount1 + warningCount2 + warningCount3 === warningCounts) {
          let a = Object.keys(answers).length
          let v = Object.keys(visited).length
          let s = Object.keys(submit).length
          let ua = question?.length - v

          localStorage.removeItem("student")
          navigate(`/finalsubmit/${s}/${v}/${ua}`)
          setWarningCount1(0)
        } else {
          alert(
            "This is your final chance. If you switch windows again, your test will be automatically submitted.",
          )
          isAlertShown = true
          setWarningCount1(warningCount1 + 1)
        }
      }
    } else {
      isAlertShown = false // Reset flag when visibility changes back to visible
    }
  }

  const handleWindowBlur = () => {
    if (warningCount1 + warningCount2 + warningCount3 === warningCounts) {
      let a = Object.keys(answers).length
      let v = Object.keys(visited).length
      let s = Object.keys(submit).length
      let ua = question?.length - v

      localStorage.removeItem("student")
      navigate(`/finalsubmit/${s}/${v}/${ua}`)
      setWarningCount2(0)
    } else {
      isAlertShown = false // Reset flag when window blur event occurs
      if (!isAlertShown) {
        alert(
          "This is your final chance. If you switch windows again, your test will be automatically submitted.",
        )
        isAlertShown = true
        setWarningCount2(warningCount2 + 1)
      }
    }
  }

  // useEffect(() => {
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   window.addEventListener('blur', handleWindowBlur);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     window.removeEventListener('blur', handleWindowBlur);
  //   };
  // }, [warningCounts, warningCount1, warningCount2, warningCount3]);

  useEffect(() => {
    const handleKeyDown = event => {
      // Define an array of key combinations to block

      const blockedKeyCombinations = [
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
        "Escape",
        "Meta",
        "ContextMenu",
        "PrintScreen",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Control",
        "Alt",
        "Control+KeyC",
        "Control+KeyV",
        "Control+KeyX",
        "Control+KeyA",
        "Control+Shift+KeyJ",
        "Control+Shift+KeyI",
        "Alt+ArrowLeft",
        "Alt+ArrowRight",
        "Backspace",
        "MediaPlayPause",
        "MediaStop",
        "MediaTrackNext",
        "MediaTrackPrevious",
        "VolumeUp",
        "VolumeDown",
        "VolumeMute",
      ]

      const keyCombination =
        (event.ctrlKey ? "Control+" : "") +
        (event.shiftKey ? "Shift+" : "") +
        (event.altKey ? "Alt+" : "") +
        event.code

      if (blockedKeyCombinations.includes(keyCombination)) {
        event.preventDefault()
        console.log(`${keyCombination} key combination is blocked.`)
      }
    }

    const blockContextMenu = event => {
      event.preventDefault()
    }

    // Add event listener for keydown when component mounts
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", blockContextMenu)

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", blockContextMenu)
    }
  }, [])

  useEffect(() => {
    if (timeFinish) {
      toast.success("Time Finish")
      submigNavigate()
    }
  }, [timeFinish])

  // code for live proctoring
  const localVideoRef = useRef(null)
  const rtcClient = useRef(null)
  const localStream = useRef(null)
  const rtmClient = useRef(null)
  const rtmChannel = useRef(null)
  const studentName = "Student" // Replace with actual student name
  const roomId = JSON.parse(localStorage.getItem("student"))?.examSet[0][0]
    ?.paperId

  // useEffect(() => {
  //   if (!liveProctoring) return;
  //   const checkDevices = async () => {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     console.log('Available devices:', devices);
  //   };

  //   checkDevices();
  //   const initAgora = async () => {
  //     try {
  //       // Initialize RTC client
  //       rtcClient.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  //       await rtcClient.current.join(APP_ID, `${roomId}`, null, null);

  //       localStream.current = await AgoraRTC.createMicrophoneAndCameraTracks();
  //       console.log(localStream.current)
  //       localStream.current[1].play(localVideoRef.current);

  //       await rtcClient.current.publish(localStream.current);

  //       // Initialize RTM client
  //       rtmClient.current = AgoraRTM.createInstance(APP_ID);
  //       await rtmClient.current.login({ token: null, uid: String(rtcClient.current.uid) });
  //       rtmChannel.current = await rtmClient.current.createChannel(`${roomId}`);
  //       await rtmChannel.current.join();

  //       // Send the student name via RTM
  //       const message = JSON.stringify({ type: 'student-name', name: studentName, uid: rtcClient.current.uid });
  //       await rtmChannel.current.sendMessage({ text: message });

  //     } catch (error) {
  //       console.error('Agora initialization failed:', error);
  //     }
  //   };

  //   initAgora();

  //   return () => {
  //     if (rtcClient.current) {
  //       rtcClient.current.leave().catch(error => console.error('Leave failed:', error));
  //       if (localStream.current) {
  //         localStream.current[1].close();
  //       }
  //     }
  //     if (rtmClient.current) {
  //       rtmClient.current.logout().catch(error => console.error('Logout failed:', error));
  //     }
  //   };
  // }, [roomId, liveProctoring]);

  useEffect(() => {
    if (!liveProctoring) return
    const checkDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      console.log("Available devices:", devices)
    }

    checkDevices()
    const initAgora = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const mic = devices.find(device => device.kind === "audioinput")
        const cam = devices.find(device => device.kind === "videoinput")

        if (!mic) {
          throw new Error(
            "No audio input device (microphone) found. Please connect a microphone and try again.",
          )
        }

        if (!cam) {
          throw new Error(
            "No video input device (camera) found. Please connect a camera and try again.",
          )
        }

        // Initialize RTC client
        rtcClient.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
        await rtcClient.current.join(APP_ID, `${roomId}`, null, null)

        localStream.current = await AgoraRTC.createMicrophoneAndCameraTracks(
          { microphoneId: mic.deviceId },
          { cameraId: cam.deviceId },
        )

        localStream.current[1].play(localVideoRef.current)

        await rtcClient.current.publish(localStream.current)

        // Initialize RTM client
        rtmClient.current = AgoraRTM.createInstance(APP_ID)
        await rtmClient.current.login({
          token: null,
          uid: String(rtcClient.current.uid),
        })
        rtmChannel.current = await rtmClient.current.createChannel(`${roomId}`)
        await rtmChannel.current.join()

        const message = JSON.stringify({
          type: "student-name",
          name: studentName,
          uid: rtcClient.current.uid,
        })

        await rtmChannel.current.sendMessage({ text: message })
      } catch (error) {
        console.error("Agora initialization failed:", error)
        // alert(error.message)
      }
    }

    initAgora()

    return () => {
      if (rtcClient.current) {
        rtcClient.current
          .leave()
          .catch(error => console.error("Leave failed:", error))
        if (localStream.current) {
          localStream.current[1].close()
        }
      }
      if (rtmClient.current) {
        rtmClient.current
          .logout()
          .catch(error => console.error("Logout failed:", error))
      }
    }
  }, [roomId, liveProctoring])

  // code for Ai Proctoring
  // useEffect(() => {
  //   if (!liveProctoring) return;

  //   const initAgora = async () => {
  //     try {
  //       // Request camera and microphone permissions
  //       const permissionsGranted = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

  //       if (!permissionsGranted) {
  //         console.warn("Permissions not granted by user.");
  //         return;
  //       }

  //       // Initialize RTC client
  //       rtcClient.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  //       await rtcClient.current.join(APP_ID, `${roomId}`, null, null);

  //       // Create and play local stream
  //       localStream.current = await AgoraRTC.createMicrophoneAndCameraTracks();
  //       localStream.current[1].play(localVideoRef.current);

  //       await rtcClient.current.publish(localStream.current);

  //       // Initialize RTM client
  //       rtmClient.current = AgoraRTM.createInstance(APP_ID);
  //       await rtmClient.current.login({ token: null, uid: String(rtcClient.current.uid) });
  //       rtmChannel.current = await rtmClient.current.createChannel(`${roomId}`);
  //       await rtmChannel.current.join();

  //       // Send the student name via RTM
  //       const message = JSON.stringify({
  //         type: 'student-name',
  //         name: studentName,
  //         uid: rtcClient.current.uid
  //       });
  //       await rtmChannel.current.sendMessage({ text: message });

  //     } catch (error) {
  //       console.error('Agora initialization failed:', error);
  //     }
  //   };

  //   initAgora();

  //   return () => {
  //     // Cleanup
  //     if (rtcClient.current) {
  //       rtcClient.current.leave().catch(error => console.error('Leave failed:', error));
  //       if (localStream.current) {
  //         localStream.current[1].close();
  //       }
  //     }
  //     if (rtmClient.current) {
  //       rtmClient.current.logout().catch(error => console.error('Logout failed:', error));
  //     }
  //   };
  // }, [roomId, liveProctoring]);

  const videoRef = useRef(null) // For video capture, but not for displaying
  const canvasRef = useRef(null)
  const messageOverlayRef = useRef("null")
  const socketRef = useRef(null)
  const contextRef = useRef(null)
  const [faceMessage, setFaceMessage] = useState("")
  const [faceMessageShow, setFaceMessageShow] = useState(false)

  useEffect(() => {
    if (!aiProctoring) return

    // Initialize socket connection
    socketRef.current = io.connect("https://ai.is10live.com") // Adjust to your Flask-SocketIO backend
    // socketRef.current = io.connect('http://3.7.126.205:4000'); // Adjust to your Flask-SocketIO backend
    // Check if mediaDevices is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the webcam
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream // Set the stream to the hidden video element
          }
        })
        .catch(err => {
          console.error("Error accessing the camera: ", err)
        })
    } else {
      console.error("Media devices are not available in this environment.")
      return // Exit if mediaDevices is not available
    }

    // Set up canvas and context after video metadata is loaded
    const videoElement = videoRef.current
    const canvasElement = canvasRef.current

    const handleLoadedMetadata = () => {
      if (videoElement && canvasElement) {
        canvasElement.width = videoElement.videoWidth
        canvasElement.height = videoElement.videoHeight
        contextRef.current = canvasElement.getContext("2d")
      }
    }

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    }

    // Capture video frame and send it to the server every 200ms
    const captureInterval = setInterval(() => {
      if (contextRef.current && videoElement) {
        contextRef.current.drawImage(
          videoElement,
          0,
          0,
          canvasElement.width,
          canvasElement.height,
        )
        const frame = canvasElement.toDataURL("image/jpeg").split(",")[1] // Extract base64 data part
        socketRef.current.emit("video_data", frame) // Send the video frame to the server
      }
    }, 100) // Capture every 200ms (5 frames per second)

    // Receive messages from the server and display them in the overlay
    socketRef.current.on("message", data => {
      if (messageOverlayRef.current) {
        messageOverlayRef.current.textContent = data.text
      }
    })

    // Receive face detection results and draw a bounding box on the canvas
    socketRef.current.on("result", data => {
      console.log(data.result)
      console.log(data.success)
      if (data?.result?.No_faces === 1) {
        setFaceMessage("Warning: Your face is not visible in the camera")
        setFaceMessageShow(true)
      } else {
        setFaceMessageShow(false)
        setFaceMessage("")
      }
      console.log("current question index ", currentQuestionIndex)
      if (contextRef.current && canvasElement) {
        contextRef.current.clearRect(
          0,
          0,
          canvasElement.width,
          canvasElement.height,
        ) // Clear canvas
        if (data.face) {
          const { x, y, width, height } = data.face
          contextRef.current.strokeStyle = "red"
          contextRef.current.lineWidth = 2
          contextRef.current.strokeRect(x, y, width, height) // Draw bounding box around the face
        }
      }
    })

    // Cleanup event listeners and intervals on component unmount
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
      clearInterval(captureInterval)
      socketRef.current.disconnect()
    }
  }, [aiProctoring])

  useEffect(() => {
    console.log("timeSpent ", timeSpent)
  }, [timeSpent])

  useEffect(() => {
    console.log("currentQuestionIndex ", currentQuestionIndex)
    console.log(question[currentQuestionIndex])
  }, [currentQuestionIndex])

  // Code for manage full screen

  const [showPopup, setShowPopup] = useState(false)
  const [canRequestFullscreen, setCanRequestFullscreen] = useState(false)

  useEffect(() => {
    // Handle fullscreen change event
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // If user exits fullscreen, show the popup
        setShowPopup(true)
      }
    }

    // Add event listener for fullscreen change
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Function to request fullscreen
  const goFullscreen = () => {
    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }


  // Handle the user click to enter fullscreen
  const handleUserClick = () => {
    if (!canRequestFullscreen) {
      goFullscreen()
      setCanRequestFullscreen(true)
    }
  }

  // Function to handle popup button click
  const handlePopupResponse = response => {
    if (warningCount1 + warningCount2 + warningCount3 === warningCounts) {
      let a = Object.keys(answers).length
      let v = Object.keys(visited).length
      let s = Object.keys(submit).length
      let ua = question?.length - v

      localStorage.removeItem("student")
      navigate(`/finalsubmit/${s}/${v}/${ua}`)
    } else {
      setWarningCount3(warningCount3 + 1)
      if (response === "yes") {
        // Re-enter fullscreen mode
        const elem = document.documentElement
        if (elem.requestFullscreen) {
          elem.requestFullscreen()
        }
        setShowPopup(false)
      } else {
        // Print "logout" and perform logout actions if needed
        console.log("logout")
        // Here, you can add your actual logout logic
      }
    }
  }

  return (
    <>
      {loader ? <Loader /> : ""}
      {showPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <p>
              Do not attempt to exit full screen, or you will be terminated.
            </p>
            <button onClick={() => handlePopupResponse("yes")}>Continue</button>
            {/* <button onClick={() => handlePopupResponse('no')}>No</button> */}
          </div>
        </>
      )}
      <div
        className={showPopup ? "blurred-content" : ""}
        onClick={handleUserClick}
      >
        <div>
          {/* Hidden video element for capturing frames */}
          <video ref={videoRef} style={{ display: "none" }} autoPlay />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div id="messageOverlay" ref={messageOverlayRef} />
        </div>

        <div
          class="alert alert-danger text-center mb-0"
          role="alert"
          style={{ display: faceMessageShow ? "block" : "none" }}
        >
          {faceMessage}
        </div>
        <div
          className=""
          ref={fullScreenRef}
          style={{ height: "100vh", backgroundColor: "white" }}
        >
          <div
            className={`container-fluid d-flex justify-content-between  py-3 px-4 ${classes.headbar}`}
            style={{ backgroundColor: "rgb(129 207 118)" }}
          >
            <div className="">
              {!logo ? (
                <img src={ios} alt="" height="40" className="auth-logo-dark " />
              ) : (
                <img
                  src={IMAGE_FETCH + logo}
                  alt=""
                  height="40"
                  className="auth-logo-dark "
                />
              )}
            </div>
            <div className="text-white text-center fw-bold">
              <h2>Exam Name : {question?.[0]?.examName}</h2>
            </div>
            <div className="text-white text-center fw-bold"></div>
          </div>
          <div className="container-fluid bg-white px-4 py-2">
            <div className="row pt-4 test_screen_main">
              <div className="col-8 mx-3 shadow animate__animated animate__fadeInLeft test_screen_left">
                <div className="row d-flex justify-content-center align-item-center pt-3 ">
                  <div className="col d-flex justify-content-center align-item-center fw-bolder">
                    <FaClipboardQuestion
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span style={{ marginTop: "10px" }}>
                      Total Questions : {question?.length}
                    </span>
                  </div>
                  <div className="col d-flex justify-content-center align-item-center">
                    <MdTimer style={{ width: "40px", height: "40px" }} />
                    <div
                      style={{
                        height: "40px",
                        marginTop: "5px",
                        fontWeight: "bolder",
                      }}
                    >
                      {question?.length > 0 && (
                        <Timer
                          time={question[0]?.time}
                          setTimeFinish={setTimeFinish}
                        ></Timer>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onFinalSubmitHandler}
                    className="col-2 fs btn btn-outline-success d-flex justify-content-center align-items-center me-4 fw-bold"
                  >
                    Finish Test
                    <IoCheckmarkDoneCircleSharp
                      style={{ width: "20px", height: "20px", margin: "5px" }}
                    ></IoCheckmarkDoneCircleSharp>
                  </button>
                </div>

                <Modal
                  show={modalShow}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body>
                    <h4>Are you sure want to submit the paper.</h4>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => setModalShow(false)}
                      className="waves-effect waves-light"
                    >
                      No
                    </Button>{" "}
                    <Button
                      type="button"
                      color="danger"
                      onClick={submigNavigate}
                      className="waves-effect waves-light"
                    >
                      Yes
                    </Button>{" "}
                  </Modal.Footer>
                </Modal>
                <hr></hr>
                <div className="container">
                  <br />
                  <div className="ms-5">
                    <h4>
                      <span
                        className=""
                        key={question?.[currentQuestionIndex]?.description}
                      >
                        Q {currentQuestionIndex + 1} :
                      </span>
                      <span className="">
                        &nbsp; {question?.[currentQuestionIndex]?.description}
                      </span>
                      <div>
                        {question?.[currentQuestionIndex]?.imagePaths.map(
                          path => (
                            <img src={IMAGE_FETCH + path} alt="" />
                          ),
                        )}
                      </div>
                    </h4>
                    <br />
                    <div className="row p-2">
                      {question?.[currentQuestionIndex]?.type === "mcq" ? (
                        question?.[
                          currentQuestionIndex
                        ]?.bilingualQuestions[0]?.options.map((o, i) => (
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
                                onChange={e =>
                                  handleAnswerChange(e.target.value)
                                }
                              />
                              <label className="form-check-label" htmlFor={i}>
                                {o}
                              </label>
                            </div>
                          </>
                        ))
                      ) : (
                        <>
                          <div className="col-md-10">
                            <textarea
                              id="multiline-input"
                              name="message"
                              rows="10"
                              cols="50"
                              className="form-control"
                              placeholder="Write Your Answer Here"
                              value={answer}
                              onChange={e => handleAnswerChange(e.target.value)}
                            ></textarea>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="d-flex justify-content-end my-4">
                    {!nextVisible && (
                      <button
                        type="button"
                        className="btn  border-danger mx-2 fw-bold text-danger"
                        style={{
                          display:
                            currentQuestionIndex === question?.length - 1
                              ? "block"
                              : "none",
                        }}
                      >
                        Submit
                      </button>
                    )}
                    {nextVisible && (
                      <button
                        type="button"
                        className="btn btn-warning mx-2 fw-bold "
                        style={{
                          display:
                            currentQuestionIndex === question?.length - 1
                              ? "block"
                              : "none",
                        }}
                        onClick={() => {
                          submitLastQuestion(question?.[currentQuestionIndex])
                        }}
                      >
                        Submit
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn  btn-outline-warning mx-2 text-warning skip_btn"
                      style={{
                        display:
                          currentQuestionIndex === question?.length - 1
                            ? "none"
                            : "block",
                      }}
                      onClick={handleSkipQuestion}
                    >
                      Skip
                    </button>
                    {!nextVisible && (
                      <button
                        type="button"
                        className="btn  border-danger mx-2 fw-bold text-danger"
                        style={{
                          display:
                            currentQuestionIndex === question?.length - 1
                              ? "none"
                              : "block",
                        }}
                      >
                        next{" "}
                        <BsXCircleFill
                          style={{ width: "15px", height: "15px" }}
                        />
                      </button>
                    )}
                    {nextVisible && (
                      <button
                        type="button"
                        className="btn btn-warning mx-2 fw-bold "
                        style={{
                          display:
                            currentQuestionIndex === question?.length - 1
                              ? "none"
                              : "block",
                        }}
                        onClick={() => {
                          submitQuestion(question?.[currentQuestionIndex])
                        }}
                      >
                        next{" "}
                        <PiFastForwardCircleBold
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <QuestionSelector
                visited={visited}
                submit={submit}
                question={question}
                jumpQuestion={jumpQuestion}
              />
              {/* {liveProctoring && (
                <div
                  style={{ height: "200px" }}
                  className="d-flex justify-content-end"
                >
                  <div
                    ref={localVideoRef}
                    style={{
                      width: "300px",
                      height: "300px",
                      backgroundColor: "black",
                      border: "10px solid gray",
                      borderRadius: "1rem",
                      margin: ".5rem",
                    }}
                  ></div>
                </div>
              )} */}
              {liveProctoring && (
                <DraggableVideo liveProctoring={liveProctoring} localVideoRef = {localVideoRef} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default TestScreen

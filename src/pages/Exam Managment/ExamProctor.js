import React, { useEffect, useRef, useState } from "react"
import { Row, } from "reactstrap"
import { connect } from "react-redux";
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import "../Tables/datatables.scss";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import { APP_ID } from "helpers/url_helper";
import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm-sdk';
const ExamProctor = (props) => {
    document.title = "Exam | Proctoring";
    const breadcrumbItems = [
        { title: "All Exams", link: "#" },
        { title: "Proctoring", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        props.setBreadcrumbItems('Proctoring', breadcrumbItems)
    })

    const params = useParams();
    const [loader, setLoader] = useState(false);

    const remoteVideoContainerRef = useRef(null);
    const rtcClient = useRef(null);
    const localStream = useRef(null);
    const rtmClient = useRef(null);
    const rtmChannel = useRef(null);
    const roomId = params.roomId;
    const [fullscreenVideo, setFullscreenVideo] = useState(null);

    useEffect(() => {
        const initAgora = async () => {
            try {
                // Initialize RTC client
                rtcClient.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

                rtcClient.current.on('user-published', handleUserPublished);
                rtcClient.current.on('user-unpublished', handleUserUnpublished);

                await rtcClient.current.join(APP_ID, `${roomId}`, null, null);



                // Initialize RTM client
                rtmClient.current = AgoraRTM.createInstance(APP_ID);
                await rtmClient.current.login({ token: null, uid: String(rtcClient.current.uid) });
                rtmChannel.current = await rtmClient.current.createChannel(`${roomId}`);
                await rtmChannel.current.join();

                rtmChannel.current.on('ChannelMessage', ({ text }, senderId) => {
                    toast.success("Message received");
                    console.log("text jfkdjfkdj", text)
                    handleMessage(text, senderId);
                });

                remoteVideoContainerRef.current.innerHTML = ''; // Clear any previous remote video elements
            } catch (error) {
                console.error('Agora initialization failed:', error);
            }
        };

        initAgora();

        return () => {
            if (rtcClient.current) {
                rtcClient.current.leave().catch(error => console.error('Leave failed:', error));
                if (localStream.current) {
                    localStream.current[1].close();
                }
                // Clear all remote video elements on component unmount
                const remoteVideoElements = remoteVideoContainerRef.current?.querySelectorAll('div');
                remoteVideoElements?.forEach((element) => {
                    element.remove();
                });
            }
            if (rtmClient.current) {
                rtmClient.current.logout().catch(error => console.error('Logout failed:', error));
            }
        };
    }, [roomId]);

    const handleUserPublished = async (user, mediaType) => {
        try {
            await rtcClient.current.subscribe(user, mediaType);
            if (mediaType === 'video') {
                const remoteVideoTrack = user.videoTrack;
                if (remoteVideoTrack) {
                    // Remove existing video container if it exists
                    const existingVideoContainer = Array.from(remoteVideoContainerRef.current.children).find(
                        container => container.dataset.uid === user.uid
                    );
                    if (existingVideoContainer) {
                        existingVideoContainer.remove();
                    }

                    // Create a container for video and name
                    const videoContainer = document.createElement('div');
                    videoContainer.style.position = 'relative';
                    videoContainer.style.width = '200px';
                    videoContainer.style.height = '200px';
                    videoContainer.style.margin = '10px';
                    videoContainer.style.backgroundColor = 'black';
                    videoContainer.style.display = 'inline-block';
                    videoContainer.style.cursor = 'pointer'; // Indicate clickable area
                    videoContainer.dataset.uid = user.uid;

                    // Create the video element
                    const remoteVideoElement = document.createElement('div');
                    remoteVideoElement.style.width = '100%';
                    remoteVideoElement.style.height = '100%';
                    remoteVideoElement.style.position = 'absolute';
                    remoteVideoElement.style.top = '0';
                    remoteVideoElement.style.left = '0';
                    videoContainer.appendChild(remoteVideoElement);

                    // Create the name element
                    const nameElement = document.createElement('div');
                    nameElement.textContent = 'Student Name'; // Default name
                    nameElement.style.position = 'absolute';
                    nameElement.style.bottom = '0';
                    nameElement.style.left = '0';
                    nameElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    nameElement.style.color = 'white';
                    nameElement.style.padding = '5px';
                    videoContainer.appendChild(nameElement);

                    remoteVideoContainerRef.current.appendChild(videoContainer);
                    remoteVideoTrack.play(remoteVideoElement);

                    // Add double-click event listener
                    videoContainer.addEventListener('dblclick', () => {
                        toggleFullscreen(videoContainer);
                    });
                } else {
                    console.error('No video track available for user:', user.uid);
                }
            }
        } catch (error) {
            console.error('User published handling failed:', error);
        }
    };

    const handleUserUnpublished = (user) => {

        if (remoteVideoContainerRef.current) {
            const remoteVideoElements = remoteVideoContainerRef.current.querySelectorAll('div');
            remoteVideoElements.forEach((element) => {
                if (element.dataset.uid == user.uid) {
                    console.log(`Removing element for user: ${user.uid}`); // Add logging to verify element removal
                    element.remove();
                }
            });
        }
    };

    const handleMessage = (message, senderId) => {
        try {
            const parsedMessage = JSON.parse(message);
            console.log("Received message:", parsedMessage);

            if (parsedMessage.type === 'student-name') {
                // Update the name in the corresponding video container
                const videoContainer = Array.from(remoteVideoContainerRef.current.children).find(
                    container => container.dataset.uid === parsedMessage.uid
                );
                if (videoContainer) {
                    const nameElement = videoContainer.querySelector('div');
                    if (nameElement) {
                        nameElement.textContent = parsedMessage.name;
                    }
                }
            }
        } catch (error) {
            console.error('Message handling failed:', error);
        }
    };

    const toggleFullscreen = (element) => {
        if (fullscreenVideo === element) {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setFullscreenVideo(null);
        } else {
            // Enter fullscreen
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            setFullscreenVideo(element);
        }
    };



    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}

            <Row>
                {remoteVideoContainerRef && (
                    <div id="videoContainer" className="d-flex" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div ref={remoteVideoContainerRef} style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}></div>
                    </div>
                )}
            </Row>


        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(ExamProctor);
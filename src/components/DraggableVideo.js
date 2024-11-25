import React, { useState, useRef, useEffect } from "react"

const DraggableVideo = ({ liveProctoring, localVideoRef }) => {
  // State to track the position of the video element
  const [position, setPosition] = useState({ top: 100, left: 100 }) // initial position
  const isDragging = useRef(false) // Ref to track dragging state
  const offset = useRef({ x: 0, y: 0 }) // Ref to store the offset from where the drag started

  // Calculate the initial position (bottom-right corner)
  useEffect(() => {
    const initialTop = window.innerHeight - 350 // 300px is the video height
    const initialLeft = window.innerWidth - 350 // 300px is the video width
    setPosition({ top: initialTop, left: initialLeft })
  }, []) // This effect runs once, when the component mounts
  // Mouse down handler to start dragging
  const onMouseDown = e => {
    isDragging.current = true
    // Calculate the offset between mouse position and the top-left corner of the video
    offset.current = {
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    }
  }

  // Mouse move handler to drag the video
  const onMouseMove = e => {
    if (!isDragging.current) return

    // Update the position based on mouse movement
    setPosition({
      top: e.clientY - offset.current.y,
      left: e.clientX - offset.current.x,
    })
  }

  // Mouse up handler to stop dragging
  const onMouseUp = () => {
    isDragging.current = false
  }

  // Add event listeners for mousemove and mouseup
  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  return (
    liveProctoring && (
      <div
        style={{
          position: "relative",
          // top: `${position.top}px`,
          left: `${position.left}px`,
          width: "300px",
          height: "300px",
          backgroundColor: "black",
          border: "10px solid gray",
          borderRadius: "1rem",
          margin: ".5rem",
          // cursor: "move", // Change cursor to indicate draggable
        }}
        ref={localVideoRef}
        // onMouseDown={onMouseDown} // Start dragging on mouse down
      >
        {/* Your video element goes here */}
      </div>
    )
  )
}

export default DraggableVideo

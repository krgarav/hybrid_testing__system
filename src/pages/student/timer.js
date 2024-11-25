
import React, { useState, useEffect } from 'react';

function Timer({ time, setTimeFinish }) {
  const [hours, setHours] = useState(Math.floor(time / 60));
  const [minutes, setMinutes] = useState(time % 60);
  const [seconds, setSeconds] = useState(0);
  localStorage.setItem("hours", hours);
  localStorage.setItem("minutes", minutes);
  localStorage.setItem("seconds", seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0 && hours === 0) {
          clearInterval(timer);
          // Timer has reached 0
        } else if (minutes === 0) {
          localStorage.setItem("hours", hours - 1);
          localStorage.setItem("minutes", 59);
          localStorage.setItem("seconds", 59);
          setHours(prevHours => prevHours - 1);
          setMinutes(59);
          setSeconds(59);

        } else {
          localStorage.setItem("minutes", minutes - 1);
          localStorage.setItem("seconds", 59);
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        localStorage.setItem("seconds", seconds - 1);
        setSeconds(prevSeconds => prevSeconds - 1);
      }

      if (seconds == 0 && hours == 0 && minutes == 0) {
        setTimeFinish(true);
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  // Format the timer to display HH:MM:SS
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  return (
    <div className='fw-bolder p-1 text-success'>
      {formattedTime}
    </div>
  );
}

export default Timer;

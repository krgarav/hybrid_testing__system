import React, { useEffect, useState } from 'react';

const TimeAgo = ({ receivedDate }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const calculateTimeAgo = () => {
            const receivedDateObject = new Date(receivedDate);
            const currentDate = new Date();

            const timeDifference = currentDate - receivedDateObject;

            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 0) {
                setTimeAgo(`${days} days ago`);
            } else if (hours > 0) {
                setTimeAgo(`${hours} hours ago`);
            } else if (minutes > 0) {
                setTimeAgo(`${minutes} minutes ago`);
            } else {
                setTimeAgo(`${seconds} seconds ago`);
            }
        };

        calculateTimeAgo();
    }, [receivedDate]);

    return <span>{timeAgo}</span>;
};

export default TimeAgo;

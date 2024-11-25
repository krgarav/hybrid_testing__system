import { useNavigate } from "react-router-dom";
import "./PaymentResponse.css";
import { useEffect } from "react";

function PaymentSuccessPage() {

    const navigate = useNavigate();

    useEffect(() => {
        // Set a timeout to navigate after 10 seconds
        const timer = setTimeout(() => {
            navigate("/package");
        }, 10000); // 10 seconds (10000 milliseconds)

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success">
                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                            <h2> Your payment was successful </h2>
                            <p> Thank you for your payment. we will <br />
                                be in contact with more details shortly </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccessPage;
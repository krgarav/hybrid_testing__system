import { useNavigate } from "react-router-dom";
import "./PaymentResponse.css";
import { useEffect } from "react";

function PaymentFailPage() {

    const navigate = useNavigate();

    useEffect(() => {
        // Set a timeout to navigate after 10 seconds
        const timer = setTimeout(() => {
            navigate("/package");
        }, 5000); // 10 seconds (10000 milliseconds)

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <>
            <div classNameName="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success _failed">
                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                            <h2> Your payment failed </h2>
                            <p>  Try again later </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentFailPage;
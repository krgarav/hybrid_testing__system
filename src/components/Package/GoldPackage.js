

import gold from "../../assets/images/golden.png"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import { loadStripe } from "@stripe/stripe-js";
import { initiateCheckoutPayment } from "helpers/payment_helper";


const stripePromise = loadStripe('pk_test_51Py89eP54OU5rCubDXmgEnqHwnbaW3zvdU9klN8JosgaBuek5hIIzimaQ7RiKOo9ZhFJzm9U4V0EjPXz2Eb72TVz001fnu5hzj');
export const GoldPlan = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [loader, setLoader] = useState(false);

    const handlePayment = async () => {
        if (!stripe || !elements) return; // Make sure Stripe is loaded

        try {
            setLoader(true);
            const paymentData = {
                amount: 0,
                currency: "usd",
                items: ["Gold"],
                quantity: 1
            };
            const data = await initiateCheckoutPayment(paymentData);
            console.log(data?.clientSecret)
            if (data?.clientSecret) {
                const paymentResult = await stripe.confirmCardPayment(data?.clientSecret, {
                    payment_method: {
                        card: CardElement
                    }
                });

                if (paymentResult.error) {
                    console.error(paymentResult.error.message);
                } else {
                    if (paymentResult.paymentIntent.status === 'succeeded') {
                        //   onPaymentSuccess();
                    }
                }
            } else {
                toast.error("Failed to retrieve the payment URL.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred while making the payment.");
        } finally {
            setLoader(false);
        }
    };
    return (

        <>
            {loader ? (
                <Loader />
            ) : ("")}

            <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem ", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                <img src={gold} alt="" height="30" />
                <h4 className="text-center">Gold</h4>
                <div className="d-flex mt-4">
                    <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$500.00</p>
                    <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>100%off</p>
                </div>
                <div className="d-flex align-items-end">
                    <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                    <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>0.00</h1>
                    <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button
                        style={{
                            borderRadius: "1rem",
                            border: "2px solid #673de6",
                            backgroundColor: "#673de6",
                            color: "white",
                            fontSize: "1.5rem",
                            padding: ".2rem .5rem"
                        }}
                        onClick={() => handlePayment("gold")}
                    >
                        Choose Plan
                    </button>
                </div>

                <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                <div className="mt-4">
                    <ul>
                        <li>All Feature of the Bronze and Silver Package.</li>
                        <li>Ai Based Proctoring Tool for the Remote Examination, Per Assesment Extra Charges ($0.25)</li>

                    </ul>
                </div>
            </div>
        </>
    );
};
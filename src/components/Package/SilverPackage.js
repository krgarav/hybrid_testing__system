import silver from "../../assets/images/silver.png"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import { loadStripe } from "@stripe/stripe-js";
import { initiateCheckoutPayment } from "helpers/payment_helper";



const stripePromise = loadStripe('pk_test_51Py89eP54OU5rCubDXmgEnqHwnbaW3zvdU9klN8JosgaBuek5hIIzimaQ7RiKOo9ZhFJzm9U4V0EjPXz2Eb72TVz001fnu5hzj');
export const SilverPlan = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [loader, setLoader] = useState(false);

    const handlePayment = async () => {
        if (!stripe || !elements) return; // Make sure Stripe is loaded

        try {
            setLoader(true);
            const paymentData = {
                amount: 25,
                currency: "usd",
                items: ["bronze"],
                quantity: 1
            };
            console.log("jdkfjdkfjkdjfkdjfkurieurieuriefjkdjfkdjfiurieufjdkfdkj")
            const data = await initiateCheckoutPayment(paymentData);
            console.log(data?.clientSecret)
            if (data?.clientSecret) {
                console.log("Enter hua")
                const cardElement = elements.getElement(CardElement); // Get the CardElement instance
                const paymentResult = await stripe.confirmCardPayment(data?.clientSecret, {
                    payment_method: {
                        card: cardElement
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
            console.log(error)
            toast.error(error?.response?.data?.message || "An error occurred while making the payment.");
        } finally {
            setLoader(false);
        }
    }
    return (
        <>
            {loader ? (
                <Loader />
            ) : ("")}

            <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem ", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                <img src={silver} alt="" height="30" />
                <h4 className="text-center">Silver</h4>
                <div className="d-flex mt-4">
                    <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$100.00</p>
                    <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                </div>
                <div className="d-flex align-items-end">
                    <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                    <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>50.00</h1>
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
                        onClick={() => handlePayment("Silver")}
                    >
                        Choose Plan
                    </button>
                </div>

                <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                <div className="mt-4">
                    <ul>
                        <li>Feature Including Bronze Pack</li>
                        <li>Genrate Exam Online</li>
                        <li>Import Candidate Data</li>
                        <li>Candidate Register and Do Assesment</li>
                        <li>Start / Stop Examination</li>
                        <li>Result Genration</li>
                        <li>Maximum Assesment Limit 500</li>
                        <li>Data Analytics Using Ai, Extra Charges ($20)</li>
                    </ul>
                </div>
            </div>
        </>
    );
};
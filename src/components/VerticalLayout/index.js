import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import { Card, CardBody, Container, Row } from "reactstrap";
import withRouter from 'components/Common/withRouter';
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  changeColor,
  showRightSidebarAction,
  changeMode
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

// Layout Related Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import Rightbar from "../CommonForBoth/Rightbar"
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

//
import classes from "./Header.module.css";
import { Modal } from 'react-bootstrap';
import gold from "../../assets/images/golden.png"
import bronze from "../../assets/images/bronze.png"
import silver from "../../assets/images/silver.png"
import Loader from "components/Loader/Loader";
import { initiateCheckoutPayment } from "helpers/payment_helper";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import Select from "react-select"
import './index.css';
import ReactModal from 'react-modal';
import { CustomModal } from './CustomModal';
const stripePromise = loadStripe('pk_test_51Py89eP54OU5rCubDXmgEnqHwnbaW3zvdU9klN8JosgaBuek5hIIzimaQ7RiKOo9ZhFJzm9U4V0EjPXz2Eb72TVz001fnu5hzj');
// import "./Header.module.css";
const Layout = (props) => {

  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;

  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      leftSideBarTheme: layout.leftSideBarTheme,
      layoutWidth: layout.layoutWidth,
      leftSideBarType: layout.leftSideBarType,
      topbarTheme: layout.topbarTheme,
      layoutColor: layout.layoutColor,
      layoutMode: layout.layoutMode
    }));

  const {
    leftSideBarTheme,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    layoutColor,
    layoutMode
  } = useSelector(selectLayoutProperties);

  useEffect(() => {
    const hideRightbar = (event) => {
      var rightbar = document.getElementById("right-bar");
      //if clicked in inside right bar, then do nothing
      if (rightbar && rightbar.contains(event.target)) {
        return;
      } else {
        //if clicked in outside of rightbar then fire action for hide rightbar
        dispatch(showRightSidebarAction(false));
      }
    };

    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);

    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", hideRightbar, true);
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout("vertical"));
  }, [dispatch]);

  useEffect(() => {
    if (leftSideBarTheme) {
      dispatch(changeSidebarTheme(leftSideBarTheme));
    }
  }, [leftSideBarTheme, dispatch]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [layoutWidth, dispatch]);

  useEffect(() => {
    if (layoutMode) {
      dispatch(changeMode(layoutMode));
    }
  }, [layoutMode, dispatch]);

  useEffect(() => {
    if (leftSideBarType) {
      dispatch(changeSidebarType(leftSideBarType));
    }
  }, [leftSideBarType, dispatch]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [topbarTheme, dispatch]);

  useEffect(() => {
    if (layoutColor) {
      dispatch(changeColor(layoutColor));
    }
  }, [layoutColor, dispatch]);




  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === "default") {
      dispatch(changeSidebarType("condensed", isMobile));
    } else if (leftSideBarType === "condensed") {
      dispatch(changeSidebarType("default", isMobile));
    }
  };

  const blurHandler = () => {
    const btn = document.getElementById("vertical-menu-btn");
    btn.click()
  }


  const [loader, setLoader] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [firstModal, setFirstModal] = useState(false)
  const [months, setMonths] = useState(null);
  const [spanDisplay, setSpanDisplay] = useState("none");
  const [packageType, setPackageType] = useState("");
  const [currentPack, setCurrentPackage] = useState(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      let a = JSON.parse(localStorage.getItem("authUser"))?.packageName;

      if (a?.length <= 0) {
        console.log("hello check length of a ---------------------------> ", a);
        setFirstModal(true);
      }
      setCurrentPackage(a);
    }, 3000); // Delay of 5000 milliseconds (5 seconds)

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const monthsData = [
    { id: 1, name: "1 Month" },
    { id: 3, name: "3 Month" },
    { id: 6, name: "6 Month" },
    { id: 12, name: "12 Month" },
  ]










  const makePayment = async () => {
    try {
      const currency = "inr"
      setLoader(true)
      let d = null;
      console.log(packageType)
      console.log(packageType == "silver")

      if (packageType == 'gold') {


        d = {
          amount: 200,
          currency,
          items: packageType,
          quantity: months.id
        }
      }
      else if (packageType == "bronze") {
        d = {
          amount: 25,
          currency,
          items: packageType,
          quantity: months.id
        }
      }
      else if (packageType == "silver") {
        console.log("packageType")
        d = {
          amount: 0,
          currency,
          items: packageType,
          quantity: months.id
        }
      }
      console.log(d)
      // this function call backend post api 
      const data = await initiateCheckoutPayment(d);
      if (data?.sessionUrl) {
        // Redirect the user to Stripe Checkout
        window.location.href = data.sessionUrl;
      } else {
        toast.error("Failed to retrieve the payment URL.");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred while making the payment.")
    } finally {
      setLoader(false);
    }
  }

  const closeModal = () => {
  };
  return (
    <React.Fragment>
      {loader ? (
        <Loader />
      ) : ("")}
      {/* <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
          </div>
        </div>
      </div> */}

      <div id={`layout-wrapper `}>
        <Header toggleMenuCallback={toggleMenuCallback} />

        <Sidebar
          theme={props.leftSideBarTheme}
          type={props.leftSideBarType}
          isMobile={props.isMobile}

        />

        <div className={`main-content `}>
          <div id='blur' onClick={blurHandler} >h1</div>
          <div className={`page-content `}>
            <Container fluid>
              <Breadcrumb />
              {props.children}
              {/* render Footer */}
              <Footer />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
      {props.showRightSidebar ? <Rightbar /> : null}


      <Modal
        show={false}
        size="lg"
        style={{ maxWidth: '80%', width: '100%' }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header  >
          <Modal.Title id="contained-modal-title-vcenter">
            Buy Package
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <Card>
            <CardBody>

              <Row>
                <h1>All Packages</h1>

                <div className="d-flex mt-3 justify-content-center flex-wrap gap-3">

                  <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem ", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                    <img src={bronze} alt="" height="30" />
                    <h4 className="text-center">Bronze</h4>
                    <div className="d-flex mt-4">
                      <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$50.00</p>
                      <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                    </div>
                    <div className="d-flex align-items-end">
                      <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                      <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>25.00</h1>
                      <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                    </div>

                    <div className="d-flex justify-content-center mt-3" >

                      <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("bronze"); setSecondModal(true); setFirstModal(false) }}>Choose Plan</button>

                    </div>

                    <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                    <div className="mt-4">
                      <ul>
                        <li>Create Your Own Class, Course, Section, Subcection</li>
                        <li>Define Your Own Difficulty</li>
                        <li>Define Your Own Language</li>
                        <li>Import Question Using Excel</li>
                        <li>Genrate Question Paper</li>
                        <li>Download Question Paper in Docx</li>
                        <li>Question Bank Size of Maximum 3000</li>
                        <li>Genration of Question Bank Using Ai, Extra Charges Per Prompt ($0.08)</li>
                      </ul>
                    </div>
                  </div>



                  <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                    <img src={silver} alt="" height="30" />
                    <h4 className="text-center">Silver</h4>
                    <div className="d-flex mt-4">
                      <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$100.00</p>
                      <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>100%off</p>
                    </div>
                    <div className="d-flex align-items-end">
                      <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                      <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>0.00</h1>
                      <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                    </div>
                    <div className="d-flex justify-content-center mt-3" >

                      <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("silver"); setSecondModal(true); setFirstModal(false) }}>Choose Plan</button>

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




                  <div className="me-5" style={{ border: "2px solid black", minHeight: "30rem", width: "20rem", backgroundColor: "", borderRadius: "8px", padding: "1rem", boxShadow: "rgb(76 71 71) 5px 5px 11px" }}>
                    <img src={gold} alt="" height="30" />
                    <h4 className="text-center">Gold</h4>
                    <div className="d-flex mt-4">
                      <p className="me-2" style={{ textDecoration: "line-through", paddingTop: ".5rem" }}>$500.00</p>
                      <p style={{ padding: ".5rem 1rem", borderRadius: "4rem", backgroundColor: "#d5dfff" }}>50%off</p>
                    </div>
                    <div className="d-flex align-items-end">
                      <p style={{ fontSize: "1rem", margin: "0" }}>$</p>
                      <h1 style={{ fontWeight: "bolder", margin: "0 0" }}>250.00</h1>
                      <p style={{ fontSize: "1rem", margin: "0" }}>/mo</p>
                    </div>
                    <div className="d-flex justify-content-center mt-3" >

                      <button style={{ borderRadius: "1rem", border: "2px solid #673de6", backgroundColor: "#673de6", color: "white", fontSize: "1.5rem", padding: ".2rem .5rem" }} onClick={() => { setPackageType("gold"); setSecondModal(true); setFirstModal(false) }}>Choose Plan</button>

                    </div>
                    <div className="mt-3" style={{ border: ".1px solid gray" }}></div>

                    <div className="mt-4">
                      <ul>
                        <li>All Feature of the Bronze and Silver Package.</li>
                        <li>Ai Based Proctoring Tool for the Remote Examination, Per Assesment Extra Charges ($0.25)</li>

                      </ul>
                    </div>

                  </div>
                </div>



              </Row>
            </CardBody>
          </Card>




        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>


      <CustomModal isOpen={firstModal} onRequestClose={closeModal} setPackageType={setPackageType} setSecondModal={setSecondModal} setFirstModal={setFirstModal} />


      <Modal
        show={secondModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Customize Duration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Card>
            <CardBody>

              <Row>

                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Select Duration
                </label>
                <div className="col-md-10">
                  <Select

                    value={months}
                    onChange={(s) => setMonths(s)}
                    options={monthsData}
                    getOptionLabel={option => option?.name}
                    getOptionValue={option => option?.id?.toString()} // Convert to string if classId is a number
                    classNamePrefix="select2-selection"
                  />

                  {!months && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>


              </Row>

              <Row >

              </Row>

              <Row className="mb-3">
                <div className="mt-4 ">

                  <button type="button" className="btn btn-secondary w-md me-2" onClick={() => { setSecondModal(false); setFirstModal(true) }}>Close</button>
                  <button type="button" className="btn btn-primary w-md" onClick={() => makePayment()}>Buy Now</button>
                </div>
              </Row>
            </CardBody>
          </Card>




        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}


Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeColor: PropTypes.func,
  changeMode: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any
}

const mapStatetoProps = state => {
  return {
    ...state.Layout,
  }
}
export default connect(mapStatetoProps, {
  changeLayout,
  changeColor,
  changeMode,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
})(withRouter(Layout))

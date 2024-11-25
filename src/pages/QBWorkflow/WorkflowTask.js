import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form,
    Button
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { fetchUser, setBreadcrumbItems } from "../../store/actions";
import Loader from "components/Loader/Loader";
import Tree from 'react-d3-tree';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createWorkflowTree, fetchAllWorkflowTree, getChild, updateWorkflowTree } from "helpers/workflow_helper";
import { toast } from "react-toastify";
import Select from "react-select"
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Workflow = (props) => {
    document.title = "Question Bank | Workflow";




    const breadcrumbItems = [
        { title: "Workflow", link: "#" },
        { title: "QB Task", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])
    useEffect(() => {
        props.setBreadcrumbItems('QB Task', breadcrumbItems)
    })

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [childs, setChilds] = useState([]);

    const fetchChilds = async () => {
        try {
            setLoader(true);
            const data = await getChild();
            if (data?.success) {
                setChilds(data?.result);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchChilds();
    }, []);




    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}

            <Row >
                <Col>
                    <Card>
                        <CardBody className="col-lg-10 col-sm-12 col-xs-12 " >

                            <div className="d-flex flex-wrap">
                                {childs?.map((child, index) => (
                                    <>
                                        <div className="card position-relative" style={{ width: "18rem" }}>
                                            <span className="badge bg-secondary position-absolute" style={{ top: '10px', right: '10px' }}>
                                                {child?.questionCount}
                                            </span> {/* Badge positioned at the top right */}
                                            <div className="card-body">
                                                <h5 className="card-title">{child?.name}</h5>
                                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <a className="btn btn-primary" onClick={() => navigate("/qc-questions/" + child?.userId)}>Check</a>
                                            </div>
                                        </div>
                                    </>
                                ))}


                            </div>


                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(Workflow);
import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, } from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { deleteClass, fetchClass, setBreadcrumbItems, setSuccessFalseClass, updateClass } from "../../store/actions";

import "../Tables/datatables.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";
import { getAllStudents } from "helpers/student_helper";

const AllStudents = (props) => {
    document.title = "Question System | All Student";
    const [modalShow, setModalShow] = useState(false);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [id, setId] = useState({});
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [students, setStudents] = useState(null);
    const [result, setResult] = useState(null)
    // const result = useSelector(state => state.classesReducer)

    const breadcrumbItems = [
        { title: "Student Managment", link: "#" },
        { title: "All Students", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])

    useEffect(() => {
        props.setBreadcrumbItems('All Students', breadcrumbItems)


    })

    useEffect(() => {
        fetchStudents();
    }, [])

    const fetchStudents = async () => {
        try {
            setLoader(true);
            const data = await getAllStudents();
            console.log(data.result);
            setStudents(data?.result)
            if (data?.success) {
                setResult(data)
            }
        } catch (error) {
            console.log(error);
            toast.error("Somethng went wrong");
        } finally {
            setLoader(false);
        }
    }


    const [page, setPage] = useState(1);
    const data = {
        columns: [
            {
                label: "Serial No.",
                field: "serialNo",
                sort: "asc",
                width: 50,
            },
            {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 100,
            },
            {
                label: "Email",
                field: "email",
                sort: "asc",
                width: 150,
            },
            {
                label: "Phone Number",
                field: "phoneNumber",
                sort: "asc",
                width: 200,
            },
        ],
        rows: students,
        rows: students?.map((row, index) => ({
            ...row,
            serialNo: index + 1, // Add 1 to start counting from 1
            clickEvent: () => handleRowClick(row)
        }))
    }

    const handleRowClick = (row) => {


    }


    const handleDelete = () => {


    }



    return (
        <React.Fragment>

            {loader ? (
                <>
                    < Loader />
                </>
            ) : ("")}
            <Row>
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">All Classes </CardTitle>
                            <MDBDataTable
                                className="table-row-hover"
                                responsive
                                bordered
                                data={data}
                                style={{ cursor: 'pointer' }}
                                noBottomColumns
                                paging={{ page, onPageChange: setPage }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>





        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(AllStudents);
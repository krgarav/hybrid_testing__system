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
import { createWorkflowTree, fetchAllWorkflowTree, updateWorkflowTree } from "helpers/workflow_helper";
import { toast } from "react-toastify";
import Select from "react-select"
import { Modal } from "react-bootstrap";
const Workflow = (props) => {
    document.title = "Question Bank | Workflow";




    const breadcrumbItems = [
        { title: "Workflow", link: "#" },
        { title: "QB Wrokflow", link: "#" },
    ]
    useEffect(() => {
        const blurDiv = document.getElementById("blur");
        var width = window.innerWidth;
        if (width <= 994) {
            blurDiv.click()
        }
    }, [])
    useEffect(() => {
        props.setBreadcrumbItems('QB Workflow', breadcrumbItems)
    })
    const dispatch = useDispatch();
    const users = useSelector(state => state?.userReducer?.users);
    let [allUsers, setAllUsers] = useState([]);
    // const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {

        if (users?.length == 0) {
            dispatch(fetchUser());
        }
        else {
            // allUsers = users?.result;
            // console.log(allUsers?.result)
        }

    }, [])

    useEffect(() => {
        // allUsers = users?.result;
        setAllUsers(users?.result);
        console.log("flag ", allUsers)
    }, [users])

    const [loader, setLoader] = useState(false);
    const [treeData, setTreeData] = useState(null); // Start with empty tree data
    const [selectedUser, setSelectedUser] = useState(''); // For dropdown selection
    const [targetNodeName, setTargetNodeName] = useState('');
    const [nodes, setNodes] = useState([]);
    const [isFirstNode, setIsFirstNode] = useState(true); // Track if it's the first node being added
    const [draggedNode, setDraggedNode] = useState(null); // State for dragged node
    const [editingNode, setEditingNode] = useState(null); // Track which node is being edited
    const [editNodeModal, setEditNodeModal] = useState(false)
    const [spanDisplay, setSpanDisplay] = useState("none");
    const [modalSelectedNewUser, setModalSelectedNewUser] = useState("");
    const [modalSelectedOldUser, setModalSelectedOldUser] = useState("");


    useEffect(() => {
        const extractNodes = (node, nodesList = []) => {
            nodesList.push(node.name);
            if (node.children) {
                node.children.forEach((child) => extractNodes(child, nodesList));
            }
            return nodesList;
        };

        if (treeData) {
            const allNodes = extractNodes(treeData);
            setNodes(allNodes);
        } else {
            setNodes([]);
        }
    }, [treeData]);

    const getAllWorkflow = async () => {
        try {
            setLoader(true);
            const data = await fetchAllWorkflowTree();
            if (data?.success) {
                if (data?.result?.length > 0) {

                    setTreeData(data?.result[0]);
                    setIsFirstNode(false);
                }
                console.log(data?.result)
            }
            else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        getAllWorkflow();
    }, [])








    const handleCreate = async (tree) => {
        try {
            setLoader(true);

            const data = await createWorkflowTree(tree);

            if (data?.success) {
                toast.success(data?.message);

            }
            else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }



    const handleAddNode = () => {
        if (!selectedUser) return; // Ensure a user is selected before proceeding
        const newNode = { name: selectedUser.name, userId: selectedUser.aspId };

        if (!treeData || Object.keys(treeData).length === 0) {
            // If the tree is empty, add the new node as the root node
            setTreeData(newNode);
            handleCreate(newNode);
        } else {
            if (!targetNodeName) return; // Make sure a target node is specified
            const newTreeData = { ...treeData };

            const targetNode = findNode(newTreeData, targetNodeName?.value); // Find the target node in the tree
            console.log("targetNode", targetNode)
            if (targetNode) {
                if (!targetNode.children) targetNode.children = []; // Initialize children array if it doesn't exist
                targetNode.children.push(newNode); // Add the new node as a child
                setTreeData(newTreeData); // Update the tree with the new structure
                handleUpdate(newTreeData);
            }
        }

        // Reset the selected user and target node after the operation
        setSelectedUser(null);
        setTargetNodeName(null);
    };

    const findNode = (node, nodeName) => {
        if (node.name === nodeName) return node; // Found the target node

        // If the node has children, search recursively
        if (node.children) {
            for (let child of node.children) {
                const result = findNode(child, nodeName);
                if (result) return result;
            }
        }

        return null; // Return null if no matching node is found
    };

    const handleSelectUser = (selectedOption, nodeDatum) => {
        const newTreeData = { ...treeData };
        const nodeToEdit = findNode(newTreeData, nodeDatum.name);
        if (nodeToEdit) {
            nodeToEdit.name = selectedOption.name; // Update the name with the selected user
        }

        setTreeData(newTreeData); // Update the tree data
        setEditingNode(null); // Exit edit mode
    };

    const renderCustomNode = (rd3tNodeProps) => {
        const { nodeDatum } = rd3tNodeProps;
        const radius = 50; // Circle radius
        const fontSize = 20; // Adjusted font size

        return (
            <g>
                {/* Render a circle for each node */}
                <circle r={radius} fill="lightblue" />

                {/* If the node is in edit mode, render the dropdown */}
                {editingNode === nodeDatum.name ? (
                    <foreignObject x="-70" y="-30" width="140" height="60">
                        <div xmlns="http://www.w3.org/1999/xhtml">
                            <Select
                                value={allUsers.find(user => user.name === nodeDatum.name)} // Current user in select
                                onChange={(selectedOption) => handleSelectUser(selectedOption, nodeDatum)} // Update user
                                options={allUsers}
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id.toString()}
                                classNamePrefix="select2-selection"
                                menuPortalTarget={document.body} // Render menu outside of the SVG for better interaction
                            />
                        </div>
                    </foreignObject>
                ) : (
                    <>
                        {/* Render the node name when not in edit mode */}
                        <text
                            fill="black"
                            x="0"
                            y="0"
                            textAnchor="middle"
                            fontSize={fontSize}
                            fontFamily="Arial, sans-serif"
                        >
                            {nodeDatum.name}
                        </text>

                        {/* Edit and Delete buttons for switching to edit mode */}
                        <foreignObject x="-50" y="40" width="100" height="30">
                            <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                                <button
                                    onClick={() => handleEditNode(nodeDatum.name)}
                                    style={{
                                        fontSize: '12px',
                                        padding: '2px 5px',
                                        border: 'none',
                                        background: 'lightgray',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteNode(nodeDatum.name)}
                                    style={{
                                        fontSize: '12px',
                                        padding: '2px 5px',
                                        border: 'none',
                                        background: 'lightgray',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </foreignObject>
                    </>
                )}
            </g>
        );
    };



    const handleEditNode = (name) => {
        const user = allUsers.find((d) => d.name == name);
        setModalSelectedNewUser(user)
        setModalSelectedOldUser(user)
        setEditNodeModal(true);
    }



    const updateNode = (nodeNameToUpdate, updatedData) => {
        if (!nodeNameToUpdate || !updatedData) return; // Ensure both node name and updated data are provided
        console.log(nodeNameToUpdate, updatedData);
        const updateNodeRecursively = (node, nameToUpdate) => {
            // Check if the current node matches the name to update
            console.log(node.name)
            console.log(nameToUpdate.name)
            if (node.name === nameToUpdate.name) {
                // Update the node's properties with the new data
                node.name = updatedData.name || node.name; // Update name if provided
                node.id = updatedData.id || node.id;       // Update id if provided
                return true; // Return true to indicate successful update
            }

            // If the node has children, search recursively
            if (node.children) {
                for (let child of node.children) {
                    if (updateNodeRecursively(child, nameToUpdate)) {
                        return true; // If update was successful, return true
                    }
                }
            }

            return false; // Return false if the node wasn't found
        };

        // Create a copy of the tree data to avoid direct mutation
        const newTreeData = { ...treeData };
        console.log("newTreeData ", newTreeData);
        // Start the update process from the root
        const updated = updateNodeRecursively(newTreeData, nodeNameToUpdate);

        if (updated) {
            // Update the state with the modified tree
            setTreeData(newTreeData);
            handleUpdate(newTreeData);
        } else {
            console.warn(`Node with name "${nodeNameToUpdate}" not found.`);
        }
    };

    const handleUpdateNode = async () => {
        updateNode(modalSelectedOldUser, modalSelectedNewUser);
        setEditNodeModal(false)
    }

    const handleUpdate = async (tree) => {
        try {
            setLoader(true)
            const data = await updateWorkflowTree(tree);
            if (data?.success) {
                toast.success(data?.message);

            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const handleDeleteNode = (nodeNameToDelete) => {
        if (!nodeNameToDelete) return; // Ensure a node name is provided

        const deleteLeafNodeRecursively = (node, nameToDelete) => {
            if (!node.children) return false; // If there are no children, return false

            // Find the index of the child node to delete
            const indexToDelete = node.children.findIndex(child => child.name === nameToDelete);

            if (indexToDelete !== -1) {
                // Check if the node to delete is a leaf node
                const nodeToDelete = node.children[indexToDelete];
                if (!nodeToDelete.children || nodeToDelete.children.length === 0) {
                    // Node is a leaf; remove it from the children array
                    node.children.splice(indexToDelete, 1);
                    return true; // Return true to indicate successful deletion
                } else {
                    // toast.warn(`Node "${nameToDelete}" is not a leaf node and cannot be deleted.`);
                    console.warn(`Node "${nameToDelete}" is not a leaf node and cannot be deleted.`);
                    return false; // Node is not a leaf, so do not delete
                }
            }

            // If not found, check children recursively
            for (let child of node.children) {
                if (deleteLeafNodeRecursively(child, nameToDelete)) {
                    return true; // If deletion was successful, return true
                }
            }

            return false; // Return false if the node wasn't found
        };

        // Create a copy of the tree data to avoid direct mutation
        const newTreeData = { ...treeData };

        // Start the deletion process from the root
        const deleted = deleteLeafNodeRecursively(newTreeData, nodeNameToDelete);

        if (deleted) {
            // Update the state with the modified tree
            setTreeData(newTreeData);
            handleUpdate(newTreeData);
        } else {
            toast.warn(`Leaf node with name "${nodeNameToDelete}" not found or is not a leaf node.`);
            console.warn(`Leaf node with name "${nodeNameToDelete}" not found or is not a leaf node.`);
        }
    };


    return (
        <React.Fragment>
            {loader ? (
                <Loader />
            ) : ("")}

            <Row >
                <Col>
                    <Card>
                        <CardBody className="col-lg-10 col-sm-12 col-xs-12 " >

                            <div style={{ width: '100vw', height: '100vh' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <div className="d-flex flex-row">
                                        <div className="me-2">


                                            <Select
                                                value={selectedUser}
                                                onChange={(selectedOption) => {
                                                    setSelectedUser(selectedOption);
                                                }}
                                                options={allUsers}
                                                getOptionLabel={option => option?.name}
                                                getOptionValue={option => option?.id?.toString()} // Ensure id is string
                                                classNamePrefix="select2-selection"
                                                style={{ marginRight: '10px' }}
                                            />
                                        </div>
                                        <div className="me-2">


                                            {treeData && (
                                                <Select
                                                    value={targetNodeName}
                                                    onChange={(selectedOption) => { setTargetNodeName(selectedOption) }}
                                                    options={nodes.map(node => ({ value: node, label: node }))}
                                                    classNamePrefix="select2-selection"
                                                    style={{ marginRight: '10px' }}
                                                />
                                            )}
                                        </div>
                                        <div className="me-2">

                                            {/* <button onClick={handleAddNode}>Add Node</button> */}
                                            <button type="submit" onClick={handleAddNode} className="btn btn-primary w-md">Add Node</button>
                                        </div>

                                    </div>
                                </div>
                                {treeData && (
                                    <Tree
                                        data={treeData}
                                        translate={{ x: 200, y: 100 }}
                                        orientation="vertical"
                                        collapsible={false}
                                        renderCustomNodeElement={renderCustomNode}
                                    />
                                )}
                            </div>


                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal
                show={editNodeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Workflow User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            Select New User
                        </label>
                        <div className="col-md-10">
                            <Select
                                value={modalSelectedNewUser}
                                onChange={(selectedOption) => {
                                    setModalSelectedNewUser(selectedOption);
                                }}
                                options={allUsers}
                                getOptionLabel={option => option?.name}
                                getOptionValue={option => option?.id?.toString()} // Ensure id is string
                                classNamePrefix="select2-selection"
                                style={{ marginRight: '10px' }}
                            />
                            {!modalSelectedNewUser && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                        </div>

                    </Row>






                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" color="primary" onClick={() => setEditNodeModal(false)} className="waves-effect waves-light">Close</Button>{" "}
                    <Button type="button" color="success" onClick={handleUpdateNode} className="waves-effect waves-light">Update</Button>{" "}
                    {/* <Button onClick={() => setModalShow(false)}>Close</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={handleDelete}>Delete</Button> */}
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(Workflow);
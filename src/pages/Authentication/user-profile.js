import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "components/Common/withRouter";


import user1 from "../../assets/images/users/user-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { getOrganization, updateOrganization } from "helpers/organization_helper";
import { result } from "lodash";
import { toast } from "react-toastify";

const UserProfile = () => {

  //meta title
  document.title = "Profile | IOS - HTS";

  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);
  const [username, setUsername] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [spanDisplay, setSpanDisplay] = useState("none");
  const [logo, setLogo] = useState("");
  const [logoFile, setLogoFile] = useState("");

  const selectProfileState = (state) => state.Profile;
  const ProfileProperties = createSelector(
    selectProfileState,
    (profile) => ({
      error: profile.error,
      success: profile.success,
    })
  );

  const {
    error,
    success
  } = useSelector(ProfileProperties);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setEmail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setEmail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  const id = JSON.parse(localStorage.getItem("authUser")).menuAccess[0].aspId;

  useEffect(() => {
    fetchOrgnization();

  }, []);

  const fetchOrgnization = async () => {
    try {
      const data = await getOrganization(id);
      if (data.success) {
        let result = data.result[0]

        setEmail(result?.email ? result.email : "");
        setCountry(result?.country ? result.country : "");
        setState(result?.state ? result.state : "");
        setCity(result.city ? result.city : "");
        setOrgName(result.orgName ? result.orgName : "");
        setPhoneNumber(result.phoneNumber ? result.phoneNumber : "");
        setAddress(result?.address ? result.address : "");
      }
    } catch (error) {
      console.log(error);
    }


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(!email)
    console.log(typeof (email))
    if (!email || !phoneNumber || !address || !city || !state || !country || !orgName) {

      setSpanDisplay("inline")

    }
    else {
      const formData = new FormData();

      formData.append('AspId', id);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
      formData.append('orgName', orgName);
      if (logo) {
        formData.append('OrgLogoPath', logoFile);
      }
      const result = await updateOrganization(formData);
      if (result?.success) {
        toast.success(result.message);
        const data = await getOrganization(id);
        let logoPath = data.result[0].orgLogoPath
        console.log(data.result[0].orgLogoPath);
        let user = JSON.parse(localStorage.getItem("authUser"));
        user.orgLogo = logoPath;
        localStorage.setItem("authUser", JSON.stringify(user));
        console.log(user)
      }
      else {
        toast.error(result?.message);
      }



    }
  }

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0])
    setLogo(e.target.value);
  }



  return (
    <React.Fragment>
      <div className="page-content p-0">
        <Container fluid>

          {/* <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={user1}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}

          <h4 className="card-title mb-4">Update Profile</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={handleSubmit}
              >

                <div className="form-group mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="Email"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}

                  />
                  {!email && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>
                <div className="form-group mb-3">
                  <Label className="form-label">Phone Number</Label>
                  <Input
                    name="Phone Number"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Phone Number"
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}

                  />
                  {!phoneNumber && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>
                <div className="form-group mb-3">
                  <Label className="form-label">Organization Name</Label>
                  <Input
                    name="orgname"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Organization Name"
                    type="text"
                    onChange={(e) => setOrgName(e.target.value)}
                    onBlur={validation.handleBlur}
                    value={orgName}

                  />
                  {!orgName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>

                <div className="form-group mb-3">
                  <Label className="form-label">Address</Label>
                  <Input
                    name="address"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Address"
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}

                  />
                  {!address && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>
                <div className="form-group mb-3">
                  <Label className="form-label">City</Label>
                  <Input
                    name="city"
                    // value={name}
                    className="form-control"
                    placeholder="Enter City"
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}

                  />
                  {!city && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>
                <div className="form-group mb-3">
                  <Label className="form-label">State</Label>
                  <Input
                    name="state"
                    // value={name}
                    className="form-control"
                    placeholder="Enter State"
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}

                  />
                  {!state && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>
                <div className="form-group mb-3">
                  <Label className="form-label">Country</Label>
                  <Input
                    name="country"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Country"
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}

                  />
                  {!country && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                </div>
                <div className="form-group mb-3">
                  <Label className="form-label">Logo</Label>
                  <Input
                    name="logo"
                    // value={name}
                    className="form-control"
                    placeholder="Upload Logo"
                    type="file"
                    onChange={handleLogoChange}
                    value={logo}

                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update Profile
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);

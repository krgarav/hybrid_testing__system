import { useQuery } from "App";
import { LOGOUT_URL } from "helpers/url_helper";
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Authmiddleware = (props) => {
  const query = useQuery();
  if (!localStorage.getItem("authUser")) {
    const authUser = query.get('authtoken');

    if (authUser) {
      localStorage.setItem('authUser', authUser);
      localStorage.removeItem('showSuccessToast');
      // toast.success('Login successful!');

    }
    else {

      window.location.href = LOGOUT_URL;


      return null; // Or optionally return a loading indicator or message
    }
    // return (
    //   <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    // );
  }
  return (<React.Fragment>
    {props.children}
  </React.Fragment>);
};

export default Authmiddleware;




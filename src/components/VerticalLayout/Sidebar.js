import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import classes from "./Header.module.css";
const Sidebar = props => {
  const packName = JSON.parse(localStorage.getItem("authUser"))?.packageName;
  const [color, setColor] = React.useState("");


  useEffect(() => {
    console.log("packName --->", packName);
    if (packName == "gold") {
      setColor("rgb(239 233 204)");
    } else if (packName == "bronze") {
      setColor("rgba(242,191,146,255)");
    } else if (packName == "silver") {
      setColor("rgba(207,207,207,255)");
    }
  }, []);
  return (
    <React.Fragment>
      <div id="verticalDiv" className={`vertical-menu custom-scrollbar`} style={{ backgroundColor: color }} >
        <div data-simplebar className="" style={{ width: "15rem" }}>
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))

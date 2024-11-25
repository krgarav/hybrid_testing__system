import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link, useNavigate, } from "react-router-dom";
import withRouter from "components/Common/withRouter"

// users
import user1 from "../../../assets/images/users/user-1.jpg"
import { getOrganization } from "helpers/organization_helper"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate();

  const handleProfileClick = (link) => {
    navigate(link); // Navigate programmatically
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
          <i className="fas fa-user h1"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end" style={{ marginLeft: "25px" }}>
          <DropdownItem tag="a" onClick={() => handleProfileClick('/profile')}>
            <i className="mdi mdi-account-circle font-size-17 text-muted align-middle me-1" />
            {props.t("Profile")}
          </DropdownItem>
          <DropdownItem tag="a" onClick={() => handleProfileClick('/package')}>
            <i className="mdi mdi-gift font-size-17 text-muted align-middle me-1" />
            {props.t("Packages")}
          </DropdownItem>

          {/* <DropdownItem className="d-flex align-items-center" to="#">
            <i className="mdi mdi-cog font-size-17 text-muted align-middle me-1"></i>
            {props.t("Settings")}<span className="badge bg-success ms-auto">11</span></DropdownItem> */}
          {/* <DropdownItem tag="a" href="auth-lock-screen"> */}
          {/* <DropdownItem tag="a" >
            <i className="mdi mdi-lock-open-outline font-size-17 text-muted align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}

          <Link to="/logout" className="dropdown-item text-danger" style={{ display: "flex" }}>
            <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger" />
            <span style={{ display: "flex", alignSelf: "center", alignItems: "center", fontWeight: "bold", fontSize: "0.9rem" }} >{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
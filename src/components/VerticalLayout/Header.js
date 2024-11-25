import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"

import { connect } from "react-redux"

import { Link } from "react-router-dom"
import { useWindowSize } from 'react-use';

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

// import megamenuImg from "../../assets/images/megamenu-img.png"
import logo from "../../assets/images/logo-sm.png"
import ios from "../../assets/images/hts_logo.png";
import ios1 from "../../assets/images/1.png";
import logoLightPng from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"
import gold from "../../assets/images/golden.png"
import bronze from "../../assets/images/bronze.png"
import silver from "../../assets/images/silver.png"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

//css import
import classes from "./Header.module.css";
import { IMAGE_FETCH } from 'helpers/url_helper';

const Header = props => {
  const [search, setsearch] = useState(false)
  const [createmenu, setCreateMenu] = useState(false)
  const [logoHeight, setLogoHeight] = useState(80);
  const { width } = useWindowSize();
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  useEffect(() => {
    var body = document.body;
    var verticalBody = document.getElementById("verticalDiv");
    if (!body.classList.contains("vertical-collapsed") && width >= 998) {
      verticalBody.style.overflowY = "auto"; // Show vertical scrollbar
    } else {
      verticalBody.style.overflowY = "";
    }
  }, [width])
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  function tToggle() {

    if (logoHeight == 80) {
      setLogoHeight(30)
    }
    else {
      setLogoHeight(80)
    }
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");

    // var pageBody = document.querySelector(".page-content");
    // if (pageBody && width <= 998) {
    //   pageBody.classList.toggle(classes.mainpage);
    // }
    var blurDiv = document.getElementById("blur");
    var bodyHeight = document.body.scrollHeight;

    if (blurDiv && width <= 998) {
      var isDivPageActive = blurDiv.classList.toggle(classes.divPage);
      if (isDivPageActive) {
        blurDiv.style.height = bodyHeight + "px"; // Set blur div height to body height
      } else {
        blurDiv.style.height = ""; // Reset height to its default value
      }

    }

    var navBar = document.querySelector(".navbar-brand-box");
    if (navBar && width <= 998) {
      if (navBar.style.backgroundColor === "white") {
        navBar.style.backgroundColor = ""; // Reset to default value
        // Reset to default value
        // navBar.style.padding = "2px";
      } else {
        navBar.style.backgroundColor = "white";
        // navBar.style.padding = "";
      }
    }
    if (navBar) {
      if (navBar.style.padding === "") {
        navBar.style.padding = "2px";
      } else {
        navBar.style.padding = "";
      }

    }
  }

  const pack = JSON.parse(localStorage.getItem("authUser"))?.packageName;
  const logo = JSON.parse(localStorage.getItem("authUser")).orgLogo;
  useEffect(() => {
    console.log(logo)
  }, [])
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box pt-2" style={{ backgroundColor: width <= 998 && "white" }}>
              <Link to="/"
                className="logo logo-dark "

              >
                <img src={ios} alt="" height="40" style={{ color: "white" }} />
              </Link>

              <Link to="/" className="logo logo-light" >
                {/* <img src={ios} alt="" height={logoHeight} style={{ filter: "invert(1)" }} /> */}
                {!logo ?
                  <img src={ios} alt="" height={logoHeight} style={{ filter: "invert(1)" }} />
                  :
                  <img src={IMAGE_FETCH + logo} alt="" height={logoHeight} />
                }
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="mdi mdi-menu"></i>
            </button>

          </div>
          {
            pack == "bronze" &&
            <>
              <img src={bronze} alt="" height="40" />
            </>
          }
          {
            pack == "silver" &&
            <>
              <img src={silver} alt="" height="40" />
            </>
          }
          {
            pack == "gold" &&
            <>
              <img src={gold} alt="" height="40" />
            </>
          }
          <div className="d-flex">


            {/* <NotificationDropdown /> */}
            <ProfileMenu />

          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
}

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))

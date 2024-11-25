import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useAuth } from "context/authContext";

const SidebarContent = props => {
    const [auth] = useAuth();
    const [access, setAccess] = useState(null);
    const ref = useRef();

    // Correct the useEffect hook for auth access
    useEffect(() => {
        setAccess(auth.access);
    }, [auth.access]); // Add auth.access as a dependency

    const scrollElement = item => {
        if (item && ref.current) {
            const currentPosition = item.offsetTop;
            if (currentPosition > window.innerHeight) {
                ref.current.getScrollElement().scrollTop = currentPosition - 300;
            }
        }
    };

    const activateParentDropdown = useCallback(item => {
        if (!item) return;
        item.classList.add("active");
        let parent = item.parentElement;

        while (parent && parent.id !== "side-menu") {
            parent.classList.add("mm-show", "mm-active");
            if (parent.tagName === "LI") {
                parent.firstChild.classList.add("mm-active");
            }
            parent = parent.parentElement;
        }

        scrollElement(item);
    }, []);

    const removeActivation = useCallback(items => {
        Array.from(items).forEach(item => {
            item.classList.remove("active");
            let parent = item.parentElement;
            while (parent && parent.id !== "side-menu") {
                parent.classList.remove("mm-show", "mm-active");
                if (parent.tagName === "LI") {
                    parent.firstChild.classList.remove("mm-active");
                }
                parent = parent.parentElement;
            }
        });
    }, []);

    const activeMenu = useCallback(() => {
        const pathName = process.env.PUBLIC_URL + props.router.location.pathname;
        const ul = document.getElementById("side-menu");
        const items = ul.getElementsByTagName("a");
        removeActivation(items);
        let matchingMenuItem = Array.from(items).find(item => pathName === item.pathname);
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    }, [props.router.location.pathname, activateParentDropdown, removeActivation]);

    useEffect(() => {
        if (ref.current) {
            ref.current.recalculate();
        }
    }, []);

    useEffect(() => {
        const metis = new MetisMenu("#side-menu");
        return () => metis.dispose(); // Clean up the MetisMenu instance
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        activeMenu();
    }, [activeMenu]);

    return (
        <React.Fragment>
            <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">{props.t("Question Bank System")}</li>
                        <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="mdi mdi-view-dashboard"></i>
                                <span className="badge rounded-pill bg-primary float-end">2</span>
                                <span>{props.t("Dashboard")}</span>
                            </Link>
                        </li>
                        {access?.classAccess && (
                            <li>
                                <Link to="/#" className="has-arrow waves-effect">
                                    <i className="mdi mdi-calendar-check"></i>
                                    <span>{props.t("Class")}</span>
                                </Link>
                                <ul className="sub-menu">
                                    <li>
                                        <Link to="/create-class">{props.t("Create Class")}</Link>
                                    </li>
                                    <li>
                                        <Link to="/all-classes">{props.t("All Classes")}</Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    );
};

SidebarContent.propTypes = {
    router: PropTypes.object,
    t: PropTypes.func
};

export default withRouter(withTranslation()(SidebarContent));

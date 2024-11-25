import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { useAuth } from "context/authContext"

const oldcolor = "#09f3df";
// const color = "#000000";

const SidebarContent = props => {
  const [auth] = useAuth();
  const [access, setAccess] = useState(null);
  const [questionBankDisplay, setQuestionBankDisplay] = useState("none")
  const [examSystemDisplay, setExamSystemDisplay] = useState("none")
  const [administrationDisplay, setAdministrationDisplay] = useState("none")
  const [display, setDisplay] = useState({ classs: "", course: "", section: "", subSection: "", difficulty: "", question: "", questionPaper: "", schoolManagment: "", userManagment: "", studentManagment: "", centerManagment: "", language: "" });
  const packName = JSON.parse(localStorage.getItem("authUser"))?.packageName;
  const [color, setColor] = React.useState("");
  const [color2, setColor2] = React.useState("");
  const [color3, setColor3] = React.useState("");


  useEffect(() => {
    console.log("packName --->", packName);
    if (packName == "gold") {
      setColor("brown");
      setColor2("black");
      setColor3("white");
    } else if (packName == "bronze") {
      setColor("white");
      setColor2("black");
      setColor3("#6a6437");
    } else if (packName == "silver") {
      setColor("green");
      setColor2("black");
      setColor3("#6a6437");
    }
  }, []);



  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("authUser"))?.menuAccess?.[0];
    setAccess(a);
  }, []);

  useEffect(() => {
    setDisplay({
      ...display, ["classs"]: access?.classAccess, ["course"]: access?.courseAccess, ["section"]: access?.sectionAccess, ["subSection"]: access?.subSectionAccess,
      ["difficulty"]: access?.difficultyAccess, ["language"]: access?.languageAccess, ["question"]: access?.questionAccess, ["questionPaper"]: access?.questionPaperAccess, ["schoolManagment"]: access?.
        schoolAccess, ["userManagment"]: access?.userManagementAccess, ["studentManagment"]: access?.studentManagementAccess, ["centerManagment"]: access?.examCenterAccess, ["qbWorkflow"]: access?.qbWorkflowAccess
      ,
    })

  }, [access])


  useEffect(() => {
    if (display.classs || display.course || display.section || display.subSection || display.difficulty || display.question || display.qbWorkflow) {
      setQuestionBankDisplay("block");
    }
    if (display.questionPaper || display.schoolManagment || display.centerManagment || display.studentManagment) {
      setExamSystemDisplay("block");
    }
    if (display.userManagment) {
      setAdministrationDisplay("block");
    }
  }, [display])



  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    item.style.color = "white";

    item.style.backgroundColor = packName == "green";

    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li  31
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items?.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
        item.style.backgroundColor = "";
        item.style.color = "";
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items?.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.router.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar ref={ref}>
        <div id="sidebar-menu" >
          <ul className="metismenu list-unstyled" id="side-menu" >

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="mdi mdi-view-dashboard"></i>
                {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                <span style={{ fontSize: "1rem", color: color }}>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li className="menu-title" style={{ "display": questionBankDisplay, fontSize: ".8rem", color: color2 }}>{props.t("Question Bank System")} </li>

            <li style={{ "display": display.classs === true ? "block" : "none " }}>

              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-calendar-check" style={{ color: color }}></i>
                <span style={{ fontSize: "1rem", color: color }}>{props.t("Class")}</span>
              </Link>

              <ul className="sub-menu" >
                <li>
                  <Link to="/create-class">{props.t("Create Class")}</Link>
                </li>
                <li>
                  <Link to="/all-classes">{props.t("All Classes")} </Link>
                </li>
              </ul>

            </li>

            <li style={{ "display": display.course === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="fas fa-hdd" style={{ color: color }}></i>
                <span style={{ fontSize: "1rem", color: color }}>{props.t("Course")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-course">{props.t("Create Course")}</Link>
                </li>
                <li>
                  <Link to="/all-courses">{props.t("All Courses")} </Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.section === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-book" style={{ color: color }}></i>
                <span style={{ fontSize: "1rem", color: color }}>{props.t("Section")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-section">{props.t("Create Section")}</Link>
                </li>
                <li>
                  <Link to="/all-sections">{props.t("All Sections")} </Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.subSection === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-book" style={{ color: color }}></i>
                <span style={{ fontSize: "1rem", color: color }} >{props.t("Sub Section")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-subSection">{props.t("Create Sub Section")}</Link>
                </li>
                <li>
                  <Link to="/all-subSections">{props.t("All Sub Sections")} </Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.difficulty === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-book" style={{ color: color }}></i>
                <span style={{ fontSize: "1rem", color: color }}>{props.t("Difficulty")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-difficulty">{props.t("Create Difficulty")}</Link>
                </li>
                <li>
                  <Link to="/all-difficultys">{props.t("All Difficulties")} </Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.language === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-book" style={{ color: color }}></i>
                <span style={{ fontSize: "1rem", color: color }}>{props.t("Language")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-language">{props.t("Create Language")}</Link>
                </li>
                <li>
                  <Link to="/all-languages">{props.t("All Languages")} </Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.question === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect"  >

                <i className="fas fa-dice-d6" style={{ color: color }}></i>

                <span style={{ fontSize: "1rem", color: color }}>{props.t("Question")}</span>


              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-question">{props.t("Create Question")}</Link>
                </li>
                <li>
                  <Link to="/qc-return-questions">{props.t("QC Return Question")}</Link>
                </li>
                <li>
                  <Link to="/create-question-using-ai">{props.t("Genrate Question Using Ai")}</Link>
                </li>
                <li>
                  <Link to="/create-question-using-csv" style={{ fontSize: "calc(0.7rem + 0.05rem)" }}>{props.t("Create Question Using CSV")}</Link>
                </li>
                <li>
                  <Link to="/all-questions">{props.t("All Questions")} </Link>
                </li>
              </ul>
            </li>


            <li style={{ "display": display.qbWorkflow === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect"  >
                <i className="fas fa-dice-d6" style={{ color: color }}></i>

                <span style={{ fontSize: "1rem", color: color }}>{props.t("QB Workflow")}</span>


              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/qb-workflow">{props.t("Workflow")}</Link>
                </li>
                <li>
                  <Link to="/workflow-task">{props.t("Workflow Task")}</Link>
                </li>

              </ul>
            </li>



            <li style={{ "display": display.questionPaper === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-dice-d6" style={{ color: color }}></i>
                <span style={{ fontSize: ".9rem", color: color }}>{props.t("Question Paper")}</span>
              </Link>
              <ul className="sub-menu"  >
                <li>
                  <Link to="/create-question-paper">{props.t("Create Question Paper")}</Link>
                </li>
                <li>
                  <Link to="/all-question-papers">{props.t("All Question Papers")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title" style={{ "display": examSystemDisplay, fontSize: ".8rem", color: color2 }}>{props.t("Exam System")} </li>

            <li style={{ "display": display.schoolManagment === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-dice-d6" style={{ color: color }}></i>
                <span style={{ fontSize: ".9rem", color: color }}>{props.t("School Managment")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-new-school">{props.t("Create New School")}</Link>
                </li>
                <li>
                  <Link to="/all-school">{props.t("All School")}</Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.studentManagment === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-dice-d6" style={{ color: color }}></i>
                <span style={{ fontSize: ".9rem", color: color }}>{props.t("Studets Managment")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/upload-students">{props.t("Upload Student")}</Link>
                </li>
                <li>
                  <Link to="/all-students">{props.t("All Students")}</Link>
                </li>
              </ul>
            </li>

            <li style={{ "display": display.centerManagment === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-dice-d6" style={{ color: color }}></i>
                <span style={{ fontSize: ".9rem", color: color }}>{props.t("Exam Managment")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-exam">{props.t("Create Exam")}</Link>
                </li>
                <li>
                  <Link to="/all-exams">{props.t("All Exams")}</Link>
                </li>
                <li>
                  <Link to="/center-alloction">{props.t("Center Allocation")}</Link>
                </li>
                <li>
                  <Link to="/result">{props.t("Result")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title" style={{ "display": administrationDisplay, fontSize: ".8rem", color: color2 }}>{props.t("Administration")} </li>

            <li style={{ "display": display.userManagment === true ? "block" : "none " }}>
              <Link to="/#" className="has-arrow waves-effect">

                <i className="fas fa-dice-d6" style={{ color: color }}></i>
                <span style={{ fontSize: ".9rem", color: color }}>{props.t("User Managment")}</span>
              </Link>
              <ul className="sub-menu" >
                <li>
                  <Link to="/create-new-user">{props.t("Create New User")}</Link>
                </li>
                <li>
                  <Link to="/all-users">{props.t("All Users")}</Link>
                </li>
              </ul>
            </li>



          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))

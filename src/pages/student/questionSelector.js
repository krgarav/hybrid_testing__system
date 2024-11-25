import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { questionSliceAction } from "store/test/test";

const QuestionSelector = ({ visited, submit, question, jumpQuestion }) => {


  return (
    <div className="col animate__animated animate__fadeInDown test_screen_right bg-white">
      <div className="text-center">
        <div className="badge text-white bg-info p-2 fw-bolder my-2" style={{ fontSize: "1rem" }}>
          Question selector
        </div>
      </div>
      <div
        className="d-flex flex-wrap overflow-y-scroll mb-5"
        style={{ maxHeight: "350px" }}
      >
        {question?.map((current, index) => {
          let currentClassName = "";
          currentClassName =
            // visited[index] === true
            // ? "card m-1 text-center bg-warning text-white fw-bold"
            // : "card m-1 text-center bg-danger text-white fw-bold";
            visited[index] && submit[index]
              ? "card m-1 text-center bg-success text-white fw-bold"
              : !visited[index] && !submit[index]
                ? "card m-1 text-center bg-danger text-white fw-bold"
                : visited[index] && !submit[index]
                  ? "card m-1 text-center bg-warning text-white fw-bold"
                  : "";

          return (
            <div
              key={index}
              className={currentClassName}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                cursor: "pointer"
              }}
              onClick={() => jumpQuestion(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className=" p-2 bg-white mt-5" >
        <div className="row mt-5">
          <div className="col">
            <MdOutlineRadioButtonChecked className="text-success" /> solved{" "}
          </div>
          <div className="col">
            <MdOutlineRadioButtonChecked className="text-warning" /> skipped{" "}
          </div>
          <div className="col">
            <MdOutlineRadioButtonChecked className="text-danger" /> not visited{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionSelector;

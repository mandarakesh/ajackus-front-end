import React from "react";
import "../UpdateAndCreate/UpdateAndCreate.css";
import axios from "axios";

const Delete = ({ deleteData, setDeleteShow }) => {
  console.log(deleteData);
  const handleClick = async () => {
    await axios.delete(`https://ajackus-back-end.onrender.com/delete/${deleteData}`);
    setDeleteShow(false);
  };
  return (
    <div className="update-container">
      <div className="create-form-container">
        <div className="delete-container">
          <center>
            <p className="delete-symbol">⚠</p>
          </center>
          <p>Are You sure to Delete this user?</p>
          <hr />
          <div className="buttons-container">
            <button onClick={handleClick} className="delete-button">
              Delete{" "}
            </button>
            <button
              onClick={() => setDeleteShow(false)}
              className="success-button"
            >
              Cancel{" "}
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Delete;

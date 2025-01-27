import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateAndCreate from "./UpdateAndCreate/UpdateAndCreate";
import Delete from "./Delete/Delete";
import "./AllUsers.css";

const Allusers = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [showUpdate, setshowUpdate] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteData, setDelteData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const result = await axios.get("https://ajackus-back-end.onrender.com/users");
        setData(result.data);
      } catch (err) {
        setError(err?.response ? err.response.data : err.message);
      }
    }
    fetch();
  }, [showUpdate, deleteShow]);
  console.log(data);
  const handleUpdate = (item) => {
    setUpdateData(item);
    setshowUpdate(true);
  };
  const handleDelete = (item) => {
    setDelteData(item.id);
    setDeleteShow(true);
  };
  return (
    <div className="users-main-container">
      <center>
        <h2>Users</h2>{" "}
      </center>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: "15px",
          marginBottom: "15px",
        }}
      >
        <button onClick={handleUpdate} className="success-button">
          + Create{" "}
        </button>
      </div>
      <div className="user-list-container">
        {data.length <= 0 && !error && <p>Add Some Users</p>}

        {error && !data && <p>{error}</p>}

        {data &&
          !error &&
          data.length > 0 &&
          data.map((item, index) => (
            <div key={item.id} className="user-card-container">
              <p>
                {index + 1}. {item.firstName} {item.lastName}{" "}
              </p>
              <hr />
              <p> First Name : {item.firstName}</p>
              <p>Last Name : {item.lastName}</p>
              <p>Email : {item.email}</p>
              <p>Department : {item.department}</p>
              <div className="buttons-container">
                <button
                  onClick={() => handleUpdate(item)}
                  className="success-button"
                >
                  Update{" "}
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {showUpdate && (
        <UpdateAndCreate
          updateData={updateData}
          setshowUpdate={setshowUpdate}
        />
      )}
      {deleteShow && (
        <Delete deleteData={deleteData} setDeleteShow={setDeleteShow} />
      )}
    </div>
  );
};
export default Allusers;

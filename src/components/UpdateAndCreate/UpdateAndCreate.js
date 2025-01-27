//allUsetrs.css   .users-main-container {     height: 100%;     width: 100%;     align-items: center;     justify-content: center;   }   .user-list-container {     display: flex;     flex-direction: row;     flex-wrap: wrap;     gap: 10px;     padding-left: 25px;   }   .user-card-container {     background-color: rgb(96, 170, 170);     padding: 5px 15px;     border-radius: 5px;     color: white;   }   .user-card-container:hover {     scale: 1.05;   }      .buttons-container {     display: flex;     flex-direction: row;     justify-content: space-between;     padding: 8px 10px 10px 5px;   }   .success-button {     background-color: rgb(24, 122, 73);     color: white;     cursor: pointer;     border: none;     padding: 10px 15px;     border-radius: 6px;   }      .success-button:hover {     background-color: rgb(22, 97, 61);   }      .delete-button {     background-color: rgb(199, 63, 63);     color: white;     cursor: pointer;     border: none;     padding: 10px 15px;     border-radius: 6px;   }      .delete-button:hover {     background-color: rgb(141, 37, 37);   }         //allUsetrs.css
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./UpdateAndCreate.css";
import axios from "axios";
import * as Yup from "yup";

const UpdateAndCreate = ({ updateData, setshowUpdate }) => {
  const handleClose = () => {
    setshowUpdate(false);
  };
  const data = { firstName: "", lastName: "", department: "", email: "" };
  const valdateSchema = Yup.object({
    firstName: Yup.string().required("firstName is Requied"),
    lastName: Yup.string().required("lastName is Requied"),
    department: Yup.string().required("department is Requied"),
    email: Yup.string().required("email is Requied"),
  });
  return (
    <div className="update-container">
      <Formik
        initialValues={updateData.firstName ? updateData : data}
        validationSchema={valdateSchema}
        onSubmit={async (values) => {
          if (updateData.firstName) {
            await axios.put("http://localhost:4000/users", values);
          } else {
            await axios.post("http://localhost:4000/users", values);
          }
          setshowUpdate(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {" "}
            <div className="create-form-container">
              <center>
                <h3 style={{ margin: 0, marginBottom: "5px" }}>
                  {" "}
                  {updateData.firstName ? "Update" : "Create"}
                </h3>{" "}
              </center>
              <div className="create-fields-container">
                <label>First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className={`${
                    errors["firstName"] && touched["firstName"]
                      ? "error create-input "
                      : " create-input"
                  }`}
                  placeholder="First Name"
                />
                {errors["firstName"] && (
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-component"
                  />
                )}
                <label>Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  className={`${
                    errors["lastName"] && touched["lastName"]
                      ? "error create-input "
                      : " create-input"
                  }`}
                  placeholder="Last Name"
                />
                {errors["lastName"] && (
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-component"
                  />
                )}
                <label>Department</label>
                <Field
                  type="text"
                  name="department"
                  className={`${
                    errors["department"] && touched["department"]
                      ? "error create-input "
                      : " create-input"
                  }`}
                  placeholder="Department"
                />
                {errors["department"] && (
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="error-component"
                  />
                )}
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`${
                    errors["email"] && touched["email"]
                      ? "error create-input "
                      : " create-input"
                  }`}
                  placeholder="example@gmail.com"
                />
                {errors["email"] && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-component"
                  />
                )}
              </div>
              <div className="buttons-container">
                <button type="submit" className="success-button">
                  Submit{" "}
                </button>
                <button
                  onClick={handleClose}
                  type="button"
                  className="delete-button"
                >
                  Close{" "}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default UpdateAndCreate;

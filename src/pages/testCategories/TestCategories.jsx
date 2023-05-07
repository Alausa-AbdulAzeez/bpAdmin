import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./testCategories.scss";
import AlertDialogSlide from "../../components/Dialogue";
import { Autocomplete, TextField } from "@mui/material";
import { privateRequest, publicRequest } from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestCategories = () => {
  const [open, setOpen] = React.useState(false);
  const toastId = React.useRef(null);

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // FUNCTIONALITIES PARTAINING TO FETCHING AND SETTING ROLES

  const [roles, setRoles] = useState([]);

  // fetch roles
  const getRoles = async () => {
    try {
      const res = await publicRequest.get("/Account/roles");

      if (res) {
        console.log(res.data.data);
        setRoles(res.data.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end of fetch roles

  // use effect for fetching roles
  useEffect(() => {
    getRoles();
  }, []);
  // end of use effect for fetching roles

  // END FUNCTIONALITIES PARTAINING TO ROLES

  // FUNCTIONALITIES FOR CREATING A NEW STAFF
  const [staff, setStaff] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
  });

  // function for setting staff info
  const handleStaffData = (e, dataName, data) => {
    setStaff((prev) => {
      return { ...prev, [dataName]: data ? data.name : e.target.value };
    });
  };
  // end of function for setting staff info

  const createStaff = async () => {
    // const id = toast.loading('Please wait...')
    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });

    try {
      await privateRequest
        .post("/Account/profile-application-user", staff)
        .then((response) => {
          toast.update(toastId.current, {
            render: "Staff has been added succesfully!",
            type: "success",
            isLoading: false,
          });
        });
    } catch (error) {
      console.log(error.response);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: `${
          error.response.data.title ||
          error.response.data.description ||
          "Something went wrong, please try again"
        }`,
      });
    }
  };

  //END OF FUNCTIONALITIES FOR CREATING A NEW STAFF

  return (
    <>
      <ToastContainer />
      <div className="testCategoryWrapper">
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title="Cancel"
          link="/manageStaff"
          message="Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost."
        />
        <Sidebar />
        <div className="testCategoryRight">
          <Topber />
          <div className="testCategoryMainWrapper">
            <h2> Add New Test</h2>
            <div className="testCategoryFormWrapper">
              <div className="inputsWrapper">
                <div className="singleInput">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={roles}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, option) => handleStaffData(e, "role", option)}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Client Name" />
                    )}
                  />
                </div>
                <div className="singleInput">
                  <p>Test Category Name</p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) => handleStaffData(e, "name")}
                    />
                  </div>
                </div>
                <div className="multipleSelectWrapper">
                  {/* <div className="multipleSelectContainer"> */}
                  <div className="multipleSelect">
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      defaultValue={[top100Films[1]]}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="SelectedTests"
                          placeholder="Test"
                        />
                      )}
                    />
                  </div>
                  {/* </div> */}
                </div>

                <div className="textAreaInput">
                  <p>Description</p>
                  <div className="textAreaWrapper">
                    <textarea
                      type="text"
                      className="textArea"
                      cols={50}
                      rows={5}
                      onChange={(e) => handleStaffData(e, "email")}
                      style={{ padding: "10px", outline: "none" }}
                    />
                  </div>
                </div>
              </div>
              <div className="bottomButtons">
                <button
                  className="cancelClientEditBtn"
                  onClick={handleClickOpen}
                >
                  Cancel
                </button>
                <button className="testCategoryEditBtn" onClick={createStaff}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestCategories;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./testCategories.scss";
import AlertDialogSlide from "../../components/Dialogue";
import { Autocomplete, TextField } from "@mui/material";
import { publicRequest } from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const TestCategories = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  // CURRENT USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // TO SET THE STATE OF THE DONE AND CANCEL BUTTONS
  const [disableDoneAndCancelBtn, setDisableDoneAndCancelBtn] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TEST DATA FUNCTIONALITIES
  const [tests, setTests] = useState([]);
  const getAllTests = async () => {
    try {
      const res = await publicRequest.get("/Test", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setTests(res.data?.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // use effect to call the getAllTest function as the page loads
  useEffect(() => {
    getAllTests();
  }, []);
  // end of use effect to call the getAllTest function as the page loads
  // END OF TEST DATA FUNCTIONALITIES

  //  FUNCTIONALITIES FOR FETCHING AND CLIENTS
  const [clients, setClients] = useState([]);
  const getAllClients = async () => {
    try {
      const res = await publicRequest.get("Client/Client-list", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setClients(res.data.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients();
  }, []);
  // end of use effect to call the getAllClients function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND CLIENTS

  // FUNCTIONALITIES FOR CREATING A NEW TEST CATEGORY
  const [testCategory, setTestCategory] = useState({
    clientId: "",
    categoryName: "",
    categoryDescription: "",
    tests: [],
    amount: "",
  });

  // function for setting testCategory info
  const handleTestCategoryInfo = (e, dataName, data) => {
    if (dataName === "tests") {
      const tests = data.map((singleTest) => {
        return {
          testId: singleTest.testId,
        };
      });
      setTestCategory((prev) => {
        return {
          ...prev,
          tests: [...tests],
        };
      });
    } else {
      setTestCategory((prev) => {
        return { ...prev, [dataName]: data ? data.clientId : e.target.value };
      });
    }
  };
  // end of function for testCategory info

  // function for creating a test category
  const createTestCategory = async (event) => {
    event.preventDefault();
    // const id = toast.loading('Please wait...')
    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableDoneAndCancelBtn(true);

    try {
      await publicRequest
        .post("/Test/test-category", testCategory, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.update(toastId.current, {
            render: "Test category created succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableDoneAndCancelBtn(false);
        })
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error.response);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Something went wrong, please try again"
        }`,
      });
      setDisableDoneAndCancelBtn(false);
    }
  };
  // end of function for creating a test category

  // USEEFFECT FOR RESETTING TEST CATEGOTY INPUT AFTER SUCCESSFUL CREATION
  useEffect(() => {}, [testCategory]);

  //END OF FUNCTIONALITIES FOR CREATING A NEW TEST CATEGORY
  return (
    <>
      <ToastContainer />
      <div className="testCategoryWrapper">
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title="Cancel"
          link="/testCategories"
          message="Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost."
        />
        <Sidebar />
        <div className="testCategoryRight">
          <Topber />
          <div className="testCategoryMainWrapper">
            <h2> Add Test Category</h2>
            <form
              className="testCategoryFormWrapper"
              onSubmit={createTestCategory}
            >
              <div className="inputsWrapper">
                <div className="singleInput">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => option.clientName}
                    onChange={(e, option) =>
                      handleTestCategoryInfo(e, "clientId", option)
                    }
                    className="autoCompleteInput"
                    // value={(option) => option.clientName}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Client Name" required />
                    )}
                  />
                </div>
                <div className="singleInput">
                  <p>
                    Test Category Name <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) =>
                        handleTestCategoryInfo(e, "categoryName")
                      }
                      required
                      value={testCategory.categoryName}
                    />
                  </div>
                </div>
                <div className="amountAndDesc">
                  <div className="singleInput amount">
                    <p>
                      Amount <span>*</span>
                    </p>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="input"
                        onChange={(e) => handleTestCategoryInfo(e, "amount")}
                        required
                        value={testCategory.amount}
                      />
                    </div>
                  </div>

                  <div className="textAreaInput">
                    <p>
                      Description <span>*</span>
                    </p>
                    <div className="textAreaWrapper">
                      <textarea
                        type="text"
                        className="textArea"
                        cols={50}
                        rows={5}
                        onChange={(e) =>
                          handleTestCategoryInfo(e, "categoryDescription")
                        }
                        style={{ padding: "10px", outline: "none" }}
                        value={testCategory.categoryDescription}
                      />
                    </div>
                  </div>
                </div>

                <div className="multipleSelectWrapper">
                  {/* <div className="multipleSelectContainer"> */}
                  <div className="multipleSelect">
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={tests}
                      getOptionLabel={(option) => option.testName}
                      className="autoCompleteInput"
                      onChange={(e, option) =>
                        handleTestCategoryInfo(e, "tests", option)
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="SelectedTests"
                          placeholder="Test"
                          required
                          inputProps={{
                            ...params.inputProps,
                            required: tests.length === 0,
                          }}
                        />
                      )}
                    />
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="bottomButtons">
                <button
                  className="cancelClientEditBtn"
                  onClick={handleClickOpen}
                  disabled={disableDoneAndCancelBtn}
                >
                  Cancel
                </button>
                <button
                  className="testCategoryEditBtn"
                  // onClick={createTestCategory}
                  disabled={disableDoneAndCancelBtn}
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestCategories;

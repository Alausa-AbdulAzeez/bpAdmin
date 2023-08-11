import { Autocomplete, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdCancel, MdEdit } from "react-icons/md";
import ErrorComponent from "../../components/error/Error";

import { RiAddLine } from "react-icons/ri";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./partnerLabs.scss";
import { Link } from "react-router-dom";
import { publicRequest } from "../../functions/requestMethods";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import AlertDialogSlide from "../../components/Dialogue";

const PartnerLabs = () => {
  // MISCELLANEOUS
  const [pageSize, setPageSize] = useState(50);
  const [resetDropdown, setResetDropdown] = useState(false);
  const toastId = React.useRef(null);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user);
  const userData = currentUser?.data;

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // DATA FOR TOGGLE ALERT
  const [open, setOpen] = React.useState(false);

  // CANDIDATE TO BE EDITED INFO
  const [laboratoryToBeEdited, setlaboratoryToBeEdited] = useState({});
  // CANDIDATE TO BE DELETED INFO
  const [laboratoryToBeDeleted, setlaboratoryToBeDeleted] = useState({});

  // DATA TO BE DISPLAYED IN THE INPUTS AND SENT TO THE BACKEND
  const [updatedLaboratoryInfo, setUpdatedLaboratoryInfo] = useState({});

  // SLIDE POSITION
  const [position, setPosition] = useState("-100%");

  // TO SET THE STATE OF THE UPDATE BUTTON
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);

  // hide slide function
  const handleHideSlide = () => {
    setResetDropdown((prev) => !prev);
    setPosition("-100%");
  };
  // end of hide slide function

  // STATES
  const states = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",

    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  // LAB TYPES
  const labTypes = ["PartnerLab", "Branch", "MainLab"];

  const columns = [
    { field: "laboratoryName", headerName: "Laboratory Name", width: 190 },
    {
      field: "state",
      headerName: "Laboratory Location",
      width: 200,
      editable: true,
    },
    {
      field: "type",
      headerName: "Laboratory Type",
      width: 200,
      editable: true,
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      width: 200,
      editable: true,
    },
    {
      field: "contactPhoneNumber",
      headerName: "Contact Person No.",
      width: 200,
      editable: true,
    },
    {
      field: "contactEmailAddress",
      headerName: "Contact Person Email",
      width: 200,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
      renderCell: (props) => {
        return (
          <div className="buttons">
            <div className="editWrapper">
              <div className="edit" onClick={() => showSlide(props)}>
                Edit
              </div>
              <MdEdit className="editIcon" />
            </div>
            <div className="deleteWrapper">
              <div className="delete" onClick={() => handleClickOpen(props)}>
                Delete
              </div>
              <BsTrashFill className="deleteIcon" />
            </div>
          </div>
        );
      },
    },
  ];

  // TABLE ROW DATA
  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // FUNCTION TO GET AND SET ALL LABORATORIES
  const getAllLaboratories = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/Laboratory", {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setRows(res.data?.data);
        setFilteredData(res.data?.data);

        setLoading(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error);

      console.log(error);
    }
  };
  // END OF FUNCTION TO GET AND SET ALL LABORATORIES

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredLabsArray;
    filteredLabsArray = rows?.filter((tableDatum) =>
      tableDatum?.laboratoryName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    );
    setFilteredData(filteredLabsArray);
    // console.log(filteredPendingCandidatesArray)
  };
  // END OF SEARCH FUNCTIONALITY

  // function for setting laboratory info
  const handleLaboratoryData = (e, dataName, data) => {
    setUpdatedLaboratoryInfo((prev) => {
      return { ...prev, [dataName]: data ? data.name : e.target.value };
    });
  };
  // end of function for setting laboratory info

  // FUNCTION TO SET LABORATORY STATE AND TYPE
  const setLaboratoryInfo = (e, dataName, data) => {
    setUpdatedLaboratoryInfo({ ...updatedLaboratoryInfo, [dataName]: data });
  };
  // END OF // FUNCTION TO SET LABORATORY STATE AND TYPE

  // handlerowclick function
  const showSlide = (props) => {
    // getCandidate(props?.row)
    setlaboratoryToBeEdited(props?.row);
    setUpdatedLaboratoryInfo(props?.row);
    if (position !== "0") {
      setPosition("0");
    }
  };
  // end of  handlerowclick function

  // FUNCTIONS TO TOGGLE ALERT SLIDE
  const handleClickOpen = (props) => {
    setOpen(true);
    setlaboratoryToBeDeleted(props?.row);
  };

  const handleClose = () => {
    setOpen(false);
    // handleDeleteTest()
  };
  // END OF FUNCTIONS TO TOGGLE ALERT SLIDE

  // function for seting laboratory info
  const handleUpdateLabInfo = (e, dataName, data) => {
    if (dataName === "testCategory") {
      setUpdatedLaboratoryInfo((prev) => {
        return {
          ...prev,
          testcategory: data?.categoryName,
        };
      });
    } else {
      setUpdatedLaboratoryInfo((prev) => {
        return {
          ...prev,
          [dataName]: e.target.value,
        };
      });
    }
  };
  // end of function for seting candidate info

  // FUNCTION TO UPDATE PARTNER LABS

  const handlePartnerLabUpdate = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableUpdateBtn(true);

    try {
      await publicRequest
        .put(
          `/Laboratory/${updatedLaboratoryInfo?.id}`,
          updatedLaboratoryInfo,
          {
            headers: {
              Accept: "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async () => {
          toast.update(toastId.current, {
            render: "Laboratory Updated succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableUpdateBtn(false);
          handleHideSlide();
          await getAllLaboratories();
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
      setDisableUpdateBtn(false);
    }
  };

  // END OF FUNCTION TO UPDATE A PARTNER LAB

  // FUNCTION TO DELETE SINGLE LABORATORY
  const handleDeleteLaboratory = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    try {
      await publicRequest
        .delete(`Laboratory/${laboratoryToBeDeleted?.id}`, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.update(toastId.current, {
            render: "Laboratory deleted successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
        })
        .then(async () => {
          handleClose();
          return await getAllLaboratories();
        });
    } catch (error) {
      console.log(error);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          "Could not delete laboratory. Try again"
        }`,
      });
      setOpen(false);
    }
  };
  // END OF FUNCTION TO DELETE SINGLE LABORATORY

  // USE EFFECT TO GET AND SET ALL LABORATORIES AS THE PAGE LOADS
  useEffect(() => {
    getAllLaboratories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USE EFFECT TO SET SELECTED CANDIDATE
  useEffect(() => {}, [laboratoryToBeEdited]);

  return (
    <>
      <ToastContainer />
      <div className="partnerLabsWrapper">
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title="Delete"
          link="/partnerLabs"
          message="Warning!! Are you sure you want to delete this laboratory? Action cannot be undone"
          action={handleDeleteLaboratory}
        />
        <Sidebar />
        <div className="partnerLabsRight">
          <Topber userData={userData} />
          <div className="partnerLabsMainWrapper">
            <div className="partnerLabsMainTop">
              <h3>Partner Laboratories</h3>
              <TextField
                id="outlined-search"
                label="Search"
                type="search"
                className="candidateSearchName"
                onChange={(e) => handleSearchParamsChange(e)}
                size="small"
              />
              <Link to={"/partnerLabs/addLab"}>
                <button className="addLabBtn">
                  Add Laboratory
                  <span>
                    <RiAddLine className="addIcon" />
                  </span>
                </button>
              </Link>
            </div>
            <div
              className={
                position === "-100%" ? "zeroWidth" : "manageCandidatesSlide"
              }
              style={{ right: position }}
            >
              <div className="slideTop">
                <div className="cancelconWrapper" onClick={handleHideSlide}>
                  <MdCancel className="cancelIcon" />
                </div>
                <div className="initials">
                  {laboratoryToBeEdited?.laboratoryName?.[0]}
                </div>
                <div className="slideFullname">
                  {laboratoryToBeEdited?.laboratoryName}
                </div>
              </div>

              <div className="updateUserSlideBottom">
                <div className="updateUserInputWrapper">
                  <p>
                    Laboratory Name <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="updateLabInput"
                      required
                      onChange={(e) => handleUpdateLabInfo(e, "laboratoryName")}
                      value={updatedLaboratoryInfo.laboratoryName}
                    />
                  </div>
                </div>
                <div className="updateUserInputWrapper">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={states}
                    onChange={(e, option) =>
                      setLaboratoryInfo(e, "state", option)
                    }
                    key={resetDropdown}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="State" required />
                    )}
                  />
                </div>
                <div className="updateUserInputWrapper">
                  <p>
                    Address <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="updateLabInput"
                      onChange={(e) => handleUpdateLabInfo(e, "address")}
                      value={updatedLaboratoryInfo.address}
                      required
                    />
                  </div>
                </div>

                <div className="updateUserInputWrapper">
                  <p>
                    Contact Person <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="string"
                      className="updateLabInput"
                      onChange={(e) => handleUpdateLabInfo(e, "contactPerson")}
                      value={updatedLaboratoryInfo.contactPerson}
                      required
                    />
                  </div>
                </div>
                <div className="updateUserInputWrapper">
                  <p>
                    Email (Contact Person)<span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="email"
                      className="updateLabInput"
                      onChange={(e) =>
                        handleUpdateLabInfo(e, "contactEmailAddress")
                      }
                      value={updatedLaboratoryInfo.contactEmailAddress}
                      required
                    />
                  </div>
                </div>
                <div className="updateUserInputWrapper">
                  <p>
                    Phone Number (Contact Person) <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="string"
                      className="updateLabInput"
                      onChange={(e) =>
                        handleUpdateLabInfo(e, "contactPhoneNumber")
                      }
                      value={updatedLaboratoryInfo.contactPhoneNumber}
                      required
                    />
                  </div>
                </div>
                <div className="updateUserInputWrapper">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={labTypes}
                    onChange={(e, option) =>
                      setLaboratoryInfo(e, "type", option)
                    }
                    key={resetDropdown}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Lab Type" required />
                    )}
                  />
                </div>
              </div>
              <button
                className="updateUserBtn"
                onClick={handlePartnerLabUpdate}
                disabled={disableUpdateBtn}
              >
                Update
              </button>
            </div>
            <div className="partnerLabsMainBottom">
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <Box sx={{ height: 500, width: "100%" }}>
                  <DataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSize={pageSize}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[50, 150, 200]}
                    pagination
                  />
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerLabs;

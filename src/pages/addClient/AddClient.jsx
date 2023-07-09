import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./addClient.scss";
import AlertDialogSlide from "../../components/Dialogue";
import "react-toastify/dist/ReactToastify.css";

import { publicRequest } from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddClient = () => {
  // TOAST
  const [open, setOpen] = React.useState(false);
  const toastId = React.useRef(null);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // TO SET THE STATE OF THE DONE AND CANCEL BUTTONS
  const [disableDoneAndCancelBtn, setDisableDoneAndCancelBtn] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // FUNCTIONALITIES FOR CREATING A NEW CLIENT

  const [client, setClient] = useState({
    clientName: "",
    address: "",
    phoneNumber: "",
    email: "",
    contactPerson: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
  });

  // function for setting client info
  const handleClientData = (e, dataName, data) => {
    setClient((prev) => {
      return { ...prev, [dataName]: data ? data.name : e.target.value };
    });
  };
  // end of function for setting client info

  // create client function
  const addClient = async () => {
    // const id = toast.loading('Please wait...')
    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });

    setDisableDoneAndCancelBtn(true);

    try {
      await publicRequest
        .post("/Client/profile-client", client, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.update(toastId.current, {
            render: "Client has been added succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableDoneAndCancelBtn(false);
          setClient({
            clientName: "",
            address: "",
            phoneNumber: "",
            email: "",
            contactPerson: "",
            contactPersonPhone: "",
            contactPersonEmail: "",
          });
        });
    } catch (error) {
      console.log(error.response);
      toast.update(toastId.current, {
        type: "error",
        autoClose: 2500,
        isLoading: false,
        render: `${
          error.response.data.title ||
          error.response.data.description ||
          "Something went wrong, please try again"
        }`,
      });
      setDisableDoneAndCancelBtn(false);
    }
  };
  // end of create client function
  // useEffect to reset input to default
  useEffect(() => {}, [client]);
  // end of useEffect to reset input to default
  // END OF FUNCTIONALITIES FOR CREATING A NEW CLIENT
  return (
    <>
      <ToastContainer />
      <div className="addClientWrapper">
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title="Cancel"
          link="/manageClients"
          message="Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost."
        />
        <Sidebar />
        <div className="addClientRight">
          <Topber />
          <div className="addClientMainWrapper">
            <h2> Add New Client</h2>
            {/* <HorizontalStepper properties={properties} /> */}
            <div className="formWrapper">
              <div className="inputsWrapper">
                <div className="singleInput">
                  <p>Client Name</p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) => handleClientData(e, "clientName")}
                      value={client.clientName}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>Address</p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) => handleClientData(e, "address")}
                      value={client.address}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>Email</p>
                  <div className="inputWrapper">
                    <input
                      type="email"
                      className="input"
                      onChange={(e) => handleClientData(e, "email")}
                      value={client.email}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>Phone Number</p>
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className="input"
                      onChange={(e) => handleClientData(e, "phoneNumber")}
                      value={client.phoneNumber}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>Contact Person</p>
                  <div className="inputWrapper">
                    <input
                      type="string"
                      className="input"
                      onChange={(e) => handleClientData(e, "contactPerson")}
                      value={client.contactPerson}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>Email (Contact Person)</p>
                  <div className="inputWrapper">
                    <input
                      type="string"
                      className="input"
                      onChange={(e) =>
                        handleClientData(e, "contactPersonEmail")
                      }
                      value={client.contactPersonEmail}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>Phone Number (Contact Person)</p>
                  <div className="inputWrapper">
                    <input
                      type="string"
                      className="input"
                      onChange={(e) =>
                        handleClientData(e, "contactPersonPhone")
                      }
                      value={client.contactPersonPhone}
                    />
                  </div>
                </div>
              </div>

              <button
                className="cancelClientEditBtn"
                onClick={handleClickOpen}
                disabled={disableDoneAndCancelBtn}
              >
                Cancel
              </button>

              <button
                className="addClientEditBtn"
                onClick={addClient}
                disabled={disableDoneAndCancelBtn}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClient;

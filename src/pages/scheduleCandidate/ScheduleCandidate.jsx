// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect, useState } from 'react'
// import Sidebar from '../../components/sidebar/Sidebar'
// import Topber from '../../components/topbar/Topber'
// import './scheduleCandidate.scss'
// import AlertDialogSlide from '../../components/Dialogue'
// import { Autocomplete, TextField } from '@mui/material'
// import { publicRequest } from '../../functions/requestMethods'
// import DatePicker from 'react-datepicker'

// import 'react-datepicker/dist/react-datepicker.css'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// const ScheduleCandidate = () => {
//   // MISCELLANEOUS
//   const [open, setOpen] = React.useState(false)
//   const date = new Date().toISOString()
//   const toastId = React.useRef(null)

//   // LOGGED IN USER TOKEN
//   const { token } = useSelector((state) => state?.user?.currentUser?.data)

//   // TO SET THE STATE OF THE DONE AND CANCEL BUTTONS
//   const [disableDoneAndCancelBtn, setDisableDoneAndCancelBtn] = useState(false)

//   // TO SET THE STATE OF TEST CATEGORY INPUT
//   const [loadingTestCategory, setLoadingTestCategory] = useState(true)

//   // FILE TO BE UPLOADED
//   const [selectedFile, setSelectedFile] = useState(null)
//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   // ALL LABORATORIES
//   const [laboratories, setLaboratories] = useState([])

//   const handleClose = () => {
//     setOpen(false)
//   }
//   // END OF MISCELLANEOUS

//   // DATE SELECTION AND CHANGE FUNCTIONALITIES
//   const [startDate, setStartDate] = useState(new Date())
//   // function for handling date chande
//   const handleDateChange = (selectedDate) => {
//     setStartDate(selectedDate)
//     setScheduleInfo((prev) => {
//       return {
//         ...prev,
//         appointmentdate: selectedDate?.toISOString(),
//       }
//     })
//     // end of function for handling date chande
//   }
//   // END OF DATE SELECTION AND CHANGE FUNCTIONALITIES

//   //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS
//   const [clients, setClients] = useState([])
//   // function to get all clients
//   const getAllClients = async () => {
//     try {
//       const res = await publicRequest.get('Client/Client-list', {
//         headers: {
//           Accept: '*',
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (res.data) {
//         setClients(res.data.data)
//       } else {
//         console.log(res.data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   // end of function to get all clients

//   // use effect to call the getAllClients function as the page loads
//   useEffect(() => {
//     getAllClients()
//   }, [])
//   // end of use effect to call the getAllClients function as the page loads
//   //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

//   // FUNCTIONALITY FOR SETTING SCHEDULE INFO
//   const [scheduleInfo, setScheduleInfo] = useState({
//     candidateName: '',
//     phoneNumber: '',
//     createdDate: date,
//     email: '',
//     address: '',
//     appointmentdate: null,
//     clientid: '',
//     testcategory: '',
//     status: 'PENDING',
//     laboratoryId: '',
//   })

//   // function for seting candidate info
//   const [clientId, setClientId] = useState(null)
//   const handlescheduleCandidateInfo = (e, dataName, data) => {
//     if (dataName === 'test') {
//       setScheduleInfo((prev) => {
//         return {
//           ...prev,
//           testcategory: data?.categoryName,
//         }
//       })
//     } else if (dataName === 'clientid') {
//       setScheduleInfo((prev) => {
//         return { ...prev, [dataName]: data?.clientId?.toString() }
//       })
//       setClientId(data?.clientId)
//       setLoadingTestCategory(true)
//     } else if (dataName === 'laboratoryId') {
//       setScheduleInfo((prev) => {
//         return { ...prev, [dataName]: data?.id?.toString() }
//       })
//     } else {
//       setScheduleInfo((prev) => {
//         return { ...prev, [dataName]: e.target.value }
//       })
//     }
//   }
//   // end of function for seting candidate info
//   // useeffect for updating client id
//   useEffect(() => {}, [clientId])
//   // end of useeffect for updating client id

//   // function for scheduling a candidate
//   const handleScheduleCandidate = async (e) => {
//     e.preventDefault()
//     toastId.current = toast('Please wait...', {
//       autoClose: 2500,
//       isLoading: true,
//     })

//     setDisableDoneAndCancelBtn(true)
//     console.log(scheduleInfo)

//     try {
//       await publicRequest
//         .post('/Candidate', scheduleInfo, {
//           headers: {
//             Accept: '*',
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then(() => {
//           toast.update(toastId.current, {
//             render: 'Candidate scheduled succesfully!',
//             type: 'success',
//             isLoading: false,
//             autoClose: 2500,
//           })
//           setDisableDoneAndCancelBtn(false)
//         })
//         .then(() => {
//           window.location.reload()
//           // setScheduleInfo({
//           //   candidateName: '',
//           //   phoneNumber: '',
//           //   createdDate: date,
//           //   email: '',
//           //   address: '',
//           //   appointmentdate: startDate?.toISOString(),
//           //   clientid: '',
//           //   testcategory: '',
//           //   status: 'PENDING',
//           // })
//         })
//     } catch (error) {
//       console.log(error.response)
//       toast.update(toastId.current, {
//         type: 'error',
//         autoClose: 2500,
//         isLoading: false,
//         render: `${
//           error?.response?.data?.title ||
//           error?.response?.data?.description ||
//           error?.message ||
//           'Something went wrong, please try again'
//         }`,
//       })
//       setDisableDoneAndCancelBtn(false)
//     }
//   }
//   // end of function for creating a test category

//   // END OF FUNCTIONALITY FOR SETTING SCHEDULE INFO
//   //  FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES
//   const [testCategory, setTestCategory] = useState([])

//   // function to get all TestCategories
//   const getAllTestCategories = async () => {
//     try {
//       const res = await publicRequest.get(`Test/test-category/${clientId}`, {
//         headers: {
//           Accept: '*',
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (res.data) {
//         setTestCategory(res.data.data)
//         setLoadingTestCategory(false)
//       } else {
//         console.log(res.data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   // end of function to get all TestCategories
//   // function to get all Laboratories
//   const getAllLaboratories = async () => {
//     try {
//       const res = await publicRequest.get(`/Laboratory`, {
//         headers: {
//           Accept: '*',
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (res.data) {
//         setLaboratories(res?.data?.data)
//         console.log(res?.data?.data)
//       } else {
//         console.log(res.data)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   // end of function to get all Laboratories

//   //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES

//   const file = document.getElementById('file')
//   // FUNCTION TO HANDLE FILE CHANGE
//   const handleSelectedFile = (e) => {
//     setSelectedFile(e.target?.files[0])

//     // console.log(file.value)
//   }

//   // function to set filestate to default
//   const setFileToDefault = () => {
//     file.value = file?.defaultValue
//   }
//   // end of function to set filestate to default

//   //END OF FUNCTION TO HANDLE FILE CHANGE

//   // FUNCTION TO UPLOAD FILE
//   const uploadFile = async () => {
//     toastId.current = toast('Please wait...', {
//       autoClose: 3000,
//       isLoading: true,
//     })

//     try {
//       await axios
//         .post(
//           'http://15.237.160.238:60/api/Candidate/read-Candidate-csv',
//           { file: selectedFile },
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         )
//         .then(() => {
//           toast.update(toastId.current, {
//             render: 'File upload successful',
//             type: 'success',
//             isLoading: false,
//             autoClose: 2500,
//           })
//           setFileToDefault()
//         })
//     } catch (error) {
//       console.log(error)
//       toast.update(toastId.current, {
//         type: 'error',
//         autoClose: 2500,
//         isLoading: false,
//         render: `${
//           error?.response?.data?.title ||
//           error?.response?.data?.description ||
//           error?.message ||
//           'Something went wrong, please try again'
//         }`,
//       })
//     }
//   }
//   // END OF FUNCTION TO UPLOAD FILE

//   // use effect to call the getAllTestCategories function as the page loads
//   useEffect(() => {
//     getAllLaboratories()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
//   // end of use effect to call the getAllTestCategories function as the page loads

//   // useeffect to update file state after upload
//   useEffect(() => {}, [file])
//   // useeffect to update file state after upload

//   // use effect to call the getAllTestCategories function as the page loads
//   useEffect(() => {
//     getAllTestCategories()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [clientId])
//   // end of use effect to call the getAllTestCategories function as the page loads

//   return (
//     <>
//       <ToastContainer />
//       <div className='scheduleCandidateWrapper'>
//         <AlertDialogSlide
//           open={open}
//           handleClose={handleClose}
//           title='Cancel'
//           link='/scheduleCandidate'
//           message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
//         />
//         <Sidebar />
//         <div className='scheduleCandidateRight'>
//           <Topber />
//           {/* <h3>Schedule Candidate</h3> */}
//           <div className='scheduleCandidateMainWrapper'>
//             <form
//               className='scheduleCandidateFormWrapper'
//               onSubmit={handleScheduleCandidate}
//             >
//               <div className='inputsWrapper'>
//                 <div className='singleInput autoComplete'>
//                   <Autocomplete
//                     disablePortal
//                     id='combo-box-demo'
//                     options={clients}
//                     getOptionLabel={(option) =>
//                       `${option.clientName} ${option.email}`
//                     }
//                     onChange={(e, option) =>
//                       handlescheduleCandidateInfo(e, 'clientid', option)
//                     }
//                     sx={{ width: 400 }}
//                     renderInput={(params) => (
//                       <TextField {...params} label='Client Name' required />
//                     )}
//                   />
//                 </div>
//                 <div className='singleInput autoComplete'>
//                   <Autocomplete
//                     disablePortal
//                     id='combo-box-demo'
//                     options={laboratories}
//                     getOptionLabel={(option) => `${option.laboratoryName}`}
//                     onChange={(e, option) =>
//                       handlescheduleCandidateInfo(e, 'laboratoryId', option)
//                     }
//                     sx={{ width: 400 }}
//                     renderInput={(params) => (
//                       <TextField {...params} label='Laboratories' required />
//                     )}
//                   />
//                 </div>
//                 <div className='singleInput autoComplete'>
//                   <Autocomplete
//                     disablePortal
//                     id='combo-box-demo'
//                     options={testCategory}
//                     getOptionLabel={(option) => `${option.categoryName}`}
//                     onChange={(e, option) =>
//                       handlescheduleCandidateInfo(e, 'test', option)
//                     }
//                     sx={{ width: 400 }}
//                     renderInput={(params) => (
//                       <TextField {...params} label='Test Category' required />
//                     )}
//                     disabled={loadingTestCategory}
//                     renderOption={(props, option) => {
//                       return (
//                         <li {...props} key={option.id}>
//                           {option.categoryName}
//                         </li>
//                       )
//                     }}
//                   />
//                 </div>
//                 <div className='singleInput'>
//                   <p>
//                     Candidate Name <span>*</span>
//                   </p>
//                   <div className='inputWrapper'>
//                     <input
//                       type='text'
//                       className='input'
//                       required
//                       onChange={(e) =>
//                         handlescheduleCandidateInfo(e, 'candidateName')
//                       }
//                       value={scheduleInfo?.candidateName}
//                     />
//                   </div>
//                 </div>

//                 <div className='singleInput'>
//                   <p>Address</p>
//                   <div className='inputWrapper'>
//                     <input
//                       type='text'
//                       className='input'
//                       onChange={(e) =>
//                         handlescheduleCandidateInfo(e, 'address')
//                       }
//                       value={scheduleInfo?.address}
//                     />
//                   </div>
//                 </div>
//                 <div className='singleInput'>
//                   <p>
//                     Email <span>*</span>
//                   </p>
//                   <div className='inputWrapper'>
//                     <input
//                       type='email'
//                       className='input'
//                       required
//                       value={scheduleInfo?.email}
//                       onChange={(e) => handlescheduleCandidateInfo(e, 'email')}
//                     />
//                   </div>
//                 </div>
//                 <div className='singleInput'>
//                   <p>
//                     Phone Number <span>*</span>
//                   </p>
//                   <div className='inputWrapper'>
//                     <input
//                       type='number'
//                       className='input'
//                       required
//                       onChange={(e) =>
//                         handlescheduleCandidateInfo(e, 'phoneNumber')
//                       }
//                       value={scheduleInfo?.phoneNumber}
//                     />
//                   </div>
//                 </div>
//                 <div className='singleInput'>
//                   <p>
//                     Date <span>*</span>
//                   </p>
//                   <div className='inputWrapper'>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(selectedDate) =>
//                         handleDateChange(selectedDate)
//                       }
//                       dateFormat='MMMM d, yyyy'
//                       className='datePicker'
//                       showMonthDropdown
//                       showYearDropdown
//                       minDate={new Date()}
//                     />
//                   </div>
//                 </div>
//                 <div className=' bulkUploadWrapper'>
//                   <p>Bulk Upload</p>
//                   <input
//                     type='file'
//                     onChange={(e) => handleSelectedFile(e)}
//                     accept='.csv'
//                     id='file'
//                   />
//                   <div className='bulkUploadButton' onClick={uploadFile}>
//                     Upload
//                   </div>
//                   <p className='downloadSample'>
//                     Click <a href='#'>here </a>to download a sample
//                   </p>
//                 </div>
//               </div>

//               <div className='bottomButtons'>
//                 <button
//                   className='cancelClientEditBtn'
//                   onClick={handleClickOpen}
//                   disabled={disableDoneAndCancelBtn}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className='scheduleCandidateEditBtn'
//                   type='submit'
//                   // onClick={handleScheduleCandidate}
//                   disabled={disableDoneAndCancelBtn}
//                 >
//                   Done
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ScheduleCandidate

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./scheduleCandidate.scss";
import AlertDialogSlide from "../../components/Dialogue";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { publicRequest } from "../../functions/requestMethods";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
const ScheduleCandidate = () => {
  // MISCELLANEOUS
  const [open, setOpen] = React.useState(false);
  const date = new Date().toISOString();
  const toastId = React.useRef(null);

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data);

  // LOGGEDIN USER
  const { currentUser } = useSelector((state) => state?.user);
  const userData = currentUser?.data;

  // TO SET THE STATE OF THE DONE AND CANCEL BUTTONS
  const [disableDoneAndCancelBtn, setDisableDoneAndCancelBtn] = useState(false);

  // CANDIDATE TYPE
  const [isCandidateCoreStaff, setIsCandidateCoreStaff] = useState("yes");

  // ALL LABORATORIES
  const [laboratories, setLaboratories] = useState([]);

  // TO SET THE STATE OF TEST CATEGORY INPUT
  const [loadingTestCategory, setLoadingTestCategory] = useState(true);

  // FILE TO BE UPLOADED
  const [selectedFile, setSelectedFile] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // END OF MISCELLANEOUS

  // FUNCTION TO HANDLE CANDIDATE TYPE CHANGE
  const handleCandidateTypeChange = (event) => {
    setIsCandidateCoreStaff(event.target.value);
  };
  // END OF FUNCTION TO HANDLE CANDIDATE TYPE CHANGE

  // DATE SELECTION AND CHANGE FUNCTIONALITIES
  const [startDate, setStartDate] = useState(new Date());
  // function for handling date chande
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    setScheduleInfo((prev) => {
      return {
        ...prev,
        appointmentdate: selectedDate?.toISOString(),
      };
    });
    // end of function for handling date chande
  };
  // END OF DATE SELECTION AND CHANGE FUNCTIONALITIES

  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS
  const [clients, setClients] = useState([]);
  // function to get all clients
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
  // end of function to get all clients

  // function to get all Laboratories
  const getAllLaboratories = async () => {
    try {
      const res = await publicRequest.get(`/Laboratory`, {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setLaboratories(res?.data?.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
  // end of function to get all Laboratories

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients();
  }, []);
  // end of use effect to call the getAllClients function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  // FUNCTIONALITY FOR SETTING SCHEDULE INFO
  const [scheduleInfo, setScheduleInfo] = useState({
    candidateName: "",
    phoneNumber: "",
    createdDate: date,
    email: "",
    address: "",
    appointmentdate: null,
    clientid: "",
    testcategory: "",
    companyName: "",
    status: "PENDING",
  });

  // function for seting candidate info
  const [clientId, setClientId] = useState(null);
  const handlescheduleCandidateInfo = (e, dataName, data) => {
    if (dataName === "test") {
      setScheduleInfo((prev) => {
        return {
          ...prev,
          testcategory: data?.categoryName,
        };
      });
    } else if (dataName === "clientid") {
      setScheduleInfo((prev) => {
        return { ...prev, [dataName]: data?.clientId?.toString() };
      });
      setClientId(data?.clientId);
      setLoadingTestCategory(true);
    } else if (dataName === "laboratoryId") {
      setScheduleInfo((prev) => {
        return { ...prev, [dataName]: data?.id?.toString() };
      });
    } else {
      setScheduleInfo((prev) => {
        return { ...prev, [dataName]: e.target.value };
      });
    }
  };
  // end of function for seting candidate info
  // useeffect for updating client id
  useEffect(() => {}, [clientId]);
  // end of useeffect for updating client id

  // function for scheduling a candidate
  const handleScheduleCandidate = async (e) => {
    e.preventDefault();
    toastId.current = toast("Please wait...", {
      autoClose: 2500,
      isLoading: true,
    });

    setDisableDoneAndCancelBtn(true);

    try {
      await publicRequest
        .post("/Candidate", scheduleInfo, {
          headers: {
            Accept: "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.update(toastId.current, {
            render: "Candidate scheduled succesfully!",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setDisableDoneAndCancelBtn(false);
        })
        .then(() => {
          window.location.reload();
          // setScheduleInfo({
          //   candidateName: '',
          //   phoneNumber: '',
          //   createdDate: date,
          //   email: '',
          //   address: '',
          //   appointmentdate: startDate?.toISOString(),
          //   clientid: '',
          //   testcategory: '',
          //   status: 'PENDING',
          // })
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

  // END OF FUNCTIONALITY FOR SETTING SCHEDULE INFO
  //  FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES
  const [testCategory, setTestCategory] = useState([]);

  // function to get all TestCategories
  const getAllTestCategories = async () => {
    try {
      const res = await publicRequest.get(`Test/test-category/${clientId}`, {
        headers: {
          Accept: "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setTestCategory(res.data.data);
        setLoadingTestCategory(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end of function to get all TestCategories

  // use effect to call the getAllTestCategories function as the page loads
  useEffect(() => {
    getAllTestCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);
  // end of use effect to call the getAllTestCategories function as the page loads
  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING TEST CATEGORIES

  const file = document.getElementById("file");
  // FUNCTION TO HANDLE FILE CHANGE
  const handleSelectedFile = (e) => {
    setSelectedFile(e.target?.files[0]);

    // console.log(file.value)
  };

  // function to set filestate to default
  const setFileToDefault = () => {
    file.value = file?.defaultValue;
  };
  // end of function to set filestate to default

  // useeffect to update file state after upload
  useEffect(() => {}, [file]);
  // useeffect to update file state after upload

  //END OF FUNCTION TO HANDLE FILE CHANGE

  // FUNCTION TO UPLOAD FILE
  const uploadFile = async () => {
    toastId.current = toast("Please wait...", {
      autoClose: 3000,
      isLoading: true,
    });

    try {
      await axios
        .post(
          "http://15.237.160.238:60/api/Candidate/read-Candidate-csv",
          { file: selectedFile },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.update(toastId.current, {
            render: "File upload successful",
            type: "success",
            isLoading: false,
            autoClose: 2500,
          });
          setFileToDefault();
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
          "Something went wrong, please try again"
        }`,
      });
    }
  };
  // END OF FUNCTION TO UPLOAD FILE

  // use effect to call the getAllLaboratories function as the page loads
  useEffect(() => {
    getAllLaboratories();
  }, []);
  // end of use effect to call the getAllLaboratories function as the page loads

  return (
    <>
      <ToastContainer />
      <div className="scheduleCandidateWrapper">
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          title="Cancel"
          link="/scheduleCandidate"
          message="Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost."
        />
        <Sidebar />
        <div className="scheduleCandidateRight">
          <Topber userData={userData} />
          {/* <h3>Schedule Candidate</h3> */}
          <div className="scheduleCandidateMainWrapper">
            <form
              className="scheduleCandidateFormWrapper"
              onSubmit={handleScheduleCandidate}
            >
              <div className="inputsWrapper">
                <div className="singleInput autoComplete">
                  <Autocomplete
                    className="autoCompleteInput"
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => `${option.clientName}`}
                    onChange={(e, option) =>
                      handlescheduleCandidateInfo(e, "clientid", option)
                    }
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Client Name" required />
                    )}
                  />
                </div>
                <div className="singleInput autoComplete">
                  <Autocomplete
                    className="autoCompleteInput"
                    disablePortal
                    id="combo-box-demo"
                    options={laboratories}
                    getOptionLabel={(option) => `${option.laboratoryName}`}
                    onChange={(e, option) =>
                      handlescheduleCandidateInfo(e, "laboratoryId", option)
                    }
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Laboratories" required />
                    )}
                  />
                </div>
                <div className="singleInput autoComplete">
                  <Autocomplete
                    disablePortal
                    className="autoCompleteInput"
                    id="combo-box-demo"
                    options={testCategory}
                    getOptionLabel={(option) => `${option.categoryName}`}
                    onChange={(e, option) =>
                      handlescheduleCandidateInfo(e, "test", option)
                    }
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Test Category" required />
                    )}
                    disabled={loadingTestCategory}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.categoryName}
                        </li>
                      );
                    }}
                  />
                </div>
                <div className="singleInput">
                  <p>
                    Candidate Name <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      required
                      onChange={(e) =>
                        handlescheduleCandidateInfo(e, "candidateName")
                      }
                      value={scheduleInfo?.candidateName}
                    />
                  </div>
                </div>

                <div className="singleInput">
                  <p>Address</p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) =>
                        handlescheduleCandidateInfo(e, "address")
                      }
                      value={scheduleInfo?.address}
                    />
                  </div>
                </div>
                <div className="singleInput">
                  <p>
                    Email <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="email"
                      className="input"
                      required
                      value={scheduleInfo?.email}
                      onChange={(e) => handlescheduleCandidateInfo(e, "email")}
                    />
                  </div>
                </div>
                <div className="singleInput ">
                  <p>
                    Phone Number <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className="input"
                      required
                      onChange={(e) =>
                        handlescheduleCandidateInfo(e, "phoneNumber")
                      }
                      value={scheduleInfo?.phoneNumber}
                    />
                  </div>
                </div>

                <div className="singleInput">
                  <p>
                    Date <span>*</span>
                  </p>
                  <div className="inputWrapper">
                    <DatePicker
                      selected={startDate}
                      onChange={(selectedDate) =>
                        handleDateChange(selectedDate)
                      }
                      dateFormat="MMMM d, yyyy"
                      className="datePicker"
                      showMonthDropdown
                      showYearDropdown
                      minDate={new Date()}
                    />
                  </div>
                </div>
                <div className="singleInput singleInputRadioWrapper">
                  <FormControl className="radioInputWrapper">
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      className="formTitle"
                    >
                      Is the candidate a core staff or a private candidate?
                      {/* Candidate type */}
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={isCandidateCoreStaff}
                      onChange={handleCandidateTypeChange}
                      className="radioGroup"
                      row
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {isCandidateCoreStaff === "no" && (
                      <div className="singleInput ">
                        <p>Company Name</p>
                        <div className="inputWrapper">
                          <input
                            type="text"
                            className="input"
                            required
                            onChange={(e) =>
                              handlescheduleCandidateInfo(e, "companyName")
                            }
                            value={scheduleInfo?.companyName}
                          />
                        </div>
                      </div>
                    )}
                  </FormControl>
                </div>
                <div className="bulkUploadWrapper">
                  <p>Bulk Upload</p>
                  <input
                    type="file"
                    onChange={(e) => handleSelectedFile(e)}
                    accept=".csv"
                    id="file"
                  />
                  <div className="bulkUploadButton" onClick={uploadFile}>
                    Upload
                  </div>
                  <p className="downloadSample">
                    Click <a href="#">here </a>to download a sample
                  </p>
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
                  className="scheduleCandidateEditBtn"
                  type="submit"
                  // onClick={handleScheduleCandidate}
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

export default ScheduleCandidate;

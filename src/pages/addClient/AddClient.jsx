import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topber from "../../components/topbar/Topber";
import "./addClient.scss";
import AlertDialogSlide from "../../components/Dialogue";
import HorizontalStepper from "../../components/stepper/Stepper";
import "react-toastify/dist/ReactToastify.css";

import {
  Autocomplete,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import { MdExpandLess, MdExpandMore, MdStarBorder } from "react-icons/md";
import { BsCheck, BsListCheck } from "react-icons/bs";
import { privateRequest, publicRequest } from "../../functions/requestMethods";
import { ToastContainer, toast } from "react-toastify";

const AddClient = () => {
  const [open, setOpen] = React.useState(false);
  const toastId = React.useRef(null);

  const steps = ["Client Details", "Test Details"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  // // STEPPER
  // const [activeStep, setActiveStep] = React.useState(0)
  // const [skipped, setSkipped] = React.useState(new Set())

  // const isStepOptional = (step) => {
  //   // return step === 0
  //   return null
  // }

  // const isStepSkipped = (step) => {
  //   return skipped.has(step)
  // }

  // const handleNext = () => {
  //   publicRequest.post()
  //   let newSkipped = skipped
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values())
  //     newSkipped.delete(activeStep)
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //   setSkipped(newSkipped)
  // }

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.")
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values())
  //     newSkipped.add(activeStep)
  //     return newSkipped
  //   })
  // }

  // const handleReset = () => {
  //   setActiveStep(0)
  // }

  // const properties = {
  //   handleReset,
  //   handleBack,
  //   handleSkip,
  //   setSkipped,
  //   setActiveStep,
  //   isStepSkipped,
  //   isStepOptional,
  //   activeStep,
  //   handleNext,
  //   steps,
  // }
  // // END OF STEPPER

  // LIST TOGGLE FUNCTIONALITY
  const [openListItem, setOpenListItem] = React.useState(true);

  const handleClick = () => {
    setOpenListItem(!openListItem);
  };
  // END OF LIST TOGGLE FUNCTIONALITY

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

    try {
      await privateRequest
        .post("/Client/profile-client", client)
        .then((response) => {
          toast.update(toastId.current, {
            render: "Client has been added succesfully!",
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
  // end of create client function
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
            {/* <HorizontalStepper properties={properties} /> */}
            <div className="formWrapper">
              {/* <div className='testCategoryWrapper'>
                  <div className='testCategoryTop'>
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}
                      component='nav'
                      aria-labelledby='nested-list-subheader'
                      subheader={
                        <ListSubheader
                          component='div'
                          id='nested-list-subheader'
                          sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'black',
                          }}
                        >
                          Test Categories
                        </ListSubheader>
                      }
                    >
                      <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                          <BsListCheck />
                        </ListItemIcon>
                        <ListItemText primary='Pre-Employment' />
                        {openListItem ? <MdExpandLess /> : <MdExpandMore />}
                      </ListItemButton>
                      <Collapse in={openListItem} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BsCheck />
                            </ListItemIcon>
                            <ListItemText primary='Hepatitis' />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BsCheck />
                            </ListItemIcon>
                            <ListItemText primary='BP' />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </List>
                  </div>
                  <div className='testCategoryBottom'>
                    <div className='testCategoryBottomTitle'>
                      New Category Details
                    </div>
                    <div className='testCategoryBottomForm'>
                      <div className='testCategoryTextFieldWrapper'>
                        <TextField
                          id='outlined-basic'
                          label='Category Name'
                          variant='outlined'
                        />
                      </div>
                      <div className='testCategoryAutocompleteWrapper'>
                        <Autocomplete
                          multiple
                          id='tags-outlined'
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[top100Films[1]]}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='SelectedTests'
                              placeholder='Test'
                            />
                          )}
                        />
                      </div>
                      <button className='testCategoryBottomFormBtn'>
                        Done
                      </button>
                    </div>
                  </div>
                </div> */}

              <div className="inputsWrapper">
                <div className="singleInput">
                  <p>Client Name</p>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="input"
                      onChange={(e) => handleClientData(e, "clientName")}
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
                    />
                  </div>
                </div>
              </div>

              <button className="cancelClientEditBtn" onClick={handleClickOpen}>
                Cancel
              </button>

              <button className="addClientEditBtn" onClick={addClient}>
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClient;

// import React, { useState } from 'react'
// import Sidebar from '../../components/sidebar/Sidebar'
// import Topber from '../../components/topbar/Topber'
// import './addClient.scss'
// import AlertDialogSlide from '../../components/Dialogue'
// import HorizontalStepper from '../../components/stepper/Stepper'
// import 'react-toastify/dist/ReactToastify.css'

// import {
//   Autocomplete,
//   Collapse,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   ListSubheader,
//   TextField,
// } from '@mui/material'
// import { MdExpandLess, MdExpandMore, MdStarBorder } from 'react-icons/md'
// import { BsCheck, BsListCheck } from 'react-icons/bs'
// import { publicRequest } from '../../functions/requestMethods'
// import { ToastContainer, toast } from 'react-toastify'

// const AddClient = () => {
//   const [open, setOpen] = React.useState(false)
//   const toastId = React.useRef(null)

//   const steps = ['Client Details', 'Test Details']

//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//   ]

//   // STEPPER
//   const [activeStep, setActiveStep] = React.useState(0)
//   const [skipped, setSkipped] = React.useState(new Set())

//   const isStepOptional = (step) => {
//     // return step === 0
//     return null
//   }

//   const isStepSkipped = (step) => {
//     return skipped.has(step)
//   }

//   const handleNext = () => {
//     publicRequest.post()
//     let newSkipped = skipped
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values())
//       newSkipped.delete(activeStep)
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     setSkipped(newSkipped)
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//   }

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.")
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values())
//       newSkipped.add(activeStep)
//       return newSkipped
//     })
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//   }

//   const properties = {
//     handleReset,
//     handleBack,
//     handleSkip,
//     setSkipped,
//     setActiveStep,
//     isStepSkipped,
//     isStepOptional,
//     activeStep,
//     handleNext,
//     steps,
//   }
//   // END OF STEPPER

//   // LIST TOGGLE FUNCTIONALITY
//   const [openListItem, setOpenListItem] = React.useState(true)

//   const handleClick = () => {
//     setOpenListItem(!openListItem)
//   }
//   // END OF LIST TOGGLE FUNCTIONALITY

//   // FUNCTIONALITIES FOR CREATING A NEW CLIENT

//   const [client, setClient] = useState({
//     clientName: '',
//     address: '',
//     phoneNumber: '',
//     email: '',
//     contactPerson: '',
//     contactPersonPhone: '',
//     contactPersonEmail: '',
//   })

//   // function for setting client info
//   const handleClientData = (e, dataName, data) => {
//     setClient((prev) => {
//       return { ...prev, [dataName]: data ? data.name : e.target.value }
//     })
//   }
//   // end of function for setting client info

//   // create client function
//   const addClient = async () => {
//     // const id = toast.loading('Please wait...')
//     toastId.current = toast('Please wait...', {
//       autoClose: false,
//       isLoading: true,
//     })

//     try {
//       await publicRequest
//         .post('/Account/profile-application-user', client)
//         .then((response) => {
//           toast.update(toastId.current, {
//             render: 'Client has been added succesfully!',
//             type: 'success',
//             isLoading: false,
//           })
//         })
//     } catch (error) {
//       console.log(error.response)
//       toast.update(toastId.current, {
//         type: 'error',
//         autoClose: 3000,
//         isLoading: false,
//         render: `${
//           error.response.data.title ||
//           error.response.data.description ||
//           'Something went wrong, please try again'
//         }`,
//       })
//     }
//   }
//   // end of create client function
//   // END OF FUNCTIONALITIES FOR CREATING A NEW CLIENT
//   return (
//     <>
//       <ToastContainer />
//       <div className='addClientWrapper'>
//         <AlertDialogSlide
//           open={open}
//           handleClose={handleClose}
//           title='Cancel'
//           link='/manageClients'
//           message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
//         />
//         <Sidebar />
//         <div className='addClientRight'>
//           <Topber />
//           <div className='addClientMainWrapper'>
//             <HorizontalStepper properties={properties} />
//             <div className='formWrapper'>
//               {activeStep === steps.length - 1 ? (
//                 <div className='testCategoryWrapper'>
//                   <div className='testCategoryTop'>
//                     <List
//                       sx={{
//                         width: '100%',
//                         maxWidth: 360,
//                         bgcolor: 'background.paper',
//                       }}
//                       component='nav'
//                       aria-labelledby='nested-list-subheader'
//                       subheader={
//                         <ListSubheader
//                           component='div'
//                           id='nested-list-subheader'
//                           sx={{
//                             fontSize: '16px',
//                             fontWeight: 'bold',
//                             color: 'black',
//                           }}
//                         >
//                           Test Categories
//                         </ListSubheader>
//                       }
//                     >
//                       <ListItemButton onClick={handleClick}>
//                         <ListItemIcon>
//                           <BsListCheck />
//                         </ListItemIcon>
//                         <ListItemText primary='Pre-Employment' />
//                         {openListItem ? <MdExpandLess /> : <MdExpandMore />}
//                       </ListItemButton>
//                       <Collapse in={openListItem} timeout='auto' unmountOnExit>
//                         <List component='div' disablePadding>
//                           <ListItemButton sx={{ pl: 4 }}>
//                             <ListItemIcon>
//                               <BsCheck />
//                             </ListItemIcon>
//                             <ListItemText primary='Hepatitis' />
//                           </ListItemButton>
//                           <ListItemButton sx={{ pl: 4 }}>
//                             <ListItemIcon>
//                               <BsCheck />
//                             </ListItemIcon>
//                             <ListItemText primary='BP' />
//                           </ListItemButton>
//                         </List>
//                       </Collapse>
//                     </List>
//                   </div>
//                   <div className='testCategoryBottom'>
//                     <div className='testCategoryBottomTitle'>
//                       New Category Details
//                     </div>
//                     <div className='testCategoryBottomForm'>
//                       <div className='testCategoryTextFieldWrapper'>
//                         <TextField
//                           id='outlined-basic'
//                           label='Category Name'
//                           variant='outlined'
//                         />
//                       </div>
//                       <div className='testCategoryAutocompleteWrapper'>
// <Autocomplete
//   multiple
//   id='tags-outlined'
//   options={top100Films}
//   getOptionLabel={(option) => option.title}
//   defaultValue={[top100Films[1]]}
//   filterSelectedOptions
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label='SelectedTests'
//       placeholder='Test'
//     />
//   )}
// />
//                       </div>
//                       <button className='testCategoryBottomFormBtn'>
//                         Done
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className='inputsWrapper'>
//                   <div className='singleInput'>
//                     <p>Client Name</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='text'
//                         className='input'
//                         onChange={(e) => handleClientData(e, 'clientName')}
//                       />
//                     </div>
//                   </div>
//                   <div className='singleInput'>
//                     <p>Address</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='text'
//                         className='input'
//                         onChange={(e) => handleClientData(e, 'address')}
//                       />
//                     </div>
//                   </div>
//                   <div className='singleInput'>
//                     <p>Email</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='email'
//                         className='input'
//                         onChange={(e) => handleClientData(e, 'email')}
//                       />
//                     </div>
//                   </div>
//                   <div className='singleInput'>
//                     <p>Phone Number</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='number'
//                         className='input'
//                         onChange={(e) => handleClientData(e, 'phoneNumber')}
//                       />
//                     </div>
//                   </div>
//                   <div className='singleInput'>
//                     <p>Contact Person</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='string'
//                         className='input'
//                         onChange={(e) => handleClientData(e, 'contactPerson')}
//                       />
//                     </div>
//                   </div>
//                   <div className='singleInput'>
//                     <p>Email (Contact Person)</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='string'
//                         className='input'
//                         onChange={(e) =>
//                           handleClientData(e, 'contactPersonEmail')
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className='singleInput'>
//                     <p>Phone Number (Contact Person)</p>
//                     <div className='inputWrapper'>
//                       <input
//                         type='string'
//                         className='input'
//                         onChange={(e) =>
//                           handleClientData(e, 'contactPersonPhone')
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeStep === 0 ? (
//                 <button
//                   className='cancelClientEditBtn'
//                   onClick={handleClickOpen}
//                 >
//                   Cancel
//                 </button>
//               ) : (
//                 <button className='cancelClientEditBtn' onClick={handleBack}>
//                   Back
//                 </button>
//               )}
//               <button
//                 className='addClientEditBtn'
//                 onClick={
//                   activeStep === steps.length - 1 ? addClient : handleNext
//                 }
//               >
//                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default AddClient

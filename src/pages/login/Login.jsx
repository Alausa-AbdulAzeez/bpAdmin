import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { BsEye, BsFillEyeSlashFill } from "react-icons/bs";
import { login } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // MISCELLANEOUS
  const [btnDisabled, setBtnDisabled] = useState(true);
  const toastId = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // END OF MISCELLANEOUS

  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // END OF USER LOGIN DETAILS

  //   FUNCTIONs FOR SETTING BUTTON STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value });
  };
  const setBtnState = () => {
    if (user.email && user.password) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  //   END OF FUNCTIONs FOR SETTING BUTTON STATE

  // PASSWORD TOGGLE FUNCTIONALITY
  const [showPassword, setShowPassword] = useState(false);

  // FUNCTION FOR PASSWORD TOGGLE
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // END OF FUNCTION FOR PASSWORD TOGGLE

  // END OF PASSWORD TOGGLE FUNCTIONALITY

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleLogin = async (e) => {
    e.preventDefault();
    login(dispatch, user, navigate, toastId, setBtnDisabled);
    // try {
    //   e.preventDefault()
    //   await publicRequest.post('/Account/login', user).then((response) => {
    //     if (response.data) {
    //       localStorage.setItem('token', response.data.data.token)
    //       console.log(response.data.data.token)
    //     } else {
    //       console.log(response)
    //     }
    //   })
    // } catch (error) {
    //   console.log(error.response.data.description)
    // }
    // localStorage.setItem('isLoggedIn', 'true')

    // navigate('/')
  };
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  //   USE EFFECT FOR SETTING BUTTON STATE
  useEffect(() => {
    setBtnState(user, setBtnDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ToastContainer />
      <div className="loginWrapper">
        <div className="loginWrapperLeft">
          <img
            // src='blob:https://web.whatsapp.com/6cdf605b-5634-4bc1-9711-a671a348523c'
            src={require("../../utils/images/IMG_6229.PNG")}
            // src={require('../../utils/images/BiopathLogo2.jpeg')}
            // src={require('../../utils/images/medicalimg.jpg')}
            alt=""
            // className='loginWrapperLeftImg'
            className="biopathImg"
          />
        </div>
        <div className="loginWrapperRight">
          <form className="loginFormWrapper" onSubmit={handleLogin}>
            {/* <div className='loginTest'>Trying to test, click</div> */}
            <div className="loginHeading">Log in</div>
            <div className="loginInputs">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="loginEmailInput loginInput"
                placeholder="example@****.com"
                data-testid="emailTestId"
                onChange={(e) => handleSetUser(e, "email")}
              />
              <label htmlFor="">Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="loginPasswordInput loginInput"
                  placeholder="Password"
                  onChange={(e) => handleSetUser(e, "password")}
                  data-testid="passwordTestId"
                />
                <span onClick={handlePasswordToggle}>
                  {showPassword ? <BsEye /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              <Link to={"/getToken"}>
                <div className="forgotPassword">Forgotten your password?</div>
              </Link>
            </div>

            <button
              className="loginBtn"
              type={"submit"}
              // disabled={isError}
              disabled={btnDisabled}
              // disabled={isFetching ? isFetching : btnDisabled}
              data-testid="loginBtn"
              // onClick={handleLogin}
            >
              Login
            </button>
            {/* {isError && (
              <div className='errorMsg'>
                {currentUser
                  ? currentUser?.description + 's!'
                  : 'Error logging in.. Please try again!!'}
              </div>
            )} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

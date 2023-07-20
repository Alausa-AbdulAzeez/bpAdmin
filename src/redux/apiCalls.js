import { toast } from "react-toastify";
import { publicRequest } from "../functions/requestMethods";
import { loginSuccess } from "./userSlice";
import { loggedIn } from "./globalSlice";

export const login = async (
  dispatch,
  user,
  navigate,
  toastId,
  setBtnDisabled
) => {
  // dispatch(loginStart());

  toastId.current = toast("Please wait...", {
    autoClose: false,
    isLoading: true,
  });
  setBtnDisabled(true);

  try {
    await publicRequest.post("/Account/login", user).then((res) => {
      if (
        res?.data?.data?.role?.[0] === "SuperAdmin" ||
        res?.data?.data?.role?.[0] === null ||
        res?.data?.data?.role === null
      ) {
        if (res?.data?.data?.isDefaultPassword === false) {
          setBtnDisabled(false);
          dispatch(loginSuccess(res?.data));
          dispatch(loggedIn());
          toast.update(toastId.current, {
            render: "Login succesful! Please wait while we redirect you.",
            type: "success",
            autoClose: 2000,
            isLoading: false,
          });
          navigate("/");
        } else {
          dispatch(loginSuccess(res?.data));
          setBtnDisabled(false);
          navigate("/changePassword");
          toast.update(toastId.current, {
            render:
              "Hi there! You're required to change your password from the default password before you can proceed.",
            type: "info",
            autoClose: 4000,
            isLoading: false,
          });
        }
      } else {
        console.log(res?.data);
        setBtnDisabled(false);
        throw new Error("Can not access this resource");
      }
    });
  } catch (error) {
    console.log(error);
    // dispatch(loginFailure());
    setBtnDisabled(false);
    toast.update(toastId.current, {
      type: "error",
      autoClose: 3000,
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

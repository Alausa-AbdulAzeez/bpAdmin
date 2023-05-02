import { publicRequest } from '../functions/requestMethods'
import { loginFailure, loginStart, loginSuccess } from './userSlice'

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart())

  try {
    const res = await publicRequest.post('/Account/login', user)
    dispatch(loginSuccess(res.data))
    navigate('/')
  } catch (error) {
    dispatch(loginFailure(error.response.data))
  }
}

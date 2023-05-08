import { publicRequest } from '../functions/requestMethods'
import { loginFailure, loginStart, loginSuccess } from './userSlice'

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart())

  try {
    const res = await publicRequest.post('/Account/login', user)
    console.log('aa')

    console.log(res)
    console.log(res?.data)
    dispatch(loginSuccess(res?.data))
    // console.log(res.data)
    navigate('/')
  } catch (error) {
    console.log(error)
    dispatch(loginFailure(error))
  }
}

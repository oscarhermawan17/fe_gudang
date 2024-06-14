import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../reducers/userReducers/userConstants.ts"

const fakeLoginFunction = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    if (username === "oscar" && password === "oscar") {
      resolve({
        fakeData: {
          username: "oscar",
          token: "testtoken",
        },
      })
    }
    reject({ message: "error" })
  })
}

export const login = (email: string, password: string) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    console.log(config) // REMOVE

    // const { data } = await axios.post(
    //   `${URL}/api/users/login`,
    //   { email, password },
    //   config
    // )

    const { fakeData: data }: any = await fakeLoginFunction(email, password)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

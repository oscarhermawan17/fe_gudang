import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import type { ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from "@redux-devtools/extension"

import { userLoginReducer } from "../reducers/userReducers/userReducers.ts"

const reducer = combineReducers({
  userLogin: userLoginReducer,
})


const userInfoFromStorage = localStorage.getItem("userInfo");
const parsedUserInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const initialState = {
  userLogin: { userInfo: parsedUserInfo },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export type AppDispatch = ThunkDispatch<typeof initialState, void, any>;
export default store;

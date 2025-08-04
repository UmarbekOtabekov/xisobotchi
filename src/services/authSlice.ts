import { createSlice } from "@reduxjs/toolkit"

interface Auth {
    loggedIn: boolean
}

const intialState: Auth = {
    loggedIn: localStorage.getItem("token") !== null ? JSON.parse(localStorage.getItem("token") as string) : false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: intialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
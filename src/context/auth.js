import React, {useReducer, createContext} from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken =  jwtDecode(localStorage.getItem('jwtToken'))
    console.log(decodedToken)
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (email, password) => {},
    logout: () => {},
    register: (email, password) => {}
})

const AuthReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        case 'REGISTER':
            return {
                ...state,
                user: action.payload
            }
        default: return state
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', {email, password}, config)
        localStorage.setItem('jwtToken', data.token)
        dispatch({
            type: 'LOGIN',
            payload: data
        })
    }

    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT'
        })
    }

    const register = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users', {email, password}, config)
        localStorage.setItem('jwtToken', data.token)
        dispatch({
            type: 'REGISTER',
            payload: data
        })
    }

    return (
        <AuthContext.Provider value={{user: state.user, login, logout, register }} {...props} />
    )
}

export {AuthContext, AuthProvider}
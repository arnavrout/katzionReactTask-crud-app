import { ADD_UNIVERSITY, DELETE_UNIVERSITY, FAIL_REQUEST, GET_UNIVERSITIES_LIST, GET_UNIVERSITIES_OBJ, MAKE_REQUEST, UPDATE_UNIVERSITY } from "./ActionType"

const initialState = {
    loading: true,
    universitiesList: [],
    universitiesObj: {},
    errorMessage: ''
}

export const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case MAKE_REQUEST: 
            return {
                ...state,
                loading: true
            }
            case FAIL_REQUEST: 
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }   
            case GET_UNIVERSITIES_LIST: 
            return {
                loading: false,
                errorMessage: '',
                universitiesList: action.payload,
                universitiesObj: {}
            }   
            case DELETE_UNIVERSITY:
                return {
                    ...state,
                    loading: false
                } 
            case ADD_UNIVERSITY:
                return {
                      ...state,
                      loading: false
                } 
            case UPDATE_UNIVERSITY:
                return {
                        ...state,
                        loading: false
                } 
            case GET_UNIVERSITIES_OBJ:
                return {
                        ...state,
                        loading: false,
                        universitiesObj:action.payload
                }             
        default: return state
    }
}
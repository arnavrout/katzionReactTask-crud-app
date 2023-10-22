import axios from "axios"
import { ADD_UNIVERSITY, DELETE_UNIVERSITY, MAKE_REQUEST, FAIL_REQUEST, UPDATE_UNIVERSITY, GET_UNIVERSITIES_OBJ } from "./ActionType"
import { GET_UNIVERSITIES_LIST } from "./ActionType"

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST
    }
}

export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err
    }
}

export const getUniversitiesList = (data) => {
    return {
        type: GET_UNIVERSITIES_LIST,
        payload: data
    }
}

//Action to Delete University
export const deleteUniversity = () => {
    return {
        type: DELETE_UNIVERSITY,
    }
}

//Action to Add new University
export const addUniversity = () => {
    return {
        type: ADD_UNIVERSITY,
    }
}

//Action to update University
export const updateUniversity = () => {
    return {
        type: UPDATE_UNIVERSITY,
    }
}

//To update individual University data
export const getUniversitiesObj = (data) => {
    return {
        type: GET_UNIVERSITIES_OBJ,
        payload: data
    }
}

//To get university
export const FetchUniversityList = () => {
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.get('http://localhost:8000/universities')
        .then(res=>{
            const universitiesList = res.data;
            dispatch(getUniversitiesList(universitiesList));
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

//To remove universities we want
export const RemoveUniversity = (code) => {
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.delete('http://localhost:8000/universities/'+code)
        .then(res=>{
            dispatch(deleteUniversity());
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

//To add new university
export const AddNewUniversity = (data) => {
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.post('http://localhost:8000/universities', data)
        .then(res=>{
            dispatch(addUniversity());
            alert("University Added Successfully")
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

//To update existing university
export const UpdateUniversity = (data, code) => {
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.put('http://localhost:8000/universities/'+code, data)
        .then(res=>{
            dispatch(updateUniversity());
            alert("University Updated Successfully")
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

//To take care of individual university we update based on id
export const FetchUniversityObj = (code) => {
    return(dispatch)=>{
        dispatch(makeRequest());
        axios.get('http://localhost:8000/universities/'+code)
        .then(res=>{
            const universitiesList = res.data;
            dispatch(getUniversitiesObj(universitiesList));
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

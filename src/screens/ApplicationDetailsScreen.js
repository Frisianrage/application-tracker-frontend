import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function ApplicationDetailsScreen() {
    const {id} = useParams()

    const [applicationData, setApplicationData] = useState('')
    const token = localStorage.getItem('jwtToken')
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    }
    
    const getApplication = async () => {
        const {data} = await axios.get(`/api/applications/${id}`, config)

        if(data) {
        setApplicationData(data)
        } 
    }

    useEffect(() => {
        getApplication()
    }, [])
/*
    const createProductHandler = () => {
        console.log('create')    
    }

    const deletHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this Product?')){
            console.log('delete')
        }
    }*/
  return (
        <h2><u>Application Details</u> for {applicationData?.jobtitle} at {applicationData?.company?.employer?.companyname}</h2>
  );
}

export default ApplicationDetailsScreen
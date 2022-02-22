import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function EmployerDetailsScreen() {
    const {id} = useParams()

    const [employerData, setEmployerData] = useState('')
    const token = localStorage.getItem('jwtToken')
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    }
    
    const getApplication = async () => {
        const {data} = await axios.get(`/api/employers/profile/${id}`, config)

        if(data) {
            setEmployerData(data)
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
        <h2><u>Employer Details</u> for {employerData?.companyname} </h2>
  );
}

export default EmployerDetailsScreen
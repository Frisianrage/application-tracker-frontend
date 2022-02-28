import React, {useState} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'

const SearchBox = ({setEmployerData}) => {
    const [keyword, setKeyword] = useState('')

    const token = localStorage.getItem('jwtToken')

    const config = {
        baseURL: process.env.REACT_APP_BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
      }

    const clickHandler = async (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            const {data} = await axios.get(`/api/employers/search/${keyword}`, config)
            setEmployerData(data.employers)
        } else {
            console.log("error")
        }
    }

    return (
        <Form >
            <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Employer...' className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='primary' className='m-4' onClick={clickHandler}>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
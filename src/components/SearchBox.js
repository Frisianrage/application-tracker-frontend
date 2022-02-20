import React, {useState} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
//import {useNavigate} from 'react-router-dom'

const SearchBox = ({setEmployerData}) => {
    const [keyword, setKeyword] = useState('')
    //const history = useNavigate()

    const token = localStorage.getItem('jwtToken')

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
      }

    const clickHandler = async (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            const {data} = await axios.get(`/api/employers/${keyword}`, config)
         
            setEmployerData(data.employers)
        } else {
            console.log("error")
        }
    }

    return (
        <Form>
            <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Employer...' className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='primary' className='p-2' onClick={clickHandler}>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
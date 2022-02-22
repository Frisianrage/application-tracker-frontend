import React, { useState } from 'react'
//import axios from 'axios'
import { Container, Table, Button, Modal } from 'react-bootstrap'
import SearchBox from './SearchBox'

const FindEmployer = ({ findEmployerModal, setFindEmployerModal, setEmployer }) => {
  const [employerData, setEmployerData] = useState('')
  
  // const token = localStorage.getItem('jwtToken')
    
  /*const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }*/

    const onHide = () => {
        setFindEmployerModal(false)
    }

    const handleClick = (id, name) => {
        console.log(employerData)
        setEmployer({id, name})
        setFindEmployerModal(false)
    }

    return (
        <Modal show={findEmployerModal} centered id="mainModal">
        <Modal.Header>
        <Modal.Title as="h1" onClick={() => {console.log(employerData)}} >
            Find Employer
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SearchBox setEmployerData={setEmployerData} />
            <Container>
                    <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>COMPANYNAME</th>
                                <th>ADDRESS</th>
                                <th>ADDRESS TWO</th>
                                <th>CITY/STATE</th>
                                <th>COUNTRY</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {employerData ? (
                            employerData.map(employer => (
                                <tr key={employer._id}>
                                    <td>{employer.companyname}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Button variant='light' className='btn-sm' onClick={() => handleClick(employer._id, employer.companyname)}>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </td>
                                </tr>))
                            ) : (
                            <tr>
                            NO EMPLOYER FOUND!
                            </tr> 
                            )}   
                        </tbody>
                        <Container className="justify-content-center pt-3">
                            <Button type='submit' variant='primary' className="mx-2">
                                Save
                            </Button>
                            <Button onClick={onHide} variant='primary'>
                                Cancel
                            </Button>  
                        </Container>
                    </Table>
                    </>
                
            </Container>
        </Modal.Body>
      </Modal>
        
    )
}

export default FindEmployer
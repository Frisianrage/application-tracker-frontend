import React, { useState } from 'react'
import { Container, Table, Button, Modal } from 'react-bootstrap'
import SearchBox from './SearchBox'

const FindEmployer = ({ findEmployerModal, setFindEmployerModal, setEmployer }) => {
    const [employerData, setEmployerData] = useState('')

    const onHide = () => {
        setFindEmployerModal(false)
    }

    const handleClick = (id, companyname) => {
        console.log(employerData)
        setEmployer({id, companyname})
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
            <Container>
                <SearchBox setEmployerData={setEmployerData} />
            </Container>
            <Container>
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
                                        Save
                                    </Button>
                                </td>
                            </tr>))
                        ) : (
                        <tr className="mb-2">
                        NO EMPLOYER FOUND!
                        </tr> 
                        )}   
                    </tbody>
                        <Button onClick={onHide} variant='primary' className="m-4">
                            Cancel
                        </Button>
                </Table>
            </Container>
        </Modal.Body>
      </Modal>
        
    )
}

export default FindEmployer
import React, { useState } from 'react'
import { Container, Table, Button, Modal, Col } from 'react-bootstrap'
import SearchBox from './SearchBox'
import NewEmployer from './NewEmployer'

const FindEmployer = ({ findEmployerModal, setFindEmployerModal, setEmployer }) => {
    const [employerData, setEmployerData] = useState('')
    const [showModal, setShowModal] = useState('')

    const onHide = () => {
        setFindEmployerModal(false)
    }

    const handleClick = (employer) => {
        setEmployer(employer)
        setFindEmployerModal(false)
    }

    return (
        <Modal show={findEmployerModal} centered id="mainModal">
            <NewEmployer showModal={showModal} setShowModal={setShowModal} />
        <Modal.Header>
        <Modal.Title as={Col}>
            <h2>Find Employer</h2>
        </Modal.Title>
        <Modal.Title as={Col}>
            <Button className='my-3' onClick={() => {setShowModal(true)}}>
                  <i className='fas fa-plus' /> New Employer
              </Button>
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
                                <td>{employer.location.address}</td>
                                <td>{employer.location.addressTwo}</td>
                                <td>{employer.location.city}/{employer.location.state}</td>
                                <td>{employer.location.country}</td>
                                <td>
                                    <Button variant='light' className='btn-sm' onClick={() => handleClick(employer)}>
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
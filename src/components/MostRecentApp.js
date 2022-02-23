import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Row, Col } from 'react-bootstrap'

function MostRecentApp() {
    const [userData, setUserData] = useState('')
  
    const token = localStorage.getItem('jwtToken')
      
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    }
  
    const getApplications = async () => {
      const {data} = await axios.get('/api/applications/mostrecent', config)
       
      if(data) {
        setUserData(data)
      } 
    }

    useEffect(() => {
        getApplications()
    }, [])

    
    return (
        <Container>
            <Row className="align-items-center">
            <Col>
                <h5><u>Most recent applications</u></h5>
            </Col>
            </Row>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>JOBTITLE</th>
                    <th>COMPANY</th>
                    <th>APPLIED AT</th>
                </tr>
                </thead>
                <tbody>
                {userData && userData.applications[0] ?(
                    userData.applications.map(application => (
                        <LinkContainer key={application._id} to={`/applications/${application._id}`}>
                            <tr>
                                <td>{application.jobtitle}</td>
                                <td>{application.company.employer.companyname}</td>
                                <td>{moment(application.createdAt).format('MM/DD/YY')}</td>
                            </tr>
                        </LinkContainer>
                    ))
                    ) : (
                    <tr>
                    <td>NO APPLICATIONS FOUND!</td>
                    </tr> 
                )}
                </tbody>
            </Table>
      </Container>
     )
}

export default MostRecentApp
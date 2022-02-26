import React from 'react'
import {Container, Navbar, Row, Col} from 'react-bootstrap'


const Footer = () => {
    return (
        <footer>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container className='justify-content-center'>
                    <Row>
                        <Col className='py-3' style={{color: "white"}}>
                            Copyright &copy; André Zorn
                        </Col>
                    </Row> 
                </Container>
            </Navbar>
        </footer>
    )
}

export default Footer
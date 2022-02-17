import React, {useContext} from 'react'
import { AuthContext } from '../context/auth'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'


const NavBar = () => {
    const {user, logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container >
                    <LinkContainer to='/'>
                        <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        
                        {user ? (
                            <Nav>
                            {user.isAdmin && (<Nav.Item>
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/employerlist'>
                                        <NavDropdown.Item>Employers</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/applicationlist'>
                                        <NavDropdown.Item>Applications</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown> 
                            </Nav.Item>)}
                            <Nav.Item>
                                <LinkContainer to='/profile'>
                                    <Nav.Link><i className='fas fa-user'></i>Profile</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to='/applications'>
                                    <Nav.Link><i className='fas fa-user'></i>Applications</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to='/employers'>
                                    <Nav.Link><i className='fas fa-user'></i>Employers</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to='/logout' onClick={handleLogout}>
                                    <Nav.Link><i className='fas fa-user'></i>Logout</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                        ) : (
                            <Nav>
                            <Nav.Item>
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to='/signin'>
                                    <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                        )}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar

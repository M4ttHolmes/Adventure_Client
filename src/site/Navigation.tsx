import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Radium from 'radium'

const styles = {
    navLink: {
        marginRight: "3em",
    }
}


type AuthProps = {
    sessionToken: string | undefined | null
    clearLocalStorage: () => void
    userRole: string
}


const Navigation = (props: AuthProps) => {
    return (
        <Navbar color="dark" dark expand="md">
            <Nav className="ml-auto">
                {props.userRole === "Admin" ? 
                    <NavItem>
                        <Link to="/admin" style={styles.navLink}><Button color="warning" outline>Admin Only</Button></Link>
                    </NavItem>
                : null
                }
                <NavItem>
                    <Link to="/adventure" style={styles.navLink}><Button color="info" outline>Adventures</Button></Link>
                </NavItem>
                <NavItem>
                    <Link to="/meals" style={styles.navLink}><Button color="info" outline>Meals</Button></Link>
                </NavItem>
                <NavItem>
                    <Link to="/" onClick={props.clearLocalStorage} style={styles.navLink}><Button color="danger" outline>Logout</Button></Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
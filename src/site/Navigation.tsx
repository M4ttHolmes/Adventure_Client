import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Radium from "radium";


const styles = {
    navLink: {
        marginRight: "3em",
    },
    
    mainNav: {
        height: "75px",
        backgroundColor: "#628792"
    },

    adminBorder: {
        border: "1px solid red",
    },

}

type AuthProps = {
    sessionToken: string | undefined | null
    clearLocalStorage: () => void
    userRole: string | null
}


const Navigation = (props: AuthProps) => {
    return (
        <Navbar style={styles.mainNav} dark expand="md">
            <NavbarBrand href="/">
                <i className="fas fa-hiking fa-lg"></i> AdventureJournal
            </NavbarBrand>
            <Nav className="ms-auto">
                <NavItem>
                    <Link to="/adventure" style={styles.navLink}><Button>Adventures</Button></Link>
                </NavItem>
                <NavItem>
                    <Link to="/meals" style={styles.navLink}><Button>Meals</Button></Link>
                </NavItem>
                {props.userRole === "Admin" ? 
                    <NavItem>
                        <Link to="/admin" style={styles.navLink}><Button style={styles.adminBorder}>Admin Only</Button></Link>
                    </NavItem>
                : null
                }
                <NavItem>
                    <Link to="/" onClick={props.clearLocalStorage} style={styles.navLink}><Button>Logout</Button></Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Radium(Navigation);
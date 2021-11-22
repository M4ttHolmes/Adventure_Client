import React from 'react';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Radium from "radium";


const styles = {
    navLink: {
        marginRight: "3em",
    },
    
    mainNav: {
        height: "75px",
    },

    adminBorder: {
        border: "1px solid red",
    },

}

type NavState = {
    isOpen: boolean
}


type AuthProps = {
    sessionToken: string | undefined | null
    clearLocalStorage: () => void
    userRole: string | null
}

export default class Navigation extends React.Component<AuthProps, NavState> {
    constructor(props: AuthProps) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false   
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar dark expand="md">
                <NavbarBrand href="/">
                    <i className="fas fa-hiking fa-lg"></i> AdventureJournal
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                        <Link to="/adventure"><Button className="navButton" onClick={this.toggle} >Adventures</Button></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/meals"><Button className="navButton" onClick={this.toggle}>Meals</Button></Link>
                    </NavItem>
                    {this.props.userRole === "Admin" ? 
                        <NavItem>
                            <Link to="/admin"><Button className="navButton" style={styles.adminBorder} onClick={this.toggle}>Admin Only</Button></Link>
                        </NavItem>
                            : null
                    }
                    <NavItem>
                        <Link to="/" onClick={this.props.clearLocalStorage}><Button className="navButton" onClick={this.toggle}>Logout</Button></Link>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        );
    }
  }



// const Navigation = (props: AuthProps) => {
//     return (
//         <div id="fixedNav">
//             <Navbar style={styles.mainNav} dark expand="md">
//                 <NavbarBrand href="/">
//                     <i className="fas fa-hiking fa-lg"></i> AdventureJournal
//                 </NavbarBrand>
//                 <Nav className="ms-auto">
//                     <NavItem>
//                         <Link to="/adventure" style={styles.navLink}><Button>Adventures</Button></Link>
//                     </NavItem>
//                     <NavItem>
//                         <Link to="/meals" style={styles.navLink}><Button>Meals</Button></Link>
//                     </NavItem>
//                     {props.userRole === "Admin" ? 
//                         <NavItem>
//                             <Link to="/admin" style={styles.navLink}><Button style={styles.adminBorder}>Admin Only</Button></Link>
//                         </NavItem>
//                     : null
//                     }
//                     <NavItem>
//                         <Link to="/" onClick={props.clearLocalStorage} style={styles.navLink}><Button>Logout</Button></Link>
//                     </NavItem>
//                 </Nav>
//             </Navbar>
//         </div>
//     );
// };

// export default Radium(Navigation);
import React from "react";
import Navigation from "./Navigation"
import Admin from "../components/Admin/Admin";
import Adventure from "../components/Adventures/Adventure";
import Meal from "../components/Meals/Meal";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


type AuthProps = {
    sessionToken: string | undefined | null
    clearLocalStorage: () => void
    userRole: string
}



const Navbar = (props: AuthProps) => {
    return(
        <React.Fragment>
            <Router>
                <Navigation userRole={props.userRole} sessionToken={props.sessionToken} clearLocalStorage={props.clearLocalStorage}/>
                <Switch>
                    <Route exact path="/"><Adventure /></Route>
                    {props.userRole === "Admin" ?
                        <Route exact path="/admin"><Admin /></Route>
                        : null
                    }
                    <Route exact path="/adventure"><Adventure /></Route>
                    <Route exact path="/meals"><Meal /></Route> 
                    <Route exact path="/logout" />
                </Switch>
            </Router>
        </React.Fragment>
        // <div>
        //     Navbar Stuff
        //     <button onClick={props.clearLocalStorage}>Logout</button>
        // </div>
    )
}

export default Navbar;
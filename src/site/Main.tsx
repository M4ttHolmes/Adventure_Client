import React from "react";
import Navigation from "./Navigation"
import Admin from "../components/Admin/Admin";
import Adventure from "../components/Adventures/Adventure";
import Meal from "../components/Meals/Meal";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


type AuthProps = {
    sessionToken: string | undefined | null
    clearLocalStorage: () => void
    userRole: string | null
}

const Navbar = (props: AuthProps) => {
    return(
        <React.Fragment>
            <Router>
                <Navigation userRole={props.userRole} sessionToken={props.sessionToken} clearLocalStorage={props.clearLocalStorage}/>
                <Switch>
                    <Route exact path="/"><Adventure sessionToken={props.sessionToken}/></Route>
                    {props.userRole === "Admin" ?
                        <Route exact path="/admin"><Admin userRole={props.userRole} sessionToken={props.sessionToken}/></Route>
                        : null
                    }
                    <Route exact path="/adventure"><Adventure sessionToken={props.sessionToken}/></Route>
                    <Route exact path="/meals"><Meal sessionToken={props.sessionToken}/></Route> 
                    <Route exact path="/logout" />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Navbar;
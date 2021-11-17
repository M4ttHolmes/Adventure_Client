import React from "react";
import Navigation from "./Navigation"
import Admin from "../components/Admin/Admin";
import Adventure from "../components/Adventures/Adventure";
import Meal from "../components/Meals/Meal";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


type AuthProps = {
    sessionToken: string | undefined | null
    clearLocalStorage: () => void
}



const Navbar = (props: AuthProps) => {
    return(
        <React.Fragment>
            <Router>
                <Navigation sessionToken={props.sessionToken} clearLocalStorage={props.clearLocalStorage}/>
                <Switch>
                    <Route exact path="/" component={ Adventure } />
                    <Route exact path="/admin" component={ Admin } />
                    <Route exact path="/adventure" component={ Adventure } />
                    <Route exact path="/meals" component={ Meal }/>
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
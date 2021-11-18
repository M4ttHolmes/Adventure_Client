import React, {Component} from "react";
import Auth from "./Auth/Auth"
import Main from "../site/Main"
import { BrowserRouter as Router } from "react-router-dom";

type TokenType = {
    role: string | null
    sessionToken: string | undefined | null
}

export default class Token extends Component<{}, TokenType> {
    constructor(props: TokenType) {
        super(props)
        this.state = {
            sessionToken: undefined,
            role: "" 
        }
        this.updateLocalStorage = this.updateLocalStorage.bind(this)
    }
    
    componentDidMount = (() => {
        if(localStorage.getItem("token")){
            this.setState({
                sessionToken: localStorage.getItem("token"),
                role: localStorage.getItem("role")
            });
        }
    });

    updateRole = (role: string) => {
        localStorage.setItem("role", role)
        this.setState({role: role});
    };

    clearLocalStorage = () =>{
        localStorage.clear();
        this.setState({
            sessionToken: undefined,
            role: ""
        })
    }
        
    updateLocalStorage = (newToken: string) => {
        localStorage.setItem('token', newToken);
        this.setState({
            sessionToken: newToken
        })
    };
 
    viewConductor = () => {
        return this.state.sessionToken !== undefined ?
            <Main userRole={this.state.role} sessionToken={this.state.sessionToken} clearLocalStorage={this.clearLocalStorage} /> : 
            <Auth updateRole={this.updateRole} updateLocalStorage={this.updateLocalStorage}/>
    }
    
    render(){
        return(
            <div>
                <Router>
                    {this.viewConductor()}
                </Router>
            </div>
        )
    }
    
}

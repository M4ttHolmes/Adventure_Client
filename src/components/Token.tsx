import React, {Component} from "react";
import Auth from "./Auth/Auth"
import Main from "../site/Main"
import { BrowserRouter as Router } from "react-router-dom";

type TokenType = {
    sessionToken: string | undefined | null
}

export default class Token extends Component<{}, TokenType> {
    constructor(props: TokenType) {
        super(props)
        this.state = {
            sessionToken: undefined,
        }
        this.updateLocalStorage = this.updateLocalStorage.bind(this)
    }
    
    componentDidMount = (() => {
        if(localStorage.getItem("token")){
            this.setState({sessionToken: localStorage.getItem("token")})
        }
    });

    clearLocalStorage = () =>{
        localStorage.clear();
        this.setState({
            sessionToken: undefined
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
            <Main sessionToken={this.state.sessionToken} clearLocalStorage={this.clearLocalStorage} /> : 
            <Auth updateLocalStorage={this.updateLocalStorage}/>
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
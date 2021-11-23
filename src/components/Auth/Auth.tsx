import React, { Component } from "react";
import DisplayAuth from "./DisplayAuth";
import APIURL from "../../helpers/environment"

type AuthState = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    login: boolean,
    error: string
};

type AuthProps = {
    updateLocalStorage: (newToken: string) => void
    clearLocalStorage: () => void
    updateRole: (role: string) => void
}

export default class Auth extends Component<AuthProps, AuthState> {
    constructor(props: AuthProps){
        super(props)
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "User",
            login: true,
            error: ""
        }
    }

    title = () => {
        return !this.state.login ? "Sign Up" : "Log In"
    }

    loginSignupButton = () => {
        return !this.state.login ? 'Go Back To Sign In' : 'Sign Up'
    }

    
    submitButton = () => {
        return !this.state.login ? 'Create User' : 'Login'
    }

    loginToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.setState({
            login: !this.state.login,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            error: ""
        })
    }

    fields = () => !this.state.login ?
    (
        <div>
            <label htmlFor="email">Email:</label>
            <br/>
            <input required type="email" id="email" placeholder="Ex: user@email.com" value={this.state.email} onChange={(e) => this.setState({email: (e.target.value)})} />
            <br/>
            <label htmlFor="password">Password:</label>
            <br/>
            <input required type="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={(e) => this.setState({password: (e.target.value)})} />
            <br/>
            <label htmlFor="firstName">First Name:</label>
            <br/>
            <input required type='text' id="firstName" placeholder="Your First Name" value={this.state.firstName} onChange={(e) => this.setState({firstName: (e.target.value)})} />
            <br/>
            <label htmlFor="lastName">Last Name:</label>
            <br/>
            <input required type='text' id="lastName" placeholder="Your Last Name" value={this.state.lastName} onChange={(e) => this.setState({lastName: (e.target.value)})} />
        </div>
    ) : (
        <div>
            <label htmlFor="email">Email:</label>
            <br/>
            <input required type="email" id="email" placeholder="Ex: user@email.com" value={this.state.email} onChange={(e) => this.setState({email: (e.target.value)})} />
            <br/>
            <label htmlFor="password">Password:</label>
            <br/>
            <input required type="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={(e) => this.setState({password: (e.target.value)})} />
            <br/>
        </div>
    );


    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let reqBody = this.state.login ?
        {
            user: {
                email: this.state.email,
                password: this.state.password,
            }
        } :
        {
            user: {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                role: this.state.role
            }
        }

        let url = this.state.login ?
        `${APIURL}/user/login` :
        `${APIURL}/user/register`;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({error: json.message})
            this.props.updateLocalStorage(json.sessionToken)
            
            if (json.user.role !== undefined) {
                this.props.updateRole(json.user.role)
            }
        })
        .catch(err => {
            console.log(err)
            this.props.clearLocalStorage();
        }
        
        )
    }


    render() {
        return(
            <div>
                <DisplayAuth 
                    email={this.state.email}
                    password={this.state.password}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    login={this.state.login}
                    handleSubmit={this.handleSubmit}
                    title={this.title}
                    loginToggle={this.loginToggle}
                    submitButton={this.submitButton}
                    fields={this.fields}
                    loginSignupButton={this.loginSignupButton}
                    error={this.state.error}
                /> 
            </div>
        )
    }

}
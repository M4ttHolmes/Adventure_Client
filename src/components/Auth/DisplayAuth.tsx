import React from "react";

type AuthProps = {
    email: string
    password: string
    firstName: string
    lastName: string
    login: boolean
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    title: () => string
    loginToggle: (e: React.MouseEvent<HTMLButtonElement>) => void
    submitButton: () => void
    fields: () => void
    loginSignupButton: () => string
}

const DisplayAuth = (props: AuthProps) => {

    return(
        <div>
            <div>
                <form id="Login" onSubmit={props.handleSubmit}>
                    <hr />
                    <h1 >{props.title()}</h1>
                    <hr />
                    {props.fields()}
                    <br/>
                    <button type="submit" >{props.submitButton()} </button>
                    <br/>
                    <br/>
                    <button onClick={props.loginToggle}>{props.loginSignupButton()}</button>
                </form>
            </div>
        </div>
    )
}

export default DisplayAuth;

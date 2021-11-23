import React from "react";
import {Button, Form, Row, Col, Container} from "reactstrap";

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
    error: string
}

const DisplayAuth = (props: AuthProps) => {

    return(
        <div id="backgroundImage">
            <div id="loginBackground">
                <Container id="loginContainer">
                    <Row>
                        <Col lg="6">
                            <i className="fas fa-hiking fa-10x"></i>
                            <h3 id="loginHeader">Adventure Journal</h3>
                        </Col>
                        <Col lg="6">
                        <Form className="border" onSubmit={props.handleSubmit}>
                            <h5>{props.title()}</h5>
                            <hr className="loginHR"/>
                            {props.fields()}
                            <br/>
                            <Button className="loginButton" outline onClick={props.loginToggle}>{props.loginSignupButton()}</Button>
                            <Button className="loginButton" type="submit" >{props.submitButton()} </Button>
                            {props.error === "" ? null : <p id="errorMessage">{props.error}</p>}
                        </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default DisplayAuth;

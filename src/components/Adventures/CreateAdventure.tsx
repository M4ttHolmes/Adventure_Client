import React, { Component } from "react";
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';

type AuthProps = {
    sessionToken: string | undefined | null
    createOff: () => void
    fetchMyAdventures: () => void
    notify: () => void
}

type AdvDetails = {
    actType: string
    advName: string
    date: string
    location: string
    rating: number
    thoughts: string
    private: boolean
}


export default class CreateAdventure extends Component<AuthProps, AdvDetails> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            actType: "",
            advName: "",
            date: "",
            location: "",
            rating: 0,
            thoughts: "",
            private: true
        }
    }

    createAdventure = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:5000/adventure/create", {
            method: "POST",
            body: JSON.stringify({
                adventure: {
                    location: this.state.location,
                    date: this.state.date,
                    advName: this.state.advName,
                    actType: this.state.actType,
                    thoughts: this.state.thoughts,
                    rating: this.state.rating,
                    private: this.state.private
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                actType: "",
                advName: "",
                date: "",
                location: "",
                rating: 0,
                thoughts: "",
                private: true
            })
            this.props.fetchMyAdventures();
            this.props.createOff();
            this.props.notify();
        })
        .catch(err => console.log(err))
    }


    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>Create an Adventure</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.createAdventure}>
                        <FormGroup>
                            <Label htmlFor="location">Adventure Location</Label>
                            <Input required name="location" type="text" value={this.state.location} onChange={(e) => this.setState({location: (e.target.value)})}/>

                            <Label htmlFor="date"></Label>
                            <Input required name="date" type="date" value={this.state.date} onChange={(e) => this.setState({ date: (e.target.value)})}/>

                            <Label htmlFor="advName">Adventure Name</Label>
                            <Input required name="advName" type="text" value={this.state.advName} onChange={(e) => this.setState({advName: (e.target.value)})}/>

                            <Label htmlFor="actType">Activity Type</Label>
                            <Input required name="actType" type="text" value={this.state.actType} onChange={(e) => this.setState({actType: (e.target.value)})}/>

                            <Label htmlFor="thoughts">Your Thoughts</Label>
                            <Input required name="thoughts" type="textarea" value={this.state.thoughts} onChange={(e) => this.setState({thoughts: (e.target.value)})}/>

                            <Label htmlFor="rating">Rating</Label>
                            <Input required name="rating" type="select" value={this.state.rating} onChange={(e) => this.setState({rating: Number((e.target.value))})}>
                                <option hidden>--Rate your Adventure--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Create!</Button>
                        <Button onClick={this.props.createOff}>Cancel</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

}

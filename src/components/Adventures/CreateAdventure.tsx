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
                <ModalHeader id="modalHeader">Create an Adventure</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.createAdventure}>
                        <FormGroup>
                            <Label htmlFor="advName">Adventure Name</Label>
                            <Input className="inputSpacer" required name="advName" type="text" value={this.state.advName} placeholder="Ex: Exploring Denali National Park" onChange={(e) => this.setState({advName: (e.target.value)})}/>

                            <Label htmlFor="actType">Activity Type</Label>
                            <Input className="inputSpacer" required name="actType" type="text" value={this.state.actType} placeholder="Ex: Scenic Wildlife Tour" onChange={(e) => this.setState({actType: (e.target.value)})}/>

                            <Label htmlFor="date">Date</Label>
                            <Input className="inputSpacer" required name="date" type="date" value={this.state.date} onChange={(e) => this.setState({ date: (e.target.value)})}/>

                            <Label htmlFor="location">Adventure Location</Label>
                            <Input className="inputSpacer" required name="location" type="text" value={this.state.location} placeholder="Ex: Denali, Alaska - United States" onChange={(e) => this.setState({location: (e.target.value)})}/>

                            <Label htmlFor="thoughts">Your Thoughts</Label>
                            <Input className="inputSpacer" required name="thoughts" type="textarea" value={this.state.thoughts} placeholder="Use this area to journal your thoughts about this adventure." onChange={(e) => this.setState({thoughts: (e.target.value)})}/>

                            <Label htmlFor="rating">Rating</Label>
                            <Input className="inputSpacer" required name="rating" type="select" value={this.state.rating} onChange={(e) => this.setState({rating: Number((e.target.value))})}>
                                <option hidden>--Rate your Adventure--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Input>
                        </FormGroup>
                        <div id="buttonDiv">
                            <Button className="twoBtns" type="submit">Create!</Button>
                            <Button className="twoBtns" outline onClick={this.props.createOff}>Cancel</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

}

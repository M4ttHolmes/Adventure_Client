import React, { Component } from "react";
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';
import APIURL from "../../helpers/environment"

type AuthProps = {
    sessionToken: string | undefined | null
    updateOff: () => void
    fetchMyAdventures: () => void
    updatedAdventure: AdvDetails
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
    id: string
}

export default class UpdateAdventure extends Component<AuthProps, AdvDetails> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            actType: this.props.updatedAdventure.actType,
            advName: this.props.updatedAdventure.advName,
            date: this.props.updatedAdventure.date,
            location: this.props.updatedAdventure.location,
            rating: this.props.updatedAdventure.rating,
            thoughts: this.props.updatedAdventure.thoughts,
            private: this.props.updatedAdventure.private,
            id: this.props.updatedAdventure.id
        }
    }

    updateAdventure = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        fetch(`${APIURL}/adventure/update/${this.props.updatedAdventure.id}`, {
            method: "PUT",
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
            this.props.fetchMyAdventures()
            this.props.updateOff()
            this.props.notify();
        })
    }



    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update your Adventure</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.updateAdventure}>
                        <FormGroup>
                            <Label htmlFor="advName">Adventure Name</Label>
                            <Input className="inputSpacer" name="advName" type="text" value={this.state.advName} onChange={(e) => this.setState({advName: (e.target.value)})}/>

                            <Label htmlFor="actType">Activity Type</Label>
                            <Input className="inputSpacer" name="actType" type="text" value={this.state.actType} onChange={(e) => this.setState({actType: (e.target.value)})}/>

                            <Label htmlFor="date">Date</Label>
                            <Input className="inputSpacer" name="date" type="date" value={this.state.date} onChange={(e) => this.setState({ date: (e.target.value)})}/>

                            <Label htmlFor="location">Adventure Location</Label>
                            <Input className="inputSpacer" name="location" type="text" value={this.state.location} onChange={(e) => this.setState({location: (e.target.value)})}/>

                            <Label htmlFor="thoughts">Your Thoughts</Label>
                            <Input className="inputSpacer" name="thoughts" type="textarea" value={this.state.thoughts} onChange={(e) => this.setState({thoughts: (e.target.value)})}/>

                            <Label htmlFor="rating">Rating</Label>
                            <Input className="inputSpacer" name="rating" type="select" value={this.state.rating} onChange={(e) => this.setState({rating: Number((e.target.value))})}>
                                <option hidden>--Rate your Adventure--</option>
                                <option value="1">1 Star - Never Again</option>
                                <option value="2">2 Stars - Not Great</option>
                                <option value="3">3 Stars - Okay/Fine</option>
                                <option value="4">4 Stars - Pretty Good</option>
                                <option value="5">5 Stars - Loved it</option>
                            </Input>
                        </FormGroup>
                        <div id="buttonDiv">
                            <Button className="twoBtns" outline onClick={this.props.updateOff}>Cancel</Button>
                            <Button className="twoBtns" type="submit">Update!</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

}
import React, { Component } from "react";
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';
import APIURL from "../../helpers/environment"

type AuthProps = {
    sessionToken: string | undefined | null
    updateOff: () => void
    fetchMyMeals: () => void
    updatedMeal: MealDetails
    notify: () => void
}

type MealDetails = {
    name: string
    date: string
    location: string
    rating: number
    thoughts: string
    private: boolean
    id: string
}

export default class UpdateMeal extends Component<AuthProps, MealDetails> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            name: this.props.updatedMeal.name,
            date: this.props.updatedMeal.date,
            location: this.props.updatedMeal.location,
            rating: this.props.updatedMeal.rating,
            thoughts: this.props.updatedMeal.thoughts,
            private: this.props.updatedMeal.private,
            id: this.props.updatedMeal.id
        }
    }

    updateMeal = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        fetch(`${APIURL}/meal/update/${this.props.updatedMeal.id}`, {
            method: "PUT",
            body: JSON.stringify({
                meal: {
                    location: this.state.location,
                    date: this.state.date,
                    name: this.state.name,
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
            this.props.fetchMyMeals()
            this.props.updateOff()
            this.props.notify()
        })
    }



    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update your Meal</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.updateMeal}>
                        <FormGroup>
                            <Label htmlFor="location">Meal Location</Label>
                            <Input className="inputSpacer" name="location" type="text" value={this.state.location} onChange={(e) => this.setState({location: (e.target.value)})}/>

                            <Label htmlFor="date">Date</Label>
                            <Input className="inputSpacer" name="date" type="date" value={this.state.date} onChange={(e) => this.setState({ date: (e.target.value)})}/>

                            <Label htmlFor="advName">Meal Name</Label>
                            <Input className="inputSpacer" name="advName" type="text" value={this.state.name} onChange={(e) => this.setState({name: (e.target.value)})}/>

                            <Label htmlFor="thoughts">Your Thoughts</Label>
                            <Input className="inputSpacer" name="thoughts" type="textarea" rows="5" value={this.state.thoughts} onChange={(e) => this.setState({thoughts: (e.target.value)})}/>

                            <Label htmlFor="rating">Rating</Label>
                            <Input className="inputSpacer" name="rating" type="select" value={this.state.rating} onChange={(e) => this.setState({rating: Number((e.target.value))})}>
                                <option hidden>--Rate your Meal--</option>
                                <option value="1">1 Star - Never Again</option>
                                <option value="2">2 Stars - Not Great</option>
                                <option value="3">3 Stars - Okay/Fine</option>
                                <option value="4">4 Stars - Pretty Good</option>
                                <option value="5">5 Stars - Loved it</option>
                            </Input>
                        </FormGroup>
                        <div id="buttonDiv"> 
                            <Button className="twoBtns" outline onClick={this.props.updateOff}>Cancel</Button>
                            <Button className="twoBtns"type="submit">Update!</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

}
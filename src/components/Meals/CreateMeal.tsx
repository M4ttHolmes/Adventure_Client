import React, { Component } from "react";
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';

type AuthProps = {
    sessionToken: string | undefined | null
    createOff: () => void
    fetchMyMeals: () => void
    notify: () => void
}

type MealDetails = {
    name: string
    date: string
    location: string
    rating: number
    thoughts: string
    private: boolean
}


export default class CreateAdventure extends Component<AuthProps, MealDetails> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            name: "",
            date: "",
            location: "",
            rating: 0,
            thoughts: "",
            private: true
        }
    }

    createMeal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:5000/meal/create", {
            method: "POST",
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
            console.log(data);
            this.setState({
                name: "",
                date: "",
                location: "",
                rating: 0,
                thoughts: "",
                private: true
            })
            this.props.fetchMyMeals();
            this.props.createOff();
            this.props.notify();
        })
        .catch(err => console.log(err))
    }


    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>Create a Meal</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.createMeal}>
                        <FormGroup>
                            <Label htmlFor="location">Meal Location</Label>
                            <Input name="location" type="text" value={this.state.location} onChange={(e) => this.setState({location: (e.target.value)})}/>

                            <Label htmlFor="date">Date</Label>
                            <Input name="date" type="date" value={this.state.date} onChange={(e) => this.setState({ date: (e.target.value)})}/>

                            <Label htmlFor="advName">Meal Name</Label>
                            <Input name="advName" type="text" value={this.state.name} onChange={(e) => this.setState({name: (e.target.value)})}/>

                            <Label htmlFor="thoughts">Your Thoughts</Label>
                            <Input name="thoughts" type="textarea" value={this.state.thoughts} onChange={(e) => this.setState({thoughts: (e.target.value)})}/>

                            <Label htmlFor="rating">Rating</Label>
                            <Input name="rating" type="select" value={this.state.rating} onChange={(e) => this.setState({rating: Number((e.target.value))})}>
                                <option hidden>--Rate your Meal--</option>
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

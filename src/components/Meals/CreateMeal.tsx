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
                <ModalHeader id="modalHeader">Create a Meal</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.createMeal}>
                        <FormGroup>
                            <Label htmlFor="advName">Meal Name</Label>
                            <Input className="inputSpacer"name="advName" type="text" placeholder="Ex: Restaurant or Dish Name" value={this.state.name} onChange={(e) => this.setState({name: (e.target.value)})}/>

                            <Label htmlFor="date">Date</Label>
                            <Input className="inputSpacer" name="date" type="date" value={this.state.date} onChange={(e) => this.setState({ date: (e.target.value)})}/>

                            <Label htmlFor="location">Meal Location</Label>
                            <Input className="inputSpacer" name="location" type="text" value={this.state.location} placeholder="Ex: City/State/Country" onChange={(e) => this.setState({location: (e.target.value)})}/>

                            <Label htmlFor="thoughts">Your Thoughts</Label>
                            <Input className="inputSpacer" name="thoughts" type="textarea" value={this.state.thoughts} placeholder="Use this area to journal your thoughts about this meal." onChange={(e) => this.setState({thoughts: (e.target.value)})}/>

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
                            <Button className="twoBtns" type="submit">Create!</Button>
                            <Button className="twoBtns" outline onClick={this.props.createOff}>Cancel</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

}

import React from "react";
import { Row, Button, Card, CardBody, CardText, CardSubtitle } from 'reactstrap';

type MealProps = {
    meals: MealDetails[]
    fetchMyMeals: () => void
    deleteMeal: (advId: string) => void
    sessionToken: string | undefined | null
    createOn: () => void
    updateOn: () => void
    editUpdateMeal: (id: MealDetails) => void
    convertToStars: (key: number) => void
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




const DisplayMeal = (props: MealProps) => {


    return(
        <div className="contentBackground">
            <div id="pageBody">
                <h1 id="pageHeader">My Meals</h1>
                <p>Track a new favorite restaruant or look back on fond meal memories.</p>
                <Button onClick={props.createOn}>Log New Meal</Button>
                <Row>
                    {props.meals.map((meal: MealDetails, key:number) => {
                        return(
                            <Card style={{width: "45%"}} key={key}>
                                <CardBody>
                                <h5 className="card-title">{meal.name}</h5>
                                    <CardSubtitle className="mb-2 text-muted">{meal.date}</CardSubtitle>
                                    <CardText><strong>Location:</strong> 
                                        <a href={`https://www.google.com/maps/search/${meal.location}`} target="_blank"> {meal.location}</a>
                                    </CardText>
                                    <CardText><strong>Thoughts:</strong> {meal.thoughts}</CardText>
                                    <CardText id="starRating"><strong>Rating: </strong>
                                        {props.convertToStars(key)} ({meal.rating} out of 5)
                                    </CardText>
                                    <div id="buttonDiv">
                                        <Button className="btn twoBtns" type="button" onClick={() => {props.editUpdateMeal(meal); props.updateOn()}}>Edit Meal</Button>
                                        <Button className="btn btn-danger twoBtns" type="button" onClick={() => {props.deleteMeal(meal.id)}}>Delete Meal</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}

export default DisplayMeal;
import React from "react";
import {Table, Button} from "reactstrap"

type AdminProps = {
    meals: []
    deleteMeal: (mealId: string) => void
}

type MealFields = {
    location: string
    date: string
    name: string
    rating: number
    userId: string
    id: string
}

const DisplayAdminMeals = (props: AdminProps) => {


    return(
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Meal Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                <tbody>

                    {props.meals.map((meal: MealFields, key) => {
                        return(
                            <tr key={key}>
                                <td>{meal.userId}</td>
                                <td>{meal.name}</td>
                                <td>{meal.location}</td>
                                <td>{meal.date}</td>
                                <td>{meal.rating}</td>
                                <td><Button style={{paddingTop: "0px", paddingBottom: "0px"}} color="danger" onClick={() => props.deleteMeal(meal.id)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </>
    )
}

export default DisplayAdminMeals
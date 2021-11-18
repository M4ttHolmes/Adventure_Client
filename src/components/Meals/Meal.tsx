import React, { Component } from "react";
import DisplayMeal from "./DisplayMeal"


type AuthProps = {
    sessionToken: string | undefined | null
}


export default class Meal extends Component<AuthProps, {}> {



    render() {
        return(
            <div>
                <DisplayMeal />
            </div>
        )
    }
}
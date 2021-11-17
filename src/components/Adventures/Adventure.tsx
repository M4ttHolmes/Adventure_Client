import { render } from "@testing-library/react"
import React, { Component } from "react"
import DisplayAdventure from "./DisplayAdventure"

export default class Adventure extends Component {



    render(){
        return(
            <div>
                <DisplayAdventure />
            </div>
        )
    }
}
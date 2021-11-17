import { render } from "@testing-library/react"
import React, { Component } from "react"
import DisplayAdventure from "./DisplayAdventure"

type AuthProps = {
    sessionToken: string | undefined | null
}

export default class Adventure extends Component<AuthProps, {}> {
    


    render(){
        return(
            <div>
                <DisplayAdventure />
            </div>
        )
    }
}
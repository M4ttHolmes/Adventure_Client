import React, { Component } from "react"
import CreateCharacter from "./CreateAdventure"
import DisplayAdventure from "./DisplayAdventure"

type AdventureState = {
    adventures: []
    createActive: boolean
}


type AuthProps = {
    sessionToken: string | undefined | null
}

export default class Adventure extends Component<AuthProps, AdventureState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            adventures: [],
            createActive: false
        }
    }

    componentDidMount = () => {
        this.fetchMyAdventures();
    }

    createOn = () => {
        this.setState({createActive: true})
    }
    
    createOff = () => {
        this.setState({createActive: false})
    }

    fetchMyAdventures = () => {
        console.log("FetchMyAdventures Function Called");
        fetch("http://localhost:5000/adventure/mine", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                adventures: data.userAdventures
            })
            console.log(this.state.adventures);
        })
        .catch(err => console.log(err))


    }


    render(){
        return(
            <div>
                {this.state.createActive ? <CreateCharacter createOff={this.createOff} fetchMyAdventures={this.fetchMyAdventures} sessionToken={this.props.sessionToken}/> : null }
                <DisplayAdventure createOn={this.createOn} adventures={this.state.adventures} fetchMyAdventures={this.fetchMyAdventures} sessionToken={this.props.sessionToken}/>
            </div>
        )
    }
}
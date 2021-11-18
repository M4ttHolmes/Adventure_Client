import React, { Component } from "react"
import CreateAdventure from "./CreateAdventure"
import DisplayAdventure from "./DisplayAdventure"
import UpdateAdventure from "./UpdateAdventure"

type AdventureState = {
    adventures: []
    createActive: boolean
    updateActive: boolean
    updatedAdventure: AdventureDetails
}

type AuthProps = {
    sessionToken: string | undefined | null
}


type AdventureDetails = {
    actType: string
    advName: string
    date: string
    location: string
    rating: number
    thoughts: string
    private: boolean
    id: string
}


export default class Adventure extends Component<AuthProps, AdventureState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            adventures: [],
            createActive: false,
            updateActive: false,
            updatedAdventure: {
                actType: "",
                advName: "",
                date: "",
                location: "",
                rating: 0,
                thoughts: "",
                private: true,
                id: ""
            }
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
    
    updateOn = () => {
        this.setState({updateActive: true})
    }
    
    updateOff = () => {
        this.setState({updateActive: false})
    }
    
    editUpdateAdventure = (adventureDetails: AdventureDetails) => {
        this.setState({updatedAdventure: adventureDetails})
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
                adventures: data.userAdventures.reverse()
            })
            console.log(this.state.adventures);
        })
        .catch(err => console.log(err))


    }

    deleteAdventure = (advId: string) => {
        const proceed = window.confirm("Are you certain you wish to delete this adventure? This is a permanent action that cannot be undone.");
        
        if (proceed) {
            console.log("DeleteAdventure Function Called");
            console.log(advId);

            fetch(`http://localhost:5000/adventure/${advId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.sessionToken}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.fetchMyAdventures();
            })
            .catch(err => console.log(err))

        } else {
            console.log("Delete cancelled.");
        }
    }


    render(){
        return(
            <div>
                {this.state.updateActive ? <UpdateAdventure updatedAdventure={this.state.updatedAdventure} updateOff={this.updateOff} fetchMyAdventures={this.fetchMyAdventures} sessionToken={this.props.sessionToken}/> : null }
                {this.state.createActive ? <CreateAdventure createOff={this.createOff} fetchMyAdventures={this.fetchMyAdventures} sessionToken={this.props.sessionToken}/> : null }
                <DisplayAdventure deleteAdventure={this.deleteAdventure} updateOn={this.updateOn} editUpdateAdventure={this.editUpdateAdventure} createOn={this.createOn} adventures={this.state.adventures} fetchMyAdventures={this.fetchMyAdventures} sessionToken={this.props.sessionToken}/>
            </div>
        )
    }
}
import React from "react";
import { Row, Button, Card, CardBody, CardText, CardSubtitle } from 'reactstrap';

type AdvProps = {
    adventures: AdventureDetails[]
    fetchMyAdventures: () => void
    deleteAdventure: (advId: string) => void
    sessionToken: string | undefined | null
    createOn: () => void
    updateOn: () => void
    editUpdateAdventure: (id: AdventureDetails) => void
    convertToStars: (key: number) => void
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

const DisplayAdventure = (props: AdvProps) => {

    return(
        <div className="contentBackground">
            <div id="pageBody">
                <h1 id="pageHeader">My Adventures</h1>
                <p>Track a new adventure, or reminisce through your previous adventures.</p>
                <Button onClick={props.createOn}>Log New Adventure</Button>
                <Row>
                    {props.adventures.map((adv: AdventureDetails, key:number) => {
                        return(
                            <Card style={{width: "45%"}} key={key}>
                                <CardBody>
                                <h5 className="card-title">{adv.advName}</h5>
                                    <CardSubtitle className="mb-2 text-muted">{adv.actType}</CardSubtitle>
                                    <CardSubtitle className="mb-2 text-muted">{adv.date}</CardSubtitle>
                                    <CardText><strong>Location:</strong> 
                                        <a href={`https://www.google.com/maps/search/${adv.location}`} target="_blank"> {adv.location}</a>
                                    </CardText>
                                    <CardText><strong>Thoughts:</strong> {adv.thoughts}</CardText>
                                    <CardText id="starRating"><strong>Rating: </strong>
                                        {props.convertToStars(key)} ({adv.rating} out of 5)
                                    </CardText>
                                    <div id="buttonDiv">
                                        <Button className="btn twoBtns" type="button" onClick={() => {props.editUpdateAdventure(adv); props.updateOn()}}>Edit Adventure</Button>
                                        <Button className="btn btn-danger twoBtns" type="button" onClick={() => {props.deleteAdventure(adv.id)}}>Delete Adventure</Button>
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

export default DisplayAdventure
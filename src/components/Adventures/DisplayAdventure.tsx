import React from "react";
import { Row, Button, Card, CardBody, CardText, CardSubtitle } from 'reactstrap';

type AdvProps = {
    adventures: []
    fetchMyAdventures: () => void
    deleteAdventure: (advId: string) => void
    sessionToken: string | undefined | null
    createOn: () => void
    updateOn: () => void
    editUpdateAdventure: (id: AdventureDetails) => void
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
        <div id="pageBody">
            <h1 id="pageHeader">My Adventures</h1>
            <p>Track your adventures...</p>
            <Button onClick={props.createOn}>Create New Adventure</Button>
            <Row>
                {props.adventures.map((adv: AdventureDetails, key:number) => {
                    return(
                        <Card key={key}>
                            <CardBody>
                            <h5 className="card-title">{adv.advName}</h5>
                                <CardSubtitle className="mb-2 text-muted">{adv.actType}</CardSubtitle>
                                <CardSubtitle className="mb-2 text-muted">{adv.date}</CardSubtitle>
                                <CardText><strong>Location:</strong> {adv.location}</CardText>
                                <CardText><strong>Thoughts:</strong> {adv.thoughts}</CardText>
                                <CardText><strong>Rating:</strong> {adv.rating}</CardText>
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
    )
}

export default DisplayAdventure
import React from "react";
import {Table, Button} from "reactstrap"

type AdminProps = {
    adventures: []
    deleteAdv: (advId: string) => void
}

type AdvFields = {
    location: string
    date: string
    advName: string
    actType: string
    rating: number
    userId: string
    id: string
}

const DisplayAdminAdv = (props: AdminProps) => {


    return(
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Adventure Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Activity Type</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                <tbody>

                    {props.adventures.map((adv: AdvFields, key) => {
                        return(
                            <tr key={key}>
                                <td>{adv.userId}</td>
                                <td>{adv.advName}</td>
                                <td>{adv.location}</td>
                                <td>{adv.date}</td>
                                <td>{adv.actType}</td>
                                <td>{adv.rating}</td>
                                <td><Button style={{paddingTop: "0px", paddingBottom: "0px"}} color="danger" onClick={() => props.deleteAdv(adv.id)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </>
    )
}

export default DisplayAdminAdv
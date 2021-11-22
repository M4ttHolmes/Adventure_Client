import React from "react";
import {Table, Button} from "reactstrap"

type AdminProps = {
    users: []
    deleteUser: (userId: string) => void
}


type UserFields = {
    firstName: string
    lastName: string
    email: string
    role: string
    id: string
}


const DisplayAdminUsers = (props: AdminProps) => {



    return(
        <div style={{backgroundColor:"white"}}>
            <Table striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>

                    {props.users.map((user: UserFields, key) => {
                        return(
                            <tr key={key}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><Button style={{paddingTop: "0px", paddingBottom: "0px"}} color="danger" onClick={() => props.deleteUser(user.id)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </div>
    )
}

export default DisplayAdminUsers
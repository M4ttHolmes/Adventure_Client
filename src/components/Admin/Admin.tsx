import React, {Component} from "react";
import DisplayAdmin from "./DisplayAdmin";


type AuthProps = {
    sessionToken: string | undefined | null
    userRole: string
}

export default class Admin extends Component<AuthProps, {}> {




    render() {
        return(
            <div>
                <DisplayAdmin />
            </div>
        )
    }
}
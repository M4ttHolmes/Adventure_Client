import React from "react";


type AuthProps = {
    sessionToken: string
    clearLocalStorage: () => void
}



const Navbar = (props: AuthProps) => {
    return(
        <div>
            Navbar Stuff
            <button onClick={props.clearLocalStorage}>Logout</button>
        </div>
    )
}

export default Navbar;
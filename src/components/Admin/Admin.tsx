import React, {Component} from "react";
import {Button} from 'reactstrap';
import DisplayAdminUsers from "./DisplayAdminUsers"
import DisplayAdminAdv from "./DisplayAdminAdv"
import DisplayAdminMeals from "./DisplayAdminMeals"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type AuthProps = {
    sessionToken: string | undefined | null
    userRole: string
}

type AdminTypes = {
    users: []
    adventures: []
    meals: []
    userOn: boolean
    advOn: boolean
    mealOn: boolean
}


export default class Admin extends Component<AuthProps, AdminTypes> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            users: [],
            adventures: [],
            meals: [],
            userOn: false,
            advOn: false,
            mealOn: false
        }
    }

    toggleUser = () => {
        this.setState({userOn: true},)
        this.setState({advOn: false})
        this.setState({mealOn: false})
    }

    toggleAdv = () => {
        this.setState({userOn: false},)
        this.setState({advOn: true})
        this.setState({mealOn: false})
    }

    toggleMeal = () => {
        this.setState({userOn: false},)
        this.setState({advOn: false})
        this.setState({mealOn: true})
    }

    deleteNotify = () => {
        toast.success("Item Deleted!");
    }

    adminFetchAllUsers = () => {
        console.log("AdminFetchAllUsers Function Called");
        fetch("http://localhost:5000/user/all", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                users: data
            })
            console.log(this.state.users);
        })
        .catch(err => console.log(err))
    }

    adminDeleteUser = (userId: string) => {
        const proceed = window.confirm("Are you certain you wish to delete this user? This is a permanent action that cannot be undone.");
        
        if (proceed) {
            console.log("AdminDeleteUser Function Called");
            console.log(userId);

            fetch(`http://localhost:5000/user/delete/${userId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.sessionToken}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.adminFetchAllUsers();
                this.deleteNotify();
            })
            .catch(err => console.log(err))

        } else {
            console.log("Delete cancelled.");
        }
    }


    adminFetchAllAdventures = () => {
        console.log("AdminFetchAllAdventures Function Called");
        fetch("http://localhost:5000/adventure/all", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                adventures: data
            })
            console.log(this.state.adventures);
        })
        .catch(err => console.log(err))
    }

    adminDeleteAdventure = (advId: string) => {
        const proceed = window.confirm("Are you certain you wish to delete this adventure? This is a permanent action that cannot be undone.");
        
        if (proceed) {
            console.log("AdminDeleteAdventure Function Called");
            console.log(advId);

            fetch(`http://localhost:5000/adventure/admin/${advId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.sessionToken}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.adminFetchAllAdventures();
                this.deleteNotify();
            })
            .catch(err => console.log(err))

        } else {
            console.log("Delete cancelled.");
        }
    }


    adminFetchAllMeals = () => {
        console.log("AdminFetchAllMeals Function Called");
        fetch("http://localhost:5000/meal/all", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                meals: data
            })
            console.log(this.state.meals);
        })
        .catch(err => console.log(err))
    }

    adminDeleteMeal = (mealId: string) => {
        const proceed = window.confirm("Are you certain you wish to delete this meal? This is a permanent action that cannot be undone.");
        
        if (proceed) {
            console.log("AdminDeleteMeal Function Called");
            console.log(mealId);

            fetch(`http://localhost:5000/meal/admin/${mealId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.sessionToken}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.adminFetchAllMeals();
                this.deleteNotify();
            })
            .catch(err => console.log(err))

        } else {
            console.log("Delete cancelled.");
        }
    }


    render() {
        return(
            <div id="pageBody">
                <h1 id="pageHeader">Admin Tools</h1>
                <div>
                    <Button className="buttonRowItem" onClick={() => {this.toggleUser(); this.adminFetchAllUsers()}}>Display All Users</Button>
                    <Button className="buttonRowItem" onClick={() => {this.toggleAdv(); this.adminFetchAllAdventures()}}>Display All Adventures</Button>
                    <Button className="buttonRowItem" onClick={() => {this.toggleMeal(); this.adminFetchAllMeals()}}>Display All Meals</Button>
                </div>
                {this.state.userOn ? <DisplayAdminUsers users={this.state.users} deleteUser={this.adminDeleteUser} />  : null}
                {this.state.advOn ? <DisplayAdminAdv adventures={this.state.adventures} deleteAdv={this.adminDeleteAdventure}/>  : null}
                {this.state.mealOn ? <DisplayAdminMeals meals={this.state.meals} deleteMeal={this.adminDeleteMeal}/>  : null}
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                />
            </div>
        )
    }
}
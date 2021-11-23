import React, { Component } from "react";
import DisplayMeal from "./DisplayMeal"
import CreateMeal from "./CreateMeal"
import UpdateMeal from "./UpdateMeal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIURL from "../../helpers/environment"


type AuthProps = {
    sessionToken: string | undefined | null
}


type MealState = {
    meals: MealDetails[]
    createActive: boolean
    updateActive: boolean
    updatedMeal: MealDetails
}

type MealDetails = {
    name: string
    date: string
    location: string
    rating: number
    thoughts: string
    private: boolean
    id: string
}



export default class Meal extends Component<AuthProps, MealState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            meals: [],
            createActive: false,
            updateActive: false,
            updatedMeal: {
                name: "",
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
        this.fetchMyMeals();
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
    
    editUpdateMeal = (mealDetails: MealDetails) => {
        this.setState({updatedMeal: mealDetails})
    }
    
    createMealNotify = () => {
        toast.success("Meal Created!")
    }

    editMealNotify = () => {
        toast.success("Meal Edited!")
    }

    deleteMealNotify = () => {
        toast.success("Meal Deleted!");
    }

    convertToStars = (key: number) => {
        let array = [];
        for (let i = 1; i <= this.state.meals[key].rating; i++) {
            console.log(i);
            array.push(1)
        }
            return array.map((num: number, key: number) => {
                return <i className="fas fa-star"></i>
            })
    }

    fetchMyMeals = () => {
        console.log("FetchMyMeals Function Called");
        fetch(`${APIURL}/meal/mine`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                meals: data.userMeals.reverse()
            })
            console.log(this.state.meals);
        })
        .catch(err => console.log(err))
    }

    deleteMeal = (mealId: string) => {
        const proceed = window.confirm("Are you certain you wish to delete this meal? This is a permanent action that cannot be undone.");
        
        if (proceed) {
            console.log("DeleteAdventure Function Called");
            console.log(mealId);

            fetch(`${APIURL}/meal/${mealId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.sessionToken}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.fetchMyMeals();
                this.deleteMealNotify();
            })
            .catch(err => console.log(err))

        } else {
            console.log("Delete cancelled.");
        }
    }

    render() {
        return(
            <div>
                {this.state.updateActive ? <UpdateMeal notify={this.editMealNotify} updatedMeal={this.state.updatedMeal} updateOff={this.updateOff} fetchMyMeals={this.fetchMyMeals} sessionToken={this.props.sessionToken}/> : null }
                {this.state.createActive ? <CreateMeal notify={this.createMealNotify} createOff={this.createOff} fetchMyMeals={this.fetchMyMeals} sessionToken={this.props.sessionToken}/> : null }
                <DisplayMeal convertToStars={this.convertToStars} deleteMeal={this.deleteMeal} updateOn={this.updateOn} editUpdateMeal={this.editUpdateMeal} createOn={this.createOn} meals={this.state.meals} fetchMyMeals={this.fetchMyMeals} sessionToken={this.props.sessionToken}/>
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
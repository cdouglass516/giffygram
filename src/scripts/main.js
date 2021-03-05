
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display

import { NavBar } from "./nav/nav.js";
import {getLoggedInUser} from "./data/DataManager.js"
import { Footer } from "../footer/footer.js";
import {PostEntry} from "./feed/postEntry.js"
let postElement = document.querySelector(".postList");
let navElement = document.querySelector("nav");
let entryElement = document.querySelector(".entryForm");
let footerElement = document.querySelector("footer");

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
const applicationElement = document.querySelector(".giffygram");
const showNavBar = () => {
    navElement.innerHTML = NavBar();
}
const showFooter =() =>{
    footerElement.innerHTML = Footer();
}
const showFeed = () =>{
    entryElement.innerHTML = PostEntry();
}
const startGiffyGram = () => {
    postElement.innerHTML = "Hello Cohort 47"
    showNavBar();
    showFooter();
    showFeed();
    console.log(getLoggedInUser());

}
// Are you defining the function here or invoking it?
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})
startGiffyGram();
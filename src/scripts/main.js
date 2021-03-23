
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display

import { NavBar } from "./nav/nav.js";
import {getLoggedInUser, getDadJoke, createPost,postSearch,getPosts, getUsers, deletePost } from "./data/DataManager.js"
import { Footer } from "../footer/footer.js";
import {PostEntry} from "./feed/postEntry.js";
import { PostList } from "./feed/PostList.js"
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
    postElement.innerHTML = "Hello Cohort 47";
    
    getDad();
    showNavBar();
    showFooter();
    showFeed();
    showPostList();
    clearForm();
}
const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
  }
const getDad = () =>{
    getDadJoke()
    // .then(data =>{
    //   const dadJoke = document.querySelector(".dadJoke");
    // dadJoke.innerHTML = data;  
  //  })
}

const showPostList = (filteredPosts) => {
    //Get a reference to the location on the DOM where the list will display
    const postElement = document.querySelector(".postList");
    if (!Array.isArray(filteredPosts)) {
        getPosts().then((allPosts) => {
            postElement.innerHTML = PostList(allPosts.reverse());
        })
    }
    else {
            postElement.innerHTML = PostList(filteredPosts.reverse());
    }
}
applicationElement.addEventListener("change", event => {
    if (event.target.id === "postSearch") {
        let fPosts = postSearch(document.querySelector("#postSearch").value);
        showPostList(fPosts.reverse());
        console.log(fPosts);
    }
});
//delete posts
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("delete")) {
    const postId = event.target.id.split("__")[1];
    deletePost(postId)
      .then(response => {
        showPostList();
      })
  }
})

// Are you defining the function here or invoking it?
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
    if (event.target.id === "newPost__cancel") {
        clearForm();
    }

    event.preventDefault();
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      const postObject = {
          title: title,
          imageURL: url,
          description: description,
          userId: 1,
          timestamp: Date.now()
      }
  
    // be sure to import from the DataManager
        createPost(postObject)
        .then(response =>{
            showPostList();
            clearForm();
        })
    }
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        //invoke a filter function passing the year as an argument
        showFilteredPosts(yearAsNumber);
      }
      if (event.target.id === "newPost__cancel") {
        clearForm();
      }
})
  
  const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
      if (singlePost.timestamp >= epoch) {
        return singlePost
      }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
  }

  const clearForm = () =>{
    document.querySelector("input[name='postTitle']").value = "";
    document.querySelector("input[name='postURL']").value = "";
    document.querySelector("textarea[name='postDescription']").value = "";
  }

startGiffyGram();
import {getLoggedInUser,updatePost} from "../data/DataManager.js";
import{showPostList} from "../main.js";
import{PostEntry} from "./postEntry.js";
export const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    //entryElement.innerHTML = PostEdit(postObj);
    PostEdit(postObj);
  }
  const applicationElement = document.querySelector(".giffygram");
  const PostEdit = (postObj) => {
      const parentform = document.querySelector(".newPost");
      document.querySelector(".form_h3").innerHTML = 'Edit This Post';
      document.querySelector("input[name='postTitle']").value = postObj.title;
      document.querySelector("input[name='postURL']").value = postObj.imageURL;
      document.querySelector("textarea[name='postDescription']").value = postObj.description;
      document.getElementById("newPost__submit").style.display="none";
      document.getElementById("lblTimestamp").innerHTML = Date.now();
      let editBtn = document.createElement('button');
      editBtn.id = `updatePost__${postObj.id}`;
      editBtn.className = "update__Button";
      editBtn.innerHTML = "Update";
      parentform.append(editBtn);

	return; 
  
}

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
      document.getElementById(event.target.id).disabled = true;  
      const postId = event.target.id.split("__")[1];
      //collect all the details into an object
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      const timestamp = document.querySelector("#lblTimestamp").innerHTML;
      const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: getLoggedInUser().id,
        timestamp: parseInt(timestamp),
        id: parseInt(postId)
      }
      
      updatePost(postObject)
        .then(response => {
          showPostList();
          const entryElement = document.querySelector(".entryForm");
          entryElement.innerHTML = PostEntry();
        })
    }
  })
  
//import{createPost} from "../store/index.js"
export const PostEntry = () => {
    return `
    <form class="newPost">
    <h3 class="form_h3"></h3>
        <div>
            <input value=""
                   name="postTitle"
                   class="newPost__input"
                   type="text"
                   placeholder="Title" />
        </div>
        <div>
            <input value=""
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>

        <textarea name="postDescription"
            class="newPost__input newPost__description"
            placeholder="Story behind your gif..."></textarea>
        <label id="lblTimestamp"></label>
        <button id="newPost__submit">Save</button>
        <button id="newPost__cancel">Cancel</button>
    </form>
    `
}
///This component will need eventListeners for when the buttons are clicked.

document.addEventListener("click", clickEvent => {
if (clickEvent.target.id === "newPost__cancel") {
    //clear the input fields
}
})

document.addEventListener("click", clickEvent => {
if (clickEvent.target.id === "newPost__submit") {
    //colllect the input values into an object to post to the DB

    const title = document.querySelector("input[name='postTitle']").value
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    //we have not created a user yet - so we will hard code `1` for now.
    const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: 1,
        timestamp: Date.now()
    }

    // be sure to import from the store
    createPost(postObject)
}
})
// export const createPost = post => {
//     console.log('Change something');
//     return fetch("http://localhost:3000/posts", {
//         method: "POST", 
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(post)

//     })
//         .then(response => response.json())
//         .then(getPosts)
// }
export const getAllUsers = () => {
    // we don't want to alter the original state,
    // so make a copy of it and then return the copy
    const usersCopy = [...applicationState.users]
    return usersCopy
}
export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

const loggedInUser = {
	id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
	return getUsers();
}
let postCollection = [];

export const getDadJoke = () => {
    fetch("https://icanhazdadjoke.com/")
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            let dadJokeText = "<b> No dad Joke today</b>";
            var lines = data.split('\n');
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].includes('<p class="subtitle">')) {
                    const dj = document.querySelector('.dadJoke');
                    dadJokeText =  lines[i].substring(20, (lines[i].length - 4));
                    dj.innerHTML = dadJokeText;
                }
            }
        });
}

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
  
    })
        .then(response => response.json())
        .then(getPosts)
  }
  
export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse
      return parsedResponse;
    })
}
export const postSearch = (term) =>{
    let retArray = [];
    //loop through list to find pertinent entries return a new list and pass it to showlist
    postCollection.forEach((postObj, index) =>{
        if(postObj.title.includes(term)) retArray.push(postObj);
        if(postObj.description.includes(term)) retArray.push(postObj);
    });
    if(retArray.length > 0){
        return retArray;
    }
}
function streamToString(stream, cb) {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk.toString());
    });
    stream.on('end', () => {
      cb(chunks.join(''));
    });
  }
  export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
  
  }
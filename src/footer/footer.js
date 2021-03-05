/*
    COMPONENT STATE VARIABLES
*/
import { getPosts } from "../scripts/data/DataManager.js"
let yearChosenByUser = 2020
let postSinceYearChosen = 0
const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "yearSelection") {
        const yearAsNumber = parseInt(changeEvent.target.value)

        // Update the two component state variables
        yearChosenByUser = yearAsNumber
        postSinceYearChosen = postsSince(yearAsNumber)
    }
})

/*
    COMPONENT FUNCTION
*/
export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option ${yearChosenByUser === 2020 ? "selected" : ""}>2020</option>
                    <option ${yearChosenByUser === 2019 ? "selected" : ""}>2019</option>
                    <option ${yearChosenByUser === 2018 ? "selected" : ""}>2018</option>
                    <option ${yearChosenByUser === 2017 ? "selected" : ""}>2017</option>
                </select>
                <span id="postCount">${postSinceYearChosen}</span>
            </div>
        </footer>
    `
}

/*
    Calculate the number of posts since a given year
*/
const postsSince = (year) => {
    const posts = getPosts()
    const epoch = Date.parse(`01/01/${year}`)

	//use the filter array method
    const postsSinceYear = posts.filter(singlePost => {
		if (singlePost.timestamp >= epoch) {
            return singlePost
		}
	})

    

    return postsSinceYear.length
}



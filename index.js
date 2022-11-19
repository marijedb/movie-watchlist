const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')
const mainContent = document.getElementById('main')

let imdbMovieList = []

btnSearch.addEventListener("click", getMovieId)

function getMovieId(event) {
    event.preventDefault()
    fetch(`https://www.omdbapi.com/?apikey=72add8e3&s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            if (!data.Search) {
                console.log(data.Error)
            } else {
                for (movie of data.Search) {
                    imdbMovieList.push(movie.imdbID)
                }
                console.log(imdbMovieList)
                renderMovies()
            }
        })
}


function renderMovies() {
    let movieHtml = ""
    
    imdbMovieList.forEach(function (id) {
        fetch(`https://www.omdbapi.com/?apikey=72add8e3&i=${id}`)
            .then(res => res.json())
            .then(data => {
                movieHtml += `<div>
                            <h3>${data.Title}</h3>
                            <p>${data.Runtime}</p>
                        </div>
                        `
                // console.log("Title:", data.Title)
                // console.log("IMDB Rating:", data.imdbRating)
                // console.log("Runtime:", data.Runtime)
                // console.log("Genre:", data.Genre)
                // console.log("Plot:", data.Plot)
                console.log(movieHtml)
                mainContent.innerHTML = movieHtml
            })
            
        })
}

// When search button is clicked:
// - it will fetch the movie list from the API
// - checks if something comes back. If not display on page
// - if true get the 10 items and store their imdbID  in an array?
// - fetch all imdb data and render them to the page. 

// imdbID.Title
// imdbID.imdbRating
// imdbID.Runtime
// imdbID.Genre
// imdbID.Plot
// imdbID.Poster
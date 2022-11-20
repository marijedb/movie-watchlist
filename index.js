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
                movieHtml += `
                    <div class="search-result-container">
                        <img class="movie-poster" src="${data.Poster}">
                        <div class="movie-info">
                            <div class="movie-header">
                                <h3 class="movie-title">${data.Title}</h3>
                                <p><img src="./images/star.png"> ${data.imdbRating}</p>
                            </div>
                            <div class="movie-sub-info">
                                <p>${data.Genre}</p>
                                <p class="runtime-info">${data.Runtime}</p>
                                <div class="add-watchlist">
                                    <img class="icon" src="./images/plus.png">
                                    <p>Watchlist</p>
                                </div>
                            </div>
                            <p class="plot">${data.Plot}</p>
                        </div>
                    </div>
                    <hr class="divider">
                    `
                console.log(movieHtml)
                mainContent.innerHTML = movieHtml
            })
            
        })
    imdbMovieList = [] 
}
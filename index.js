const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')
const mainContent = document.getElementById('main')

let imdbMovieList = []
let myMovieList = []
let watchList = []

btnSearch.addEventListener("click", getMovieId)

document.addEventListener("click", function(event){
    if(event.target.dataset.id){
        addToWatchlist(event.target.dataset.id)
    }
})


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
                renderMovies()
            }
        })
}

function addToWatchlist(movieID){
    watchList.push(movieID)
    localStorage.setItem("movies", JSON.stringify(watchList));
    document.getElementById(`${movieID}`).innerHTML = `
        <img class="icon" src="./images/check-mark.png">
        <p class="added-msg">Added</p>`
}


function renderMovies() {
    let movieHtml = ""
    if(JSON.parse(localStorage.getItem("movies"))) {
        watchList = JSON.parse(localStorage.getItem("movies"))
    }
    imdbMovieList.forEach(function (id) {
        fetch(`https://www.omdbapi.com/?apikey=72add8e3&i=${id}`)
            .then(res => res.json())
            .then(data => {
                if(!watchList.includes(id)){
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
                                    <div id="${id}" class="add-watchlist">
                                        <img class="icon" src="./images/plus.png" data-id="${id}">
                                        <p data-id="${id}">Watchlist</p>
                                    </div>
                                </div>
                                <p class="plot">${data.Plot}</p>
                            </div>
                        </div>
                        <hr class="divider">
                        `
                } else {
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
                                    <div id="${id}" class="added-watchlist">
                                        <img class="icon" src="./images/check-mark.png">
                                        <p class="added-msg">Added</p>
                                    </div>
                                </div>
                                <p class="plot">${data.Plot}</p>
                            </div>
                        </div>
                        <hr class="divider">
                        `
                }
                mainContent.innerHTML = movieHtml
            })
            
        })
    imdbMovieList = [] 
}
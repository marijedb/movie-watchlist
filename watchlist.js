const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')
const mainContent = document.getElementById('main')
const savedMovies = JSON.parse(localStorage.getItem("movies"))

let watchList = []
if (savedMovies) {
    savedMovies.forEach(async function (movieId) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=72add8e3&i=${movieId}`)
        const data = await response.json()
        watchList.push(data)
        renderWatchList()
    })
} else {
    renderWatchList()
}

document.addEventListener("click", function (event) {
    if (event.target.dataset.id) {
        deleteMovie(event.target.dataset.id)
    }
})

function deleteMovie(movieID) {
    for (let i = 0; i < watchList.length; i++) {
        if (watchList[i].imdbID === movieID) {
            watchList.splice(i, 1)
            localStorage.setItem("movies", JSON.stringify(watchList))
        }
    }
    renderWatchList()

}


function getWatchListHtml() {
    let watchlistHtml = ``
    watchList.forEach(function (movie) {
        console.log(movie)
        watchlistHtml += `
                    <div class="search-result-container">
                        <img class="movie-poster" src="${movie.Poster}">
                        <div class="movie-info">
                            <div class="movie-header">
                                <h3 class="movie-title">${movie.Title}</h3>
                                <p><img src="./images/star.png"> ${movie.imdbRating}</p>
                            </div>
                            <div class="movie-sub-info">
                                <p>${movie.Genre}</p>
                                <p class="runtime-info">${movie.Runtime}</p>
                                <div id="${movie.imdbID}" class="remove-watchlist">
                                    <img class="icon" src="./images/minus.png" data-id="${movie.imdbID}">
                                    <p data-id="${movie.imdbID}">Delete</p>
                                </div>
                            </div>
                            <p class="plot">${movie.Plot}</p>
                        </div>
                    </div>
                    <hr class="divider">`

    })
    return watchlistHtml
}

function renderWatchList() {
    if (watchList.length > 0) {
        mainContent.innerHTML = getWatchListHtml()
    } else {
        document.getElementById('main').innerHTML = `
            <p class="exploring-message">Your watchlist is looking a little empty.</p>
            <a class="search-message" href="./index.html"><img class="icon" src="./images/plus-dark.png"> Find something to watch!</a>`
    }
}
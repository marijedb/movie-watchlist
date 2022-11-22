const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')
const mainContent = document.getElementById('main')
let watchList = JSON.parse(localStorage.getItem("movies"))

function renderWatchList(){
    let watchlistHtml = ``

    watchList.forEach(function(movieId){
        fetch(`https://www.omdbapi.com/?apikey=72add8e3&i=${movieId}`)
            .then(response => response.json())
            .then(data => {
                watchlistHtml += `
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
                                <div id="${movieId}" class="remove-watchlist">
                                    <img class="icon" src="./images/minus.png" data-id="${movieId}">
                                    <p data-id="${movieId}">Delete</p>
                                </div>
                            </div>
                            <p class="plot">${data.Plot}</p>
                        </div>
                    </div>
                    <hr class="divider">`

                mainContent.innerHTML = watchlistHtml
            })
    })
}

if(watchList){
    renderWatchList()
}
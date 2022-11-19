const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')

btnSearch.addEventListener("click", function(e) {
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?apikey=72add8e3&s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            fetch(`https://www.omdbapi.com/?apikey=72add8e3&i=${data.Search[0].imdbID}`)
                .then(res => res.json())
                .then(data => console.log(data))
        })
})



// When search button is clicked:
// - it will fetch the movie list from the API
// - checks if something comes back. If not display on page
// - if true get the 10 items and store their imdbID  in an array?
// - fetch all imdb data and render them to the page. 
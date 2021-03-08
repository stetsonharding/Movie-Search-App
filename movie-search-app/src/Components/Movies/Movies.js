import React, { useState } from "react"
import Movie from "../../Components/Movie/Movie";
import Pagination from "./Pagination"

import './Movies.css'

const Movies = () => {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [moviesPerPage] = useState(4)


    //fetch movies from url
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a91d2a2db7fbe7eade901856811fccda&language=en-US&query=${query}&page=1&include_adult=false`;

    const searchMovies = async (e) => {
        e.preventDefault()
        const moviePromise = await fetch(url)
        const data = await moviePromise.json();
        setMovies(data.results)
        setLoading(false)
    }

    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie)


    //change pages
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <h2 className="App-title">Movies Search App</h2>
            {/* submit form */}
            <form className="form" onSubmit={searchMovies}>
                <label>
                    Search Movies: 
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Enter Movie Name"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </label>
                <button>Search Movie</button>
            </form>

            <div className="Movie_list">
                {currentMovie.filter(movie =>movie.poster_path).map(movie =>
                   <Movie key={movie.id} movie={movie} />
                  
                )}
                <Pagination moviesPerPage={moviesPerPage} totalMovies={movies.length} paginate={paginate}/>
            </div>
        </>
    )
}
export default Movies
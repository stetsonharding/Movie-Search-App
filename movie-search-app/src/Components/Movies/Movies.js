import React, { useState } from "react"
import Movie from "../../Components/Movie/Movie";

import './Movies.css'

const Movies = () => {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)


    //fetch movies from url
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a91d2a2db7fbe7eade901856811fccda&language=en-US&query=${query}&page=1&include_adult=false`;

    const searchMovies = async (e) => {
        e.preventDefault()
        const moviePromise = await fetch(url)
        const data = await moviePromise.json();
        setMovies(data.results)
        setLoading(false)
    }


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
                {movies.filter(movie =>movie.poster_path).map(movie =>
                   loading ? <h2>Loading...</h2> : <Movie key={movie.id} movie={movie} />
                )}
            </div>
        </>
    )
}
export default Movies
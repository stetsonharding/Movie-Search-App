import React from "react"

import './movie.css'

const Movie = ({movie}) =>{
    return(
        <div className="container card">
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
            <p className="movie-title">{movie.original_title}</p>
            <p className="movie-description">{movie.overview}</p>
            <p className="movie-releaseDate"><i>Release Date:</i> {movie.release_date}</p>
        </div>
    )
}

export default Movie
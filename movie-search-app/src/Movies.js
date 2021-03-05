import React, { useState } from "react"
import Movie from "./Movie";
// import Movie from "./Movie"

const Movies = () => {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])

    // const handleChange = (e) => {
    //     const {name, value} = e.target
    //     setQuery(prevState =>{
    //         return{
    //             ...prevState,
    //             [name]:value
    //         }
    //     })
    // }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=a91d2a2db7fbe7eade901856811fccda&language=en-US&query=${query}&page=1&include_adult=false`;


   const searchMovies = async (e) =>{
       e.preventDefault()
    const moviePromise = await fetch(url)
    const data = await moviePromise.json();
    setMovies(data.results)

    
   }
   


   

    return (
        <>
            <h2>Movies Search App</h2>
            <form onSubmit={ searchMovies}>
               <label>
                   Search Movies
                    <input
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
               {movies.map(movie =>
                <Movie key={movie.id} movie={movie} />
                )}
           </div>
        </>
    )
}

export default Movies
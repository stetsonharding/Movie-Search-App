import React, { useState } from "react";
import Movie from "../../Components/Movie/Movie";
import Pagination from "../../Components/Pagination/Pagination";

import "./Movies.css";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);
  const [handleError, setHandleError] = useState("");

  // api
  const url = `https://api.themoviedb.org/3/search/movie?api_key=a91d2a2db7fbe7eade901856811fccda&language=en-US&query=${query}&page=1&include_adult=false`;

  const searchMovies = async (e) => {
    e.preventDefault();

    //handle loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      //fetch movies
      const moviePromise = await fetch(url);
      const data = await moviePromise.json();
      setMovies(data.results);
    } catch (error) {
      setHandleError("something went wrong");
    }
  };

  //getting current movie for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  // console.log(currentMovie)

  //change pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2 className="App-title">Have a movie in mind? Search for details!</h2>
      {/* form */}
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
        {/* Loading Logic  */}
        {loading ? (
          <div className="loading-container">
            <i className="fas fa-video fa-3x loading-image"></i>
            <h1>loading...</h1>
          </div>
        ) : (
          // display movies
          currentMovie
            .filter((movie) => movie.poster_path)
            .map((movie) => <Movie key={movie.id} movie={movie} />)
        )}
      </div>

      <div>
        <h1>{handleError}</h1>
      </div>

      <div className="paginations">
        {loading ? null : (
          <Pagination
            moviesPerPage={moviesPerPage}
            totalMovies={movies.length}
            paginate={paginate}
          />
        )}
      </div>
    </>
  );
};
export default Movies;

import React, { useState } from "react";
import "./index.css";
export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((favorite) => favorite.id === movie.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // لمنع السلوك الافتراضي للنموذج
      searchMovies(); // استدعاء دالة البحث عند الضغط على Enter
    }
  };

  return (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value == "") setMovies([]);
          }}
          onKeyPress={handleKeyPress} // إضافة الحدث هنا
        />
        <button className="button" type="button" onClick={searchMovies}>
          Search
        </button>
      </form>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div className="card" key={movie.id}>
              <img
                className="card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + " poster"}
              />
              <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p>
                  <small>RELEASE DATE: {movie.release_date}</small>
                </p>
                <p>
                  <small>RATING: {movie.vote_average}</small>
                </p>
                <p className="card--desc">{movie.overview}</p>
                <button
                  className="button"
                  onClick={() => addToFavorites(movie)}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          ))}
      </div>

      {favorites > 0 && <h2>Favorites</h2>}
      <div className="card-list">
        {favorites.map((favorite) => (
          <div className="card" key={favorite.id}>
            <img
              className="card--image"
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${favorite.poster_path}`}
              alt={favorite.title + " poster"}
            />
            <div className="card--content">
              <h3 className="card--title">{favorite.title}</h3>
              <p>
                <small>RELEASE DATE: {favorite.release_date}</small>
              </p>
              <p>
                <small>RATING: {favorite.vote_average}</small>
              </p>
              <p className="card--desc">{favorite.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

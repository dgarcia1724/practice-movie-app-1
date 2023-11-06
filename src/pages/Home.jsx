import { useEffect, useState } from "react";

const KEY = "4fefc778";

function Home() {
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(
    function () {
      async function fetchMovieList() {
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!response.ok) throw new Error("Failed to fetch");
          const data = await response.json();
          if (data.Response == "False") throw new Error("movie not found lol");

          console.log(data);
          setMovieList(data.Search);
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchMovieList();
    },
    [query]
  );

  return (
    <div>
      <Search query={query} setQuery={setQuery} />
      <MovieList movieList={movieList} />
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="p-4 bg-red-200 rounded-xl"
      type="text"
      placeholder="Search Movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function MovieList({ movieList }) {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {movieList.map((movie) => {
        return <Movie movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <h3>{movie.Year}</h3>
    </li>
  );
}

export default Home;

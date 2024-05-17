import React, { useState, useEffect, } from 'react';
import './style.css'; // Import the CSS file for styling
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      setError('');
      try {
        const response = await axios.get(`https://my-application-1rau.onrender.com/api/search?q=${query}`);
        if (response.data.Response === 'True') {
          const movieList = response.data.Search || [];
          // Fetch plot for each movie
          const moviesWithPlot = await Promise.all(
            movieList.map(async (movie) => {
              const plotResponse = await axios.get(`https://my-application-1rau.onrender.com/api/plot?imdbID=${movie.imdbID}`);
              return { ...movie, Plot: plotResponse.data.Plot };
            })
          );
          setMovies(moviesWithPlot);
        } else {
          setError(response.data.Error);
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error fetching movies. Please try again.');
      }
    };
   

    fetchMovies();
  }, [query]);

  const searchMovies = (e) => {
    e.preventDefault();
    setMovies([]); // Clear movie list when performing new search
    setQuery(e.target.value);
  };
 
  


  return (
    <div className="container" >
      <h1 className="title">More Movies</h1>
      <form onSubmit={searchMovies} className='form'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="form-control"
        /><br></br><br></br><br></br>
        <button type="submit" className="btn">Clear</button>
      </form>

      <div className='quotes'>

      <h1 className='name'>Movies are a timeless form of entertainment</h1>
      <p>Since the inception of cinema, movies have captivated audiences 
        worldwide, offering an escape into different worlds, stories, and emotions.</p>


      </div>
      {error && <p className="error">{error}</p>}
      <div className="row">
        {movies.map((movie, index) => (
          <div key={index} className="col-md-1">

            <div className="card">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h6 className="card-title">{movie.Title}</h6>
                <p className="card-text"> Year released:{movie.Year}</p>
                <p className="card-text">Type:{movie.Type}</p>
                <p className="card-text1">{movie.Plot}</p>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

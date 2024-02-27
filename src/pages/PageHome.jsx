import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { truncateDescription } from '../utilities/movieUtils';

// Categories for the movies
const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Upcoming', value: 'upcoming' },
];

// Home page component
const PageHome = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const moviesData = data.results.slice(0, 12).map((movie) => ({
          ...movie,
          overview: truncateDescription(movie.overview, 150),
        })); // Limit to 12 movies
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Add or remove movies from favourites and watchlist
  const toggleFavourite = (movieId) => {
    const updatedFavourites = favourites.includes(movieId)
      ? favourites.filter((id) => id !== movieId)
      : [...favourites, movieId];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const toggleWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.includes(movieId)
      ? watchlist.filter((id) => id !== movieId)
      : [...watchlist, movieId];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  // Load favourites and watchlist from local storage
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(storedFavourites);

    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Display the movies
  return (
    <div>
      <h2 className="favourites-title">WELCOME TO ATDB MOVIE</h2>
      <div className="movie-category">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            style={{
              margin: '5px',
              fontSize: '15px',
              fontFamily: 'Roboto, sans-serif',
              backgroundColor: category.value === selectedCategory ? '#00be69' : '#0079e4',
              color: category.value === selectedCategory ? 'white' : 'white',
            }}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavourite={toggleFavourite}
            isFavourite={favourites.includes(movie.id)}
            onToggleWatchlist={toggleWatchlist}
            isWatchlist={watchlist.includes(movie.id)}
        />
        ))}
      </div>
    </div>
  );
};

export default PageHome;

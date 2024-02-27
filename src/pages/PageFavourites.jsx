import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchMoviesByIds, truncateDescription } from '../utilities/movieUtils';

// Favourites page component
const PageFavourites = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavouriteMovies = async () => {
      try {
        const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        setFavourites(storedFavourites);

        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setWatchlist(storedWatchlist);

        const moviesData = await fetchMoviesByIds(storedFavourites, truncateDescription);
        setFavouriteMovies(moviesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteMovies();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="favourites-title">YOUR FAVOURITES LIST</h2>
      {favouriteMovies.length === 0 ? (
        <div className="favourites-none">
          <p>No films added to your Favourites list yet! Start building your Favourites by clicking the ♥ icon on any film you love.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favouriteMovies.map((movie) => (
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
      )}
    </div>
  );
};

export default PageFavourites;

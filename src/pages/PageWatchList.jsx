import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchMoviesByIds, truncateDescription } from '../utilities/movieUtils';


// Watch List page component
const PageWatchList = () => {
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchListMovies = async () => {
      try {
        const storedWatchList = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setWatchlist(storedWatchList);
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
        const moviesData = await fetchMoviesByIds(storedWatchList, truncateDescription);
        setWatchListMovies(moviesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchListMovies();
  }, []);

  // Add or remove movies from favourites and watchlist
  const toggleFavourite = (movieId) => {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
      <h2 className="watchlist-title">YOUR WATCH LIST</h2>
      {watchListMovies.length === 0 ? (
        <div className="watchlist-none">
          <p>Your Watch List is currently empty! Add movies to your Watch List by clicking the + button on each movie you want to save for later.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {watchListMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavourite={toggleFavourite}
              isFavourite={favorites.includes(movie.id)}
              onToggleWatchlist={toggleWatchlist}
              isWatchlist={watchlist.includes(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageWatchList;

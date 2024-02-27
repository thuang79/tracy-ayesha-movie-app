import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

// PageMovieDetails component
const PageMovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setfavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const storedfavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    setfavourites(storedfavourites);

    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
  }, []);

  // Add or remove movies from favourites and watchlist
  const togglefavourite = (movieId) => {
    const updatedfavourites = favourites.includes(movieId)
      ? favourites.filter((id) => id !== movieId)
      : [...favourites, movieId];
    setfavourites(updatedfavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedfavourites));
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
    <div className="movie-details">
      <div className="background-image" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})` }}>
        <div className="overlay"></div>
      </div>
      <div className="content">
        <div className="details">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className="info">
            <h2 className="title">{movieDetails.title}</h2>
            <div className="buttons-container">
              <button className="favourite-button" onClick={() => togglefavourite(movieDetails.id)}>
                <FontAwesomeIcon icon={faHeart} className="fa-icon" style={{ color: favourites.includes(movieDetails.id) ? 'red' : 'white' }} />
                {favourites.includes(movieDetails.id) ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
              <button className="watchlist-button" onClick={() => toggleWatchlist(movieDetails.id)}>
                <FontAwesomeIcon icon={faPlus} className="fa-icon" style={{ color: watchlist.includes(movieDetails.id) ? 'blue' : 'white' }} />
                {watchlist.includes(movieDetails.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
            <p className="movie-detail-overview"><strong>Overview:</strong> <span>{movieDetails.overview}</span></p>
            <div className="movie-detail-info">
              <p><strong>Release Date:</strong> <span>{movieDetails.release_date}</span></p>
              <p><strong>Rating:</strong> <span>{movieDetails.vote_average * 10}%</span></p>
              <p><strong>Genres:</strong> <span>{movieDetails.genres.map((genre) => genre.name).join(', ')}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMovieDetails;

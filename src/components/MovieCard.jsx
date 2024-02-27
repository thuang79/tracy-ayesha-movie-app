import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, onToggleFavourite, onToggleWatchlist, isFavourite, isWatchlist }) => {
  // Create an array of stars to represent the movie's rating
  const filledStars = Math.round(movie.vote_average / 2);
  const starsArray = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index} icon={faStar} className="fa-icon" style={{ color: index < filledStars ? 'gold' : 'lightgray' }}
    />
  ));

  // Format the release date
  const releaseDate = new Date(movie.release_date);
  const formattedDate = releaseDate.toLocaleDateString('en-CA', {
    year: 'numeric', month: 'short', day: '2-digit'
  });

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div>
          <p><strong></strong> {starsArray} {Number((movie.vote_average * 10).toFixed(2))}%</p>
        </div>
        <p>{formattedDate}</p>
        <p>{movie.overview}</p>
        <button onClick={() => onToggleFavourite(movie.id)}>
          {isFavourite ? <FontAwesomeIcon icon={faHeart} className="fa-icon" style={{ color: 'red' }} /> : <FontAwesomeIcon icon={faHeart} className="fa-icon" />}
          {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
        </button>
        <button onClick={() => onToggleWatchlist(movie.id)}>
          {isWatchlist ? <FontAwesomeIcon icon={faPlus} className="fa-icon" style={{ color: 'blue' }} /> : <FontAwesomeIcon icon={faPlus} className="fa-icon" />}
          {isWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
        <Link to={`/movie/${movie.id}`}>
          <button className="more-info">More Info</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;

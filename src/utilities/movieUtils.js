// Function to get the current year
function getYear(){
    const d = new Date();
    return d.getFullYear();
}

export { getYear }
// Function to fetch movies by their IDs
export const fetchMoviesByIds = async (movieIds, truncateDescriptionFn) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const promises = movieIds.map(async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movie with ID ${movieId}`);
        }
        const movie = await response.json();
        return {
          ...movie,
          overview: truncateDescriptionFn(movie.overview, 150)
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    });
    const moviesData = await Promise.all(promises);
    return moviesData.filter((movie) => movie !== null);
};
  
// Function to truncate the description to 150 characters 
    export const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    const truncated = description.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpaceIndex) + '...';
};
  
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <main>
            <section className="page-not-found-section">
		        <h2 className='favourites-title'>404! LOST IN THE MOVIE-VERSE </h2>
                <div className="styling-p">    
                    <p>YOU MUST HAVE TELEPORTED TO THE WRONG UNIVERSE.</p>
                    <p>CANNOT SEEM TO FIND WHAT YOU ARE LOOK FOR.</p>
                    <p>TAKE ME BACK TO THE <Link to="/" style={{ color: '#0079e4', textDecoration: 'none' }}>MOVIES</Link> PAGE.</p>
                </div>
	        </section>
        </main>
    );
    
};

export default PageNotFound;
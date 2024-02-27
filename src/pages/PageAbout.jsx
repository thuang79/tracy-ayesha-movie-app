import React from 'react';
import tmdbLogo from '../assets/tmdb-logo.svg';

const PageAbout = () => {
    return (
        <main>
            <section>
                <article>
                    <h2 className='aboutTitle'>ABOUT THE PROJECT</h2>
                    <p>ATDB is your ultimate destination for movie enthusiasts. From popular hits to top-rated classics, and even upcoming releases, ATDB has you covered. Browse through a curated selection of now playing and soon-to-be-released films, with the option to favourite or add to your watch later list for easy access.</p>
                    <p className="tmdb-msg">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                    <div>
                        <img src={tmdbLogo} alt="TMDb Logo" style={{ width: '150px' }} />
                    </div>
                </article>
            </section>
        </main>
    );
};

export default PageAbout;

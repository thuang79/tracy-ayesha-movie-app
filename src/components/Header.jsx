import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import logo from '../images/neon-logo.png';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const showHideNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="header-container">
      <header className={navOpen ? 'show' : undefined}>
        <Link to="/" className="logo-link">
          <img src={logo} alt="ATDB Logo" className="logo-image" />
        </Link>
        <button
          className={`btn-main-nav ${navOpen ? 'open' : ''}`}
          onMouseDown={e => {
            e.preventDefault();
          }}
          onClick={showHideNav}
        >
          <span className="hamburger-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
          <span className="sr-only">Menu</span>
        </button>
        <Nav handleShowHideNav={showHideNav} navOpen={navOpen} />
      </header>
    </div>
  );
};

export default Header;

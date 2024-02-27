import { NavLink } from "react-router-dom";

const Nav = ({ handleShowHideNav, navOpen }) => {
  return (
    <nav className={`main-nav ${navOpen ? 'show' : ''}`}>
      <ul>
        <li>
          <NavLink to="/" onClick={handleShowHideNav}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={handleShowHideNav}>About</NavLink>
        </li>
        <li>
          <NavLink to="/favourites" onClick={handleShowHideNav}>Favourites</NavLink>
        </li>
        <li>
          <NavLink to="/watch-list" onClick={handleShowHideNav}>Watch List</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

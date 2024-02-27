import { getYear } from "../utilities/movieUtils";

const Footer = () => (
  <footer>
    <p>&copy; {getYear()} ATDB all rights reserved.</p>
    <p>Created by Tracy and Ayesha</p>
  </footer>
);

export default Footer;

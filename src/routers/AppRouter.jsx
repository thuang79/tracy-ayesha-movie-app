// AppRouter

// Development Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Pages
import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageMovieDetails from "../pages/PageMovieDetails";
import PageFavourites from "../pages/PageFavourites";
import PageWatchList from "../pages/PageWatchList";
import PageNotFound from "../pages/PageNotFound";


function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" exact element={<PageHome />} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/movie/:id" element={<PageMovieDetails />} />
          <Route path="/watch-list" element={<PageWatchList />} />
          <Route path="/favourites" element={<PageFavourites />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

import "./FavoritesPage.css";

const BackButton = () => {
  return (
    <button className="back-button">
      <img src="icons/Arrow left.svg" alt="Back Icon" className="back-icon" />
      <p className="back-text">Back</p>
    </button>
  );
};

const FavoritesPage = () => {
  return (
    <div>
      <div className="general">
        <BackButton />
        <ResultAndSort title="Favorites: 4" />
        <ItemsList />
      </div>
    </div>
  );
};

export default FavoritesPage;

import { useNavigate } from "react-router-dom";

import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

import "./FavoritesPage.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
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

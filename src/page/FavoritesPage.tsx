import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RepoInfo from "../states/RepoInfo";
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
  const [favItems, setFavItems] = useState<RepoInfo[]>([]);
  const [selectedValue, setSelectedValue] = useState("none");
  const updateSelect = (newValue: string) => {
    setSelectedValue(newValue);
  };

  useEffect(() => {
    const favoriteItems = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavItems([...favoriteItems]);
  }, []);

  return (
    <div>
      <div className="general">
        <BackButton />
        <ResultAndSort
          title={`Favorites: ${favItems.length}`}
          selectedValue={selectedValue}
          updateSelect={updateSelect}
        />
        <ItemsList items={favItems} />
      </div>
    </div>
  );
};

export default FavoritesPage;

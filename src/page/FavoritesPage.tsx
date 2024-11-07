import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react";
import favoritesStore from "../store/favoritesStore";

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

const FavoritesPage = observer(() => {
  const [selectedValue, setSelectedValue] = useState("none");
  const updateSelect = (newValue: string) => {
    setSelectedValue(newValue);
    favoritesStore.sort(newValue);
  };

  return (
    <div>
      <div className="general">
        <BackButton />
        <ResultAndSort
          title={`Favorites: ${favoritesStore.favoritesCount}`}
          selectedValue={selectedValue}
          updateSelect={updateSelect}
        />
        <ItemsList items={favoritesStore.favorites} />
      </div>
    </div>
  );
});

export default FavoritesPage;

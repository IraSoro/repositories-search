import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react";
import RepoInfo from "../states/repo_info";

import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";
import { SortOption } from "../states/sort_options";

import favoritesStore from "../store/favorites_store";

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
  const [selectedValue, setSelectedValue] = useState(SortOption.Stars);
  const updateSelect = (newValue: SortOption) => {
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
        <ItemsList items={favoritesStore.favorites as RepoInfo[]} />
      </div>
    </div>
  );
});

export default FavoritesPage;

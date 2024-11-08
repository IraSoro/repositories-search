import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

import { RepoInformationEnriched } from "../data/repo_information";
import { SortOption } from "../data/sort_option";
import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";
import favoritesStore from "../store/favorites_store";

import "./FavoritesPage.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <button className="back-button" onClick={handleBackClick}>
      <img src="icons/Arrow left.svg" alt="Back Icon" className="back-icon" />
      <p className="back-text">Back</p>
    </button>
  );
};

const FavoritesPage = observer(() => {
  const [selectedValue, setSelectedValue] = useState(SortOption.Stars);

  const handleChangeSortOption = useCallback((newValue: SortOption) => {
    setSelectedValue(newValue);
    favoritesStore.sort(newValue);
  }, []);

  return (
    <div>
      <div className="general">
        <BackButton />
        <ResultAndSort
          title={`Favorites: ${favoritesStore.favoritesCount}`}
          selectedValue={selectedValue}
          onUpdateSortOption={handleChangeSortOption}
        />
        <ItemsList
          items={favoritesStore.favorites as RepoInformationEnriched[]}
        />
      </div>
    </div>
  );
});

export default FavoritesPage;

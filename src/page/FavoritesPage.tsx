import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

import "./FavoritesPage.css";

const FavoritesPage = () => {
  return (
    <div>
      <div className="general">
        <ResultAndSort />
        <ItemsList />
      </div>
    </div>
  );
};

export default FavoritesPage;

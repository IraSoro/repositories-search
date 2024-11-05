import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";
import "./SearchPage.css";

const SearchInput = () => {
  return (
    <div className="search-outside">
      <input type="text" className="search-input" placeholder="Search" />
    </div>
  );
};

const SearchPage = () => {
  return (
    <div>
      <div className="general-outside">
        <SearchInput />
        <ResultAndSort />
        <ItemsList />
      </div>
    </div>
  );
};

export default SearchPage;

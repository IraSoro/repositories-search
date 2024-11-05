import { useState } from "react";
import ItemsList from "../components/ItemsList";
import "./Search.css";

const SearchInput = () => {
  return (
    <div className="search-outside">
      <input type="text" className="search-input" placeholder="Search" />
    </div>
  );
};

const ResultSort = () => {
  const [selectedValue, setSelectedValue] = useState("none");

  return (
    <div className="result-general">
      <p className="result-title">Result: 100 repositories</p>
      <div className="result-sort">
        <select
          className="sort-select"
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          <option value="none" disabled>
            Sort by
          </option>
          <option value="alphabet">alphabet</option>
          <option value="star">star</option>
          <option value="fork">fork</option>
        </select>
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="general-outside">
        <SearchInput />
        <ResultSort />
        <ItemsList />
      </div>
    </div>
  );
};

export default SearchPage;

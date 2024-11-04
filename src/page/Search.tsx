import "./Search.css";

const Header = () => {
  return (
    <div className="header">
      <div className="top">
        <div className="left">
          <img
            src="icons/search_new.svg"
            alt="Search Icon"
            className="icons icon-search"
          />
          <p className="header-text">GitHubSearch</p>
        </div>
        <div className="right">
          <img
            src="icons/heart_simple.svg"
            alt="Heart Icon"
            className="icon-heart"
          />
          <div className="account-outside">
            <img
              src="icons/account.svg"
              alt="Account Icon"
              className="icon-account"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className="search-outside">
      <input type="text" className="search-input" placeholder="Search" />
    </div>
  );
};

const ResultSort = () => {
  return (
    <div className="result-general">
      <p className="result-title">Result: 100 repositories</p>
      <div className="result-sort">
        <select className="sort-select">
          <option value="" disabled selected>
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
      <Header />
      <div className="general-outside">
        <SearchInput />
        <ResultSort />
      </div>
    </div>
  );
};

export default SearchPage;

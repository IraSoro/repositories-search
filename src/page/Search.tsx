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

const SearchPage = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default SearchPage;

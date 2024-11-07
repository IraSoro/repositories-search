import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import favoritesStore from "../store/favorites_store";

import "./Header.css";

const Title = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className="left">
        <img
          src="icons/search_new.svg"
          alt="Search Icon"
          className="icons icon-search"
        />
        <p className="header-text">GitHubSearch</p>
      </div>
    </Link>
  );
};

const FavoritesIcon = observer(() => {
  return (
    <Link to="/favorites">
      <div className="icon-heart-container">
        <img
          src="icons/heart_simple.svg"
          alt="Heart Icon"
          className="icon-heart"
        />
        {favoritesStore.favoritesCount > 0 && (
          <div className="badge">{favoritesStore.favoritesCount}</div>
        )}
      </div>
    </Link>
  );
});

const Header = () => {
  return (
    <div className="header">
      <div className="top">
        <Title />
        <div className="right">
          <FavoritesIcon />
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

export default Header;

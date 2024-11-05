import { Link } from "react-router-dom";

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

interface FavoritesProps {
  favorites: number;
}

const FavoritesIcon = (props: FavoritesProps) => {
  return (
    <Link to="/favorites">
      <div className="icon-heart-container">
        <img
          src="icons/heart_simple.svg"
          alt="Heart Icon"
          className="icon-heart"
        />
        {props.favorites > 0 && <div className="badge">{props.favorites}</div>}
      </div>
    </Link>
  );
};

interface HeaderProps {
  favorites: number;
}

const Header = (props: HeaderProps) => {
  return (
    <div className="header">
      <div className="top">
        <Title />
        <div className="right">
          <FavoritesIcon favorites={props.favorites} />
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

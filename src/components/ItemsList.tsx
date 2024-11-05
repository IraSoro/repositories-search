import { useState } from "react";
import { Link } from "react-router-dom";

import RepoInfo from "../states/RepoInfo";
import { TestItem, Items } from "./TestItem";
import "./ItemsList.css";

const Buttons = () => {
  const [like, setLike] = useState(false);
  function handleLike() {
    setLike((prev) => !prev);
  }

  return (
    <div className="buttons">
      <div className="btn-icons">
        {like ? (
          <img
            src="icons/heart_fill.svg"
            alt="Like"
            className="like-icon"
            onClick={handleLike}
          />
        ) : (
          <img
            src="icons/heart_outline.svg"
            alt="Like"
            className="like-icon"
            onClick={handleLike}
          />
        )}
        <img src="icons/link 1.svg" alt="Copy" className="copy-icon" />
      </div>
      <button className="btn-more">Подробнее</button>
    </div>
  );
};

interface NameContentProps {
  login: string;
  html_url: string;
  full_name: string;
}

const NameContent = (props: NameContentProps) => {
  return (
    <div className="name-content">
      <p className="author">@{props.login}</p>
      <a
        href={props.html_url}
        className="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.full_name}
      </a>
    </div>
  );
};

interface CardHeaderProps {
  avatar_url: string;
  stargazers_count: number;
  forks_count: number;
}

const CardHeader = (props: CardHeaderProps) => {
  return (
    <div className="card-header">
      <img src={props.avatar_url} alt="Avatar" className="avatar" />
      <div className="tags">
        <span className="tag">
          <img src="icons/star 1.svg" alt="Stars" className="icon" />
          {props.stargazers_count}
        </span>
        <span className="tag">
          <img src="icons/git-branch 1.svg" alt="Forks" className="icon" />
          {props.forks_count}
        </span>
      </div>
    </div>
  );
};

interface ItemProps {
  item: RepoInfo;
}

const Item = ({ item }: ItemProps) => {
  return (
    <Link to={`/repository/${item.id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <CardHeader
          avatar_url={item.owner.avatar_url}
          stargazers_count={item.stargazers_count}
          forks_count={item.forks_count}
        />
        <NameContent
          login={item.owner.login}
          html_url={item.html_url}
          full_name={item.full_name}
        />
        <Buttons />
      </div>
    </Link>
  );
};

const ItemsList = () => {
  return (
    <>
      <div className="card-container">
        {Items.map((item) => (
          <Item key={item.id} item={TestItem} />
        ))}
      </div>
    </>
  );
};

export default ItemsList;

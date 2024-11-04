import { useState } from "react";

import TestItem from "./TestItem";
import "./ItemsList.css";

interface Item {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  forks: number;
  archived: boolean;
}

interface ItemProps {
  item: Item;
}

const Item = (props: ItemProps) => {
  const [like, setLike] = useState(false);
  function handleLike() {
    setLike((prev) => !prev);
  }

  return (
    <div className="card">
      <div className="card-header">
        <img
          src={props.item.owner.avatar_url}
          alt="Avatar"
          className="avatar"
        />
        <div className="tags">
          <span className="tag">
            <img src="icons/star 1.svg" alt="Stars" className="icon" />
            {props.item.stargazers_count}
          </span>
          <span className="tag">
            <img src="icons/git-branch 1.svg" alt="Forks" className="icon" />
            {props.item.forks_count}
          </span>
        </div>
      </div>
      <div className="name-content">
        <p className="author">@{props.item.owner.login}</p>
        <a
          href={props.item.html_url}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.item.full_name}
        </a>
      </div>
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
    </div>
  );
};

const ItemsList = () => {
  const items = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
  ];
  return (
    <>
      <div className="card-container">
        {items.map((item) => (
          <Item key={item.id} item={TestItem} />
        ))}
      </div>
    </>
  );
};

export default ItemsList;

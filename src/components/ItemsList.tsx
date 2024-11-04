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

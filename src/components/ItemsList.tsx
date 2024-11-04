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
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
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

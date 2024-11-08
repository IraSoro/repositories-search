import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import favoritesStore from "../store/favorites_store";

import { RepoInformationEnriched } from "../data/repo_information";
import "./ItemsList.css";

interface ButtonsProps {
  id: number;
  html_url: string;
  isLike: boolean;
  onToggleFavorite: () => void;
}

const Buttons = (props: ButtonsProps) => {
  const handleCopyText = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
  }, []);

  return (
    <div className="buttons">
      <div className="btn-icons">
        <img
          src={
            props.isLike ? "icons/heart_fill.svg" : "icons/heart_outline.svg"
          }
          alt=""
          className="like-icon"
          onClick={props.onToggleFavorite}
        />
        <img
          src="icons/link 1.svg"
          alt=""
          className="copy-icon"
          onClick={() => handleCopyText(props.html_url)}
        />
      </div>
      <Link to={`/repository/${props.id}`} style={{ textDecoration: "none" }}>
        <button className="btn-more">Подробнее</button>
      </Link>
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
        {props.full_name.substring(0, 25)}
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
  item: RepoInformationEnriched;
}

const Item = observer(({ item }: ItemProps) => {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const isLiked = favoritesStore.hasFavorite(item.id);
    item.is_liked = isLiked;
    setIsLike(isLiked);
  }, [item]);

  const handleToggleFavorite = useCallback(() => {
    favoritesStore.toggleFavorite(item);
    item.is_liked = !isLike;
    setIsLike((prev) => !prev);
  }, [item, isLike, setIsLike]);

  return (
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
      <Buttons
        id={item.id}
        html_url={item.html_url}
        isLike={isLike}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
});

interface ItemsListProps {
  items: RepoInformationEnriched[];
}

const ItemsList = ({ items }: ItemsListProps) => {
  return (
    <>
      <div className="card-container">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ItemsList;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react";
import favoritesStore from "../store/favoritesStore";
import repositoriesStore from "../store/repositoriesStore";

import RepoInfo from "../states/RepoInfo";
import defaultRepoInfo from "../states/defaultRepoInfo";

import "./RepositoryPage.css";

interface TitleCardProps {
  full_name: string;
  avatar_url: string;
  description: string;
}

const TitleCard = (props: TitleCardProps) => {
  return (
    <div className="title-container">
      <div className="avatar-container">
        <img src={props.avatar_url} alt="Avatar" className="avatar-title" />
      </div>
      <div className="info-container">
        <p className="full-name">{props.full_name}</p>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
};

interface ShortInfoProps {
  icon: string;
  value: string;
  description: string;
}

const ShortInfo = (props: ShortInfoProps) => {
  return (
    <div className="info-card">
      <img src={`/icons/${props.icon}`} alt="" className="info-icon" />
      <div className="info-text">
        <p className="info-value">{props.value}</p>
        <p className="info-description">{props.description}</p>
      </div>
    </div>
  );
};

interface ListInfoProps {
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  language: string;
  created_at: string;
  updated_at: string;
}

const ListInfo = (props: ListInfoProps) => {
  const infoList = [
    {
      icon: "star 1.svg",
      value: props.stargazers_count.toString(),
      description: "Количество звезд",
    },
    {
      icon: "git-branch 1.svg",
      value: props.forks_count.toString(),
      description: "Количество форков",
    },
    {
      icon: "archive.svg",
      value: props.archived ? "Да" : "Нет",
      description: "В архиве",
    },
    {
      icon: "terminal.svg",
      value: props.language,
      description: "Язык",
    },
    {
      icon: "folder.svg",
      value: props.created_at.slice(0, 10),
      description: "Создано",
    },
    {
      icon: "create.svg",
      value: props.updated_at.slice(0, 10),
      description: "Изменено",
    },
  ];

  return (
    <div className="short-info-container">
      {infoList.map((info, index) => (
        <ShortInfo
          key={index}
          icon={info.icon}
          value={info.value}
          description={info.description}
        />
      ))}
    </div>
  );
};

interface ButtonsProps {
  html_url: string;
  isLike: boolean;
  updateIsLike: () => void;
}

const copyText = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text has been copy");
    })
    .catch((err) => {
      console.error("Copy error:", err);
    });
};

const Buttons = (props: ButtonsProps) => {
  return (
    <div className="card-buttons">
      <div className="card-btn-icons">
        <img
          src="/icons/link 1.svg"
          alt=""
          className="card-copy-icon"
          onClick={() => copyText(props.html_url)}
        />
        <img
          src={
            props.isLike ? "/icons/heart_fill.svg" : "/icons/heart_outline.svg"
          }
          alt=""
          className="card-like-icon"
          onClick={props.updateIsLike}
        />
      </div>
      <a
        className="btn-open"
        href={props.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Открыть репозиторий
      </a>
    </div>
  );
};

const RepositoryPage = observer(() => {
  const { id } = useParams<string>();
  const [repository, setRepository] = useState<RepoInfo | undefined>(
    defaultRepoInfo
  );
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setRepository(repositoriesStore.findRepositoryById(Number(id)));
  }, [id]);

  useEffect(() => {
    if (!repository) return;
    setIsLike(repository.isLike);
  }, [repository]);

  function updateIsLike() {
    if (!repository) return;

    favoritesStore.toggleFavorite(repository);
    repository.isLike = !isLike;
    setIsLike((prev) => !prev);
  }

  return (
    <div className="general">
      {repository && (
        <div className="profile-card">
          <p className="profile">Профиль</p>
          <TitleCard
            full_name={repository.full_name}
            avatar_url={repository.owner.avatar_url}
            description={repository.description}
          />
          <ListInfo {...repository} />
          <div className="divider" />
          <Buttons
            html_url={repository.html_url}
            isLike={isLike}
            updateIsLike={updateIsLike}
          />
        </div>
      )}
    </div>
  );
});

export default RepositoryPage;

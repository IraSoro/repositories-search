import { useState } from "react";
import { useParams } from "react-router-dom";

import { TestItem } from "../components/TestItem";

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

const Buttons = () => {
  const [like, setLike] = useState(false);
  function handleLike() {
    setLike((prev) => !prev);
  }

  return (
    <div className="card-buttons">
      <div className="card-btn-icons">
        <img src="/icons/link 1.svg" alt="" className="card-copy-icon" />
        {like ? (
          <img
            src="/icons/heart_fill.svg"
            alt=""
            className="card-like-icon"
            onClick={handleLike}
          />
        ) : (
          <img
            src="/icons/heart_outline.svg"
            alt=""
            className="card-like-icon"
            onClick={handleLike}
          />
        )}
      </div>
      <button className="btn-open">Открыть репозиторий</button>
    </div>
  );
};

const RepositoryPage = () => {
  const { id } = useParams<string>();
  console.log("id = ", id);
  const repository = TestItem;

  return (
    <div className="general">
      <div className="profile-card">
        <p className="profile">Профиль</p>
        <TitleCard
          full_name={repository.full_name}
          avatar_url={repository.owner.avatar_url}
          description={repository.description}
        />
        <ListInfo {...repository} />
        <div className="divider" />
        <Buttons />
      </div>
    </div>
  );
};

export default RepositoryPage;

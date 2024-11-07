import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";

import favoritesStore from "../store/favorites_store";
import {
  RepoInformation,
  RepoInformationEnriched,
} from "../data/repo_information";

import "./RepositoryPage.css";

interface RepositoryCardHeaderProps {
  fullName: string;
  avatarUrl: string;
  description: string;
}

const RepositoryCardHeader = (props: RepositoryCardHeaderProps) => {
  return (
    <div className="title-container">
      <div className="avatar-container">
        <img src={props.avatarUrl} alt="Avatar" className="avatar-title" />
      </div>
      <div className="info-container">
        <p className="full-name">{props.fullName}</p>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
};

interface RepositoryCardInformationProps {
  icon: string;
  value: string;
  description: string;
}

const RepositoryCardInformation = (props: RepositoryCardInformationProps) => {
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

interface RepositoryCardStatisticsProps {
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  language: string;
  created_at: string;
  updated_at: string;
}

const RepositoryCardStatistics = (props: RepositoryCardStatisticsProps) => {
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
    <div className="repository-card-statistics-container">
      {infoList.map((info, index) => (
        <RepositoryCardInformation
          key={index}
          icon={info.icon}
          value={info.value}
          description={info.description}
        />
      ))}
    </div>
  );
};

interface RepoActionsButtonsProps {
  htmlUrl: string;
  isLiked: boolean;
  onToggleFavorite: () => void;
}

const RepositoryCardActionButtons = (props: RepoActionsButtonsProps) => {
  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(props.htmlUrl);
  }, [props]);

  return (
    <div className="card-buttons">
      <div className="card-btn-icons">
        <img
          src="/icons/link 1.svg"
          alt=""
          className="card-copy-icon"
          onClick={copyToClipboard}
        />
        <img
          src={
            props.isLiked ? "/icons/heart_fill.svg" : "/icons/heart_outline.svg"
          }
          alt=""
          className="card-like-icon"
          onClick={props.onToggleFavorite}
        />
      </div>
      <a
        className="btn-open"
        href={props.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Открыть репозиторий
      </a>
    </div>
  );
};

interface RepositoryCardProps {
  repository: RepoInformationEnriched | null;
  onToggleFavorite: () => void;
}

const RepositoryCard = (props: RepositoryCardProps) => {
  if (!props.repository) {
    return null;
  }

  return (
    <div className="profile-card">
      <p className="profile">Профиль</p>
      <RepositoryCardHeader
        fullName={props.repository.full_name}
        avatarUrl={props.repository.owner.avatar_url}
        description={props.repository.description}
      />
      <RepositoryCardStatistics {...props.repository} />
      <RepositoryCardActionButtons
        htmlUrl={props.repository.html_url}
        isLiked={props.repository.is_liked}
        onToggleFavorite={props.onToggleFavorite}
      />
    </div>
  );
};

const RepositoryPage = observer(() => {
  const { id } = useParams<string>();
  const [repository, setRepository] = useState<RepoInformationEnriched | null>(
    null
  );

  const getRepositoryInfo = useCallback(async () => {
    const resp = await fetch(`https://api.github.com/repositories/${id}`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN as string}`,
      },
    });

    if (resp.status !== 200) {
      throw new Error(
        `Github returned non-200 status code[${
          resp.status
        }]: ${await resp.json()}`
      );
    }

    return (await resp.json()) as RepoInformation;
  }, [id]);

  useEffect(() => {
    getRepositoryInfo()
      .then((repo) => {
        setRepository({
          ...repo,
          is_liked: favoritesStore.hasFavorite(Number(id)),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, getRepositoryInfo]);

  const onToggleFavorite = useCallback(() => {
    if (!repository) {
      return;
    }

    favoritesStore.toggleFavorite(repository);
    setRepository({
      ...repository,
      is_liked: favoritesStore.hasFavorite(Number(repository.id)),
    });
  }, [repository]);

  return (
    <div className="general">
      <RepositoryCard
        repository={repository}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
});

export default RepositoryPage;

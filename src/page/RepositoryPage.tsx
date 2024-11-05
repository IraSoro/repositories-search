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
      </div>
    </div>
  );
};

export default RepositoryPage;

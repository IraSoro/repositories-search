import { useParams } from "react-router-dom";

import "./RepositoryPage.css";

const RepositoryPage = () => {
  const { id } = useParams<string>();

  return <>{id}</>;
};

export default RepositoryPage;

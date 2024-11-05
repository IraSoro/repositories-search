import { useEffect, useState } from "react";

import RepoInfo from "../states/RepoInfo";
import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";
import "./SearchPage.css";

const SearchInput = () => {
  return (
    <div className="search-outside">
      <input type="text" className="search-input" placeholder="Search" />
    </div>
  );
};

const SearchPage = () => {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const headersList = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    const value = "$%7Bvalue";
    const url = `https://api.github.com/search/repositories?q=${value}&per_page=12&page=1`;

    fetch(url, {
      method: "GET",
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTotalCount(data.total_count);
        setRepos(data.items as RepoInfo[]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <div className="general-outside">
        <SearchInput />
        <ResultAndSort title={`Result: ${totalCount} repositories`} />
        <ItemsList items={repos} />
      </div>
    </div>
  );
};

export default SearchPage;

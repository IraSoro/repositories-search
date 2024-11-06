import { useEffect, useState } from "react";

import RepoInfo from "../states/RepoInfo";
import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";
import "./SearchPage.css";

interface SearchInput {
  value: string;
  setValue: (newValue: string) => void;
}

const SearchInput = (props: SearchInput) => {
  return (
    <div className="search-outside">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
      />
    </div>
  );
};

const SearchPage = () => {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const headersList = {
      Accept: "application/vnd.github+json",
    };

    const url = `https://api.github.com/search/repositories?q=${inputValue}&per_page=12&page=1`;

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
        setTotalCount(data.total_count);
        setRepos(data.items as RepoInfo[]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [inputValue]);

  return (
    <div>
      <div className="general-outside">
        <SearchInput value={inputValue} setValue={setInputValue} />
        <ResultAndSort title={`Result: ${totalCount} repositories`} />
        <ItemsList items={repos} />
      </div>
    </div>
  );
};

export default SearchPage;

import { useEffect, useState } from "react";

import RepoInfo from "../states/RepoInfo";
import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

import { debounce, throttle } from "../utils/utils";

import "./SearchPage.css";

interface SearchInput {
  value: string;
  setValue: (newValue: string) => void;
}

const SearchInput = (props: SearchInput) => {
  function changeInput(newValue: string) {
    props.setValue(newValue);
  }
  const debounceInput = debounce(changeInput, 500);

  return (
    <div className="search-outside">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        onChange={(e) => {
          debounceInput(e.target.value);
        }}
      />
    </div>
  );
};

const SearchPage = () => {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // fetch
    const headersList = {
      Accept: "application/vnd.github+json",
    };

    const url = `https://api.github.com/search/repositories?q=${inputValue}&per_page=12&page=${page}`;

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
        if (page === 1) {
          setTotalCount(data.total_count);
          setRepos(data.items as RepoInfo[]);
        } else {
          setRepos((prevRepos) => [
            ...prevRepos,
            ...(data.items as RepoInfo[]),
          ]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [inputValue, page]);

  useEffect(() => {
    // scroll
    const isCheckPosition = () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;

      const threshold = height - screenHeight / 4;
      const position = scrolled + screenHeight;

      if (position >= threshold) {
        return true;
      }
      return false;
    };

    const throttledScroll = throttle(() => {
      if (!isCheckPosition()) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }, 500);
    window.addEventListener("scroll", throttledScroll);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return (
    <div className="general-outside">
      <SearchInput value={inputValue} setValue={setInputValue} />
      <ResultAndSort title={`Result: ${totalCount} repositories`} />
      <ItemsList items={repos} />
    </div>
  );
};

export default SearchPage;

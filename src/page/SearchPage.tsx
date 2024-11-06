import { useEffect, useState } from "react";

import RepoInfo from "../states/RepoInfo";
import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

import { debounce, throttle } from "../utils/utils";

import "./SearchPage.css";

interface SearchInput {
  value: string;
  updateValue: (newValue: string) => void;
}

const SearchInput = (props: SearchInput) => {
  function changeInput(newValue: string) {
    props.updateValue(newValue);
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
  const [selectedValue, setSelectedValue] = useState("none");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // fetch
    const headersList = {
      Accept: "application/vnd.github+json",
    };

    const url = `https://api.github.com/search/repositories?q=${inputValue}&per_page=12&page=${page}&sort=${selectedValue}`;

    fetch(url, {
      method: "GET",
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const updatedItems = (data.items as RepoInfo[]).map((item) => ({
          ...item,
          isLike: false,
        }));

        if (page === 1) {
          setTotalCount(data.total_count);
          setRepos(updatedItems);
        } else {
          setRepos((prevRepos) => [...prevRepos, ...updatedItems]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [inputValue, page, selectedValue]);

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

  const updateInput = (newValue: string) => {
    setInputValue(newValue);
    setPage(1);
  };

  const updateSelect = (newValue: string) => {
    setSelectedValue(newValue);
    setPage(1);
  };

  return (
    <div className="general-outside">
      <SearchInput value={inputValue} updateValue={updateInput} />
      <ResultAndSort
        title={`Result: ${totalCount} repositories`}
        selectedValue={selectedValue}
        updateSelect={updateSelect}
      />
      <ItemsList items={repos} />
    </div>
  );
};

export default SearchPage;

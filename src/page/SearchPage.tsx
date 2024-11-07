import { useEffect } from "react";

import { observer } from "mobx-react";
import repositoriesStore from "../store/repositoriesStore";

import { debounce, throttle } from "../utils/utils";

import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

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

const SearchPage = observer(() => {
  const { repositories, page, selectedValue, inputValue, totalCount } =
    repositoriesStore;

  useEffect(() => {
    repositoriesStore.fetchGetRepositories();
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

      repositoriesStore.addPage();
    }, 500);
    window.addEventListener("scroll", throttledScroll);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const updateInput = (newValue: string) => {
    repositoriesStore.updateInput(newValue);
  };

  const updateSelect = (newValue: string) => {
    repositoriesStore.updateSelect(newValue);
  };

  return (
    <div className="general-outside">
      <SearchInput value={inputValue} updateValue={updateInput} />
      <ResultAndSort
        title={`Result: ${totalCount} repositories`}
        selectedValue={selectedValue}
        updateSelect={updateSelect}
      />
      <ItemsList items={repositories} />
    </div>
  );
});

export default SearchPage;

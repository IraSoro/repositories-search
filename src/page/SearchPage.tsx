import { useEffect } from "react";

import { observer } from "mobx-react";
import repositoriesStore from "../store/repositoriesStore";

import { debounce } from "../utils/utils";

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
    const scroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (Math.round(scrollTop + clientHeight) >= scrollHeight) {
        repositoriesStore.addPage();
      }
    };

    const scrollDebounced = debounce(scroll, 100);

    window.addEventListener("scroll", scrollDebounced);
    return () => {
      window.removeEventListener("scroll", scrollDebounced);
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

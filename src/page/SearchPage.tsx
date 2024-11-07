import { useEffect } from "react";

import { observer } from "mobx-react";
import repositoriesStore from "../store/repositories_store";

import { debounce } from "../utils/debounce_throttle";

import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";

import "./SearchPage.css";
import { SortOption } from "../data/sort_option";

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
  const { repositories, selectedValue, inputValue, totalCount } =
    repositoriesStore;

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

  const updateSelect = (newValue: SortOption) => {
    repositoriesStore.updateSelect(newValue);
  };

  return (
    <div className="general-outside">
      <SearchInput value={inputValue} updateValue={updateInput} />
      <ResultAndSort
        title={`Result: ${totalCount} repositories`}
        selectedValue={selectedValue}
        onUpdateSortOption={updateSelect}
      />
      <ItemsList items={repositories} />
    </div>
  );
});

export default SearchPage;

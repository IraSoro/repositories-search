import { useCallback, useEffect } from "react";
import { observer } from "mobx-react";

import repositoriesStore from "../store/repositories_store";
import ResultAndSort from "../components/ResultAndSort";
import ItemsList from "../components/ItemsList";
import { debounce } from "../utils/debounce_throttle";

import "./SearchPage.css";

interface SearchInput {
  value: string;
  onInputUpdate: (newValue: string) => void;
}

const SearchInput = (props: SearchInput) => {
  return (
    <div className="search-outside">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        onChange={(e) => {
          props.onInputUpdate(e.target.value);
        }}
      />
    </div>
  );
};

const SearchPage = observer(() => {
  const { repositories, selectedValue, inputValue, totalCount } =
    repositoriesStore;

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (Math.round(scrollTop + clientHeight) >= scrollHeight) {
      repositoriesStore.addPage();
    }
  }, []);

  const handleScrollDebounced = debounce(handleScroll, 100);
  const handleInputUpdateDebounced = debounce((newValue: string) => {
    repositoriesStore.updateInput(newValue);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollDebounced);
    return () => {
      window.removeEventListener("scroll", handleScrollDebounced);
    };
  }, [handleScrollDebounced]);

  return (
    <div className="general-outside">
      <SearchInput
        value={inputValue}
        onInputUpdate={handleInputUpdateDebounced}
      />
      <ResultAndSort
        title={`Result: ${totalCount} repositories`}
        selectedValue={selectedValue}
        onUpdateSortOption={repositoriesStore.updateSelect}
      />
      <ItemsList items={repositories} />
    </div>
  );
});

export default SearchPage;

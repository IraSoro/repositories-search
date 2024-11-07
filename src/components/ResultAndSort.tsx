import { SortOption } from "../data/sort_option";
import "./ResultAndSort.css";

interface ResultAndSortProps {
  title: string;
  selectedValue: string;
  onUpdateSortOption: (newValue: SortOption) => void;
}

const ResultAndSort = (props: ResultAndSortProps) => {
  return (
    <div className="result-general">
      <p className="result-title">{props.title}</p>
      <div className="result-sort">
        <select
          className="sort-select"
          value={props.selectedValue}
          onChange={(event) => {
            props.onUpdateSortOption(event.target.value as SortOption);
          }}
        >
          <option value={SortOption.Stars}>Stars</option>
          <option value={SortOption.Forks}>Forks</option>
          <option value={SortOption.LastUpdate}>Last Update</option>
        </select>
      </div>
    </div>
  );
};

export default ResultAndSort;

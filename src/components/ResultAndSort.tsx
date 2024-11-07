import sortOptions from "../states/sort_options";
import "./ResultAndSort.css";

interface ResultAndSortProps {
  title: string;
  selectedValue: string;
  updateSelect: (newValue: string) => void;
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
            props.updateSelect(event.target.value);
          }}
        >
          <option value={sortOptions[0]}>Stars</option>
          <option value={sortOptions[1]}>Forks</option>
          <option value={sortOptions[2]}>Updated</option>
        </select>
      </div>
    </div>
  );
};

export default ResultAndSort;

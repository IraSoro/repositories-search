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
          <option value="none" disabled>
            Sort by
          </option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Updated</option>
        </select>
      </div>
    </div>
  );
};

export default ResultAndSort;

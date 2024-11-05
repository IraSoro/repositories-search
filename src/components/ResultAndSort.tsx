import { useState } from "react";

import "./ResultAndSort.css";

const ResultAndSort = () => {
  const [selectedValue, setSelectedValue] = useState("none");

  return (
    <div className="result-general">
      <p className="result-title">Result: 100 repositories</p>
      <div className="result-sort">
        <select
          className="sort-select"
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          <option value="none" disabled>
            Sort by
          </option>
          <option value="alphabet">alphabet</option>
          <option value="star">star</option>
          <option value="fork">fork</option>
        </select>
      </div>
    </div>
  );
};

export default ResultAndSort;

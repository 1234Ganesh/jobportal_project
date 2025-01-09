import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hydrabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-11lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="m-2">
      <h4 className="text-dark fw-bold">Filter Jobs</h4>
      <hr style={{ width: "140px", borderBottom: "3px solid black" }} />
      <div>
        {filterData.map((data, index) => (
          <div key={index}>
            <h4>{data.filterType}</h4>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="form-check" key={itemId}>
                  <input
                    type="radio"
                    className="form-check-input"
                    id={itemId}
                    name={data.filterType} // Use filterType as the group name
                    value={item}
                    onChange={() => changeHandler(item)} // Trigger handler on change
                  />
                  <label className="form-check-label" htmlFor={itemId}>
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;

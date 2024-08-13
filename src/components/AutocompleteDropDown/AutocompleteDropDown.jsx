import React from "react";
import { useSelector } from "react-redux";
import "./AutocompleteDropDown.css";

export default function AutocompleteDropDown({
  activeSelection,
  handleOptionSelect,
  handleMouseOverOption,
}) {
  const autocompleteSugestions = useSelector(
    (state) => state.search.autocompleteSuggestions
  );

  const handleClick = (query) => {
    return (e) => handleOptionSelect(query);
  };

  return (
    <div className="container__hor">
      <ul className="autocomplete">
        {autocompleteSugestions?.map((title, idx) => (
          <li
            key={`${title}-${idx}`}
            className={`option ${
              idx === activeSelection ? "active-option" : ""
            }`}
            onClick={handleClick(title)}
            onMouseEnter={(e) => handleMouseOverOption(idx)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

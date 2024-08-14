import React from "react";
import "./AutocompleteDropDown.css";
import { useAppSelector } from "../redux/hooks";

interface AutocompleteDropDownProps {
  activeSelection: number;
  handleOptionSelect: (query: string) => void;
  handleMouseOverOption: (idx: number) => void;
}

const AutocompleteDropDown: React.FC<AutocompleteDropDownProps> = ({
  activeSelection,
  handleOptionSelect,
  handleMouseOverOption,
}) => {
  const autocompleteSugestions = useAppSelector(
    (state) => state.search.autocompleteSuggestions
  );

  return (
    <div className="container__hor">
      <ul className="autocomplete">
        {autocompleteSugestions?.map((title: string, idx: number) => (
          <li
            key={`${title}-${idx}`}
            className={`option ${
              idx === activeSelection ? "active-option" : ""
            }`}
            onClick={() => handleOptionSelect(title)}
            onMouseEnter={() => handleMouseOverOption(idx)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteDropDown;

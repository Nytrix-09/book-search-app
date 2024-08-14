import React, { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  clearAutocompleteSuggestion,
  clearFetchedResults,
  fetchAutocompleteSuggestions,
  fetchBooks,
} from "../slices/SearchSlice";
import AutocompleteDropDown from "../AutocompleteDropDown/AutocompleteDropDown";
import "./SearchBar.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState<boolean>(false);
  const [selectedAutocompleteOptionIdx, setSelectedAutocompleteOptionIdx] =
    useState<number>(-1);
  const dispatch = useAppDispatch();
  const searchElRef = useRef<HTMLDivElement | null>(null);

  const autocompleteSugestions = useAppSelector(
    (state) => state.search.autocompleteSuggestions
  );

  const handleShowAutocomplete = () => {
    setIsAutocompleteOpen(true);
  };

  const handleHideAutocomplete = () => {
    setIsAutocompleteOpen(false);
  };

  const onSubmit = (query: string) => {
    if (query.trim()) {
      dispatch(fetchBooks(query));
    }
  };

  const getAutocompleteSuggestions = (query: string) => {
    if (query.trim()) {
      dispatch(fetchAutocompleteSuggestions(query));
    }
  };

  const throttledOnSubmit = useCallback(_.throttle(onSubmit, 100), [dispatch]);
  const debouncedGetAutocomleteSuggestions = useCallback(
    _.debounce(getAutocompleteSuggestions, 150),
    [dispatch]
  );

  const searchBooks = (query: string) => {
    dispatch(clearAutocompleteSuggestion()); // clear current set of autocomplete options
    throttledOnSubmit(query); // fetch search results
    handleHideAutocomplete(); // hide menu
    setSelectedAutocompleteOptionIdx(-1); // reset active option
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchElRef.current &&
      !searchElRef.current.contains(e.target as Node)
    ) {
      handleHideAutocomplete();
    }
  };

  const handleAutocompleteSubmit = (query: string) => {
    // Set the input value to the given query value and fire search.
    setInputValue(query); // update input box with selected title
    searchBooks(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedAutocompleteOptionIdx((prev) => {
        // rollover to first item if at end, o.w. go to next item
        return prev === autocompleteSugestions.length - 1 ? 0 : prev + 1;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedAutocompleteOptionIdx((prev) => {
        if (prev <= 0) {
          return autocompleteSugestions.length - 1; // rollover to last item in menu
        } else {
          return prev - 1;
        }
      });
    } else if (e.key === "Enter") {
      // If not no option selected in autocomplete menu, then use what is in input box.
      if (selectedAutocompleteOptionIdx === -1) {
        searchBooks(inputValue);
        return;
      }
      handleAutocompleteSubmit(
        autocompleteSugestions[selectedAutocompleteOptionIdx]
      );
    } else if (e.key === "Escape") {
      handleHideAutocomplete();
    }
  };

  const handleMouseOverOption = (idx: number) => {
    setSelectedAutocompleteOptionIdx(idx);
  };

  const handleClearSearchResults = () => {
    dispatch(clearFetchedResults());
    setInputValue("");
    handleHideAutocomplete();
    dispatch(clearAutocompleteSuggestion());
    setSelectedAutocompleteOptionIdx(-1); // reset active option
  };

  useEffect(() => {
    debouncedGetAutocomleteSuggestions(inputValue);
    return () => debouncedGetAutocomleteSuggestions.cancel();
  }, [inputValue]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <h2 className="title">Start typing to search</h2>
      <div className="container__hor" ref={searchElRef}>
        <input
          id="search"
          value={inputValue}
          onChange={handleTextInputChange}
          onClick={handleShowAutocomplete}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="searchBar__submitBtn"
          onClick={() => searchBooks(inputValue)}
        >
          Submit
        </button>
        <button
          type="reset"
          className="searchBar__clearBtn"
          onClick={handleClearSearchResults}
        >
          Clear
        </button>
      </div>
      {isAutocompleteOpen && (
        <AutocompleteDropDown
          activeSelection={selectedAutocompleteOptionIdx}
          handleOptionSelect={handleAutocompleteSubmit}
          handleMouseOverOption={handleMouseOverOption}
        />
      )}
    </>
  );
}

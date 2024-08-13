import React, { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {  clearAutocompleteSuggestion,
  clearFetchedResults,
  fetchAutocompleteSuggestions,fetchBooks } from "../slices/SearchSlice";
import AutocompleteDropDown from "../AutocompleteDropDown/AutocompleteDropDown";


//debounce - delay the execution of a function
// throttle - limit the frequency of a fucntion call

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [selectedAutocompleteOptionIdx, setSelectedAutocompleteOptionIdx] = useState(-1);
  const dispatch = useDispatch();
  const searchElRef = useRef(null);

  const autocompleteSugestions = useSelector(
    (state) => state.search.autocompleteSuggestions
  );

  const handleShowAutocomplete = () => {
    setIsAutocompleteOpen(true);
  };

  const handleHideAutocomplete = () => {
    setIsAutocompleteOpen(false);
  };

  const onSubmit = (query) => {
    if (query.trim()) {
      dispatch(fetchBooks(query));
    }
  };

  const getAutocompleteSuggestions = (query) => {
    if (query.trim()) {
      dispatch(fetchAutocompleteSuggestions(query));
    }
  };

  const throttledOnSubmit = useCallback(_.throttle(onSubmit, 100), [dispatch]);
  const debouncedGetAutocomleteSuggestions = useCallback(
    _.debounce(getAutocompleteSuggestions, 150),
    [dispatch]
  );

  const searchBooks = (query) => {
    dispatch(clearAutocompleteSuggestion()); // clear current set of autocomplete options
    throttledOnSubmit(query); // fetch search results
    handleHideAutocomplete(); // hide menu
    setSelectedAutocompleteOptionIdx(-1); // reset active option
  };

  const handleTextInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (searchElRef.current && !searchElRef.current.contains(e.target)) {
      handleHideAutocomplete();
    }
  };

  const handleAutocompleteSubmit = (query) => {
    // Set the input value to the given query value and fire search.
    setInputValue(query); // update input box with selected title
    searchBooks(query);
  };

  const handleKeyDown = (e) => {
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

  const handleMouseOverOption = (idx) => {
    setSelectedAutocompleteOptionIdx(idx);
  };

  const handleClearSearchResults = (e) => {
    e.preventDefault();
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
          onClick={(e) => searchBooks(inputValue)}
        >
          Submit
        </button>
        <button
          type="clear"
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

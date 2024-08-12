import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../slices/SearchSlice";

//debounce - delay the execution of a function
// throttle - limit the frequency of a fucntion call

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (query) => {
    if (query.trim()) {
      dispatch(fetchBooks(query));
    }
  };
  const debouncedOnSubmit = useCallback(_.debounce(onSubmit, 1000), [dispatch]);

  const formOnSubmit = (e) => {
    e.preventDefault();
    debouncedOnSubmit.cancel();
    onSubmit(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    debouncedOnSubmit(inputValue);
  }, [inputValue, debouncedOnSubmit]);

  return (
    <>
      <h2 className="title">Type to search</h2>
      <form className="container__hor" onSubmit={formOnSubmit}>
        <input id="search" value={inputValue} onChange={handleChange} />
        <button type="submit" className="searchBar__submitBtn">
          Submit
        </button>
      </form>
    </>
  );
}

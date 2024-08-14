import React from 'react';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
  return (
    <div className="App">
      <h1 className="title">Book Search App</h1>
      <div className="container__hor app__inner">
        <div className="container__searchAndDisplay">
          <SearchBar />
          <SearchResults />
        </div>
        <Wishlist />
      </div>
    </div>
  );
}

export default App;


import React from "react";
import './scss/app.scss';

import Header from "./components/Header";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import FullPizza from "./pages/FullPizza";

type SearchContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<SearchContextType>({
  searchValue: "",
  setSearchValue: () => {},
});

function App() {
  const [ searchValue, setSearchValue ] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

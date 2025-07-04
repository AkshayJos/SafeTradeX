import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, triggerSearch, setTriggerSearch, searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

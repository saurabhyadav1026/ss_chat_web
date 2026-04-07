import { SearchIcon } from "../icons";

const SearchBar = (props: any) => {
  const updateSearchInput = (e: any) => {
    props.setSearchInput(e.target.value);
  };

  return (
    <div className="search-shell">
      <span className="search-shell__icon">
        <SearchIcon />
      </span>
      <input
        className="form-control search-shell__input"
        name="ignore-history"
        type="search"
        onChange={(e) => {
          updateSearchInput(e);
        }}
        value={props.searchInput}
        placeholder={props._placeholder}
        id="search_input"
      />
    </div>
  );
};

export default SearchBar;

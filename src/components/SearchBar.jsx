export default function SearchBar({ searchTerm, onSearchChange, isLight, onFilterClick }) {
  const searchIcon = isLight
    ? '/assets/images/search-dark.svg'
    : '/assets/images/search.svg'
  const filterIcon = isLight
    ? '/assets/images/filter-dark.svg'
    : '/assets/images/filter.svg'

  return (
    <div className="search-container">
      <div className="search-row">
        <img src={searchIcon} alt="search" />
        <input
          placeholder="Painting title"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          id="searchInput"
        />
      </div>
      <button id="filterButton" onClick={onFilterClick}>
        <img src={filterIcon} alt="filter" />
      </button>
    </div>
  )
}
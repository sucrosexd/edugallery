export default function FilterModal({
  isOpen,
  onClose,
  selectedArtists,
  onArtistsChange,
  selectedLocations,
  onLocationsChange,
  yearFrom,
  onYearFromChange,
  yearTo,
  onYearToChange,
  onShowResults,
  onClear,
  isLight,
  allArtists = [],
  allLocations = [],
}) {
  if (!isOpen) return null

  const handleArtistToggle = (value) => {
    onArtistsChange(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleLocationToggle = (value) => {
    onLocationsChange(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  return (
    <>
      <div className={`filter-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`filter-modal ${isOpen ? 'active' : ''}`}>
        <div className="filter-content">
          <div className="filter-header">
            <button className="close-filter" onClick={onClose}>✕</button>
          </div>

          <div className="filter-body">
            <div className="filter-group">
              <label className="filter-label">ARTIST</label>
              <div className="custom-select">
                <div className="select-trigger">
                  <span className="select-placeholder">
                    {selectedArtists.length > 0 ? selectedArtists.join(', ') : 'Select the artist'}
                  </span>
                  <svg className="select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="select-dropdown">
                  {allArtists.map(artist => (
                    <label key={artist} className="select-option">
                      <input
                        type="checkbox"
                        value={artist}
                        checked={selectedArtists.includes(artist)}
                        onChange={() => handleArtistToggle(artist)}
                      />
                      <span>{artist}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">LOCATION</label>
              <div className="custom-select">
                <div className="select-trigger">
                  <span className="select-placeholder">
                    {selectedLocations.length > 0 ? selectedLocations.join(', ') : 'Select the location'}
                  </span>
                  <svg className="select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="select-dropdown">
                  {allLocations.map(loc => (
                    <label key={loc} className="select-option">
                      <input
                        type="checkbox"
                        value={loc}
                        checked={selectedLocations.includes(loc)}
                        onChange={() => handleLocationToggle(loc)}
                      />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">YEARS</label>
              <div className="years-range">
                <input
                  type="text"
                  placeholder="From"
                  className="year-input"
                  value={yearFrom}
                  onChange={(e) => onYearFromChange(e.target.value)}
                />
                <span className="year-separator">—</span>
                <input
                  type="text"
                  placeholder="To"
                  className="year-input"
                  value={yearTo}
                  onChange={(e) => onYearToChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="filter-footer">
            <button className="filter-link show-link" onClick={onShowResults}>SHOW THE RESULTS</button>
            <button className="filter-link clear-link" onClick={onClear}>CLEAR</button>
          </div>
        </div>
      </div>
    </>
  )
}

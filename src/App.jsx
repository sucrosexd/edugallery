import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'
import Pagination from './components/Pagination'
import FilterModal from './components/FilterModal'

const ITEMS_PER_PAGE = 6
const API_URL = 'https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0'

export default function App() {
  // Тема
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light'
  })

  // Загруженные картины
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Поиск и фильтры
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArtists, setSelectedArtists] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Загрузка с API
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(API_URL, {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(spec => {
        if (!cancelled) {
          const example = spec.paths['/paintings'].get.responses['200'].content['application/json'].example

          if (!Array.isArray(example)) {
            throw new Error('Example is not an array')
          }

          const withIds = example.map((item, i) => ({
            id: i + 1,
            src: item.imageUrl,
            title: item.title,
            year: item.year,
            artist: item.artist,
            location: item.location,
          }))
          setAllImages(withIds)
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  // Тема на body
  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [isLight])

  const toggleTheme = () => {
    setIsLight(prev => {
      const next = !prev
      localStorage.setItem('theme', next ? 'light' : 'dark')
      return next
    })
  }

  // Фильтрация
  const filteredImages = useMemo(() => {
    let result = allImages

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(img => img.title.toLowerCase().includes(term))
    }

    if (selectedArtists.length > 0) {
      result = result.filter(img =>
        selectedArtists.some(a => img.artist.toLowerCase().includes(a.toLowerCase()))
      )
    }

    if (selectedLocations.length > 0) {
      result = result.filter(img =>
        selectedLocations.some(l => img.location.toLowerCase().includes(l.toLowerCase()))
      )
    }

    if (yearFrom !== '') {
      const from = Number(yearFrom)
      if (!isNaN(from)) result = result.filter(img => img.year >= from)
    }

    if (yearTo !== '') {
      const to = Number(yearTo)
      if (!isNaN(to)) result = result.filter(img => img.year <= to)
    }

    return result
  }, [allImages, searchTerm, selectedArtists, selectedLocations, yearFrom, yearTo])

  // Пагинация
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE) || 1
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * ITEMS_PER_PAGE
  const pageItems = filteredImages.slice(start, start + ITEMS_PER_PAGE)

  const isLastPage = safePage === totalPages
  const isShortLastPage = isLastPage && pageItems.length < ITEMS_PER_PAGE && pageItems.length > 0

  // Проверяем, активны ли фильтры или поиск
  const hasActiveFilters = searchTerm.trim() !== '' ||
    selectedArtists.length > 0 ||
    selectedLocations.length > 0 ||
    yearFrom !== '' ||
    yearTo !== ''

  // Нет результатов
  const noResults = !loading && !error && filteredImages.length === 0 && hasActiveFilters

  const handleFilterShow = () => {
    setCurrentPage(1)
    setIsModalOpen(false)
  }

  const handleFilterClear = () => {
    setSelectedArtists([])
    setSelectedLocations([])
    setYearFrom('')
    setYearTo('')
    setCurrentPage(1)
  }

  return (
    <>
      <Header isLight={isLight} onToggleTheme={toggleTheme} />

      <main>
        <div className="main-container">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isLight={isLight}
            onFilterClick={() => setIsModalOpen(true)}
          />

          {loading && (
            <p style={{ color: '#AB8956', textAlign: 'center', padding: '40px', fontFamily: 'Cormorant SC, serif' }}>
              Loading paintings...
            </p>
          )}

          {error && (
            <p style={{ color: '#d44', textAlign: 'center', padding: '40px' }}>
              Failed to load: {error}
            </p>
          )}

          {noResults && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#DEDEDE',
              fontFamily: 'Cormorant SC, serif'
            }}>
              <p style={{
                fontSize: '20px',
                marginBottom: '12px',
                color: isLight ? '#121212' : '#DEDEDE'
              }}>
                No matches for <span style={{ color: '#AB8956' }}>«{searchTerm.trim() || 'selected filters'}»</span>
              </p>
              <p style={{
                fontSize: '14px',
                color: isLight ? '#666' : '#888',
                fontFamily: 'Inter Light, system-ui, sans-serif'
              }}>
                Please try again with a different spelling or keywords.
              </p>
            </div>
          )}

          {!loading && !error && !noResults && (
            <ImageGrid
              images={pageItems}
              shortLastPage={isShortLastPage}
            />
          )}
        </div>
      </main>

      {!loading && !error && !noResults && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLight={isLight}
        />
      )}

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedArtists={selectedArtists}
        onArtistsChange={setSelectedArtists}
        selectedLocations={selectedLocations}
        onLocationsChange={setSelectedLocations}
        yearFrom={yearFrom}
        onYearFromChange={setYearFrom}
        yearTo={yearTo}
        onYearToChange={setYearTo}
        onShowResults={handleFilterShow}
        onClear={handleFilterClear}
        isLight={isLight}
        allArtists={[...new Set(allImages.map(img => img.artist))]}
        allLocations={[...new Set(allImages.map(img => img.location))]}
      />
    </>
  )
}

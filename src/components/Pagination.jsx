export default function Pagination({ currentPage, totalPages, onPageChange, isLight }) {
  const leftArrow = isLight
    ? '/assets/images/arrow-left-dark.svg'
    : '/assets/images/arrow-left.svg'
  const rightArrow = isLight
    ? '/assets/images/arrow-right-dark.svg'
    : '/assets/images/arrow-right.svg'

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  // Генерация номеров страниц (упрощённо, как в оригинале: 1 2 3 ... 9)
  // Если страниц <= 5, покажем все, иначе схема "1 2 3 ... last"
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages = []
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
    return pages
  }

  const pages = getPageNumbers()

  return (
    <footer>
      <div className="container">
        <div className="nav">
          <img src={leftArrow} alt="previous" onClick={handlePrev} style={{ cursor: 'pointer' }} />
          <div className="nav-number">
            {pages.map((p, idx) =>
              p === '...' ? (
                <p key={`ellipsis-${idx}`}>...</p>
              ) : (
                <p
                  key={p}
                  className={p === currentPage ? 'cub' : ''}
                  onClick={() => onPageChange(p)}
                  style={{ cursor: 'pointer' }}
                >
                  {p}
                </p>
              )
            )}
          </div>
          <img src={rightArrow} alt="next" onClick={handleNext} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </footer>
  )
}
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/pagination.module.css'

interface PaginationProps {
  currentPage: number
  totalResults: number
  perPage: number
}

export default function Pagination({ currentPage, totalResults, perPage }: PaginationProps) {
  const router = useRouter()
  const totalPages = Math.ceil(totalResults / perPage)

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > 1) {
            router.push({
              pathname: '/search',
              query: { ...router.query, page: currentPage - 1 }
            })
          }
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={idx} className={styles.paginationEllipsis}>...</span>
        ) : (
          <Link
            key={page}
            href={{
              pathname: '/search',
              query: { ...router.query, page }
            }}
            className={`${styles.paginationButton} ${currentPage === page ? styles.paginationActive : ''}`}
          >
            {page}
          </Link>
        )
      )}

      <button
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={() => {
          if (currentPage < totalPages) {
            router.push({
              pathname: '/search',
              query: { ...router.query, page: currentPage + 1 }
            })
          }
        }}
      >
        Next
      </button>
    </div>
  )
}
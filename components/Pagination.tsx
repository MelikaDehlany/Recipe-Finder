import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Search.module.css'

interface PaginationProps {
  currentPage: number
  totalResults: number
  perPage: number
}

export default function Pagination({ currentPage, totalResults, perPage }: PaginationProps) {
  const router = useRouter()
  const totalPages = Math.ceil(totalResults / perPage)

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Link
          href={{
            pathname: '/search',
            query: { ...router.query, page: currentPage - 1 }
          }}
          className={styles.pageLink}
        >
          Previous
        </Link>
      )}
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Link
          key={page}
          href={{
            pathname: '/search',
            query: { ...router.query, page }
          }}
          className={`${styles.pageLink} ${currentPage === page ? styles.active : ''}`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          href={{
            pathname: '/search',
            query: { ...router.query, page: currentPage + 1 }
          }}
          className={styles.pageLink}
        >
          Next
        </Link>
      )}
    </div>
  )
}
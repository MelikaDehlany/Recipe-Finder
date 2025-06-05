import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Search.module.css'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push({
        pathname: '/search',
        query: { q: searchTerm }
      })
    }
  }

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes or ingredients..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        Search
      </button>
    </form>
  )
}
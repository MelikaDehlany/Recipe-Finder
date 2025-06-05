import { useRouter } from 'next/router'
import styles from '../styles/Search.module.css'

export default function FilterBar() {
  const router = useRouter()

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    router.push({
      pathname: '/search',
      query: { ...router.query, [name]: value }
    })
  }

  return (
    <div className={styles.filterContainer}>
      <select 
        name="diet"
        onChange={handleFilterChange}
        className={styles.filterSelect}
        value={router.query.diet || ''}
      >
        <option value="">All Diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten Free</option>
      </select>
      
      <select 
        name="sort"
        onChange={handleFilterChange}
        className={styles.filterSelect}
        value={router.query.sort || ''}
      >
        <option value="">Sort By</option>
        <option value="popularity">Popularity</option>
        <option value="time">Cooking Time</option>
      </select>
    </div>
  )
}
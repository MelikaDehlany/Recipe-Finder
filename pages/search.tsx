import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'
import styles from '../styles/Search.module.css'

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes?: number
  servings?: number
}

export default function SearchPage() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const [searchType, setSearchType] = useState<'dish' | 'ingredients'>('dish')

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { q, diet, sort, page = '1' } = router.query
        
        const queryStr = typeof q === 'string' ? q : ''
        const dietStr = typeof diet === 'string' ? diet : ''
        const sortStr = typeof sort === 'string' ? sort : ''
        const pageStr = typeof page === 'string' ? page : '1'

        const params = new URLSearchParams()
        params.append('page', pageStr)
        
        if (dietStr) params.append('diet', dietStr)
        if (sortStr) params.append('sort', sortStr)

        if (queryStr) {
          if (searchType === 'dish') {
            params.append('query', queryStr)
          } else {
            params.append('ingredients', queryStr)
          }
        }

        const response = await fetch(`/api/recipes?${params}`)
        const data = await response.json()

        if (data.results && Array.isArray(data.results)) {
          setRecipes(data.results)
          setTotalResults(data.totalResults || 0)
        } else {
          setRecipes([])
          setTotalResults(0)
        }
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    if (router.query.q) {
      fetchRecipes()
    } else {
      setRecipes([])
      setLoading(false)
    }
  }, [router.query, searchType])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchTypeTabs}>
        <button
          className={`${styles.tabButton} ${searchType === 'dish' ? styles.activeTab : ''}`}
          onClick={() => setSearchType('dish')}
        >
          Search by Dish Name
        </button>
        <button
          className={`${styles.tabButton} ${searchType === 'ingredients' ? styles.activeTab : ''}`}
          onClick={() => setSearchType('ingredients')}
        >
          Search by Ingredients
        </button>
      </div>

      <FilterBar />

      {loading ? (
        <div className={styles.loading}>Loading recipes...</div>
      ) : recipes.length === 0 ? (
        <div className={styles.noResults}>
          <p>No recipes found. Try a different search.</p>
          <a href="/" className={styles.homeLink}>Back to home</a>
        </div>
      ) : (
        <>
          <div className={styles.resultsGrid}>
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <Pagination 
            currentPage={parseInt(typeof router.query.page === 'string' ? router.query.page : '1')}
            totalResults={totalResults}
            perPage={10}
          />
        </>
      )}
    </div>
  )
}
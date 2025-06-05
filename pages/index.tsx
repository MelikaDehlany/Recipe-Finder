import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import styles from '../styles/Home.module.css'

export default function Home() {
  type Recipe = {
    id: number
    title: string
    image: string
    readyInMinutes?: number
    servings?: number
    [key: string]: any
  }
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch('/api/recipes?query=popular&number=6')
        const data = await response.json()
        setPopularRecipes(data.results || [])
      } catch (error) {
        console.error('Error fetching popular recipes:', error)
      }
    }

    fetchPopularRecipes()
  }, [])

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Delicious Recipes</h1>
          <p className={styles.heroSubtitle}>Find perfect recipes based on ingredients you have</p>
          <div className={styles.searchContainer}>
            <SearchBar />
          </div>
        </div>
      </div>

      <div className={styles.popularSection}>
        <h2 className={styles.sectionTitle}>Popular Recipes</h2>
        <div className={styles.recipesGrid}>
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}